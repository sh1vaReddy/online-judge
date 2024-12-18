import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../constants/config";

const Contest = () => {
  const [contestList, setContestList] = useState([]);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contest List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Contest Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Start Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left">End Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left">No. of Participants</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {contestList.length > 0 ? (
            contestList.map((contest) => (
              <tr key={contest._id} className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white">
                <td className="border border-gray-300 px-4 py-2">{contest.name}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(contest.startTime).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(contest.endTime).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{contest.participants.length}</td>
                <td className="border border-gray-300 px-4 py-2">{contest.status}</td>
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
  );
};

export default Contest;
