import { useRef, useState } from "react";
import "./Register.css";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignIn } = useAuth();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const googleHandler = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="form_container">
      <form className="registration_form" onSubmit={submitHandler}>
        <h2 className="form_title">Login</h2>
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError("");
            }}
          >
            {error}
          </Alert>
        )}
        <input
          ref={emailRef}
          className="inputfield"
          type="email"
          placeholder="Email"
          onChange={(e) => (emailRef.current.value = e.target.value)}
        />

        <input
          ref={passwordRef}
          className="inputfield"
          type="password"
          placeholder="Password"
          onChange={(e) => (passwordRef.current.value = e.target.value)}
        />
        <button disabled={loading} className="register_button" type="submit">
          {loading ? <CircularProgress color="inherit" /> : "Login"}
        </button>
        <button
          disabled={loading}
          className="register_button_google"
          onClick={googleHandler}
        >
          <GoogleIcon />
          <span>Login</span>
        </button>
        <p>
          Don't have an Account?<Link to="/Register"> Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
