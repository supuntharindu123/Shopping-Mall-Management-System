import { createContext } from "react";
import React from "react";

export const usercontext = createContext();

const Contextprovider = ({ children }) => {
  const role = "admin";
  const authenticated = true;
  return (
    <usercontext.Provider value={{ role, authenticated }}>
      {children}
    </usercontext.Provider>
  );
};

export default Contextprovider;
