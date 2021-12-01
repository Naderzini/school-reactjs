import React, { useState } from "react";
import validate from "../../tools/valideteSubject";
import swal from "sweetalert";
import SubmitButton from "../common/SubmitButton";
import Input from "../inputs/Input";
import { useFormik } from "formik";
import { addSubject } from "../../tools/api";

function FormAddSubject() {
  const [usedCode, setUsedCode] = useState("");
  const initialValues = { code: "", subject_name: "", hours_week: "" };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  function onSubmit(values) {
    addSubject(values)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          swal("Matière ajouté", "", "success");
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((error) => {
        if (error.response.data.errors.code !== "") {
          setUsedCode("ce code existe déja");
        }
      });
  }
  return (
    <div>
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Nouvel matiére</h3>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="card-body">
            <div className="form-group ">
              <Input
                label={"Code de matière*"}
                type={"text"}
                name={"code"}
                placeholder={"Enter le code de matière"}
                handleChange={formik.handleChange}
                value={formik.values.code}
                errors={formik.errors.code}
                handelBlur={formik.handleBlur}
                touched={formik.touched.code}
              />
              {usedCode !== "" && !formik.errors.code ? (
                <p style={{ color: "red", fontSize: "12px" }}>{usedCode}</p>
              ) : null}
            </div>
            <div className="form-group ">
              <Input
                label={"Nom de matière*"}
                type={"text"}
                name={"subject_name"}
                placeholder={"Enter le nom de matière"}
                handleChange={formik.handleChange}
                value={formik.values.subject_name}
                errors={formik.errors.subject_name}
                handelBlur={formik.handleBlur}
                touched={formik.touched.subject_name}
              />
            </div>
            <div className="form-group ">
              <Input
                label={"Heures par semaine*"}
                type={"text"}
                name={"hours_week"}
                placeholder={"Nombre d'heures par semaine"}
                handleChange={formik.handleChange}
                value={formik.values.hours_week}
                errors={formik.errors.hours_week}
                handelBlur={formik.handleBlur}
                touched={formik.touched.hours_week}
              />
            </div>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export default FormAddSubject;
