import React, { useState } from "react";
import swal from "sweetalert";
import { useFormik } from "formik";
import validate from "../../tools/validateAdmin";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import SprintLoding from "../common/SprintLoding";
import { addAdmin } from "../../tools/api";
import { Modal, Button } from "react-bootstrap";

export const FormAddAdmin = (props) => {
  const { handleClose, show} = props;
  const [loding, setLoding] = useState(false);
  const [usedEmail, setUsedEmail] = useState(null);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password1: "",
    phone: "",
    photo: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  function onSubmit(values) {
    setLoding(true);
    console.log(values);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("photo", values.photo);
    addAdmin(formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLoding(false);
          swal("Admin ajouté", "", "success");
          window.setTimeout(() => {
            window.location.reload();
          }, 550);
        }
      })
      .catch((err) => {
        setLoding(false);
        console.log(err?.response?.data?.errors?.email);
        if (err?.response?.data?.errors?.email) {
          setUsedEmail(err?.response?.data?.errors?.email);
        }
      });
  }
  return (
    <div>
      {loding && <SprintLoding />}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nouveau administrateur</Modal.Title>
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
                    placeholder={"Entrer le nom"}
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
                    placeholder={"Entrer le prénom"}
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
                  placeholder={"Entrer l'email"}
                  handleChange={formik.handleChange}
                  values={formik.values.email}
                  errors={formik.errors.email}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.email}
                ></Input>
                {usedEmail !== null && !formik.errors.email ? (
                  <p style={{ color: "red", fontSize: "12px" }}>{usedEmail}</p>
                ) : null}
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <Input
                    label={"Mot de passe*"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Entrer le mot de passe"}
                    handleChange={formik.handleChange}
                    values={formik.values.password}
                    errors={formik.errors.password}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.password}
                  ></Input>
                </div>
                <div className="form-group col-6">
                  <Input
                    label={"Confirmer le mot de passe*"}
                    type={"password"}
                    name={"password1"}
                    placeholder={"Entrer le de passe"}
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
                    placeholder={"Entrer le numéro de téléphone"}
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
};
export default FormAddAdmin;
