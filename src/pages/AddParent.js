import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import FormAddParent from "../components/addForms/FormAddParent";

function AddParent() {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body"  style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Ajouter Parent</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/addParent">Parents</a>
                  </li>
                  <li className="breadcrumb-item active">Ajouter Parent</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="col-md-9 mt-3 ml-5">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Formulaire d'ajout</h3>
            </div>
            <FormAddParent/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParent;
