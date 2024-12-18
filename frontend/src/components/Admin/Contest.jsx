import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../constants/config";
import { useNavigate } from "react-router-dom";

const Contest = () => {
  const [contestList, setContestList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallcontest`);
        setContestList(response.data.contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const handleclickAssignment = (contest) => {
    if (contest.status === "active") {
      navigate(`/Assignment/${contest._id}`);
    } else {
      alert("This contest is not active.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Contest List
        </h1>
      </div>
      <div className="overflow-x-auto dark:bg-gray-900">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg">
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
                No. of Participants
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {contestList.length > 0 ? (
              contestList.map((contest) => (
                <tr
                  key={contest._id}
                  className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white cursor-pointer dark:bg-gray-700 dark:text-gray-200 font-semibold"
                  onClick={() => handleclickAssignment(contest)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {contest.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(contest.startTime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(contest.endTime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contest.participants.length}
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
                <td colSpan="5" className="text-center p-4">
                  No contests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;
