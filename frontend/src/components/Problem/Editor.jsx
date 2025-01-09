import SplitPane from "react-split-pane";
import Playground from "./Playground";
import Problem from "./Problem";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const Editor = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="h-full">
      <SplitPane
        split="vertical"
        minSize={500}
        defaultSize="50%"
        resizerClassName="border-x-4 bg-gray-400 cursor-col-resize"
      >
        <div
          className={`h-full p-3 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <Problem theme={theme} />
        </div>
        <div
          className={`h-full p-3 bg-gray-50 ${
            theme === "dark" ? "dark:bg-gray-900" : ""
          }`}
        >
          <Playground theme={theme} />
        </div>
      </SplitPane>
    </div>
  );
};

export default Editor;
