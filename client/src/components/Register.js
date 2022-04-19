import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div class="col-lg-6 col-md-12 ">
          <section className="row gy-4 mt-0">
            <h2 className="display-5 text-white py-2">
              Register today to speed up your learning.
            </h2>

            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"></label>
                    <Input
                      type="text"
                      className="form-control-lg w-50"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"></label>
                    <Input
                      type="text"
                      className="form-control-lg w-50"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
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
                      validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group py-4">
                    <button className="btn btn-dark px-3 fs-3">Sign Up</button>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>

            <span className="text-white">Already got an account? </span>
            <Link to={"/login"} className="link-light">
              Log in here
            </Link>
          </section>
        </div>

        <div class="col-sm">
          <i class="bi bi-lightning-fill fa-10x lightning-large"></i>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
