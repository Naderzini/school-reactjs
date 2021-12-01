export default function validateLogin(values){
    let errors ={};

    if(!values.email){
        errors.email =" ce champ est obligatoire";
    }else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(values.email)){
        errors.email =" email n'est pas valide";
    }

    if(!values.password){
        errors.password = "ce champ est obligatoire";
    }else if(values.password.length < 6){
        errors.password = " minimum 6 caracters"
    }

   
    return errors;
}