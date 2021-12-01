import React, { useState } from "react";
import validate from "../../tools/validateClasse";
import SubmitButton from "../common/SubmitButton";
import swal from "sweetalert";
import Input from "../inputs/Input";
import FileInput from "../inputs/FileInput";
import { Multiselect } from "multiselect-react-dropdown";
import { useFormik } from "formik";
import { addClasse } from "../../tools/api";
import { connect } from "react-redux";
import SprintLoding from "../common/SprintLoding";

function FormAddClasse(props) {
  const { subjects } = props;
  const [loding, setLoding] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const subjectOptions = [];
  const initialValues = { group_name: "", plan: "", subject_ids: [] };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  subjects?.data?.map((subject) => {
    const id = subject.id;
    const name = subject.code + "[" + subject.name + "]";
    subjectOptions.push({ id, name });
  });

  const onSelect = (subjects) => {
    setData(subjects);
  };
  const onRemove = (subjects) => {
    setData(subjects);
  };
  function onSubmit(values) {
    console.log(values.plan);
    setLoding(true);
    values.subject_ids = [];
    data.map((d) => values.subject_ids.push(d.id));

    const formData = new FormData();
    formData.append("group_name", values.group_name);
    formData.append("plan", values.plan);
    values.subject_ids.forEach((item) =>
      formData.append("subject_ids[]", item)
    );
    addClasse(formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLoding(false);
          swal("Classe ajoutée", "", "success");
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
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">nouveau classe</h3>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="card-body">
            <div className="form-group ">
              <Input
                label={"Nom de Classe*"}
                type={"text"}
                name={"group_name"}
                placeholder={"Enter le nom de classe"}
                handleChange={formik.handleChange}
                value={formik.values.group_name}
                errors={formik.errors.group_name}
                handelBlur={formik.handleBlur}
                touched={formik.touched.group_name}
              />
            </div>
            <div className="form-group ">
              <label>Selectionner les matières </label>
              <Multiselect
                placeholder="Selectionner matières"
                options={subjectOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
            <div className="form-group ">
              <FileInput
                label={"Emlpoi du temps"}
                type={"file"}
                name={"plan"}
                handleChange={function handleChange(event) {
                  formik.setFieldValue("plan", event.target.files[0]);
                }}
              />
              {formik.touched.plan && formik.errors.plan ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.plan}
                </p>
              ) : null}
            </div>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    subjects: state.subjects.subjects,
  };
};
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormAddClasse);
