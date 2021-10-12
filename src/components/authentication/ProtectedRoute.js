import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = (props) => {
  const { currentUser } = useAuth();
  console.log("IN Protected Route", currentUser);
  return currentUser ? <Route {...props} /> : <Redirect to="/Login" />;
};

export default ProtectedRoute;
