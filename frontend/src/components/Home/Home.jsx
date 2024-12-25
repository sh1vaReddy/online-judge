import { useContext } from "react";
import { ThemeContext } from '../../ThemeContext';

// Placeholder components
import ProblemList from './ProblemList';
import Calendar from './Calendar';
import Leaderboard from './Leaderboard';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-center text-4xl p-5">Welcome to Code Master</h1>

      {/* Main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
        {/* Left side: Problem List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 lg:col-span-2 " >
          <ProblemList />
        </div>

        {/* Right side: Calendar and Leaderboard */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
            <Calendar />
          </div>

          {/* Leaderboard */}
          <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-lg p-5">
            <h2 className="text-2xl mb-4">Leaderboard</h2>
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
