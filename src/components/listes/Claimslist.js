import React, { useEffect, useState } from "react";
import ClaimModal from "../common/ClaimModal";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { init } from "../../redux/actions/numberClaims";
import {getAllClaims} from '../../tools/api'


function ClaimList(props) {
  const { init } = props;
  const [claims, setClaims] = useState({});
  const [loding, setLoding] = useState(false);
  const [currentClaime, setCurrentClaime] = useState({});
  const [find, setFind] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelFindChange = (e) => {
    setFind(e.target.value);
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 500);
  };
  
  function getClaims(nbPage) {
    setLoding(true);
    getAllClaims(nbPage)
      .then((response) => {
        setLoding(false);
        setClaims(response.data.data);
        init();
      })
      .catch((error) => {
        setLoding(false);
        console.log(error);
      });
  }
  useEffect(() => {
    getClaims();
  }, []);
  const exist = (s1) =>
    !find || s1?.toLocaleLowerCase().indexOf(find?.toLocaleLowerCase()) >= 0;

  return (
    <div>
      <input
        type="text"
        className="form-control col-lg-4 mb-2 ml-2"
        placeholder="Trouver réclamations"
        value={find}
        onChange={handelFindChange}
      />
      <div className="card card-solid mr-2 ml-2">
      <div className="card-header">
        <h4>Liste des réclamations</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive-md   ">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Nom </th>
              <th>Prénom</th>
              <th>email</th>
              <th>Statut</th>
              <th style={{ alignItems: "center" }}>Contenu</th>
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
              {claims?.data
              ?.filter((u) => exist(JSON.stringify(u)))
              .map((claim, i) => (
                <tr key={i}>
                  <td>{claim.child_parent.cin}</td>
                  <td>{claim.child_parent.first_name}</td>
                  <td>{claim.child_parent.last_name}</td>
                  <td>{claim.child_parent.email}</td>
                  <td>
                    {claim.statue === null && (
                      <span className="badge light badge-danger">Ouvert</span>
                    )}
                    {claim.statue === "encour" && (
                      <span class="badge light badge-warning">En-cours</span>
                    )}
                    {claim.statue === "resolue" && (
                      <span class="badge light badge-success">Résolu</span>
                    )}
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-danger shadow btn-xs sharp"
                      style={{ borderRadius: "25px", width: "90px" }}
                      onClick={(event) => {
                        handleShow();
                        setCurrentClaime(claim);
                      }}
                    >
                      Détailles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <ClaimModal
          handleClose={handleClose}
          currentClaime={currentClaime}
          show={show}
        />
        <Pagination
          activePage={claims?.current_page}
          itemsCountPerPage={claims?.per_page}
          totalItemsCount={claims?.total}
          onChange={(pageNumber) => {
            getClaims(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="Début"
          lastPageText="Fin"
        />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    claimNumber: state.notificationClaims.nbClaims,
  };
};
const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimList);
