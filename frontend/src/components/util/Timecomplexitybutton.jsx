import { useState } from "react";

export const Timecomplexitybutton = () => {
  const [Timestate, setTimestate] = useState("Not diaply"); 

  const useTimeSate = () => {
    return [Timestate, setTimestate]; 
  };

  return useTimeSate(); 
};

export default Timecomplexitybutton; 
