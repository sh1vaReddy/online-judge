import Playground from "./Playground";
import Problem from "./Problem";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";



const Editor = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);


  return (
      <div className={`h-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <PanelGroup direction="horizontal" className="h-full">
        <div className="flex  h-screen">
          <Panel defaultSize={45} minSize={20} maxSize={60}>
          <div className="p-3 h-full">
          <Problem theme={theme} />
        </div>
          </Panel>
          <PanelResizeHandle
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#ddd", 
            width: "8px", 
            cursor: "ew-resize", 
          }}
        />
          <Panel defaultSize={55}  minSize={30} maxSize={65}>
          <div className="p-3 h-full bg-gray-50 rounded-md dark:bg-gray-900">
          <Playground theme={theme} />
        </div>
          </Panel>
      </div>
        </PanelGroup>
    </div>

  );
};

export default Editor;