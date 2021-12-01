import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "../components/common/Header";
import PieCarde from "../components/common/PieCarde";
import SideBar from "../components/common/SideBar";
import StaticCard from "../components/common/StaticCard";
import { SUPER_ADMIN } from "../Constants";
import {
  getAdminsNumber,
  getParentsNumber,
  getChildrensNumber,
  getTeachersNumber,
  getParentsMen,
  getParentsWomen,
  getTeachersWomen,
  getTeachersMen,
} from "../tools/api";

function DashbordAdmin(props) {
  const { user } = props;
  const [nbAdmins, setNbAdmins] = useState();
  const [nbParents, setNbParents] = useState();
  const [nbChildrens, setNbChildrens] = useState();
  const [nbTeachers, setNbTeachers] = useState();
  const [teachersMen, setTeachersMen] = useState();
  const [teachersWomen, setTeachersWomen] = useState();
  const [parentsMen, setParentsMen] = useState();
  const [parentsWomen, setParentsWomen] = useState();

  useEffect(() => {
    getAdminsNumber().then((response) => {
      setNbAdmins(response.data.data);
    });
    getParentsNumber().then((response) => {
      setNbParents(response.data.data);
    });
    getChildrensNumber().then((response) => {
      setNbChildrens(response.data.data);
    });
    getTeachersNumber().then((response) => {
      setNbTeachers(response.data.data);
    });
    getParentsMen().then((response) => {
      setParentsMen(response.data.data);
    });
    getParentsWomen().then((response) => {
      setParentsWomen(response.data.data);
    });
    getTeachersMen().then((response) => {
      setTeachersMen(response.data.data);
    });
    getTeachersWomen().then((response) => {
      setTeachersWomen(response.data.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{ minHeight: "929.493px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Tableau de bord</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/adminDashbord">Accueil</a>
                  </li>
                  <li className="breadcrumb-item active">Tableau de bord</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {user.role === SUPER_ADMIN ? (
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 ">
              <StaticCard
                color={"info-box-icon bg-info elevation-1"}
                name={"Administrateurs"}
                total={nbAdmins}
                icon={"fas fa-users-cog"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 ">
              <StaticCard
                color={"info-box-icon bg-danger elevation-1"}
                name={"Parents"}
                total={nbParents}
                icon={"fas fa-users"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 ">
              <StaticCard
                color={"info-box-icon bg-success elevation-1"}
                name={"Enfants"}
                total={nbChildrens}
                icon={"fas fa-user-graduate"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3  ">
              <StaticCard
                color={"info-box-icon bg-warning elevation-1"}
                name={"Enseignants"}
                total={nbTeachers}
                icon={"fas fa-chalkboard-teacher"}
              />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 ">
              <StaticCard
                color={"info-box-icon bg-danger elevation-1"}
                name={"Parents"}
                total={nbParents}
                icon={"fas fa-users"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4 ">
              <StaticCard
                color={"info-box-icon bg-success elevation-1"}
                name={"Enfants"}
                total={nbChildrens}
                icon={"fas fa-users"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4  ">
              <StaticCard
                color={"info-box-icon bg-warning elevation-1"}
                name={"Enseignants"}
                total={nbTeachers}
                icon={"fas fa-chalkboard-teacher"}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 ">
            <PieCarde
              backgroundColorMan={"rgba(255,99,132,1)"}
              backgroundColorWoman={ "rgba(255,205,86,1)"}
              Men={parentsMen}
              Women={parentsWomen}
              cardTitle={"Nombres des parents selon le genre"}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 ">
            <PieCarde 
             backgroundColorMan={"rgba(54,162,235,1)"}
             backgroundColorWoman={ "rgba(153,102,255,1)"}
             Men={teachersMen}
             Women={teachersWomen}
             cardTitle={"Nombres des enseignants selon le genre"}
           />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DashbordAdmin);
