import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }) {
  const authData = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <Route {...rest} render={({ location }) => {
      return authData && authData?.token
        ? children
        : <Redirect to={{
            pathname: '/auth',
            state: { from: location }
          }}
 />
    }} />
  )
}