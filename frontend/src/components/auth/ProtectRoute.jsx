import { Navigate } from "react-router-dom";

const ProtectRoute = ({ user, role, requirerole, redirect, children }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }
  if (requirerole && role !== requirerole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectRoute;
