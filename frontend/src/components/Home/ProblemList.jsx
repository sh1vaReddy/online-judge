import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from '../../constants/config';
import Pagination from "react-js-pagination";

const ProblemList = () => {
  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [problemData, setProblemData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(0);
 

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallproblems?page=${page}&keyword=${searchTerm}`);
        setProblemData(response.data.problems);
        setTotalItems(response.data.filterProblemCount || 0); 
        setResultsPerPage(response.data.resultsPerPage || 0);
    
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchProblems();
  }, [page, searchTerm]);

  const handleRowClick = (id) => {
    nav(`/problem/${id}`);
  };

  const handleSearchChange = (pageNumber) => {
    setPage(pageNumber);
  };

  let count=totalItems;

  return (
    <div className="h-full dark:bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Problem List</h2>

      <div className="mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Search Problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="px-4 py-2 dark:text-gray-100">Problem Number</th>
            <th className="px-4 py-2 dark:text-gray-100">Title</th>
            <th className="px-4 py-2 dark:text-gray-100">Difficulty</th>
            <th className="px-4 py-2 dark:text-gray-100">Tags</th>
          </tr>
        </thead>
        <tbody>
          {problemData.map((problem) => (
            <tr
              key={problem._id} 
              className="border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleRowClick(problem._id)}
            >
              <td className="px-4 py-2 dark:text-gray-100">{problem.problem_id}</td>
              <td className="px-4 py-2 dark:text-gray-100">{problem.title}</td>
              <td
                className={`px-4 py-2 ${
                  problem.difficulty === "Easy"
                    ? "text-green-500"
                    : problem.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {problem.difficulty}
              </td>
              <td
                className={`px-4 py-2 ${
                  problem.status === "Solved"
                    ? "text-green-500"
                    : problem.status === "Unsolved"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {problem.tags}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        {resultsPerPage < count && (
          <Pagination
            activePage={page}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={totalItems}
            onChange={handleSearchChange}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            linkClass="page-link"
            innerClass="pagination flex justify-center space-x-2"
            itemClass="px-3 py-1 border rounded dark:border-gray-700 dark:text-white"
            activeClass="bg-blue-500 text-white"
            activeLinkClass="text-white"
          />
        )}
      </div>
    </div>
  );
};

export default ProblemList;
