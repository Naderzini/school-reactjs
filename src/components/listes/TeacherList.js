import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import { Spinner } from "react-bootstrap";
import {getAllTeachers,deleteTeachers} from "../../tools/api"
import FormAddTeacher from "../addForms/FormAddTeacher";

function TeacherList() {
  const [teachers, setTeachers] = useState();
  const [loding, setLoding] = useState(false);
  const [find, setFind] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  function getTeachers(nbPage) {
    setLoding(true);
    getAllTeachers(nbPage)
      .then((response) => {
        setTeachers(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
      });
  }
  useEffect((nbPage) => {
    getTeachers(nbPage);
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
        deleteTeachers(id)
          .then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
              swal("Ensegniant supprimer", {
                icon: "success",
              });
              getTeachers();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div>
        <input
        type="text"
        className="form-control col-lg-4 mb-2 ml-2"
        placeholder="Trouver enseignants"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card ml-2 mr-2">
      <div className="card-header" style={{ padding: "10px" }}>
      <h3  style={{ marginLeft: "10px",color:"black"}}>Liste des Enseignants</h3>
        <button
            type="button"
            class="btn btn-primary"
            onClick={(event) => {
              handleShowAddModal();
            }}
          >
             <i class="fa fa-plus" style={{ marginRight: "10px" }}></i>Ajouter enseignant
          </button>
      </div>
      <div className="card-body">
        <table className="table table-responsive-md   ">
          <thead>
            <tr>
              <th>Nom </th>
              <th>Prénom</th>
              <th>email</th>
              <th>matiére</th>
              <th>Action</th>
            </tr>
          </thead>
          {loding ? (
            <tbody style={{ height: "100px" }}>
              <Spinner
                animation="border"
                variant="primary"
                size={100}
                style={{ position: "absolute", top: "50%", left: "50%" }}
              />
            </tbody>
          ) : (
            <tbody>
              {teachers?.data
               ?.filter((u) => exist(JSON.stringify(u)))
               .map((teacher, i) => (
                <tr key={i}>
                  <td>{teacher.first_name}</td>
                  <td>{teacher.last_name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subject}</td>
                  <td>
                    <div class="d-flex">
                      <a
                        className="dropdown-item"
                        onClick={(event) => {
                          onDelete(teacher.id);
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
                      className="btn btn-danger shadow btn-xs sharp">
                        <i
                        className="fa fa-pencil"
                        style={{ color: "#fff" }}
                         ></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <Pagination
          activePage={teachers?.current_page}
          itemsCountPerPage={teachers?.per_page}
          totalItemsCount={teachers?.total}
          onChange={(pageNumber) => {
            getTeachers(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="Début"
          lastPageText="Fin"
        />
      </div>
      <FormAddTeacher
      handleClose={handleCloseAddModal}
      show={showAddModal}>
      </FormAddTeacher>
      </div>
    </div>
  );
}

export default TeacherList;
