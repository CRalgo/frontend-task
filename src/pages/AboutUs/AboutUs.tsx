import { useEffect, useReducer } from "react";
import { fetchAboutUs } from "../../services/apis";

type StateType = { success: boolean; data: { info: string } };

const initialState: StateType = {
  success: false,
  data: { info: "" },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setData":
      return { ...action.payload };

    default:
      throw new Error();
  }
}

const AboutUs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAboutUs = async () => {
    try {
        const response = await fetchAboutUs()
        if(response) {
            dispatch({ type: "setData", payload: response });
        }
        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    document.title = "About Us";
    getAboutUs();
  }, []);
  return (
    <>
      {state && (
        <h2
          data-id="info-label"
          dangerouslySetInnerHTML={{ __html: state?.data.info }}
        ></h2>
      )}
    </>
  );
};

export default AboutUs;