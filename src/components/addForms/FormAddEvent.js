import React, { useState } from "react";
import Input from "../inputs/Input";
import SubmitButton from "../common/SubmitButton";
import { useFormik } from "formik";
import validate from "../../tools/validateEvent";
import DatePickerInput from "../inputs/DatePickerInput";
import InputTextArea from "../inputs/InputTextArea";
import swal from "sweetalert";
import FileInput from "../inputs/FileInput";
import SprintLoding from "../common/SprintLoding";
import { addEvent } from "../../tools/api";
import { Modal, Button } from "react-bootstrap"

function FormAddEvent(props) {
  const { show, handleClose } = props;
  const [loding, setLoding] = useState(false);

  const initialValues = { name: "", date: Date(), description: "", photo: "" };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    console.log(values);
    setLoding(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("date", values.date);
    formData.append("description", values.description);
    formData.append("photo", values.photo);
    addEvent(formData)
      .then((response) => {
        if (response.status === 200) {
          setLoding(false);
          swal("Événement ajouté", "", "success");
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((error) => {
        setLoding(false);
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
          <Modal.Title>Nouvel événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="card-body">
              <div className="form-group ">
                <Input
                  label={"Nom d'évenement*"}
                  type={"text"}
                  name={"name"}
                  placeholder={"Enter le nom d'évenement"}
                  handleChange={formik.handleChange}
                  value={formik.values.name}
                  errors={formik.errors.name}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.name}
                />
              </div>
              
                <div className="form-group ">
                  <DatePickerInput
                    label={"Date d'évenement*"}
                    name={"date"}
                    handleChange={formik.handleChange}
                    value={formik.values.dete}
                    errors={formik.errors.date}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.date}
                  />
                </div>
              
              <div className="form-group ">
                <InputTextArea
                  label={"Description*"}
                  name={"description"}
                  handleChange={formik.handleChange}
                  value={formik.values.description}
                  errors={formik.errors.description}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.description}
                ></InputTextArea>
              </div>
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

export default FormAddEvent;
