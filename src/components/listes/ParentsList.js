import React, { useState,useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import swal from "sweetalert";
import {Spinner} from 'react-bootstrap'
import UpdateParentForm from "../updateForms/UpdateParentForm";
import { DELETE_PARENT } from "../../Constants";
import {getAllParents,deleteParent} from '../../tools/api'
import FormAddParent from "../addForms/FormAddParent";

function ParentsList() {
  const [currentParent, setCurrentParent] = useState({});
  const [show, setShow] = useState(false);
  const [parents, setParents] = useState();
  const [loding,setLoding] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [find, setFind] = useState();

  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handelFindChange = (e) => {
    setFind(e.target.value);
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 500);
  };

  const getParents = (nbPage) =>{
    setLoding(true);
    getAllParents(nbPage)
    .then((response) => {
      setParents(response.data.data);
      setLoding(false)
    })
    .catch((error) => {
      setLoding(false)
      console.log(error);
    });
}
 useEffect((nbPage)=>{getParents(nbPage)},[])
  const onDelete = (id) => {
    swal({
      title: "vous êtes sûr ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteParent(id)
          .then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
              swal("Parent supprimé", {
                icon: "success",
              });
              getParents();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const exist = (s1) =>
    !find || s1?.toLocaleLowerCase().indexOf(find?.toLocaleLowerCase()) >= 0;

  return (
    <div>
       <input
        type="text"
        className="form-control col-lg-4 mb-2 ml-2"
        placeholder="Trouver parent"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card mr-2 ml-2">
      <div className="card-header" style={{ padding: "10px" }}>
        <h3  style={{ marginLeft: "10px",color:"black"}}>Liste des parents</h3>
        <button
            type="button"
            class="btn btn-primary"
            onClick={(event) => {
              handleShowAddModal();
            }}
          >
             <i class="fa fa-plus" style={{ marginRight: "10px" }}></i>Ajouter Parent
          </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-responsive-md   ">
            <thead>
              <tr>
                <th>Image</th>
                <th>CIN</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th>genre</th>
                <th>Travail</th>
                <th>Télephone</th>
                <th>Ville</th>
                <th>Governement</th>
                <th>Code postal</th>
               
                <th colSpan="2" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            {loding ? 
          <tbody style={{height:"100px"}}>
          <Spinner animation="border" variant="primary" size={100} style={{position: "absolute", top: "50%", left: "50%"}}/>
          </tbody>:
            <tbody>
              {parents?.data?.filter((u) => exist(JSON.stringify(u)))
              .map((parent, i) => (
                <tr key={i}>
                   {parent.photo === null ?
                   (<td> 
                     <img
                     src="images/avatar/profil.png"
                     alt="admin"
                     style={{ width: "30px", height: "30px" }}
                   /></td>)
                   :
                   (<td> 
                      <img
                        src={`${process.env.REACT_APP_PHOTO_URL}${parent.photo}`}
                        alt="User"
                        style={{ width: "30px", height: "30px" }}
                      /></td>)}
                  <td>{parent.cin} </td>
                  <td>{parent.first_name}</td>
                  <td>{parent.last_name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.genre}</td>
                  <td>{parent.occupation}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.city}</td>
                  <td>{parent.government}</td>
                  <td>{parent.postal_code}</td>
                  <td>
                    <div class="d-flex">
                      <a
                        className="dropdown-item"
                        onClick={(event) => {
                          onDelete(parent.id);
                        }}
                        class="btn btn-primary shadow btn-xs sharp mr-1"
                      >
                        <i
                          className="fa fa-trash"
                          style={{ color: "#fff" }}
                        ></i>
                      </a>
                      <a
                        onClick={(event) => {
                          handleShow();
                          setCurrentParent(parent);
                        }}
                        className="btn btn-danger shadow btn-xs sharp"
                      >
                        <i
                          className="fa fa-pencil"
                          style={{ color: "#fff" }}
                        ></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
        <Pagination
          activePage={parents?.current_page}
          itemsCountPerPage={parents?.per_page}
          totalItemsCount={parents?.total}
          onChange={(nbPage) => {
            getParents(nbPage);
          }}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="Début"
          lastPageText="Fin"
        />
      </div>
      <UpdateParentForm
        handleClose={handleClose}
        show={show}
        currentParent={currentParent}
      ></UpdateParentForm>
       <FormAddParent
       handleClose={handleCloseAddModal}
       show={showAddModal}>
      </FormAddParent>
      </div>
    </div>
  );
}
export default ParentsList;
