export default function validateForm(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = " ce champ est obligatoire";
  }

  if (!values.last_name) {
    errors.last_name = " ce champ est obligatoire";
  }
 
  if (!values.age) {
     errors.age = " ce champ est obligatoire";
    }
    if (!values.group_id) {
      errors.group_id = " ce champ est obligatoire";
    }
    if (!values.parent_id) {
      errors.parent_id = " ce champ est obligatoire";
    }
  
  
  return errors;
}
