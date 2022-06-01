import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

const MChart = ({ data, labels }) => {
  
  const canvasDom = useRef(null);
  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");
    Chart.register(...registerables);
    new Chart(ctx, {
      type: "polarArea",
      data: data,
      options: {
        responsive: true,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 15,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }, []);

  return (
    <>
      <canvas ref={canvasDom}></canvas>
    </>
  );
};

export default MChart;
