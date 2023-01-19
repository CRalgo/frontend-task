import { Route, Routes } from "react-router-dom";
import AboutUs from "../../pages/AboutUs/AboutUs";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";

type Props = {};

const NavRoutes = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="/" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default NavRoutes;