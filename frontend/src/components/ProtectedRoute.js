import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({compoment: Component,...props}) {
  return(
    <Route>
    {()=> props.loggedIn ? <Component {...props} /> :  <Redirect to="./signin" />}
    </Route>
  )
};
export default ProtectedRoute;