import { useRef, useState } from "react";
import "./Register.css";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { updateProfile } from "@firebase/auth";
import { db } from "../../firebase";
import {
  collection,
  query,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const nameRef = useRef();
  const { signup, currentUser } = useAuth();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (nameRef.current.value.length === 0) {
      return setError("Name is Required");
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords Don't Match");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const user = auth.currentUser;
      createUser(user.uid);
      updateProfile(user, {
        displayName: nameRef.current.value,
      });
      setSuccess("Account Created Successfully");
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const createUser = async (id) => {
    const newUser = await addDoc(collection(db, "users"), {
      userID: id,
    });
  };

  return (
    <div className="form_container">
      <form className="registration_form" onSubmit={submitHandler}>
        <h2 className="form_title">Register</h2>
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
        {success && (
          <Alert
            severity="success"
            onClose={() => {
              setSuccess("");
            }}
          >
            {success}
          </Alert>
        )}
        <input
          ref={nameRef}
          className="inputfield"
          type="text"
          placeholder="Name"
          onChange={(e) => (nameRef.current.value = e.target.value)}
        />

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
        <input
          ref={passwordConfirmationRef}
          className="inputfield"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            (passwordConfirmationRef.current.value = e.target.value)
          }
        />
        <button disabled={loading} className="register_button" type="submit">
          {loading ? <CircularProgress color="inherit" /> : "Register"}
        </button>
        <p>
          Have an Account? <Link to="/Login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
