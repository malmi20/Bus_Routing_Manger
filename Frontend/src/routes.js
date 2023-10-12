import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import RouteManager from "./pages/RouteManager";
import Profile from "./pages/Profile";

const AppRoutes = () => {
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
