import "./_app.scss";
import HomeScreen from "./screens/homescreen/HomeScreen";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ProtectedRoute from "./components/authentication/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <ProtectedRoute exact path="/">
            <Layout>
              <HomeScreen />
            </Layout>
          </ProtectedRoute>
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
