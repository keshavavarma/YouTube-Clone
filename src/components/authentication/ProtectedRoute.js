import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = (props) => {
  const { currentUser } = useAuth();
  return currentUser ? <Route {...props} /> : <Redirect to="/Login" />;
};

export default ProtectedRoute;
