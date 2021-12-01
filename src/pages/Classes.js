import React from "react";
import ClassesList from "../components/listes/ClassesList";
import FormAddClasse from "../components/addForms/FormAddClasse";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";



function Classes() {
  
  return (
    <div>
      <div>
        <Header />
        <SideBar />
        <div className="content-body"  style={{minHeight: "929.493px"}}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Classes</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/classes">Classes</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5"> 
                  <FormAddClasse/>                
                </div>
                <div className="col-md-7"> 
                <ClassesList/>          
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

  export default Classes;
  
