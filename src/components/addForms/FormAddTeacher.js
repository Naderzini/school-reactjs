import React, { useEffect, useState } from "react";
import validate from "../../tools/validateTeacher";
import GenderInput from "../inputs/GenderInput";
import Input from "../inputs/Input";
import Select from "react-select";
import { Multiselect } from "multiselect-react-dropdown";
import swal from "sweetalert";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import {connect} from 'react-redux'
import SprintLoding from "../common/SprintLoding";
import {addTeacher} from "../../tools/api";

function FormAddTeacher(props) {
  const {subjects,classes, handleClose, show} = props;
  const [data, setData] = useState([]);
  const [loding,setLoding] = useState();
  //const [loding,setLoding] = useState();
  const subjectOptions = [];
  subjects?.data?.map((subject) => {
    const value = subject.name;
    const label = subject.code +'['+ subject.name+']';
    subjectOptions.push({ label, value });
  });
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    genre: "",
    group_ids: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const onSelect = (classes) => {
    setData(classes);
  };
  const onRemove = (classes) => {
    setData(classes);
  };

  function onSubmit(values) {
    setLoding(true);
    values.group_ids = [];
    data.map((d) => values.group_ids.push(d.id));
    console.log(values);
    addTeacher(values)
      .then((response) => {
        if (response.status === 200) {
          setLoding(false);
          swal("Enseignant ajouté", "", "success");
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error?.response?.data);
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
          <Modal.Title>Nouveau enseignant</Modal.Title>
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
                  values={formik.values.first_name}
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
                  handleChange={formik.handleChange}
                  values={formik.values.last_name}
                  errors={formik.errors.last_name}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.last_name}
                />
              </div>
            </div>
            <GenderInput
              handleChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
            ></GenderInput>
            <div className="row">
              <div className="form-group col-6">
                <Input
                  label={"Email*"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Entre l'email"}
                  handleChange={formik.handleChange}
                  values={formik.values.email}
                  errors={formik.errors.email}
                  handelBlur={formik.handleBlur}
                  touched={formik.touched.email}
                ></Input>
              </div>
              <div className="form-group col-6">
                <label>Matiere*</label>
                <Select
                  options={subjectOptions}
                  placeholder="Sélectionner une matier"
                  onChange={(event) => {
                    formik.values.subject = event.value;
                  }}
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.subject}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="form-group ">
              <label>Selectionner les classes* </label>
              <Multiselect
                options={classes.data}
                placeholder="Sélectionner les classes"
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name" // Property name to display in the dropdown options
              />
              {formik.values.group_ids.length === 0 ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.group_ids}
                </p>
              ) : null}
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
      classes: state.classes.classes,
      subjects:state.subjects.subjects,
    };
  };
  const mapDispatchToProps = () => ({
  });
  export default connect(mapStateToProps, mapDispatchToProps)( FormAddTeacher);

