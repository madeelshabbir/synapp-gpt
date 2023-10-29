import React, { useRef, useEffect, useState } from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Days, Months, Weeks, HalfYear } from './data'
//import { ApiServer } from "../../ApiConstant";
import { ApiServer } from "../../ApiConstant";

import { Client, Databases, Query } from "appwrite";

import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const BarChart = ({ duration}) => {
    const [durations, setDurations] = useState(Days)
    const [dataa, setDataa] = useState([]);
    const [month,setMonth] = useState ([20,40,60,70])
    const [year,setYear] = useState ([10,20,30,40,50,60,70,80,90,92,96,98])
   // const [dat, setDat] = useState([]);
   const access_token = localStorage.getItem('access_token');

   const client = new Client();

   client 
       .setEndpoint('https://cloud.appwrite.io/v1')
       .setProject('64b4cb0d1b60dd5e3a99');
 
   const databases = new Databases(client);
   const fetchDataforChart = async () => {
     

    try {
      const response = await axios.get(ApiServer+'/api/admin/chart-data/');

  
      if (response)
      {
         const data=response.data 
         setMonth(data.month)
         setYear(data.year)
         setDataa(data.days);

      }
    
     
      
   
      // ... do something with the response data
    } catch (error) {
      // Handle error
      console.error(error);
   
    
      // ... handle the error
    }
  };

   useEffect(() => {
    if (access_token)
    {
        fetchDataforChart();

    }
   


  }, [access_token]);

  useEffect(()=>{
    const promise = databases.listDocuments('64b5432b9e32fda9235a', '64b543388c228bcdb92f');
    promise.then(function (response) {
    
    // setChatdata(response['documents'])
  }, function (error) {
     
      console.log(error); // Failure
  });

  },[])

    useEffect(() => {
        duration == '7 Days' && setDurations(Days)

        duration == '1 Month' && setDurations(Weeks)

        duration == '6 Month' && setDurations(HalfYear)

        duration == '1 Year' && setDurations(Months)
    }, [duration])

    const [chartData, setChartData] = useState({ datasets: [] })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
       
        setChartData({
            labels: durations.map((data) => data),
            datasets: [
                {
                    borderRadius: 100,
                    barPercentage: 1,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    backgroundColor: '#BD6EC3',
                    borderColor: 'rgba(0,0,0,0.2)',
                    data:
                    duration === '1 Year'
                    ? year
                    : duration === '7 Days'
                    ? dataa
                    //[70, 70, 25, 40, 23, 60, 70]
                    : duration === '1 Month'
                    ? month
                    //  [
                    //       120, 120, 25, 40, 23, 60, 70, 64, 20, 30, 40,
                    //       50, 15, 20, 25, 40, 23, 60, 70, 64, 20, 30,
                    //       40, 50, 70, 64, 20, 30, 40, 50,
                    //   ]
                    : dataa,
                    // [0,0,0,20,10,0,0], 
                            
                },
            ],
        })
        setChartOptions({
            responsive: true,
            plugins: {
                grouped: true,
                legend: {
                    display: false,
                    // position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Activity',
                    // style: {
                    //     textDecorationStyle: 'wavy',
                    // },
                },
            },

            scales: {
                x: {
                    position: 'bottom',
                    grid: {
                        drawBorder: false,
                        offset: false,
                        color: '#49494E',
                        // display: false,
                        // drawOnChartArea: true
                    },
                        // labels: ['Great', 'Good', 'OK', 'Poor', 'Bad'],
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        // color: 'white',
                        stepSize: 25,
                        callback: function (value) {
                            return `${value}%`
                        },
                    },
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                    max: 100,
                    // labels: ['Great', 'Good', 'OK', 'Poor', 'Bad'],
                },
                // y: {
                //     type: 'category',
                //     labels: ['Great', 'Good', 'OK', 'Poor', 'Bad'],
                // },
            },
        })
    }, [durations,dataa])

    const ref = useRef()

    return (
        <div className="w-full h-full">
            <Bar options={chartOptions} ref={ref} data={chartData} />
        </div>
    )
}
