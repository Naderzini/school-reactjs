import React from "react";

function Unauthorized() {
  return (
    <div>
      <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning"> 401</h2>
          <div className="error-content">
            <h3>Oops! Unauthorized.</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Unauthorized;
