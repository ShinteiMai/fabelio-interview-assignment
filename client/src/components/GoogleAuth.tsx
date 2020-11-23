import React from "react";

type Props = {
  isLogin?: boolean;
};

const GoogleAuth = ({ isLogin }: Props) => {
  return (
    <a
      href="https://stronkapp.com/auth/google"
      className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
      {isLogin ? "Login" : "Register"} with Google
    </a>
  );
};
export default GoogleAuth;
