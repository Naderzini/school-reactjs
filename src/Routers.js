import React from "react";
import {ADMIN,SUPER_ADMIN} from './Constants'
import { connect } from "react-redux";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import AddAdmin from "./pages/AddAdmin";
import AddChild from "./pages/AddChild";
import Classes from "./pages/Classes";
import AllAdmins from "./pages/AllAdmins";
import Subjects from "./pages/Subjects";
import AddParent from "./pages/AddParent";
import AllPatents from "./pages/AllPatents";
import DashbordAdmin from "./pages/DashbordAdmin";
import Login from "./pages/Login";
import AllChildrens from "./pages/AllChildrens";
import Unauthorized from "./pages/Unauthorized";
import AddEvents from "./pages/AddEvents";
import AllEvents from "./pages/AllEvents";
import AddTeacher from "./pages/AddTeacher";
import AllTeachers from "./pages/AllTeachers";
import Profile from "./pages/Profile";
import AllClaims from "./pages/AllClaims";
import Messaging from "./pages/Messaging";
import ForgetPassword from "./pages/ForgetPassword";

function Routers(props) {
  const { user } = props;

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" > 
          { (user.role === SUPER_ADMIN || user.role === ADMIN)  ? <DashbordAdmin/>: <Login/>}
          </Route> 
          <Route exact path="/adminDashbord" > 
          { (user.role === SUPER_ADMIN || user.role === ADMIN )  ? <DashbordAdmin/> : <Unauthorized/>}
          </Route>
          <Route exact path="/addParent" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AddParent/> : <Unauthorized/>}
          </Route>
          <Route exact path="/addAdmin" > 
          { user.role === SUPER_ADMIN  ? <AddAdmin/> : <Unauthorized/>}
          </Route>
           <Route exact path="/allAdmin" > 
          { user.role === SUPER_ADMIN  ? <AllAdmins/> : <Unauthorized/>}
          </Route>
          <Route exact path="/messages" > 
          { (user.role === SUPER_ADMIN || user.role === ADMIN )  ? <Messaging/> : <Unauthorized/>}
          </Route>
          <Route exact path="/allParents" > 
            { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AllPatents/> : <Unauthorized/>}
          </Route>
          <Route exact path="/addChild" > 
           { (user.role === ADMIN || user.role === SUPER_ADMIN )  ? <AddChild/> : <Unauthorized/>}
          </Route>
          <Route exact path="/subjects" > 
           { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <Subjects/>: <Unauthorized/>} 
          </Route>
          <Route exact path="/classes" > 
           { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <Classes/> : <Unauthorized/>} 
          </Route>
          <Route exact path="/addChildren" > 
           { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AddChild/> : <Unauthorized/>} 
          </Route>
          <Route exact path="/allChildrens" > 
           { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AllChildrens/> : <Unauthorized/>} 
          </Route>
          <Route exact path="/addEvent" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AddEvents/> : <Unauthorized/>}
          </Route>
          <Route exact path="/allEvents" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AllEvents/> : <Unauthorized/>}
          </Route>
          <Route exact path="/addTeacher" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AddTeacher/> : <Unauthorized/>}
          </Route>
          <Route exact path="/allTeachers" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AllTeachers/> : <Unauthorized/>}
          </Route>
          <Route exact path="/profile" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <Profile/> : <Unauthorized/>}
          </Route>
          <Route exact path="/claims" > 
          { (user.role === ADMIN || user.role === SUPER_ADMIN)  ? <AllClaims/> : <Unauthorized/>}
          </Route>
          <Route exact path="/forgetPassword" > 
          <ForgetPassword/>
          </Route> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Routers);
