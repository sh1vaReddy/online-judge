import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { server } from "../../constants/config";
import axios from "axios";

const UpdateIssue = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState('Pending');
  
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getconatct/${id}`);
        setIssue(response.data.data); 
        setStatus(response.data.status); 
      } catch (error) {
        console.log("Error fetching the issue", error);
      }
    };

    fetchIssue();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${server}/api/v1/updateconatct/${id}`, { status });
      alert("Issue status updated successfully!");
      // Optionally redirect or fetch again
    } catch (error) {
      console.log("Error updating the issue", error);
      alert("Failed to update the issue status.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Issue</h1>
      {issue ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={issue.name || ""}
              readOnly
              className="border border-gray-300 p-2 w-full bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={issue.email || ""}
              readOnly
              className="border border-gray-300 p-2 w-full bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={issue.message || ""}
              readOnly
              className="border border-gray-300 p-2 w-full bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 p-2 w-full bg-gray-50"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Issue Status
          </button>
        </form>
      ) : (
        <p>Loading issue...</p>
      )}
    </div>
  );
};

export default UpdateIssue;
