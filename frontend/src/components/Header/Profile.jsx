import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { userNotExists } from "../../redux/reducers/authslice";
import axios from "axios";
import { server } from "../../constants/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [opean, setOpen] = useState(false);
  const nav = useNavigate();
  const disaptch = useDispatch();


  const handlelogout = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      disaptch(userNotExists());
      nav("/login");
    } catch (error) {
      toast.error("Failed to Log out");
    }
  };

  const handleopenprofile = () =>
  {
      nav('/profile')
  }

  const Options = [
    { icon: <CiLogin size={28}/>, 
    name: "Log out",func:handlelogout}, 
    { icon: <IoPersonCircle size={28} />, name: "Profile",func:handleopenprofile},
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ position: "absolute", top:8,right:20 }}
        open={opean}
        style={{ color: "red" }}
        direction="down"
      >
        {Options.map((action) => (
          <SpeedDialAction 
          key={action.name} 
          icon={action.icon} 
          onClick={action.func}
          tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </>
  );
};

export default Profile;
