import { Col, Row, Image, Typography, Button } from "antd";
import { useEffect, useReducer, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { userImg } from "../../utils/imageData";
import { fetchAuthor, fetchProfile, fetchQuote } from "../../services/apis";
import Modal from "../../components/ui/Modal";

const { Text } = Typography;

// TypeDefs
type StateType = {
  fullname?: string;
  eamil?: string;
  authorId?: number | null;
  quoteId?: number | null;
  hasAuthorRespone?: boolean;
  hasQuoteResponse?: boolean;
  authorNameRes?: string;
  authorQuoteRes?: string;
};
type ActionType = { type: string; payload: StateType };

// Init state and Reducer for local sate
const initialState: StateType = {
  fullname: "",
  eamil: "",
  authorId: null,
  quoteId: null,
  hasAuthorRespone: false,
  hasQuoteResponse: false,
  authorNameRes: "",
  authorQuoteRes: "",
};
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "setData":
      return { ...state, ...action.payload };

    default:
      throw new Error();
  }
}

const Profile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = useAuth();

  const getProfileData = async () => {
    try {
      if (token) {
        let profileData = await fetchProfile(token);
        console.log("profileRes::", profileData);
        dispatch({ type: "setData", payload: profileData });
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getProfileData();
  }, [token]);

  // handling author and quoute api calls
  const handleAuthorQuoteCalls = async () => {
    setShowModal(true);
    try {
      let authorResponse = await fetchAuthor(token);
      console.log("autherRes--", authorResponse);
      if (authorResponse.success) {
        dispatch({
          type: "setData",
          payload: {
            authorId: authorResponse.data.authorId,
            hasAuthorRespone: true,
            authorNameRes: authorResponse.data.name,
          },
        });
        
        try {
          let quoteResponse = await fetchQuote(
            token,
            authorResponse?.data?.authorId
          );
          if (quoteResponse.success) {
            dispatch({
              type: "setData",
              payload: {
                quoteId: quoteResponse.data.quoteId,
                hasQuoteResponse: true,
                authorQuoteRes: quoteResponse.data.quote,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (!authorResponse.success) {
        setShowModal(false);
        alert(authorResponse?.data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Col>
        <Row>
          <Col span={5}>
            <Image
              src={userImg}
              width={100}
              style={{ borderRadius: 999, border: "1px solid black" }}
            />
          </Col>
          <Col>
            <Text style={{ fontSize: 35, fontWeight: "bold" }}>
              Welcome{`, ${state.fullname} !`}{" "}
            </Text>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={handleAuthorQuoteCalls}
              >
                Update
              </Button>
            </Col>
          </Col>
        </Row>
        <Row>
          <Text style={{ fontSize: 18, marginTop: 20 }}>
            [here is place for concatenated result from long running call]
          </Text>
        </Row>
      </Col>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        isAuthorFetched={state.hasAuthorRespone}
        isQuoteFetched={state.hasQuoteResponse}
      />
    </>
  );
};

export default Profile;
