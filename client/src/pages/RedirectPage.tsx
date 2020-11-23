import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Layout from "../components/Layout";
interface MatchParams {
  jwt: string;
}
const RedirectPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const jwt = match.params.jwt;
  const history = useHistory();

  useEffect(() => {
    if (!!jwt) {
      console.log(jwt);
      localStorage.setItem("jwt", jwt);
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [history, jwt]);

  return <Layout title={"Redirect"}>Redirecting...</Layout>;
};

export default RedirectPage;
