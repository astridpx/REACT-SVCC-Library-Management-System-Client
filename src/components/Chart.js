import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// xaxis: {
//   type: "datetime",
//   min: Date.now() - 7 * 86400000, // Where the 6 is the number of days
//   max: Date.now(), // Today
// },

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// const day = weekdays[new Date().getDay()];
// console.log(day);

const past7Days = [...Array(7).keys()].map((index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  // return weekdays[date.getDay()];
  return date.toDateString();
});

const BarChart = () => {
  const { D1, D2, D3, D4, D5, D6, D7 } = useSelector(
    (state) => state.graphSlice
  );

  const series = [
    {
      name: "Students",
      data: [D7, D6, D5, D4, D3, D2, D1],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: false,
      },
      export: {
        svg: {
          filename: "student-graph-for-past-7days",
        },
        png: {
          filename: "student-graph-for-past-7days",
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
      },
    },

    colors: ["#00E396"],
    dataLabels: {
      enabled: false,
    },

    title: {
      text: "Student Borrowers Past 7 Days",
      align: "center",
    },

    xaxis: {
      categories: past7Days,
      labels: {
        style: {
          fontSize: "10px",
        },
        trim: true,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      min: 0,
      max: 50,
    },
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default BarChart;
