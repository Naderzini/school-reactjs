export default function validateForm(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = " ce champ est obligatoire";
  }

  if (!values.last_name) {
    errors.last_name = " ce champ est obligatoire";
  }

  if (!values.email) {
    errors.email = " Le champ email ne doit pas etre vide";
  } else if (
    !/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(values.email)
  ) {
    errors.email = " email n'est pas valide";
  }
  if (!values.subject){
    errors.subject = " ce champ est obligatoire";
  }
  if (!values.group_ids){
    errors.group_ids = " ce champ est obligatoire";
  }
  return errors;
}