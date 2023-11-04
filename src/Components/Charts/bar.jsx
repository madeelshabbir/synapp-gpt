import React, { useRef, useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Days, Months, Weeks, HalfYear } from './data';

import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ duration }) => {
  const [durations, setDurations] = useState(Days);
  const [data, setdata] = useState([]);
  const [month, setMonth] = useState([20, 40, 60, 70]);
  const [year, setYear] = useState([10, 20, 30, 40, 50, 60, 70, 80, 90, 92, 96, 98]);
  const access_token = localStorage.getItem('access_token');
  const fetchDataforChart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/statistics/`);
      if (response) {
        const responseData = response.data; // Use a different variable name here
        setMonth(responseData.month);
        setYear(responseData.year);
        setdata(responseData.days);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchDataforChart();
    }
  }, [access_token]);

  useEffect(() => {
    duration === '7 Days' && setDurations(Days);
    duration === '1 Month' && setDurations(Weeks);
    duration === '1 Year' && setDurations(Months);
  }, [duration]);

  const [chartData, setChartData] = useState({ datasets: [] });

  const [chartOptions, setChartOptions] = useState({});

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
              ? data
              : duration === '1 Month'
              ? month
              : data,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        grouped: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: 'Activity',
        },
      },

      scales: {
        x: {
          position: 'bottom',
          grid: {
            drawBorder: false,
            offset: false,
            color: '#49494E',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 25,
            callback: function (value) {
              return `${value}%`;
            },
          },
          grid: {
            drawBorder: false,
            display: false,
          },
          max: 100,
        },
      },
    });
  }, [durations, data]);

  const ref = useRef();

  return (
    <div className="w-full h-full">
      <Bar options={chartOptions} ref={ref} data={chartData} />
    </div>
  );
};
