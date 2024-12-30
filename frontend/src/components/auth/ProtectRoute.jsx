import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ children, user,role,requirerole, redirect = '/login' }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  if(requirerole && role != requirerole)
  {
    return <Navigate to='/problem'/>
  }
  return children ? children : <Outlet />;
};

export default ProtectRoute;
