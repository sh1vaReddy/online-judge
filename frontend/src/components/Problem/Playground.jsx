import { useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";

const Playground = ({ theme }) => {
  const [activeTab, setactiveTab] = useState("Input");
  // Default boilerplate code for each language
  const defaultCode = {
    cpp: `
    // C++: Hello World Program
    #include <iostream>
    using namespace std;

    int main() {
        cout << "Hello, World!" << endl;
        return 0;
    }`,

    java: `
    // Java: Hello World Program
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`,

    python: `
    # Python: Hello World Program
    print("Hello, World!")`,

    javascript: `
    // JavaScript: Hello World Program
    console.log("Hello, World!");`,
  };

  // State for the selected language and its corresponding code
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode["cpp"]);

  // Handle language change and update the code editor content
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
  };

  const renderTabContent = () => {
    if (activeTab == "Input") {
      return (
        <textarea
          className="w-full rounded-lg p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
          placeholder="Enter test case input here..."
        />
      );
    }
    else if(activeTab=="Output")
    {
      return(
        <textarea
        className="w-full rounded-lg p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
        placeholder="Output appear here..."
      />
      )
    }
    else if(activeTab=="Verdict")
    {
      return(
        <textarea
        className="w-full rounded-lg p-4 mt-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg transition-all placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
        placeholder="Verdict will apperar here..."
      />
      )
    }
  };

  // Language options for the dropdown menu
  const languageOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
  ];

  // Define themes
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

  const currentTheme = themes[theme] || themes.dark; // Default to dark theme

  return (
    <div>
      <div
        className={`rounded-lg border shadow-lg overflow-hidden h-[70vh] ${currentTheme.container}`}
      >
        {/* Header Section */}
        <div
          className={`h-16 w-full flex items-center px-4 rounded-t-md relative ${currentTheme.header}`}
        >
          {/* Language Selector */}
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={`rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-400 transition-all ${currentTheme.dropdown}`}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Button Container */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-6">
            {/* Reset Button */}
            <button
              onClick={() => setCode(defaultCode[selectedLanguage])}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.buttonReset}`}
            >
              <FaRedoAlt className="text-lg" />
              <span className="text-sm">Reset</span>
            </button>

            {/* Format Button */}
            <button
              onClick={() => {
                try {
                  const formattedCode = formatCode(code, selectedLanguage);
                  setCode(formattedCode);
                } catch (err) {
                  alert("Formatting failed. Ensure code is valid.");
                }
              }}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 ${currentTheme.buttonFormat}`}
            >
              <MdFormatAlignLeft className="text-lg" />
              <span className="text-sm">Format</span>
            </button>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="rounded-b-md w-full h-full">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-full rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner ${currentTheme.editor}`}
            placeholder="Write your code here..."
          />
        </div>
      </div>
      <div className="mt-3 h-[25vh] rounded-lg border shadow-lg overflow-auto">
        <div
          className={`flex justify-between items-center px-4 py-2 ${currentTheme.header}`}
        >
          <h2 className="font-semibold">Test Cases</h2>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.buttonReset}`}
              onClick={() => alert("Running test cases...")}
            >
              Run
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 ${currentTheme.buttonFormat}`}
              onClick={() => alert("Submitting test cases...")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex gap-4 px-4 py-2">
          <button
            className={`px-4 py-2 rounded-lg  ${activeTab === "Input" ? "bg-green-600" : "bg-green-500"} bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none`}
            onClick={() => setactiveTab("Input")}
          >
            Input
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "Output" ? "bg-blue-600" : "bg-blue-500"} text-white font-semibold hover:bg-blue-600 focus:outline-none`}
            onClick={() => setactiveTab("Output")}
          >
            Output
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab==="Verdict" ? "bg-red-600" : "bg-red-500"} text-white font-semibold hover:bg-red-600 focus:outline-none`}
            onClick={() => setactiveTab("Verdict")}
          >
            Verdict
          </button>
        </div>
        <div className="p-2">
         {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const formatCode = (code, language) => {
  // Mock implementation: Trim leading/trailing spaces
  return code.trim();
};

export default Playground;
