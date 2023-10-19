import React from 'react'
import "./analytics.css"
import { ArcElement, Chart as ChartJs, Title, Tooltip } from "chart.js"
import { Doughnut } from 'react-chartjs-2'
ChartJs.register(
    ArcElement,
    Tooltip,
    Title
)

const data = {
    labels: ['me', 'others'],
    datasets: [{
        label: 'forms created',
        data: [5, 10],
        backgroundColor: ['#083344', '#be185d']
    }]
}

const options = {
    plugins: {
        legend: {
           position: 'right'
        },
        title:{
            display:true,
            text:"🙍‍♂️ Creation of Forms",
         }
     },
     resonsive:true,
     borderWidth: 2,
     hoverBorderWidth : 7,
     borderRadius:5,
     
}

const DoughnutChart = () => {
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