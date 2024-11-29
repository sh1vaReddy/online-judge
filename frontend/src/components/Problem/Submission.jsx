import { useState } from "react";
import { FaCode } from "react-icons/fa6";

const Submission = () => {
  const [showModel, setshowModel] = useState(null);
  const [code, setcode] = useState(null);

  const sampleCode = `
  function example() {
    console.log("Hello, World!");
  }
    `;

  const handleViewCode = (code) => {
    setcode(code);
    setshowModel(true);
  };
  return (
    <div className="flex-grow  dark:bg-gray-900 flex">
      <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 w-full max-w-4xl">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">
                Language
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">
                Runtime
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">
                Memory
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                Accepted
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                JavaScript
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                50 ms
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                4.5 MB
              </td>
              <td className="px-6 py-4 text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={() => handleViewCode(sampleCode)}
              >
                <FaCode size={20}  />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {showModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <h1
            className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4"
            >Code Snippet</h1>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm text-gray-800 dark:text-gray-300 overflow-auto">
              {code}
            </pre>
            <button 
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => setshowModel(false)}>close</button>
          </div>
        
        </div>
      )}
    </div>
  );
};

export default Submission;
