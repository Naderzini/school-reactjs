import React,{useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useFormik } from "formik";

function ForgetPassword() {
    const [loding,setLoding] = useState(false);
    const [error,setError] = useState("");

    const initialValues = {
      email: "",
    };
    const formik = useFormik({
      initialValues,
      onSubmit,
    });

      function onSubmit(values) {
        console.log(values)
        axios.post(`${process.env.REACT_APP_API_URL}/resetAdmin/password`,values) 
        .then((response) => {
          console.log(response);
            if (response.data.success === true) {
                swal("Mot de passe changé vérifier votre email", "", "success");
              }else{
                setError(response.data.message)
              }
        })
        .catch((err) => {
          console.log(err);
        });
      }
  return (
    <div>
        <div className="authincation h-100 mt-5">
<div className="container h-100">
  <div className="row justify-content-center h-100 align-items-center">
    <div className="col-md-6">
      <div className="authincation-content">
        <div className="row no-gutters">
          <div className="col-xl-12">
            <div className="auth-form">
              <div className="text-center ">
                <img src="images/avatar/logo.png"  alt />
              </div>
              <h3 className="text-center ml-1 mb-4">SCHOOL</h3>
              <h4 className="text-center mb-4">Réinitialiser le mot de passe</h4>
              <form  onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label><strong>Email</strong></label>
                  <input
                          type="email"
                          className="form-control mb-2"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}

                        />
                         {error &&<p style={{ color: "red", fontSize: "12px" }}>
                            {error}
                          </p>}
                </div>
                  <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block mt-3">Envoyer</button>
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
    </div>
  );
}

export default ForgetPassword;
