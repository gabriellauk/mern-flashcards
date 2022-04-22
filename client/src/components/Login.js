import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.onLoggedIn();
          navigate("/welcome");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-12 ">
          <section className="row gy-4 mt-0">
            <h2 className="display-5 text-white py-2">
              Welcome to Flashcards, an online learning tool to help you
              memorise new concepts.
            </h2>

            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-group">
                <label htmlFor="username"></label>
                <Input
                  type="text"
                  className="form-control-lg w-50"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <Input
                  type="password"
                  className="form-control-lg w-50"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="form-group py-4">
                <button className="btn btn-dark px-3 fs-3" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Sign In</span>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>

            <span className="text-white">Not registered yet? </span>
            <Link to={"/register"} className="link-light">
              Sign up here
            </Link>

            <span className="text-white">
              Or try the demo... <br />
              username: <span className="fw-bold">demo</span> | password:{" "}
              <span className="fw-bold">letsgo</span>
            </span>
          </section>
        </div>

        <div className="col-sm">
          <i className="bi bi-lightning-fill fa-10x lightning-large"></i>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
