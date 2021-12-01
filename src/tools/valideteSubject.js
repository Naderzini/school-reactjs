export default function validate(values) {
  let errors = {};

  if (!values.subject_name) {
    errors.subject_name = "ce champ est obligatoire";
  }
  if (!values.code) {
    errors.code = "ce champ est obligatoire";
  }
  if (!values.hours_week) {
    errors.hours_week = "ce champ est obligatoire";
  }
  

  return errors;
}
