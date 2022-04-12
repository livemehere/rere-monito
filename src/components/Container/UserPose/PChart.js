import React, { useRef,useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

const labels =  ['good',
                'bad',
              ];

const data = {
    labels: labels,
    datasets: [
        {
        label: '자세',
        data: [92,30],
        backgroundColor: [
            'rgb(255,146 ,149 , 0.6)',
            'rgb(154, 137, 245, 0.6)',
        ]
        }
    ]
};

const PChart = () => {

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

export default PChart;