//@flow
import React from "react";
import { Route } from "react-router";

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React$ComponentType<*>,
  isAuthenticated: boolean
}) => (
  <Route
    {...rest}
    render={(props: *) => {
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
