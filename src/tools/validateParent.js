export default function validateForm(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = " ce champ est obligatoire";
  }

  if (!values.last_name) {
    errors.last_name = " ce champ est obligatoire";
  }

  if (!values.email) {
    errors.email = " ce champ est obligatoire";
  } else if (
    !/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(values.email)
  ) {
    errors.email = " email n'est pas valide";
  }

  if (!values.password) {
    errors.password = "ce champ est obligatoire";
  } else if (values.password.length < 6) {
    errors.password = " minimum 6 caracters";
  }
  if (!values.password1) {
    errors.password1 = "ce champ est obligatoire";
  } else if (values.password1.length < 6) {
    errors.password1 = " minimum 6 caracters";
  }

  if (values.password1 !== values.password) {
    errors.password1 = "les mots de passe ne sont pas confirmes";
  }

  if (!values.cin) {
    errors.cin = " ce champ est obligatoire";
  } else if (!/^[0-9]+$/.test(values.cin)) {
    errors.cin = " ce champ est doit contient seulement des chiffres chiffres";
  } else if (values.cin.length !== 8) {
    errors.cin = " ce champ est doit contient exactement 8 chiffres";
  }

  if (!values.phone) {
    errors.phone = " ce champ est obligatoire";
  } else if (!/^[0-9]+$/.test(values.phone)) {
    errors.phone =
      " ce champ est doit contient seulement des chiffres chiffres";
  } else if (values.phone.length !== 8) {
    errors.phone = " ce champ est doit contient exactement 8 chiffres";
  }

  if (!values.occupation) {
    errors.occupation = " ce champ est obligatoire";
  }

  if (!values.adress) {
    errors.adress = " ce champ est obligatoire";
  }
  // if (!values.genre) {
  //   errors.genre = " ce champ est obligatoire";
  // }
  return errors;
}
