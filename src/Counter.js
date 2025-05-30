import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button className="counter-button" onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
};

export default Counter;