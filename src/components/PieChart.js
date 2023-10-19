import React from 'react'
import "./analytics.css"
import { ArcElement, Chart as ChartJs, Title, Tooltip } from "chart.js"
import { Pie } from 'react-chartjs-2'
ChartJs.register(
    ArcElement,
    Tooltip,
    Title
)

const data = {
    labels: ['me', 'others'],
    datasets: [{
        label: 'forms created',
        data: [3, 19],
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
            text:"🙍‍♂️ Responses of Forms",
         }
     },
     resonsive:true,
     borderWidth: 2,
     hoverBorderWidth : 7,
     borderRadius:5,
     
}

const PieChart = () => {
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