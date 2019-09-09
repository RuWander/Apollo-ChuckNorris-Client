import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  // console.log('testing')
  // console.log(localStorage.getItem('token') !== null)
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (localStorage.getItem('token') !== null)  {
          return <Comp {...props} />
         } else {
          return <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
          };
      }}
    />
  );
};