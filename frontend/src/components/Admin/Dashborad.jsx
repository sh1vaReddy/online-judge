import Charts from "./Charts";
import Silderbar from "./Silderbar";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen flex h-screen">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg">
          <Silderbar />
        </div>
        <div className=" flex-grow bg-gray-100 dark:bg-gray-800 p-8">
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to the Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is the main content area. Use this space to display charts, tables, or other useful information.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Total Users</h2>
                <p className="text-4xl font-semibold mt-2">1,250</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Active Contests</h2>
                <p className="text-4xl font-semibold mt-2">25</p>
              </div>

              <div className="bg-red-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Pending Issues</h2>
                <p className="text-4xl font-semibold mt-2">5</p>
              </div>
            </div>
            <Charts/>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
