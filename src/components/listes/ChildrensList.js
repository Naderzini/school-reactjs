import React, { useState, useEffect } from "react";
import {Spinner} from 'react-bootstrap'
import Pagination from "react-js-pagination";
import swal from "sweetalert";
import UpdateChildren from "../updateForms/UpdateChildren";
import {getAllChildrens,deleteChildren} from '../../tools/api'
import FormAddChild from "../addForms/FormAddChild";

function ChildrenList() {
  const [currentChildren, setCurrentChildren] = useState({});
  const [childrens, setChildrens] = useState([]);
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
  

  const getChildrens = (nbPage) => {
    setLoding(true);
   getAllChildrens(nbPage)
      .then((response) => {
        setChildrens(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
      });
  };
  useEffect((nbPage) => {
    getChildrens(nbPage);
  }, []);
  const onDelete = (id) => {
    swal({
      title: "Vous êtes sûr ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteChildren(id)
          .then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
              swal("Enfant supprimé", {
                icon: "success",
              });
              getChildrens();
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
        placeholder="Trouver élèves"
        value={find}
        onChange={handelFindChange}
      />
       <div className="card mr-2 ml-2">
      <div className="card-header" style={{ padding: "10px" }}>
      <h3 style={{ marginLeft: "10px",color:"black"}}>Liste des élèves</h3>
        <button
            type="button"
            class="btn btn-primary"
            onClick={(event) => {
              handleShowAddModal();
            }}
          >
            <i class="fa fa-plus" style={{ marginRight: "10px" }}></i>Ajouter élève
          </button>
      </div>
      <div className="card-body">
        <table className="table table-responsive-md ">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>CIN parent</th>
              <th>E-mail parent</th>
              <th>age</th>
              <th>Classe</th>
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
            {childrens?.data
            ?.filter((u) => exist(JSON.stringify(u)))
            .map((children, i) => (
              <tr key={i}>
                {children?.photo === null ? (
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
                      src={`${process.env.REACT_APP_PHOTO_URL}${children?.photo}`}
                      alt="User"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>
                )}
                <td>{children.first_name}</td>
                <td>{children.last_name}</td>
                <td>{children.child_parent.cin}</td>
                <td>{children.child_parent.email}</td>
                <td>{children.age}</td>
                <td>{children.group.name}</td>
                <td>
                  <div class="d-flex">
                    <a
                      className="dropdown-item"
                      onClick={(event) => {
                        onDelete(children.id);
                      }}
                      class="btn btn-primary shadow btn-xs sharp mr-1"
                    >
                      <i className="fa fa-trash" style={{ color: "#fff" }}></i>
                    </a>
                    <a
                      onClick={(event) => {
                        handleShow();
                        setCurrentChildren(children);
                      }}
                      className="btn btn-danger shadow btn-xs sharp"
                    >
                      <i className="fa fa-pencil" style={{ color: "#fff" }}></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
        <Pagination
          activePage={childrens?.current_page}
          itemsCountPerPage={childrens?.per_page}
          totalItemsCount={childrens?.total}
          onChange={(nbPage) => {
            getChildrens(nbPage);
          }}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="Début"
          lastPageText="Fin"
        />
      </div>
      </div>
      <UpdateChildren
        handleClose={handleClose}
        show={show}
        currentChildren={currentChildren}
      />
      <FormAddChild
       handleClose={handleCloseAddModal}
       show={showAddModal}>
      </FormAddChild>
    </div>
    
  );
}

export default ChildrenList;
