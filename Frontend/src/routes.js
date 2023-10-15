import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import OwnerHome from "./pages/OwnerHome";
import RouteMHome from "./pages/RouteMHome";
import Auth from "./pages/Auth";
import RouteManager from "./pages/RouteManager";
import Profile from "./pages/Profile";
import { AppContext } from "./context/AuthContext";
import BusList from "./pages/BusList";
import AddBus from "./pages/AddBus";
import UpdateBus from "./pages/UpdateBus";

const AppRoutes = () => {
  const { user } = useContext(AppContext);
  const Home = user?.isBusOwner ? OwnerHome : RouteMHome;
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />

        {/* Home Elements */}
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/routeManager"} element={<RouteManager />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buslist" element={<BusList/>}/>
        <Route path="/addbus" element={<AddBus/>}/>
        <Route path="/updateBus/:id" element={<UpdateBus/>}/>
      </Route>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;
