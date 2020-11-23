import React from "react";
import { useHistory } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

const GoogleAuth = ({ isLogin }: Props) => {
  const history = useHistory();
  return (
    <a href="http://localhost:8080/auth/google">
      {isLogin ? "Login" : "Register"} with Google
    </a>
  );
};
export default GoogleAuth;
