import React from "react";
import { Modal, Button } from "react-bootstrap";
import validate from "../../tools/validateAdmin";
import axios from "axios";
import Input from "../inputs/Input";
import swal from "sweetalert";
import {CHANGE_PASSWORD} from "../../Constants"
import { useFormik } from "formik";

function ChangePassword(props) {
  const { handleClose, show ,currentUser} = props;

  const initialValues = {
    password: "",
    password1:"",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    console.log(formik.values.password)
    const password = formik.values.password;
  axios
      .post(
        `${process.env.REACT_APP_API_URL}${CHANGE_PASSWORD}${currentUser.id}`,
        {password},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          swal("Mot de passe changé", "", "success");
          window.setTimeout(() => {
            window.location.reload();
          }, 550);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Changer mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="card-body">
            <div className="form-group">
                <Input
                  label={"Mot de passe*"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Entrez votre mot de passe"}
                  handleChange={formik.handleChange}
                  values={formik.values.password}
                  errors={formik.errors.password}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.password}
                ></Input>
              </div>
              <div className="form-group">
                <Input
                  label={"Confirmer mot de passe*"}
                  type={"password"}
                  name={"password1"}
                  placeholder={"Entrez votre de passe"}
                  handleChange={formik.handleChange}
                  values={formik.values.password1}
                  errors={formik.errors.password1}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.password1}
                ></Input>
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button type="submit" variant="primary" onClick={onSubmit}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangePassword;
