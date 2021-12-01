import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import ChildrensList from "../components/listes/ChildrensList";


function ListChildrens() {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Élèves</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a  href="fake_url">Élèves</a>
                  </li>
                 
                </ol>
              </div>
            </div>
          </div>
        </section>
          <ChildrensList></ChildrensList>
      </div>
    </div>
  );
}

export default ListChildrens;
