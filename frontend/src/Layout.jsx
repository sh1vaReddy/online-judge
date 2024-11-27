import {Outlet} from 'react-router-dom';
import Header from './components/Header/Header';
import { useState, useEffect } from "react";

const Layout = () => {
  const [theme, setTheme] = useState("light");

  // Apply the theme globally
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
   <>
   <Header theme={theme} onToggleTheme={handleToggleTheme}/>
   <Outlet/>
   </>
  )
}

export default Layout