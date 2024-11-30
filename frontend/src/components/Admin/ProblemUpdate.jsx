const ProblemUpdate = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Update Problem</h1>
        <div className="mb-4">
          <label className="p-2 block text-xl font-semibold">Description</label>
          <textarea
            className="w-full mt-2 border p-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
            rows="4"
            placeholder="Describe the problem statement in detail"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="p-2 text-xl font-semibold">Difficulty</label>
          <select className="w-full mt-2 p-2 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 focus:outline-none">
            <option>Esay</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="p-2 text-xl font-semibold">Constraints</label>
          <textarea
            className="w-full mt-2 p-2 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="p-2 text-xl font-semibold">Tags</label>
          <input className="w-full mt-2 p-2 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-700   focus:outline-none" />
        </div>
        <div className="mb-6">
          <button
            className="w-full mt-2 px-6 py-3 font-semibold rounded-lg shadow-lg 
    bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 text-white 
    hover:from-gray-500 hover:via-gray-600 hover:to-gray-800
    transform hover:scale-105 transition-transform duration-300
    focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemUpdate;
