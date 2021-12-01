import React from "react";
import TeacherList from "../components/listes/TeacherList";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";


function AllTeachers() {
 

  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body"  style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Enseignants</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="fak_url">Enseignants</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
          <TeacherList/>
      </div>
    </div>
  );
}

export default AllTeachers;
