import { useContext } from "react";
import { ThemeContext } from '../../ThemeContext'

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1>Welcome to Home Page</h1>
      <button
        className="bg-green-400 p-4 rounded-3xl mt-4"
        onClick={toggleTheme}
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default Home;
