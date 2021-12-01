import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import AdminsList from "../components/listes/AdminsList";


function ListAdmins() {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Administrateurs</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a  href="fake_url">Administrateurs</a>
                  </li>
                  
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="col-12 mr-5">
          <AdminsList/>
        </div>
      </div>
    </div>
  );
}

export default ListAdmins;
