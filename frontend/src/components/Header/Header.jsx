import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import compiler from "../../assets/compiler.png";
import { ThemeContext } from "../../ThemeContext";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { isAdmin, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (location.pathname === "/login") return null;

  // Array of menu items
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Problems", to: "/problem" },
    { label: "Contest", to: "/contest" },
    { label: "Compiler", to: "/compiler" },
    {label:"Contact",to:"/Conatct"},
  ];
  if(isAdmin)
  {
    menuItems.push({label:"Admin",to:'/admin/dashboard'})
  }

  if(!isAuthenticated)
{
  menuItems.push({label:"Login",to:'/login'})
}
  return (
    <nav className="bg-gray-100 shadow-md dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={compiler} alt="Flowbite Logo" className="mr-3 h-6 sm:h-9" />
          <span className="text-xl font-semibold dark:text-white">
            Code Master
          </span>
        </Link>

        <div className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          {/* Loop through menuItems array */}
          {menuItems.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.to}
                className={`text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-md dark:text-white dark:hover:bg-gray-700 text-lg ${
                  item.current
                    ? "bg-primary-700 text-white"
                    : "hover:text-primary-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && <Profile />}

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="block w-14 h-8 bg-gray-300 rounded-full"></span>
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                theme === "dark" ? "translate-x-6" : ""
              }`}
            ></span>
          </label>
          <button
            onClick={toggleMenu}
            type="button"
            className="lg:hidden p-2 text-gray-500 rounded-lg focus:outline-none"
            aria-controls="mobile-menu-2"
            aria-expanded={menuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${menuOpen ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${menuOpen ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}
        id="mobile-menu-2"
      >
        <ul className="flex flex-col space-y-4 py-4 bg-gray-100">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`block py-2 px-4 ${
                  item.current
                    ? "bg-primary-700 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
