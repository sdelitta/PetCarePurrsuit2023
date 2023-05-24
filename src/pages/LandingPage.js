import React, { useState, useEffect } from "react";
import SignUp from "../components/SignUp";
import "../CSS/SearchBar.css"

const LandingPage = (props) => {
  
  


  return (
    <div className="home" 
      style={{display:"flex", 
      flexDirection:"column", 
      justifyContent:"center"
      }}>

      {/* <div className='emblem'></div> */}
      <SignUp />

      
    </div>
  );
};

export default LandingPage;