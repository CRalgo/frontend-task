import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/apis";

const Navbar = () => {
  const token = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(token);

  useEffect(() => {
    setIsAuthenticated(token);
  }, [token]);

  const handleSignout = async () => {
    try {
      const response = await logout(token);
      if(response) {
        localStorage.clear(); // clearing all data from localstorage including token as well
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row gutter={5} style={{ marginBottom: 20 }}>
      <Col className="gutter-row" span={1.5}>
        <Button onClick={() => navigate("/")}>About us</Button>
      </Col>
      {isAuthenticated ? (
      <>
      <Col className="gutter-row" span={1.5}>
        <Button onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </Col>
        <Col className="gutter-row" span={2}>
          <Button
            onClick={() => {
              handleSignout();
            }}
          >
            Sign out
          </Button>
        </Col>
      </>
      ) : (
        <Col className="gutter-row" span={1.5}>
          <Button onClick={() => navigate("/login")}>Sign in</Button>
        </Col>
      )}
    </Row>
  );
};

export default Navbar;