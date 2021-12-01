import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import swal from "sweetalert";
import axios from "axios";
import { getAllClasses, deleteClasse } from "../../tools/api";
import { Spinner } from "react-bootstrap";
function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [loding, setLoding] = useState(false);
  const [find, setFind] = useState();

  const handelFindChange = (e) => {
    setFind(e.target.value);
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 500);
  };
  const exist = (s1) =>
    !find || s1?.toLocaleLowerCase().indexOf(find?.toLocaleLowerCase()) >= 0;
  const getClasses = (nbPage) => {
    setLoding(true);
    getAllClasses(nbPage)
      .then((response) => {
        setClasses(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
      });
  };
  useEffect((nbPage) => {
    getClasses(nbPage);
  }, []);

  const onDelete = (id) => {
    swal({
      title: "Voue êtes sûr ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteClasse(id)
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              swal("classe supprimée", {
                icon: "success",
              });
              getClasses();
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
        className="form-control col-lg-6 mb-2 ml-2"
        placeholder="Trouver classes"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card ">
        <div>
          <div className="card-header">
            <h3 className="card-title">Liste des classes</h3>
          </div>
          <div className="card-body">
            <div className=" table-responsive">
              <table className="table table-responsive-md  ">
                <thead>
                  <tr
                    style={{
                      border: "none",
                      width: "40px",
                      padding: "2px 2px 2px2 px",
                    }}
                  >
                    <th>Nom de classe</th>
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
                    {classes?.data
                    ?.filter((u) => exist(JSON.stringify(u)))
                    .map((classe, i) => (
                      <tr key={i}>
                        <td>{classe.name}</td>
                        <td>
                          <div class="d-flex">
                            <a
                              className="dropdown-item"
                              onClick={(event) => {
                                onDelete(classe.id);
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
                  </tbody>
                )}
              </table>
            </div>
            <Pagination
              activePage={classes?.current_page}
              itemsCountPerPage={classes?.per_page}
              totalItemsCount={classes?.total}
              onChange={(nbPage) => {
                getClasses(nbPage);
              }}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="Début"
              lastPageText="Fin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassesList;
