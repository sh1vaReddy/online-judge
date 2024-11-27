import { useContext } from "react";
import { ThemeContext } from '../../ThemeContext'

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1>Wellcome to Code Master</h1>
    </div>
  );
};

export default Home;
