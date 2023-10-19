import React, { useContext, useEffect, useState } from 'react'
import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title, TimeScale } from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import "./analytics.css"
import UserContext from '@/context/userContext/userContext';
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
    const [chart, setChart] = useState();
    const { user } = useContext(UserContext);

    // const userId = user._id;
    const userId = '652a37c6038f4853dbb850d3';
    useEffect(() => {
        const fetchData = async () => {
            await fetch(`/api/analytics/user/${userId}/${3}`, {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data.data);
                setChart(data.data);
                // console.log(data.data.forms[0].date);
            }).catch((e) => {
                console.log(e);
            })
        }

        fetchData();
    }, []);

    const date = new Date();
    const dates = [];
    // const dates = ['12:10:2022','13:10:2022','14:10:2022','15:10:2022','16:10:2022','17:10:2022','18:10:2022'];
    // const dates = ['2022-10-12','2022-10-13','2022-10-14','2022-10-15','2022-10-16','2022-10-17','2022-10-18']
    const dp = [];
    // console.log(date.getMonth());
    // const newdate = new Date(date.valueOf() - 1000*60*60*24);
    for (let i = 0; i <= 7; i++) {
        dates.push(new Date(date.valueOf() - i * 1000 * 60 * 60 * 24));
    // dp.push(i);
    }

    dp.push(5);
    dp.push(10);
    dp.push(13);
    dp.push(7);
    // dp.push(0);
    // dp.push(0);
    // dp.push(0);
    dp.push(0);
    dp.push(0);
    dp.push(0);
    // const month = date.toLocaleString('default',{month:'short'});
    // console.log(date);
    // console.log(dp);


    // const newDates = chart?.forms?.map((x)=>x.date);
    // const store = [];
    // newDates?.forEach(myFunction);
    // function myFunction(date){
    //     store.push(date);
    // }

    // console.log(store);

    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);

    const data = {
        labels: [dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6]],
        // labels : start,
        datasets: [{
            label: 'Votes',
            data: [12, 5, 15, 3, 9, 13],
            // data: [
            //     { x: "2023-11-1", y: 12 },
            //     { x: "2023-11-2", y: 5 },
            //     { x: "2023-11-3", y: 15 },
            //     { x: "2023-11-4", y: 3 },
            //     { x: "2023-11-5", y: 9 },
            //     { x: "2023-11-6", y: 13 },
            //     { x: "2023-11-7", y: 7 },
            // ],
            // data : chart?.forms?.map((x)=>10),
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
                type: 'time',
                time: {
                    // min: start,
                    // max: end,
                    unit: "day"
                    // parser:'yyyy:mm:dd'
                },
                ticks: {
                    autoSkip: false,
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