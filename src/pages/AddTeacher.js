import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import FormAddTeacher from "../components/addForms/FormAddTeacher";

function AddTeacher() {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{ minHeight: "929.493px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Tous les enseignants</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="fake_url">Enseignants</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Tous les enseignants
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="col-md-9 mt-3 ml-5">
          <FormAddTeacher></FormAddTeacher>
        </div>
      </div>
    </div>
  );
}
export default AddTeacher;
