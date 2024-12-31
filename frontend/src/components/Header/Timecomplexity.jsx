import { useState, useRef, useEffect } from "react";
import axios from "axios";

const TimeComplexity = () => {
  const [code, setCode] = useState("");
  const [complexity, setComplexity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const codeTextareaRef = useRef(null);

  
  useEffect(() => {
    if (codeTextareaRef.current) {
      codeTextareaRef.current.style.height = "auto"; 
      codeTextareaRef.current.style.height = `${codeTextareaRef.current.scrollHeight}px`; 
    }
  }, [code]);

  const calculateComplexity = async() => {
    try{
        const  reponse=await axios.post(`http://localhost:8080/time-complexity`,{
            code,
            language:selectedLanguage,
        })
        setComplexity(reponse.data.TimeComplexity);
    }
    catch(error)
    {
        console.log("Error in getting time complexity",error);
    }
  };

  const languageOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
  ];

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage); 
  };

  return (
    <div className="dark:bg-gray-900 min-h-full">
      <div className="flex justify-center text-6xl font-bold p-6 dark:text-gray-200">
        <h1>Runtime Calculator</h1>
      </div>
      <div className="flex justify-center mt-5">
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-400 transition-all"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center mt-10">
        <textarea
          ref={codeTextareaRef}
          className="w-3/4 p-4 border border-gray-900 dark:border-gray-300 rounded-md resize-none dark:bg-gray-900 dark:text-gray-100 text-xl"
          placeholder="Use Time Complexity Calculator To Analyze Your Code's Runtime Complexity"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ minHeight: "250px" }}
        />
        <textarea
          className="w-3/4 h-32 p-4 border border-gray-900 dark:border-gray-300 rounded-md mt-5 dark:bg-gray-900 dark:text-gray-100"
          placeholder="Time complexity will appear here..."
          value={complexity}
          readOnly
        />
        <button
          className="mt-5 mb-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={calculateComplexity}
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default TimeComplexity;
