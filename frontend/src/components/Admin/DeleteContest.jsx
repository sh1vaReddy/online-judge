import  { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config"

const DeleteContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContests = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/getcontsetlist`,{
        withCredentials:true
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
    return <div className="text-center text-lg mt-10">Loading contests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold mt-10">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Contests</h1>
      {contests.length > 0 ? (
        <ul className="space-y-4">
          {contests.map((contest) => (
            <li
              key={contest._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-md"
            >
              <div>
                <h2 className="text-xl font-semibold">{contest.name}</h2>
                <p className="text-gray-600">{contest.description}</p>
              </div>
              <button
                onClick={() => deleteContest(contest._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No contests available.</p>
      )}
    </div>
  );
}

export default DeleteContest