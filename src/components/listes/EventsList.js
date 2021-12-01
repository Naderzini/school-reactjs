import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { getAllEvents,deleteEvent } from "../../tools/api";
import Pagination  from "react-js-pagination";
import {Spinner} from 'react-bootstrap'
import FormAddEvent from '../addForms/FormAddEvent'

function EventsList() {
  const [events, setEvents] = useState({});
  const [loding,setLoding] = useState(false);
  const [find, setFind] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  function getEvents(pageNumber) {
    setLoding(true)
    getAllEvents(pageNumber)
      .then((response) => {
        setLoding(false)
        setEvents(response.data.data);
      })
      .catch((error) => {
        setLoding(false)
        console.log(error);
      });
  }
  useEffect(() => {
    getEvents();
  }, []);
  const handelFindChange = (e) => {
    setFind(e.target.value);
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 500);
  };
  const exist = (s1) =>
    !find || s1?.toLocaleLowerCase().indexOf(find?.toLocaleLowerCase()) >= 0;

  const onDelete = (id) => {
    swal({
      title: "vous êtes sûr ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
      deleteEvent(id)
          .then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
              swal("Événement supprimé", {
                icon: "success",
              });
              getEvents();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
  return (
    <div>
      <input
        type="text"
        className="form-control col-lg-4 mb-2 ml-2"
        placeholder="Trouver événements"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card">
        <div className="card-header"  style={{ padding: "10px" }}>
          <h3 className="card-title" style={{ marginLeft: "10px" }}>Liste des événements</h3>
          <button
            type="button"
            class="btn btn-primary"
            onClick={(event) => {
              handleShowAddModal();
            }}
          >
             <i class="fa fa-plus" style={{ marginRight: "10px" }}></i>Ajouter événement
          </button>
        </div>
        <div className="card-body">
          <table className="table table-responsive-md  ">
            <thead>
              <tr>
                <th>Nom d'évenement</th>
                <th>Date d'évenement</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            {loding ? 
          <tbody style={{height:"100px"}}>
           <Spinner animation="border" variant="primary" size={100} style={{position: "absolute", top: "50%", left: "50%"}}/>
           </tbody>:
            <tbody>
              {events?.data?.filter((u) => exist(JSON.stringify(u))).map((eve, i) => (
                <tr key={i}>
                  <td>{eve.name}</td>
                  <td>{eve.date}</td>
                  <td>{eve.description}</td>
                  <td>
                    <div class="d-flex">
                      <a
                        className="dropdown-item"
                        onClick={(event) => {
                          onDelete(eve.id);
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
           <Pagination
            activePage={events?.current_page}
            itemsCountPerPage={events?.per_page}
            totalItemsCount={events?.total}
            onChange={(pageNumber) => {getEvents(pageNumber)}}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="Début"
            lastPageText="Fin"
          /> 
        </div>
      </div>
      <FormAddEvent
      handleClose={handleCloseAddModal}
      show={showAddModal}
      ></FormAddEvent>
    </div>
  );
}

export default EventsList;
