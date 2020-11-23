import React from "react";

type Props = {
  isLogin?: boolean;
};

const GoogleAuth = ({ isLogin }: Props) => {
  return (
    <a href="http://localhost:8080/auth/google">
      {isLogin ? "Login" : "Register"} with Google
    </a>
  );
};
export default GoogleAuth;
