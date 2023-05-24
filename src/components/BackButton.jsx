import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ animals }) => {
  const navigate = useNavigate();
  console.log("BackButton animals: ", animals)



  return (
    <div>
      <button  className="back-button" onClick={() => 
        navigate(`/search`, 
        { state: {animals}})  
      }>Back</button>
      
    </div>
  );
}
export default BackButton