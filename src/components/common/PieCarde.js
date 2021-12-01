import React from "react";
import { Pie } from "react-chartjs-2";

function PieCarde(props) {
  const { backgroundColorMan, backgroundColorWoman, Men, Women, cardTitle } =
    props;
  const data = {
    datasets: [
      {
        data: [Men, Women],
        backgroundColor: [backgroundColorMan,backgroundColorWoman],
      },
    ],
    labels: ["Homme", "Femme"],
  };
  return (
    <div className="card m-2 ">
      <h3 className="card-title ml-3 mt-3">{cardTitle}</h3>
      <hr></hr>
      <Pie data={data} />
    </div>
  );
}

export default PieCarde;
