import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";
import Contest from '../../assets/delete.webp'

const DeleteContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContests = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/getcontsetlist`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setContests(response.data.contests);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to load contests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteContest = async (contestId) => {
    try {
      const response = await axios.delete(`${server}/api/v1/contests/${contestId}`);
      if (response.data.success) {
        alert(response.data.message);
        setContests(contests.filter((contest) => contest._id !== contestId));
      } else {
        alert("Failed to delete contest: " + response.data.message);
      }
    } catch (err) {
      console.error("Error deleting contest:", err);
      alert("An error occurred while deleting the contest.");
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 animate-pulse">
            Loading contests...
          </p>
        </div>
      </div>
    );
  }

  if (error || contests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <div className="mb-6">
            <img
              src={Contest}
              alt="No Contests"
              className="w-40 h-40 mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Contests Available
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            We couldn't find any contests at the moment. Check back later for updates or new events!
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Manage Contests</h1>
        <p className="text-lg font-medium">
          View, manage, and delete contests effortlessly.
        </p>
      </header>
      <div className="max-w-4xl mx-auto py-12 px-6">
        {contests.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contests.map((contest) => (
              <li
                key={contest._id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {contest.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{contest.description}</p>
                </div>
                <button
                  onClick={() => deleteContest(contest._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Delete Contest
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No contests available.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteContest;
