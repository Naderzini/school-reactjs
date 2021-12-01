import React, { useState } from "react";
import { Link } from "react-router-dom";


function Childes() {
  const [show, setShow] = useState(false);
  function handelShow() {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
  return (
    <div>
      <li>
        <button className="button" onClick={handelShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            fill="currentColor"
            class="bi bi-person-square"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
          </svg>
          <span className="nav-text ml-3">Enfants</span>
        </button>
        {show && (
          <ul>
            <li>
              <Link to="/addChildren">
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  Ajouter Enfant
                </p>
              </Link>
            </li>
            <li>
              <Link to="/allChildrens">
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  Tous les Enfants
                </p>
              </Link>
            </li>
          </ul>
        )}
      </li>
    </div>
  );
}

export default Childes;
