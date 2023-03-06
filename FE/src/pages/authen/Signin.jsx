import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./authen.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  // handle login error when calling apis
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

    return formIsValid;
  };

  const signinSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
          email,
          password,
        })
        .then((res) => {
          const token = res.data;
          localStorage.setItem(
            "user",
            JSON.stringify({
              access_token: token.accessToken,
              refresh_token: token.refreshToken,
            })
          );
          navigate("/");
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
                  Sign in
                </h4>
              </div>
              <div className="card-body">
                <form
                  method="post"
                  className="text-start"
                  id="loginform"
                  onSubmit={signinSubmit}
                >
                  <div className="input-group input-group-static mb-4">
                    <label className="label-text">Email</label>
                    <input
                      name="email"
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
                      name="password"
                      type="password"
                      className="form-control"
                      id="pwd_login"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>

                  {/* TODO: handle submit */}
                  <div className="col itext-center">
                    <button
                      type="submit"
                      className="btn signin-btn w-100 mt-3 mb-0 text-white"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer pt-0 px-lg-2 px-1">
                <div className="mb-4 text-sm mx-auto">
                  <Link
                    to="/signup"
                    className="signup-text text-primary font-weight-bold"
                  >
                    Create account
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

export default Signin;
