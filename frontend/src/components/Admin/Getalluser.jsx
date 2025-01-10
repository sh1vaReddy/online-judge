import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("all");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallusers`, {
          withCredentials: true,
        });
        setUsers(response.data.user || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllUsers();
  }, []);

  const handleFilterChange = (event) => {
    setFilterUser(event.target.value);
  };


  const filteredUsers =
    filterUser === "all"
      ? users
      : users.filter((user) => user.role.toLowerCase() === filterUser);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="flex justify-center mt-8 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Users
      </h1>

      <div className="flex flex-col items-center mt-10">
        <div className="w-full max-w-6xl p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="mb-6">
            <label htmlFor="status-filter" className="mr-2 font-medium">
              Filter by Role:
            </label>
            <select
              id="status-filter"
              value={filterUser}
              onChange={handleFilterChange}
              className="border border-gray-300 px-4 py-2 rounded-lg"
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white rounded-md">
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-indigo-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-md text-gray-800 dark:text-gray-200">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 dark:text-gray-200">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 dark:text-gray-200">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 dark:text-gray-200">
                      {new Date(user.join_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllUser;
