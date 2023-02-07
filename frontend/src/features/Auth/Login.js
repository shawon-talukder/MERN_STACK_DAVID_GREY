import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  //dynamic class
  const errClass = errMsg ? "errMsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  // handlers
  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server Response!");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password!");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized!");
      } else {
        setErrMsg(err?.data?.message);
      }
      errRef.current.focus();
    }
  };

  //main content of the file
  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back To Home</Link>
      </footer>
    </section>
  );
  return content;
};

export default Login;
