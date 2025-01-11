import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";
import Contest from '../../assets/Contrest.avif';

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
        <div className="text-center bg-white shadow-2xl rounded-lg p-10 max-w-xl mx-auto border border-gray-200">
          <div className="mb-8">
            <img
              src={Contest} // Replace with a proper image or illustration path
              alt="No Contests"
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            No Active Contests Available
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            We couldn't find any contests at the moment. Check back later for
            updates or new events. Stay tuned for upcoming opportunities!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Refresh
          </button>
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
