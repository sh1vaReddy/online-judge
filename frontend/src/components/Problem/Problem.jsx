import { GrNotes } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";

const Problem = () => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900 shadow-lg overflow-hidden h-full">
      {/* Navigation Tabs */}
      <div className="h-16 bg-gray-800 flex items-center px-4 rounded-t-md">
        <nav className="flex space-x-16">
          <button className="text-white font-semibold text-lg hover:text-indigo-400 transition flex items-center space-x-2">
            <GrNotes className="text-white" />
            <span>Description</span>
          </button>
          <button className="text-white font-semibold text-lg hover:text-indigo-400 transition flex items-center space-x-2">
            <FaRegMessage />
            <span>Discussion</span>
          </button>
          <button className="text-white font-semibold text-lg hover:text-indigo-400 transition flex items-center space-x-2">
            <IoIosTimer className="text-2xl" />
            <span>Submissions</span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="p-6 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Problem Title</h2>
        <p className="text-gray-300 leading-relaxed">
          Welcome to the problem-solving platform! Select a tab to view the
          problem description, engage in discussions, or check your submissions.
        </p>
      </div>
    </div>
  );
};

export default Problem;
