import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import BusHome from "./pages/BusHome";
import RouteMHome from "./pages/RouteMHome";
import Auth from "./pages/Auth";
import RouteManager from "./pages/RouteManager";
import Profile from "./pages/Profile";
import { AppContext } from "./context/AuthContext";

const AppRoutes = () => {
  const { user } = useContext(AppContext);
  const Home = user?.isBusOwner ? BusHome : RouteMHome;
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />

        {/* Home Elements */}
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/routeManager"} element={<RouteManager />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;
