import axios from "axios";
import { useState, useEffect } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";
import { useParams } from "react-router-dom";
import { server, compiler_server } from "../../constants/config";
import { useSelector } from "react-redux";
import { Editor } from '@monaco-editor/react';

const Playground = ({ theme }) => {
  const [activeTab, setActiveTab] = useState("Input");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const { id } = useParams();
  const [testCases, setTestCases] = useState();
  const [syntaxError, setSyntaxError] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const defaultCode = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python: `print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`,
  };

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode["cpp"]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(defaultCode[newLanguage] || "");
  };

  const handleRun = async () => {
    try {
      const response = await axios.post(`${compiler_server}/compile`, {
        language: selectedLanguage,
        code: code,
        Input: input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleSubmission = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          `${compiler_server}/run`,
          {
            language: selectedLanguage,
            code,
            input,
            ProblemId: id,
          },
        );
        setOutput(response.data.output);

        const fetchTestCases = async () => {
          try {
            const response = await axios.get(
              `${server}/api/v1/testcases/problem/${id}`,
              { withCredentials: true }
            );

            const testCasesData = response.data.testcases.map((testCase) => ({
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              result: testCase.status === "pass" ? "Passed" : "Failed",
            }));
            setTestCases(testCasesData);
          } catch (error) {
            console.error("Error fetching test cases:", error.message);
          }
        };

        await fetchTestCases();

        const verdictResult = response.data.verdictResult.message;
        let status;

        if (verdictResult === "All test cases passed!") {
          status = "Accepted";
          setVerdict("All test cases passed!");
        } else if (verdictResult.includes("Test case failed")) {
          status = "Wrong Answer";
          setVerdict(`Test case failed: ${verdictResult}`);
        } else {
          status = "Runtime Error";
          setVerdict("Runtime Error occurred.");
        }

        await axios.post(
          `${server}/api/v1/submissions`,
          {
            problem_id: id,
            code,
            status,
            language: selectedLanguage,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error during submission:", error);
        alert("An error occurred while submitting the code.");
      }
    } else {
      alert("Please login or sign up to submit the code.");
    }
  };

  const renderTabContent = () => {
    if (activeTab === "Input") {
      return (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-full rounded-3xl p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
          placeholder="Enter test case input here..."
        />
      );
    } else if (activeTab === "Verdict") {
      return (
        <div className="rounded-lg p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white">
          {testCases ? (
            <div className="flex flex-row gap-4">
              {testCases.map((testCase, index) => (
                <div
                  key={index}
                  className={`${
                    testCase.result === "Passed"
                      ? "bg-green-200 border-green-400 text-green-800"
                      : "bg-red-200 border-red-400 text-red-800"
                  } p-4 rounded-lg`}
                >
                  <div>
                    <strong>Test Case {index + 1}</strong>
                  </div>
                  <div>
                    <strong>Result:</strong>
                    <span
                      className={`${
                        testCase.result === "Passed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {testCase.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No test cases available</div>
          )}
        </div>
      );
    } else if (activeTab === "Output") {
      return (
        <textarea
          value={syntaxError || output}
          readOnly
          className="w-full rounded-lg p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
        />
      );
    }
  };

  const languageOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
  ];

  const themes = {
    light: {
      container: "bg-gray-100 text-black border-gray-300",
      header: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
      dropdown: "bg-white text-black border-gray-400",
      buttonReset: "bg-blue-500 hover:bg-blue-600 text-white",
      buttonFormat: "bg-green-500 hover:bg-green-600 text-white",
      editor: "bg-white text-black border-gray-400",
    },
    dark: {
      container: "bg-gray-900 text-white border-gray-700",
      header: "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800",
      dropdown: "bg-gray-700 text-white border-gray-500",
      buttonReset: "bg-blue-600 hover:bg-blue-700 text-white",
      buttonFormat: "bg-green-600 hover:bg-green-700 text-white",
      editor: "bg-gray-800 text-white border-gray-600",
    },
  };

  const currentTheme = themes[theme] || themes.dark;

  useEffect(() => {
    const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
    window.monaco.editor.setTheme(monacoTheme);
  }, [theme]);

  return (
    <div>
      <div className={`rounded-lg border shadow-lg overflow-hidden h-[70vh] ${currentTheme.container}`}>
        <div className={`h-16 w-full flex items-center px-4 rounded-t-md relative ${currentTheme.header}`}>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={`rounded-md px-3 py-2 w-48 focus:outline-none border-gray-900 focus:ring-2 focus:ring-indigo-500 hover:border-gray-400 transition-all ${currentTheme.dropdown}`}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-6">
            <button
              onClick={() => setCode(defaultCode[selectedLanguage] || "")}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-md ${currentTheme.buttonReset}`}
            >
              <FaRedoAlt /> Reset
            </button>
            <button
              onClick={handleRun}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-md ${currentTheme.buttonFormat}`}
            >
              <MdFormatAlignLeft /> Format
            </button>
            <button
              onClick={handleSubmission}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-md ${currentTheme.buttonFormat}`}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="rounded-b-md w-full h-full">
          <Editor
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-full rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner ${currentTheme.editor}`}
            theme={theme === "light" ? "vs" : "vs-dark"} 
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex gap-4">
          <button
            className={`${
              activeTab === "Input" ? "bg-blue-500 text-white" : "bg-gray-200"
            } py-2 px-4 rounded-md`}
            onClick={() => setActiveTab("Input")}
          >
            Input
          </button>
          <button
            className={`${
              activeTab === "Verdict" ? "bg-blue-500 text-white" : "bg-gray-200"
            } py-2 px-4 rounded-md`}
            onClick={() => setActiveTab("Verdict")}
          >
            Verdict
          </button>
          <button
            className={`${
              activeTab === "Output" ? "bg-blue-500 text-white" : "bg-gray-200"
            } py-2 px-4 rounded-md`}
            onClick={() => setActiveTab("Output")}
          >
            Output
          </button>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Playground;
