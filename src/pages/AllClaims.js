import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import ClaimList from "../components/listes/Claimslist";

function AllClaims(props) {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{ minHeight: "929.493px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Réclamations</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/claims">Réclamations</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
             <ClaimList/>
        </section>
      </div>
    </div>
  );
}

export default AllClaims;
