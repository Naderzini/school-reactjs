import React from "react";

function StaticCard(props) {
  const { total, name } = props;
  return (
    <div>
      <div className="">
        <div className="card card-coin m-1">
          <div className="card-body text-center">
            <h2 className="text-black mb-2 ">{name}</h2>
            <h6 className="text-black mb-2 ">{total}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaticCard;
