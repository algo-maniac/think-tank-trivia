import React, { useContext, useEffect, useState } from 'react'
import "./analytics.css"
import { ArcElement, Chart as ChartJs, Title, Tooltip } from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import UserContext from '@/context/userContext/userContext'
ChartJs.register(
    ArcElement,
    Tooltip,
    Title,
)

const DoughnutChart = () => {

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
            }).then((data) => {
                return data.json();
            }).then((data) => {
                // console.log(data);
                setChart(data.data);
            }).catch((e) => {
                // console.log(e);
            })
        }

        fetchData();

    }, [userId]);


    const user_form = chart?.forms_no;
    const total_form = chart?.total_forms;
    const other_form = total_form-user_form;
    // var user_form_percentage = ((user_form / total_form) * 100).toFixed(2);
    // var remaining_percentage = (100 - user_form_percentage).toFixed(2);
    // console.log(user_form_percentage, remaining_percentage);

    const data = {
        labels: ['me', 'others'],
        datasets: [{
            label: 'forms created',
            // data: [`${user_form}`, `${total_form}`],
            data: [`${user_form}`, `${other_form}`],
            backgroundColor: ['#083344', '#be185d']
        }]
    }

    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: "🙍‍♂️ Creation of Forms",
            },
        },
        legend : {
            display:true,
            labels:{
                fontSize : 15
            }
        },
        resonsive: true,
        borderWidth: 2,
        hoverBorderWidth: 7,
        borderRadius: 5,

    }
    return (
        <>
            <Doughnut
                data={data}
                options={options}
            />
        </>
    )
}

export default DoughnutChart