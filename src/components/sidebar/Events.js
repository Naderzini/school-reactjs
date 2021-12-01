import React, { useState } from "react";
import { Link } from "react-router-dom";

function Events() {
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
            class="bi bi-calendar-event"
            viewBox="0 0 16 16"
          >
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <span className="nav-text ml-3">Événements</span>
        </button>
        {show && (
          <ul>
            <li>
              <Link to="/addEvent">
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  Ajouter Événement
                </p>
              </Link>
            </li>
            <li>
              <Link to="/allEvents">
                <p style={{ marginTop: "0", marginBottom: "0" }}>
                  Tous les Événements
                </p>
              </Link>
            </li>
          </ul>
        )}
      </li>
    </div>
  );
}

export default Events;
