import React from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import RedirectPage from "./pages/RedirectPage";
import RegisterPage from "./pages/RegisterPage";

const Routes: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    config: {
      duration: 250,
    },
    from: {
      opacity: 0.25,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0.25,
    },
  });

  return (
    <>
      {transitions.map(({ item: location, props, key }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            width: "100%",
            position: "absolute",
          }}
        >
          <Switch location={location}>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/products/:id" component={ProductDetailsPage} />
            <Route path="/redirect" component={RedirectPage} />
            <Route exact path="/" component={ProductsPage} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};
export default Routes;
