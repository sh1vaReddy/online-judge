import { useState, useEffect, useRef } from "react";
import { FaCode } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { server } from "../../constants/config";

const Submission = () => {
  const [showModel, setshowModel] = useState(false);
  const [code, setcode] = useState(null);
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/submissions/problem/${id}`);
        const sortedSubmissions = response.data.submissions.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubmissions(sortedSubmissions);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [id]);

  const handleViewCode = (code) => {
    setcode(code);
    setshowModel(true);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setshowModel(false); 
    }
  };

  useEffect(() => {
    if (showModel) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, [showModel]);

  const getStatusColor = (status) => {
    return status === "Accepted" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="flex-grow dark:bg-gray-900 flex">
      <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 w-full max-w-4xl">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-sm font-extrabold  uppercase">Status</th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">Language</th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">Runtime</th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">Memory</th>
              <th className="px-6 py-4 text-sm font-semibold uppercase">Code</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No submissions found.
                </td>
              </tr>
            ) : (
              submissions.map((submission, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                >
                  <td className={`px-6 py-4 ${getStatusColor(submission.status)}`}>
                    {submission.status || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {submission.language || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {submission.execution_time || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {submission.memory || "N/A"}
                  </td>
                  <td
                    className="px-6 py-4 text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
                    onClick={() => handleViewCode(submission.code)}
                  >
                    <FaCode size={20} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative"
          >
            <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Code Snippet
            </h1>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm text-gray-800 dark:text-gray-300 overflow-auto">
              {code}
            </pre>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => setshowModel(false)}
            >
              <RxCross2 className="font-bold text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submission;
