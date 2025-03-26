import React from "react";
import { usercontext } from "./contextprovider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Protectedroute() {
  const { role, authenticated } = useContext(usercontext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return <div>protectedroute</div>;
}

export default Protectedroute;
