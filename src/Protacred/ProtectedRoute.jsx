import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children ,allowRoles}) {

  let { user ,isLoggedIn,loading} = React.useContext(AuthContext);


  if(loading){
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace></Navigate>;
  if (!isLoggedIn) return <Navigate to="/login" replace></Navigate>;
  if(allowRoles && !allowRoles.includes(user.role)){
    return <Navigate to="/login" replace></Navigate>;

  }


  

  return <>{children}</>;
}

export default ProtectedRoute;
