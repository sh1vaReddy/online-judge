import { useEffect, useState } from "react";
import { server } from "../../constants/config";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const GetAllIssues = () => {
  const [Issuelist, setIssuelist] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllIssues = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallcontact`);
        setIssuelist(response.data.data);
      } catch (error) {
        console.log("Error fetching issues", error);
      }
    };
    getAllIssues();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/admin/Issue/update/${id}`);
  };

  const handleFilterChange = (event) => {
    setFilteredStatus(event.target.value);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${server}/api/v1/deleteconatct/${id}`);
      setIssuelist(Issuelist.filter(issue => issue._id !== id));
      alert("Issue deleted successfully!");
    } catch (error) {
      console.log("Error deleting the issue", error);
      alert("Failed to delete the issue.");
    }
  };

  const filteredIssues =
    filteredStatus === "all"
      ? Issuelist
      : Issuelist.filter((issue) => issue.status.toLowerCase() === filteredStatus);

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Issue List</h1>

        <div className="mb-6">
          <label htmlFor="status-filter" className="mr-2 font-medium">Filter by Status:</label>
          <select
            id="status-filter"
            value={filteredStatus}
            onChange={handleFilterChange}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, index) => (
              <tr
                key={issue._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                }`}
                onClick={() => handleRowClick(issue._id)}
              >
                <td className="border border-gray-300 px-4 py-2">{issue.name}</td>
                <td className="border border-gray-300 px-4 py-2">{issue.email}</td>
                <td className="border border-gray-300 px-4 py-2">{issue.message}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    issue.status === "resolved"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }`}
                >
                  {issue.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-3xl flex space-x-2">
                  <MdDelete
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteClick(issue._id)}
                  />
                 
                </td>
                <td className="border border-gray-300 px-4 py-2 text-3xl flex space-x-2">
                <FaPencilAlt
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleRowClick(issue._id)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllIssues;
