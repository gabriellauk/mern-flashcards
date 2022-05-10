import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const Login = (props) => {
  const isEmpty = (value) => value.trim() === "";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    let errors = {};

    if (isEmpty(form.username)) {
      errors.username = "Username is required";
    }

    if (isEmpty(form.password)) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (validate(form)) {
      try {
        await AuthService.login(form.username, form.password);
        props.onLoggedIn();
      } catch {
        setMessage("Username and/or password is not valid");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-12 ">
          <section className="row">
            <h2 className="display-5 text-white">
              Welcome to Flashcards, an online learning tool to help you
              memorise new concepts.
            </h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  className="form-control-lg w-50"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => updateForm({ username: e.target.value })}
                  autoFocus={true}
                />
              </div>
              {formErrors.username && (
                <div className="text-warning ms-1">{formErrors.username}</div>
              )}
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  className="form-control-lg w-50"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
                {formErrors.password && (
                  <div className="text-warning ms-1">{formErrors.password}</div>
                )}
              </div>
              <div className="form-group py-4">
                <button className="btn btn-dark px-3 fs-3" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Sign In</span>
                </button>
              </div>
            </form>

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

        <div className="col-sm d-none d-lg-block">
          <i className="bi bi-lightning-fill fa-10x lightning-large"></i>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
