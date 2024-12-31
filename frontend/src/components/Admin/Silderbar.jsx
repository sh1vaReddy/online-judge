import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineEye} from 'react-icons/ai';
import { MdAutoDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

const Sidebar = () => {
  const menuItem = [
    {
      to: "/admin/problem/create",
      icon: <AiOutlinePlus size={30}/>,
      label: "Problem Creation",
    },
    {
      to: "/admin/problem/update",
      icon: <AiOutlineEdit size={30}/>,
      label: "Problem Update",
    },
    {
      to: "/admin/problem/delete",
      icon: <AiOutlineDelete size={30}/>,
      label: "Problem Delete",
    },
    {
        to:"/admin/create/contest",
        icon: <IoCreateOutline size={30}/>,
        label: "Create Contest",
        
    },
    {
        to: "/admin/contest/monitor",
        icon: <AiOutlineEye size={30}/>,
        label: "Monitor Contest",
      },
      {
        to: "/admin/contest/delete",
        icon: <MdAutoDelete  size={30}/>,
        label: "Delete Contest",
      },
  ];

  return (
    <div className="min-h-full w-full bg-gray-100 flex flex-col p-16 dark:bg-gray-800 ">
      {menuItem.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.to}
            className="text-gray-900 text-xl font-medium py-8 px-4 flex items-center transition duration-500 hover:text-tomato hover:scale-110 dark:text-gray-200"
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
