import React, { useState } from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import { connect } from "react-redux";
import { SUPER_ADMIN } from "../Constants";
import ChangePassword from "../components/updateForms/ChangePassword";

function Profile(props) {
  const { user } = props;
  const [currentUser, setCurrentUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{ minHeight: "929.493px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profil</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/profile">Profil</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="main-body mt-1 mr-4 ml-4">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    {user.photo === null ? (
                      <img
                        src="images/avatar/profil.png"
                        width={150}
                        alt="user"
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_PHOTO_URL}${user.photo}`}
                        alt="Admin"
                        className="rounded-circle"
                        width={150}
                      />
                    )}
                    <div className="mt-3">
                      <h4>
                        {user.first_name} {user.last_name}
                      </h4>
                      <button
                        className="btn btn-primary"
                        onClick={(event) => {
                          handleShow();
                          setCurrentUser(user);
                        }}
                      >
                        Changer mot de passe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nom et Prénom</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Téléphone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.phone}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Role</h6>
                    </div>
                    {user.role === SUPER_ADMIN ? (
                      <div className="col-sm-9 text-secondary">SUPER ADMIN</div>
                    ) : (
                      <div className="col-sm-9 text-secondary">ADMIN</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword
       handleClose={handleClose}
       show={show}
       currentUser={currentUser}
    />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
