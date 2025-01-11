import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";
import Contest from "../../assets/delete.webp";
import { toast } from "react-toastify";

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
      const response = await axios.delete(
        `${server}/api/v1/delete/contets/${contestId}`,{
          withCredentials:true
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setContests(contests.filter((contest) => contest._id !== contestId));
      } else {
        toast.error("Failed to delete contest: " + response.data.message);
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
            We couldn't find any contests at the moment. Check back later for
            updates or new events!
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
      <div className="max-w-6xl mx-auto py-12 px-6">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Participants</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{contest.name}</td>
                <td
                  className={`px-6 py-4 ${
                    contest.startTime ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {contest.startTime
                    ? new Date(contest.startTime).toLocaleString()
                    : "Not Set"}
                </td>
                <td
                  className={`px-6 py-4 ${
                    contest.endTime ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {contest.endTime
                    ? new Date(contest.endTime).toLocaleString()
                    : "Not Set"}
                </td>
                <td className="px-6 py-4">
                  {contest.participants?.length || 0}
                </td>
                <td
                  className={`px-6 py-4 ${
                    contest.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {contest.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4">
                  {contest.description || "No Description"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteContest(contest._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteContest;
