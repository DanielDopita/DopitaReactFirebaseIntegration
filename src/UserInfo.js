import React, { useState } from "react";

const UserInfo = ({ handleClick }) => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    profession: "Software Engineer",
    luckyNumber: Math.floor(Math.random() * 100) + 1
  });

  const generateNewLuckyNumber = () => {
    setUserInfo(prev => ({
      ...prev,
      luckyNumber: Math.floor(Math.random() * 100) + 1
    }));
  };

  return (
    <div className="user-info">
      <h2>Name: {userInfo.name}</h2>
      <h3>Profession: {userInfo.profession}</h3>
      <p>
        Your lucky number is: 
        <span className="lucky-number"> {userInfo.luckyNumber}</span>
      </p>
      <div className="button-group">
        <button className="show-alert-button" onClick={handleClick}>Show Alert</button>
        <button 
          onClick={generateNewLuckyNumber}
          className="lucky-button"
        >
          Generate New Lucky Number
        </button>
      </div>
    </div>
  );
};

export default UserInfo;