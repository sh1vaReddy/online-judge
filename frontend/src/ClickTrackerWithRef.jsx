import React, { useRef } from 'react';

function ClickTrackerWithRef() {
  const clickCount = useRef(0); // Keeps track of clicks

  const handleClick = () => {
    clickCount.current += 1; // Update the count
    console.log('Click count (useRef):', clickCount.current);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>Open the console to see the click count!</p>
    </div>
  );
}

export default ClickTrackerWithRef;
