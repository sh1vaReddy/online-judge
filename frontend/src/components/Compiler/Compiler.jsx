import { useState, useContext } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";
import { ThemeContext } from "../../ThemeContext";
import Ouput from "./Ouput";

const Compiler = () => {
  // Access the theme and toggleTheme function from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Default code snippets for each language
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

  // Dummy function to simulate code formatting
  const formatCode = (code, language) => {
    return code.trim(); // Replace this with an actual formatting library if needed
  };

  // Handle language change and update the code editor content
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
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

  // Get the current theme styles based on the context value
  const currentTheme = themes[theme];

  return (
    <div
      className={`rounded-lg border shadow-lg overflow-hidden h-full ${currentTheme.container}`}
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
      <div className="rounded-b-md h-fit  py-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`h-full rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner ${currentTheme.editor}`}
          placeholder="Write your code here..."
          style={{ width: "100vw", height: "50vh" }}
        />
      </div>
      <div className="flex-grow h-[50vh] justify-between overflow-auto bg-gray-100 dark:bg-gray-800 rounded-md hover:outline hover:outline-indigo-500 hover:outline-2 focus:outline-indigo-500 focus:outline-2">
        <div
          className={`h-8 w-full flex items-center px-4 rounded-t-md relative ${currentTheme.header}`}
        >
          <h1 className="text-xl">Output</h1>
          {/* Move buttons to the right */}
          <div className="ml-auto flex gap-6">
            <button
              className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.buttonReset}`}
              onClick={() => alert("Running test cases...")}
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
