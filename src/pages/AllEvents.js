import React from "react";
import EventsList from "../components/listes/EventsList";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";

function AllEvents() {
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
                  <h1>Événements</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item active">
                    Événements
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <div className="col-12 mr-5">
            <EventsList></EventsList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEvents;
