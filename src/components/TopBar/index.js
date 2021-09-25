import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { logoutUser } from "../../redux/action/employeeActions";
import View from "./view";

const TopBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return pathname !== "/pos" && <View handleLogout={() => handleLogout()} />;
};

export default TopBar;
