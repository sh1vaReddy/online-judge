import { useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";

const Playground = () => {
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

  // Language options for the dropdown menu
  const languageOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
  ];

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-100 shadow-lg overflow-hidden h-full">
      {/* Header Section */}
      <div className="h-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 w-full flex items-center px-4 rounded-t-md relative">
        {/* Language Selector */}
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white border-2 border-gray-500 rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-400 transition-all"
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
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <MdFormatAlignLeft className="text-lg" />
            <span className="text-sm">Format</span>
          </button>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="bg-gray-900 h-screen rounded-b-md ">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)} // Allow editing in the text area
          className="w-full h-full bg-gray-800 text-white border-2 border-gray-600 rounded-md p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner"
          placeholder="Write your code here..."
        />
      </div>
    </div>
  );
};

const formatCode = (code, language) => {
  // Mock implementation: Trim leading/trailing spaces
  return code.trim();
};

export default Playground;
