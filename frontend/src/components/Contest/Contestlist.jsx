import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";
import  {useNavigate} from 'react-router-dom'

const Contestlist = () => {
  const [contestlist, setcontestlist] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchContestlist = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/user/contest`, {
          withCredentials: true,
        });
        setcontestlist(response.data.contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContestlist();
  }, []);

  const handleopenassginment = (contest) =>
  {
    if (contest.status === "active") {
        navigate(`/Assignment/${contest._id}`);
      } else {
        alert("contest is not at start.");
      }
  }

  return (
    <>
      <div className="flex justify-center overflow-x-auto dark:bg-gray-900 py-16">
        <table className="table-auto w-3/4 border-collapse border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg"
        >
          <thead className="dark:bg-gray-900">
            <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Contest Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Start Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                End Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {contestlist.length > 0 ? (
              contestlist.map((contest, index) => (
                <tr key={index} className="hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={()=>handleopenassginment(contest)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {contest.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contest.startTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contest.endTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        contest.status === "active"
                          ? "bg-green-200 text-green-800"
                          : contest.status === "deactive"
                          ? "bg-red-200 text-red-800"
                          : "bg-orange-200 text-orange-800"
                      }`}
                    >
                      {contest.status.charAt(0).toUpperCase() +
                        contest.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan="4">
                  No contests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contestlist;
