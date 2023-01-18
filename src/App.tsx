import "antd/dist/reset.css";
import { Col } from "antd";
import Navbar  from "./components/ui/Navbar";
import NavRoutes from "./Routes/NavRoutes/NavRoutes";


function App() {
  return (
    <Col style={{ margin: "30px 50px" }}>
      <Navbar />
      <NavRoutes />
    </Col>
  );
}

export default App;