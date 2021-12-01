import React from "react";
import { Modal, Button } from "react-bootstrap";
import InputTextArea from "../inputs/InputTextArea";
import StatusInput from "../inputs/StatuInput";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import {CLAIM_ANSWER} from '../../Constants'

function ClaimModal(props) {
  const { handleClose, show, currentClaime } = props;

  const initialValues = { answer: "", status: "" };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  function onSubmit(values) {
    console.log(values)

    axios
      .put(`${process.env.REACT_APP_API_URL}${CLAIM_ANSWER}${currentClaime.id}`, values, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
 
          swal("Reponse envoyée", "", "success");
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((err) => {console.log(err)
      });
  }
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Réclamation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentClaime.content}
          <hr></hr>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <InputTextArea
                label={"Réponse"}
                name={"answer"}
                handleChange={formik.handleChange}
                value={formik.values.answer}
              ></InputTextArea>
              <br></br>
              <StatusInput
                handleChange={formik.handleChange}
                 values={formik.values}
                
              />
              <br></br>
              <button
                type="submit"
                className="btn btn-primary shadow btn-xs sharp"
                style={{ borderRadius: "15px", width: "90px", height: "35px" }}
              >
                Envoyer
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClaimModal;
