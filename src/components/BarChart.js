import React from 'react'
import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title, TimeScale} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import "./analytics.css"
ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    TimeScale
);
const BarChart = () => {

    const date = new Date();
    const dates = [];
    const dp = [];
    // console.log(date.getMonth());
    for(let i=0;i<7;i++){
        dates.push(new Date(date.valueOf() + i*1000*60*60*24));
        // dp.push(i);
    }
    dp.push(5);
    dp.push(10);
    dp.push(13);
    dp.push(7);
    dp.push(15);
    dp.push(11);
    dp.push(4);
    const month = date.toLocaleString('default',{month:'short'});
    console.log(dates);
    console.log(dp);
    const data = {
        // labels: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        labels: dates,
        datasets: [{
            label: 'Votes',
            // data: [12, 5, 15, 3, 9, 13, 7],
            data:dp,
            borderWidth: 1,
            backgroundColor: [
                '#d946ef',
                '#ec4899',
                '#8b5cf6',
                '#450a0a',
                '#0ea5e9',
                '#14b8a6',
                '#facc15'
            ],
            borderColor: [
                //    '#134e4a'
                '#f87171'
            ]
        }]
    }
    const options = {
        indexAxis: 'x',
        // maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 20,
                ticks: {
                    stepSize: 2
                },
                grid: {
                    display: false
                  }
            },
            x: {
                grid: {
                  display: false
                },
                type:'time',
                time:{
                    unit:'hour'
                },
                ticks:{
                    autoSkip : true
                }
              }
        },
        responsive: true,
        plugins: {
            legend: {
                label: {
                    fontSize: 26
                }
            },
            title: {
                display: true,
                text: "dummy chart"
            }
        }
    }

    return (
        <>
            <Line
                data={data}
                options={options}
            />
        </>
    )
}

export default BarChart