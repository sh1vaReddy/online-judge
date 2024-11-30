import { useState } from "react";
import axios from "axios";

const ProblemDelete = () => {
  const [ProblemTitle, setProblemTitle] = useState("");
  const delteproblem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/problems`,
        {
          data: { title: ProblemTitle },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An  Error Occured While deleteint the Problem>.."
      );
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Delete Problem</h1>
          <label className="block text-lg font-medium">
            Problem Title Or Name:
          </label>
          <input
            type="text"
            onChange={(e) => setProblemTitle(e.target.value)}
            className="w-full mt-3 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none"
          />
          <button
            className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 font-semibold"
            onClick={delteproblem}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProblemDelete;
