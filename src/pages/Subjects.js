import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import FormAddSubject from "../components/addForms/FormAddSubject";
import SubjectsList from "../components/listes/SubjectsList";

function Subjects() {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body"  style={{minHeight: "929.493px"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Matières</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/subjectes">Matières</a>
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
                <FormAddSubject/>
              </div>
              <div className="col-md-7">
                <SubjectsList/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Subjects
