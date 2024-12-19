import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { server } from "../../constants/config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userNotExists } from "../../redux/reducers/authslice";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const disaptch = useDispatch();

  const handleopenhome=()=>{
       navigate('/')
  }

   const handlelogout = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/logout`, {
          withCredentials: true,
        });
        toast.success(response.data.message);
        disaptch(userNotExists());
        navigate("/login");
      } catch (error) {
        toast.error("Failed to Log out");
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600">Member Since: {new Date(user.join_date).toLocaleDateString()}</p>
          <p className="text-gray-600 mt-2">Role: {user.role || "No bio available"}</p>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
           onClick={handleopenhome}
          >Go Back</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
           onClick={handlelogout}
          >Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
