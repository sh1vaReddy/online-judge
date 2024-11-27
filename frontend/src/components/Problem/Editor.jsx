import Playground from "./Playground";
import Problem from "./Problem";
import { useContext } from "react";
import { ThemeContext } from '../../ThemeContext';

const Editor = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
       <div className="h-full bg-white dark:bg-gray-900 text-black dark:text-white relative">
      {/*<label className="inline-flex items-center cursor-pointer absolute top-4 right-4">
        <span className="mr-2">{theme === "dark" ? "Dark" : "Light"}</span>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="hidden"
        />
        <span className="relative">
          <span className="block w-14 h-8 bg-gray-300 rounded-full"></span>
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : ""}`}
          ></span>
        </span>
      </label>*/}
      <div className="flex h-screen">
        <div className="w-1/2  h-full">
          <Problem />
        </div>
        <div className="w-1/2  h-full">
          <Playground />
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default Editor;
