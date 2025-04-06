// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return <div className="text-center mt-5">Loading...</div>; 
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;













import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

