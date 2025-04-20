import React, { useState } from "react";

const Greeting = ({ username }) => {
  const [greeting, setGreeting] = useState("Hello");
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const greetings = [
    "Hello",
    "Hi",
    "Welcome",
    "Greetings",
    "Howdy",
    "Hey there"
  ];

  const changeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  };

  return (
    <div className="greeting-container">
      <h2>
        {greeting}, {username}!
      </h2>
      <p className="date-display">Today is {currentDate}</p>
      <button 
        onClick={changeGreeting}
        className="greeting-button"
      >
        Change Greeting
      </button>
    </div>
  );
};

export default Greeting;