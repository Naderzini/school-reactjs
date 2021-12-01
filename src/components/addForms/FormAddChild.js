import React, { useState } from "react";
import validate from "../../tools/validateChild";
import SubmitButton from "../common/SubmitButton";
import swal from "sweetalert";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import Select from "react-select";
import { useFormik } from "formik";
import { connect } from "react-redux";
import SprintLoding from "../common/SprintLoding";
import { addChildren } from "../../tools/api";
import { Modal, Button } from "react-bootstrap";

function FormAddChild(props) {
  const [loding, setLoding] = useState();
  const { parents, classes, handleClose, show } = props;
  const parentOptions = [];
  const classeOptions = [];
  parents?.data?.map((parent) => {
    const value = parent.id;
    const label =
      parent.cin +
      " [" +
      " " +
      parent.first_name +
      " " +
      " " +
      parent.last_name +
      "]";
    parentOptions.push({ value, label });
  });
  classes?.data?.map((classe) => {
    const value = classe.id;
    const label = classe.name;
    classeOptions.push({ value, label });
  });
  const initialValues = {
    first_name: "",
    last_name: "",
    age: "",
    group_id: "",
    parent_id: "",
    photo: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    setLoding(true);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("age", values.age);
    formData.append("group_id", values.group_id);
    formData.append("parent_id", values.parent_id);
    formData.append("photo", values.photo);
    addChildren(formData)
      .then((response) => {
        if (response.status === 200) {
          setLoding(false);
          swal("Enfant ajouté", "", "success");
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
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
          <Modal.Title>Nouveau enfant</Modal.Title>
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
                    value={formik.values.first_name}
                    errors={formik.errors.first_name}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.first_name}
                  />
                </div>
                <div className="form-group col-6">
                  <Input
                    label={"Prénom*"}
                    type={"text"}
                    name={"last_name"}
                    placeholder={"Enter le prénom"}
                    value={formik.values.last_name}
                    handleChange={formik.handleChange}
                    errors={formik.errors.last_name}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.last_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-4">
                  <Input
                    label={"Age*"}
                    type={"text"}
                    name={"age"}
                    placeholder={"Enter l'age"}
                    value={formik.values.age}
                    handleChange={formik.handleChange}
                    errors={formik.errors.age}
                    handelBlur={formik.handleBlur}
                    touched={formik.touched.age}
                  />
                </div>
                <div className="form-group col-4">
                  <label>Parent CIN*</label>
                  <Select
                    options={parentOptions}
                    placeholder="Selectionner le CIN"
                    onChange={(event) => {
                      formik.values.parent_id = event.value;
                    }}
                  />

                  {formik.touched.parent_id && formik.errors.parent_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      ce champ est obligatoire
                    </p>
                  ) : null}
                </div>

                <div className="form-group col-4">
                  <label>Classe*</label>
                  <Select
                    options={classeOptions}
                    placeholder="Selectionner le classe"
                    onChange={(event) => {
                      formik.values.group_id = event.value;
                    }}
                  />
                  {formik.touched.parent_id && formik.errors.group_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      ce champ et obligatoire
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="form-group ">
                <FileInput
                  label={"Image"}
                  type={"file"}
                  name={"photo"}
                  placeholder={"Selectionner une image"}
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
const mapStateToProps = (state) => {
  return {
    parents: state.parents.parents,
    classes: state.classes.classes,
  };
};
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormAddChild);
