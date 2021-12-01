import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import validate from "../../tools/validateAdmin";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import swal from "sweetalert";
import { useFormik } from "formik";
import {updateAdmin} from '../../tools/api'

function UpdateAdmin(props) {
  const { handleClose, show, currentAdmin } = props;
  
  
  const  initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password1: "",
    phone: "",
    photo: "",
    ...currentAdmin
  };
  console.log({initialValues});
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    console.log(values)
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("photo", values.photo);
   updateAdmin(currentAdmin.id,formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          swal("Admin modifié", "", "success");
          window.setTimeout(() => {
            window.location.reload();
          }, 550);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    formik.setValues(initialValues)
    console.log({initialValues},{currentAdmin})
  }, [currentAdmin])
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifer Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-6">
                  <Input
                    label={"Nom*"}
                    type={"text"}
                    name={"first_name"}
                    placeholder={"Entrez votre nom"}
                    handleChange={formik.handleChange}
                    values={formik.values.first_name}
                    errors={formik.errors.first_name}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.first_name}
                  ></Input>
                </div>
                <div className="form-group col-6">
                  <Input
                    label={"Prénom*"}
                    type={"text"}
                    name={"last_name"}
                    placeholder={"Entrez votre prénom"}
                    handleChange={formik.handleChange}
                    values={formik.values.last_name}
                    errors={formik.errors.last_name}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.last_name}
                  ></Input>
                </div>
              </div>
              <div className="form-group ">
                <Input
                  label={"Email*"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Entrez votre email"}
                  handleChange={formik.handleChange}
                  values={formik.values.email}
                  errors={formik.errors.email}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.email}
                ></Input>
              </div>
              <div className="row">
              <div className="form-group col-6">
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
              <div className="form-group col-6">
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
              <div className="row">
              <div className="form-group col-6">
                <Input
                  label={"Téléphone"}
                  type={"text"}
                  name={"phone"}
                  placeholder={"Entrez votre numéro de téléphone"}
                  handleChange={formik.handleChange}
                  values={formik.values.phone}
                  errors={formik.errors.phone}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.phone}
                ></Input>
              </div>
              <div className="form-group col-6">
                <FileInput
                  label={"Image"}
                  type={"file"}
                  name={"photo"}
                  handleChange={function handleChange(event) {
                    formik.setFieldValue("photo", event.target.files[0]);
                  }}
                />
              </div>
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

export default UpdateAdmin;
