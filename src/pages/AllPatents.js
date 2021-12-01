import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import  ParentsList  from "../components/listes/ParentsList";

function AllPatents() {
 

  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body"  style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Parents</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="fak_url">Parents</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
          <ParentsList/>      
      </div>
    </div>
  );
}

export default AllPatents;
