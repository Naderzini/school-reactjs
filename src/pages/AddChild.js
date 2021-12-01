import React from "react";
import FormAddChild from "../components/addForms/FormAddChild";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";


function AddChild() {
  return (
    <div>
      <div>
        <Header />
        <SideBar />
        <div className="content-body" style={{ minHeight: "929.493px" }}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Ajouter enfant</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/addChild">Enfant</a>
                    </li>
                    <li className="breadcrumb-item active">Ajouter Enfant</li>
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
              <FormAddChild />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddChild;
