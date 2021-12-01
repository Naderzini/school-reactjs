export default function validate(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "ce champ est obligatoire";
  }
  if (!values.description) {
      errors.description = "ce champ est obligatoire";
    }
  if (values.date === "") {
    errors.date = "ce champ est obligatoire";
  }
  return errors;
}
