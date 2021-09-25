import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorSnackBar,
  showSnackBar,
} from "../../redux/action/snackActions";
import { loginUser } from "../../redux/action/employeeActions";
import { useHistory } from "react-router-dom";
import { SMALLLOGO } from "../../redux/types";

import { useFormik } from "formik";
import { loginValidation } from "../../validations/allValidations";
const styles = {
  logoContainer: {
    backgroundColor: "red",
  },
};
const Login = () => {
  const history = useHistory();
  const isLoading = useSelector((state) => state.util.spinner);
  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(
      loginUser(data, () => {
        history.push("/");
      })
    );
  };
  const handleForgot = async (data) => {
    history.push("/forgotpassword");
  };

  return (
    <div className="account-body accountbg">
      <div className="container">
        <div className="row vh-100">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg">
                <div className="card-body">
                  <div className="px-3">
                    {/* <div className="auth-logo-box">
                      <a
                        href="/"
                        className="logo logo-admin"
                        style={styles.logoContainer}
                      >
                        <img
                          src={SMALLLOGO}
                          height="55"
                          alt="logo"
                          className="auth-logo"
                        />
                      </a>
                    </div> */}
                    <div className="text-center auth-logo-text">
                      <h4 className="mt-0 mb-3 mt-5">Let's Get Started </h4>
                      <p className="text-muted mb-0">Sign in to continue</p>
                    </div>

                    <form
                      className="form-horizontal auth-form my-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="username">Mobile</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-user"></i>
                          </span>
                          <input
                            type="text"
                            placeholder="mobile"
                            className="form-control"
                            name="mobile"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                            disabled={isLoading}
                          />
                        </div>
                        {formik.errors.mobile && (
                          <div class="form-text-error">
                            {formik.errors.mobile || "Invalid mobile number"}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-lock"></i>
                          </span>

                          <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-4">
                        <div className="col-sm-12 text-right">
                          <button
                            type="button"
                            onClick={() => history.push("/forgotpassword")}
                            className="btn text-muted font-13"
                          >
                            <i className="dripicons-lock"></i>
                            Forgot password?
                          </button>
                        </div>
                      </div>

                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-2">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light"
                          >
                            {isLoading && (
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: "20px" }}
                              ></span>
                            )}
                            Log In
                            <i className="fas fa-sign-in-alt ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
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
