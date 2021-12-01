import React, { useState, useEffect } from "react";
import { SUPER_ADMIN } from "../../Constants";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import UpdateAdmin from "../updateForms/UpdateAdmin";
import { Spinner } from "react-bootstrap";
import { getAllAdmins, deleteAdmin } from "../../tools/api";
import FormAddAdmin from "../addForms/FormAddAdmin";

function AdminsList() {
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [admins, setAdmins] = useState();
  const [loding, setLoding] = useState(false);
  const [find, setFind] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  

  const getAdmins = (nbPage) => {
    setLoding(true);
    getAllAdmins(nbPage)
      .then((response) => {
        setAdmins(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
      });
  };
  useEffect((nbPage) => {
    getAdmins(nbPage);
  }, []);
  const onDelete = (id) => {
    swal({
      title: "Vous êtes sûr ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAdmin(id)
          .then((response) => {
            if (response.status === 200) {
              swal("Admin supprimé", {
                icon: "success",
              });
              getAdmins();
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
        className="form-control col-lg-4 mb-2"
        placeholder="Trouver administrateurs"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card ">
        <div className="card-header" style={{ padding: "10px" }}>
        <h3  style={{ marginLeft: "10px",color:"black"}}>
            Liste des administrateurs
          </h3>
          <button
            type="button"
            class="btn btn-primary"
            onClick={(event) => {
              handleShowAddModal();
            }}
          >
            <i class="fa fa-plus" style={{ marginRight: "10px" }}></i>Ajouter
            administrateur
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-responsive-md" role="grid">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th colSpan="2">Action</th>
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
                  {admins?.data
                    ?.filter((u) => exist(JSON.stringify(u)))
                    .map((admin, i) => (
                      <tr key={i}>
                        {admin.photo === null ? (
                          <td>
                            <img
                              src="images/avatar/profil.png"
                              alt="admin"
                              style={{ width: "30px", height: "30px" }}
                            />
                          </td>
                        ) : (
                          <td>
                            <img
                              src={`${process.env.REACT_APP_PHOTO_URL}${admin.photo}`}
                              alt="User"
                              style={{ width: "30px", height: "30px" }}
                            />
                          </td>
                        )}
                        <td>{admin.first_name} </td>
                        <td>{admin.last_name} </td>
                        <td>{admin.email} </td>
                        <td>{admin.phone} </td>
                        {admin.role !== SUPER_ADMIN && (
                          <>
                            <td>
                              <div class="d-flex">
                                <a
                                  className="dropdown-item"
                                  onClick={(event) => {
                                    onDelete(admin.id);
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
                                    setCurrentAdmin(admin);
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
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
            <Pagination
              activePage={admins?.current_page}
              itemsCountPerPage={admins?.per_page}
              totalItemsCount={admins?.total}
              onChange={(pageNumber) => {
                getAdmins(pageNumber);
              }}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="Début"
              lastPageText="Fin"
            />
          </div>
        </div>
        <UpdateAdmin
          handleClose={handleClose}
          show={show}
          currentAdmin={currentAdmin}
        ></UpdateAdmin>
        <FormAddAdmin handleClose={handleCloseAddModal} show={showAddModal} />
      </div>
    </div>
  );
}
export default AdminsList;
