import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import { useEffect, useState } from "react";

const Assignment = () => {
  const [Problemlist, setProblemlist] = useState([]);
  const [contestName, setContestName] = useState("");
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getcontest/${id}`);
        setProblemlist(response.data.contest.problems || []);
        setContestName(response.data.contest.name);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, [id]);

  const hendleopenproblem=(id)=>{
    navigate(`/Contest/problem/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Contest Name */}
      <div className="flex p-8 justify-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{contestName}</h1>
      </div>

      {/* Problems Table */}
      <div className="flex justify-center p-6 w-full">
        <table className=" table-auto w-3/4 border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-gray-100">S.no</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Title</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Difficulty</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-gray-100">Tags</th>
            </tr>
          </thead>
          <tbody>
            {Problemlist.length > 0 ? (
              Problemlist.map((problem, index) => (
                <tr
                  key={problem._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-800 odd:bg-white dark:odd:bg-gray-900"
                  onClick={()=>hendleopenproblem(problem._id)}
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">{index + 1}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">{problem.title}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">{problem.difficulty}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-100">{problem.tags.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-900 dark:text-gray-100">
                  No problems available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
