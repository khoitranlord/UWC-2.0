import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./authen.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      formIsValid = false;
      setEmailError("Email Not Valid");
      return false;
    } else {
      setEmailError("");
      formIsValid = true;
    }

    if (!password.match(/^.{6,}$/)) {
      formIsValid = false;
      setpasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    if (!confirmPassword.match(/^.{6,}$/)) {
      formIsValid = false;
      setConfirmPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setConfirmPasswordError("");
      formIsValid = true;
    }

    // check if password is the same as confirmPassword
    if (confirmPassword !== password) {
      formIsValid = false;
      setConfirmPasswordError("Confirm password does not match with password");
      return false;
    } else {
      setConfirmPasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          navigate("/signin");
        })
        .catch((err) => {
          console.log({ err });
          setErrorMessage(err.response.data.message);
        });
    }
  };

  const hidePopup = () => {
    let closebtn = document.querySelector(".closebtn");
    return (closebtn.parentElement.style.display = "none");
  };

  return (
    <div className="App">
      {errorMessage && (
        <div className="alert text-center">
          <span className="closebtn" onClick={hidePopup}>
            &times;
          </span>
          {errorMessage}
        </div>
      )}
      <div className="container mb-4">
        <div className="row mt-lg-n12 mt-md-n12 mt-n12 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card mt-8">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <h4 className="authen-title-text font-weight-bolder mt-1">
                  Sign up
                </h4>
              </div>
              <div className="card-body">
                <form
                  method="post"
                  className="text-start"
                  id="loginform"
                  onSubmit={signupSubmit}
                >
                  <div className="input-group input-group-static mb-4">
                    <label className="label-text">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {emailError}
                    </small>
                  </div>
                  <div className="input-group input-group-static mb-4">
                    <label className="label-text">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd_login"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>
                  <div className="input-group input-group-static mb-4">
                    <label className="label-text">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd_login"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {confirmPasswordError}
                    </small>
                  </div>

                  <div className="col itext-center">
                    <button
                      type="submit"
                      className="btn signin-btn w-100 mt-3 mb-0 text-white"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer pt-0 px-lg-2 px-1">
                <div className="mb-4 text-sm mx-auto">
                  <Link
                    to="/signin"
                    className="signin-text text-primary font-weight-bold"
                  >
                    Already have an account? Sign in.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
