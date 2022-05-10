import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const Register = () => {
  const isEmpty = (value) => value.trim() === "";

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    let errors = {};

    if (isEmpty(form.username)) {
      errors.username = "Username is required";
    }

    if (isEmpty(form.email)) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email address is invalid";
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (validate(form)) {
      try {
        const result = await AuthService.register(
          form.username,
          form.email,
          form.password
        );
        setMessage(result.message);
        setSuccessful(true);
      } catch (error) {
        const errorMessage = error.message || error.toString();
        setMessage(errorMessage);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-12 ">
          <section className="row">
            <h2 className="display-5 text-white py-2">
              Register today to speed up your learning.
            </h2>

            <form onSubmit={handleRegister}>
              {!successful && (
                <div>
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
                    {formErrors.username && (
                      <div className="text-warning ms-1">
                        {formErrors.username}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                      type="text"
                      className="form-control-lg w-50"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => updateForm({ email: e.target.value })}
                    />
                    {formErrors.email && (
                      <div className="text-warning ms-1">
                        {formErrors.email}
                      </div>
                    )}
                  </div>
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
                      <div className="text-warning ms-1">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <div className="form-group py-4">
                    <button className="btn btn-dark px-3 fs-3">Sign Up</button>
                  </div>
                </div>
              )}
            </form>

            <span className="text-white">Already got an account? </span>
            <Link to={"/"} className="link-light">
              Log in here
            </Link>
          </section>
        </div>

        <div className="col-sm d-none d-lg-block">
          <i className="bi bi-lightning-fill fa-10x lightning-large"></i>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
