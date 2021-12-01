import React from "react";
import { Spinner } from "react-bootstrap";

function SprintLoding() {
  return (
    <div>
      <div className="swal-overlay swal-overlay--show-modal" tabIndex={-1}>
        <div
          className="swal-modal"
          role="dialog"
          aria-modal="true"
          style={{ width: "5em" }}
        >
          <div className="swal-title">
            <Spinner
              animation="border"
              variant="primary"
              style={{
                width: "113.5px",
                height: "113.5px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SprintLoding;
