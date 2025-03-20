// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import HomeBody from "./homebody";

const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <HomeBody></HomeBody>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
