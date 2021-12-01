import React from "react";
import { connect } from "react-redux";
import { ADMIN,SAVE_TOKEN } from "../../Constants";
import { userLogout } from "../../redux/actions/user";

import axios from "axios";

function Header(props) {
  const { userLogout, admin } = props;
  function logout() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}${SAVE_TOKEN}${admin.id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200){ 
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
      userLogout();
     
  }
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left"></div>
            <ul className="navbar-nav header-right main-notification">
              <a
                className="nav-link  ai-icon"
                href="javascript:void(0)"
                role="button"
                data-toggle="dropdown"
              ></a>
              <li className="nav-item dropdown header-profile">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  {admin.photo === null ? (
                    <img src="images/avatar/profil.png" width={20} alt="user" />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_PHOTO_URL}${admin.photo}`}
                      width={20}
                      alt="parent"
                    />
                  )}

                  <div className="header-info">
                    <span>
                      {admin.first_name} {admin.last_name}
                    </span>
                    {admin.role === ADMIN ? (
                      <small> Admin</small>
                    ) : (
                      <small>Super Admin</small>
                    )}
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a href="/profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ml-2">Profil </span>
                  </a>
                  <a className="dropdown-item ai-icon" onClick={logout}>
                    <svg
                      id="icon-logout"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-danger"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1={21} y1={12} x2={9} y2={12} />
                    </svg>
                    <span className="ml-2">Logout </span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  admin: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
