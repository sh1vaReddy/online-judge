import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ children, user,role,requirerole, redirect = '/login' }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  if(requirerole && role != requirerole)
  {
    return <Navigate to='/unauthorized'/>
  }
  return <Outlet />;
};

export default ProtectRoute;
