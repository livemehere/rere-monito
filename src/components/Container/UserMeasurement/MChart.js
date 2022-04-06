import React, { useRef,useEffect } from 'react';
import { Chart, registerables } from 'chart.js';



const labels =  ['happy',
                'natural',
                'angry',
                'sad',
                'suprised',
              ];

const data = {
    labels: labels,
    datasets: [
        {
        label: '집중도',
        data: [92,65,40,50,82],
        backgroundColor: [
            'rgb(255, 177, 193, 0.6)',
            'rgb(255, 207, 159, 0.6)',
            'rgb(255, 230, 170, 0.6)',
            'rgb(165, 223, 223, 0.6)',
            'rgb(154, 208, 245, 0.6)',
        ]
        }
    ]
};

const MChart = () => {

    const canvasDom = useRef(null);
    useEffect(() => {
      const ctx = canvasDom.current.getContext("2d");
        console.log(ctx);
        Chart.register(...registerables);
      new Chart(ctx, {
        type: "polarArea",
        data:data,
        options: {
            responsive: true,
            scales: {
              r: {
                pointLabels: {
                  display: true,
                  centerPointLabels: true,
                  font: {
                    size: 15
                  }
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom',
              },
            }
          }
      });
    }, []);

    return (
        <>
          <canvas ref={canvasDom}></canvas>   
        </>
    );
};

export default MChart;
