import React, { useState } from "react";
import { ADMIN, SUPER_ADMIN } from "../Constants";
import { connect } from "react-redux";
import axios from "axios";
import validate from "../tools/validateLogin";
import { userLogin } from "../redux/actions/user";
import { useFormik } from "formik";

function Login(props) {
  const { userLogin } = props;
  const [errorMsg, setErreurMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/loginAdmin`, values)
      .then((res) => {
        if (res.data.err) {
          setErreurMsg(res.data.err);
        } else {
          localStorage.setItem("token", res.data.token);
          userLogin(res.data.admin);
        }
        if (
          res.data.admin.role === ADMIN ||
          res.data.admin.role === SUPER_ADMIN
        ) {
          window.location.href = "/adminDashbord";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="authincation h-100 mt-5">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center">
                      <img src="images/avatar/logo.png" alt />
                    </div>
                    <h3 className="text-center ml-1 mb-4">SCHOOL</h3>
                    <h4 className="text-center mb-4">Connectez vous</h4>
                   {errorMsg &&<p style={{ color: "red", fontSize: "12px" }}>
                            {errorMsg}
                          </p>}
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          touched={formik.touched.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="mb-1">
                          <strong>Mot de Passe</strong>
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mot de Passe"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.password}
                        </p>
                      ) : null}
                      <div class="form-row d-flex justify-content-between mt-4 mb-2">
                               <div class="form-group">
                               <div class="custom-control custom-checkbox ml-1">
												</div>
                              </div>
                              <div class="form-group">
                                <a href="/forgetPassword">Mot de passe oublié</a>
                                </div>
                                </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mt-2"
                        >
                          Connecter
                        </button>
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
}
const mapStateToProps = (state) => ({
  admin: state.user.user,
});
const mapDispatchToProps = (dispatch) => ({
  userLogin: (admin) => dispatch(userLogin(admin)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
