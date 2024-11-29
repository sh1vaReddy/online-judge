import { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import {  useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import Submission from "./Submission";

const Problem = ({ theme }) => {
  const [activeTab, setActiveTab] = useState("description");
  const[ProblemData,setProblemData]=useState(null);
  const{id}=useParams();

  // Define default themes (light and dark)
  const themes = {
    light: {
      container: "bg-white text-black border-gray-300 shadow-md",
      header: "bg-gray-200 text-black",
      button: "text-gray-700 hover:text-indigo-500",
      activeButton: "text-indigo-500",
      content: "text-gray-700",
    },
    dark: {
      container: "bg-gray-900 text-white border-gray-700 shadow-lg",
      header: "bg-gray-800 text-white",
      button: "text-white hover:text-indigo-400",
      activeButton: "text-indigo-400",
      content: "text-gray-300",
    },
  };

  // Fallback to "dark" if theme prop is not provided or invalid
  const currentTheme = themes[theme] || themes.dark;

  useEffect(()=>{
    const fetchProblem=async()=>
    {
      try{
         const response=await axios.get(`http://localhost:3000/api/v1/problems/${id}`);
         setProblemData(response.data.problem);
      }
      catch(error)
      {
          toast.error("Problem Not Found");
      }
    };
    fetchProblem();
  },[id]);

  return (
    <div
      className={`rounded-lg border overflow-hidden h-full ${currentTheme.container}`}
    >
      {/* Navigation Tabs */}
      <div
        className={`h-16 flex items-center px-4 rounded-t-md ${currentTheme.header}`}
      >
        <nav className="flex space-x-16">
          <button
            className={`font-semibold text-lg flex items-center space-x-2 transition ${
              activeTab === "description"
                ? currentTheme.activeButton
                : currentTheme.button
            }`}
            onClick={() => setActiveTab("description")}
          >
            <GrNotes />
            <span>Description</span>
          </button>
          <button
            className={`font-semibold text-lg flex items-center space-x-2 transition ${
              activeTab === "discussion"
                ? currentTheme.activeButton
                : currentTheme.button
            }`}
            onClick={() => setActiveTab("discussion")}
          >
            <FaRegMessage />
            <span>Discussion</span>
          </button>
          <button
            className={`font-semibold text-lg flex items-center space-x-2 transition ${
              activeTab === "submissions"
                ? currentTheme.activeButton
                : currentTheme.button
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            <IoIosTimer className="text-2xl" />
            <span>Submissions</span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className={`p-6 ${currentTheme.content}`}>
        {ProblemData && activeTab == 'description' && (
          <div>
            <h1>{ProblemData.title}</h1>
            <h1>{ProblemData.description}</h1>
          </div>
        )}
        {activeTab === "discussion" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Discussion</h2>
            <p className="leading-relaxed">
              Join the discussion! Share your thoughts and ask questions here.
            </p>
          </div>
        )}
        {activeTab === "submissions" && (
          <div>
            <p className="leading-relaxed">
              <Submission/>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem;
