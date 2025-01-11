import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { userNotExists } from "../../redux/reducers/authslice";
import axios from "axios";
import { server } from "../../constants/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      dispatch(userNotExists());
      nav("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleOpenProfile = () => {
    nav("/profile");
  };

  const handleOpenAdmin = () => {
    if (isAdmin) {
      nav("/admin/dashboard");
    }
  };

  const Options = [
    { icon: <CiLogin size={28} />, name: "Log out", func: handleLogout },
    { icon: <IoPersonCircle size={28} />, name: "Profile", func: handleOpenProfile },
    ...(isAdmin
      ? [{ icon: <MdOutlineSpaceDashboard size={28} />, name: "Dashboard", func: handleOpenAdmin }]
      : []),
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ position: "absolute", top: 8, right: 20 }}
        open={open}
        direction="down"
      >
        {Options.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.func}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default Profile;
