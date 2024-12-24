import Playground from "./Playground";
import Problem from "./Problem";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const ContestProblem = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className={`h-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
          >
          </button>
        </div>
  
        {/* Main Content */}
        <div className="flex  h-screen">
          <div className="w-1/2 p-3 h-full">
            <Problem theme={theme} />
          </div>
          <div className="w-1/2 p-3 h-full bg-gray-50 rounded-md dark:bg-gray-900">
            <Playground theme={theme} />
          </div>
        </div>
      </div>
  )
}

export default ContestProblem