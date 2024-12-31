import { useState, useContext } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";
import { ThemeContext } from "../../ThemeContext";
import axios from "axios";
import { FaPlay } from "react-icons/fa";

const Compiler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode["cpp"]);
  const [output, setOutput] = useState("");
  const [Input, setInput] = useState("");

  const formatCode = (code, language) => {
    return code.trim();
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
  };

  const handleRun = async () => {
    const response = await axios.post(`http://localhost:8080/compile`, {
      language: selectedLanguage,
      code: code,
      Input,
    });
    setOutput(response.data.output);
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

  const currentTheme = themes[theme];

  return (
    <div
      className={`rounded-lg border shadow-lg overflow-hidden h-full ${currentTheme.container}`}
    >
      <div
        className={`h-16 w-full flex items-center px-4 rounded-t-md relative ${currentTheme.header}`}
      >
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

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-6">
          <button
            onClick={handleRun}
            className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.buttonReset}`}
          >
            <FaPlay className="text-lg" />
            <span className="text-sm">Run</span>
          </button>
          <button
            onClick={() => setCode(defaultCode[selectedLanguage])}
            className={`flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.buttonReset}`}
          >
            <FaRedoAlt className="text-lg" />
            <span className="text-sm">Reset</span>
          </button>

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

      {/* Main Content Section */}
      <div className="flex h-[calc(103.5vh-10rem)]">
        {/* Code Editor Section */}
        <div className="w-3/4 p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`h-full w-full rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner ${currentTheme.editor}`}
            placeholder="Write your code here..."
            style={{ height: "100%" }}
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col w-1/2 p-4 h-full">
          {/* Input Section */}
          <div
            className={`flex justify-between items-center px-4 py-2 rounded-t-md ${currentTheme.editor}`}
          >
            <h2 className="text-lg font-semibold">Input</h2>
            <button
              onClick={() => setInput("")}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 shadow"
            >
              Clear
            </button>
          </div>
          <textarea
            value={Input}
            onChange={(e) => setInput(e.target.value)}
            className={`h-[calc(47%-2.5rem)] w-full rounded-b-md px-4 py-2 resize-none shadow-inner ${currentTheme.editor} mb-4`}
            placeholder="Enter your input here..."
          />

          {/* Output Section */}
          <div
            className={`flex justify-between items-center px-4 py-2 rounded-t-md ${currentTheme.editor}`}
          >
            <h2 className="text-lg font-semibold">Output</h2>
            <button
              onClick={() => setOutput("")}
              className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 transition duration-300 shadow"
            >
              Clear
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className={`h-[calc(47%-2.5rem)] w-full rounded-b-md px-4 py-2 resize-none shadow-inner ${currentTheme.editor}`}
            placeholder="Program output will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
