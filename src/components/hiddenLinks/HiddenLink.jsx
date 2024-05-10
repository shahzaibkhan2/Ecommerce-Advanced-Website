import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../reduxToolkit/slices/authSlice";

const ShowLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export const ShowLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export default ShowLogin;
