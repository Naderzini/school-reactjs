import React, { useState } from "react";
import { useFormik } from "formik";
import validate from "../../tools/validateParent";
import swal from "sweetalert";
import GenderInput from "../inputs/GenderInput";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import SprintLoding from "../common/SprintLoding";
import { addParent } from "../../tools/api";
import { Modal, Button } from "react-bootstrap";

export const FormAddParent = (props) => {
  const { handleClose, show } = props;
  const [loding, setLoding] = useState(false);
  const [usedEmail, setUsedEmail] = useState(null);
  const [usedCin, setUsedCin] = useState(null);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password1: "",
    cin: "",
    phone: "",
    postal_code: "",
    city: "",
    govarnment: "",
    occupation: "",
    genre: "",
    photo: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
 
    function onSubmit(values,onSubmitProps) {
      console.log(values);
    setLoding(true);
    const formData = new FormData();
    formData.append("first_name", formik.values.first_name);
    formData.append("last_name",formik.values.last_name);
    formData.append("email", formik.values.email);
    formData.append("password", formik.values.password);
    formData.append("cin", formik.values.cin);
    formData.append("city", formik.values.city);
    formData.append("postal_code", formik.values.postal_code);
    formData.append("govarnment", formik.values.govarnment);
    formData.append("occupation", formik.values.occupation);
    formData.append("genre", formik.values.genre);
    formData.append("phone", formik.values.phone);
    formData.append("photo", formik.values.photo);
    addParent(formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLoding(false);
          swal("Parent ajouté", "", "success");
          window.setTimeout(() => {
            window.location.reload();
          }, 550);
        }
      })
      .catch((err) => {
        setLoding(false);
        if (err?.response?.data?.errors?.email) {
          setUsedEmail(err?.response?.data?.errors?.email);
        }
        if (err?.response?.data?.errors?.email) {
          setUsedCin(err?.response?.data?.errors?.cin);
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
          <Modal.Title>Nouveau parent</Modal.Title>
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
                    placeholder={"Enter le nom"}
                    handleChange={formik.handleChange}
                    values={formik?.values?.first_name}
                    errors={formik?.errors?.first_name}
                    handelBlur={formik.handleBlur}
                    touched={formik?.touched?.first_name}
                  />
                </div>
                <div className="form-group col-6">
                  <Input
                    label={"Prénom*"}
                    type={"text"}
                    name={"last_name"}
                    placeholder={"Enter le prénom"}
                    handleChange={formik.handleChange}
                    values={formik?.values?.last_name}
                    errors={formik?.errors?.last_name}
                    handelBlur={formik.handleBlur}
                    touched={formik?.touched?.last_name}
                  />
                </div>
              </div>
              <GenderInput
                handleChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
              ></GenderInput>
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
                    placeholder={"Entrer votre mot de passe"}
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
                    label={"CIN*"}
                    type={"text"}
                    name={"cin"}
                    placeholder={"Entrer le CIN"}
                    handleChange={formik.handleChange}
                    values={formik.values.cin}
                    errors={formik.errors.cin}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.cin}
                  ></Input>
                  {usedCin !== null && !formik.errors.cin ? (
                    <p style={{ color: "red", fontSize: "12px" }}>{usedCin}</p>
                  ) : null}
                </div>
                <div className="form-group col-6">
                  <Input
                    label={"Téléphone*"}
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
              </div>
              <div className="row">
                <div className="form-group col-4">
                  <Input
                    label={"Ville*"}
                    type={"text"}
                    name={"city"}
                    placeholder={"Entre le ville"}
                    handleChange={formik.handleChange}
                    values={formik.values.city}
                    errors={formik.errors.city}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.city}
                  ></Input>
                </div>
                <div className="form-group col-4">
                  <Input
                    label={"Code Postal*"}
                    type={"text"}
                    name={"postal_code"}
                    placeholder={"Entre code postal"}
                    handleChange={formik.handleChange}
                    values={formik.values.postal_code}
                    errors={formik.errors.postal_code}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.postal_code}
                  ></Input>
                </div>
                <div className="form-group col-4">
                  <Input
                    label={"Governement*"}
                    type={"text"}
                    name={"govarnment"}
                    placeholder={"Entre le governement"}
                    handleChange={formik.handleChange}
                    values={formik.values.govarnment}
                    errors={formik.errors.govarnment}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.govarnment}
                  ></Input>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <Input
                    label={"Occupation*"}
                    type={"text"}
                    name={"occupation"}
                    placeholder={"Votre travail"}
                    handleChange={formik.handleChange}
                    values={formik.values.occupation}
                    errors={formik.errors.occupation}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.occupation}
                  ></Input>
                </div>
                <div className="form-group col-6">
                  <div className="form-group ">
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
export default FormAddParent;
