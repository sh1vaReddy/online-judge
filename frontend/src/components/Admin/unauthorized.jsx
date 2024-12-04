

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center bg-white rounded-lg shadow-lg p-10 max-w-sm">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold mt-2 text-gray-800">Unauthorized</h2>
        <p className="mt-4 text-gray-600">
          You don't have permission to access this page.
        </p>
        <button
          className="mt-6 px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none"
          onClick={() => (window.location.href = "/home")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
