import { useState } from "react";
import { useDeleteProblemMutation } from '../../redux/Problemapi';

const ProblemDelete = () => {
  const [ProblemTitle, setProblemTitle] = useState("");
  const [ProblemID, setProblemID] = useState("");  // Optional field for ID

  const [deleteProblem, { isLoading, isSuccess, isError }] = useDeleteProblemMutation();
  
  const handleDeleteProblem = async () => {
    if (!ProblemID && !ProblemTitle) {
      alert("Please provide either a problem ID or title.");
      return;
    }

    try {
      const problemData = {
        id: ProblemID || null,
        title: ProblemTitle || null,
      };
      await deleteProblem(problemData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Delete Problem</h1>
          <label className="block text-lg font-medium">Problem ID:</label>
          <input
            type="text"
            onChange={(e) => setProblemID(e.target.value)}
            className="w-full mt-3 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none"
          />
          <label className="block text-lg font-medium mt-4">Problem Title:</label>
          <input
            type="text"
            onChange={(e) => setProblemTitle(e.target.value)}
            className="w-full mt-3 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none"
          />
          
          <button
            className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 font-semibold"
            onClick={handleDeleteProblem}
            disabled={isLoading} 
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProblemDelete;
