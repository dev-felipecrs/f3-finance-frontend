'use client'
import React from 'react'

import ApexCharts from 'react-apexcharts'

export default function Page() {
  const chartOptions = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Monthly Revenue',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: undefined,
      },
    },
    grid: {
      show: true,
    },
    colors: ['#1A2DD8'],  // Customize the color of the line
  };

  const chartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 150, 180], // Example data
    },
  ];
  return (
    <div className="bg-light-mode h-full w-full">
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  )
}
