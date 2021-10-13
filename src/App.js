import "./_app.scss";
import HomeScreen from "./screens/homescreen/HomeScreen";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import SearchScreen from "./screens/searchScreen/SearchScreen";

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
          <ProtectedRoute exact path="/watch/:id">
            <Layout>
              <WatchScreen />
            </Layout>
          </ProtectedRoute>
          <ProtectedRoute exact path="/search/:query">
            <Layout>
              <SearchScreen />
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
