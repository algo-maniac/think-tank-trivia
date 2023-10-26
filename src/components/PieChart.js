import React, { useContext, useEffect, useState } from 'react'
import "./analytics.css"
import { ArcElement, Chart as ChartJs, Title, Tooltip } from "chart.js"
import { Pie } from 'react-chartjs-2'
import UserContext from '@/context/userContext/userContext'
ChartJs.register(
    ArcElement,
    Tooltip,
    Title
)


const PieChart = () => {

    const [chart, setChart] = useState();
    const { user } = useContext(UserContext);

    const userId = user._id;
    // const userId = '652a37c6038f4853dbb850d3';
    // const userId = '65365d82c88be9f7f0f1b034';

    useEffect(() => {

        const fetchData = async () => {
            await fetch(`/api/analytics/user/${userId}`, {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                }
            }).then((data)=>{
                return data.json();
            }).then((data)=>{
                //console.log(data);
                setChart(data.data);
            }).catch((e)=>{
                //console.log(e);
            })
        }

        fetchData();

    }, [userId]);


    const user_response = chart?.responses_no;
    const total_form = chart?.total_forms;
    const remaining = total_form - user_response;
    const data = {
        labels: ['solved', 'remaining'],
        datasets: [{
            label: 'forms',
            data: [`${user_response}`,`${remaining}`],
            backgroundColor: ['#be123c', '#a21caf']
        }]
    }

    const options = {
        plugins: {
            legend: {
                position: 'right'
            },
            title: {
                display: true,
                text: "🙍‍♂️ Responses of Forms",
            }
        },
        resonsive: true,
        borderWidth: 2,
        hoverBorderWidth: 7,
        borderRadius: 5,

    }

    return (
        <>
            <Pie
                data={data}
                options={options}
            />
        </>
    )
}

export default PieChart