import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";

const MonitoringContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallcontest`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setContests(response.data.contests);
        } else {
          setError(response.data.message || "Failed to fetch contests.");
        }
      } catch (err) {
        setError("Failed to load active contests.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading contests...</p>
        </div>
      </div>
    );
  }

  if (error || contests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="text-center bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Active Contests Are There
          </h2>
          <p className="text-gray-500">
            Check back later for upcoming contests or updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Active Contests
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <li
            key={contest._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{contest.name}</h2>
            <p className="text-gray-600">{contest.description}</p>
            <p className="text-sm text-gray-500">Status: {contest.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonitoringContest;
