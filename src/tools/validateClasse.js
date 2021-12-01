export default function validate(values) {
  let errors = {};

  if (!values.group_name) {
    errors.group_name = "ce champ est obligatoire";
  }
  if (!values.plan) {
    errors.plan = "ce champ est obligatoire";
  }

  return errors;
}
