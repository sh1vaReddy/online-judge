import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from '../../constants/config';

const ProblemList = () => {
  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ProblemData,setProblemData]=useState([]);
  useEffect(()=>{
    const fetchProblems=async()=>
    {
      try{
           const response=await axios.get(`${server}/api/v1/getallproblems`,{
            params:{page,serach:searchTerm}
           });
           setProblemData(response.data.problem);
      }
      catch(error)
      {
        console.log(error);    
      } 
    };
    fetchProblems();
  },[page,searchTerm]);


  const handleRowClick = (id) => {
    nav(`/problem/${id}`);
  };

  return (
    <div className='h-full dark:bg-gray-800 '>
      <h2 className="text-xl font-bold mb-4">Problem List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800 text-left">
            <th className="px-4 py-2 dark:text-gray-100">Problem Number</th>
            <th className="px-4 py-2 dark:text-gray-100">Title</th>
            <th className="px-4 py-2 dark:text-gray-100">Difficulty</th>
            <th className="px-4 py-2 dark:text-gray-100">Status</th> 
          </tr>
        </thead>
        <tbody>
          {ProblemData.map((problem) => (
            <tr
              key={problem.problem_id}
              className="border-b dark:border-gray-700"
              onClick={() => handleRowClick(problem._id)} 
            >
              <td className="px-4 py-2 dark:text-gray-100">{problem.problem_id}</td>
              <td className="px-4 py-2 dark:text-gray-100 ">{problem.title}</td>
              <td
                className={`px-4 py-2 ${
                  problem.difficulty === 'Easy'
                    ? 'text-green-500'
                    : problem.difficulty === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {problem.difficulty}
              </td>
              <td
                className={`px-4 py-2 ${
                  problem.status === 'Solved'
                    ? 'text-green-500'
                    : problem.status === 'Unsolved'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {problem.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
