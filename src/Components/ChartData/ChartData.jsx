import React from 'react'
import { Chart } from "react-google-charts";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

export const data = [
    ["Ville", "Lead", "Verifié", "RDV"],
    ["Hors Zones", 55, 23, 32],
    ["",0, 0, 0],
    ["Paris", 40, 30, 20],
    ["",0, 0, 0],
    ["Metz", 43, 30, 25],
    ["",0, 0, 0],
    ["Nancy", 47, 43, 29],
    ["",0, 0, 0],
    ["Strasbourg", 45, 10, 3],
    ["",0, 0, 0],
    ["Toulon", 25, 10, 5],
  ];
  
function ChartData() {
  return (
    <Chart
    chartType="ColumnChart"
    width="100%"
    borderRadius="20px"
    data={data}
    lloader={<LoadingSpinner/>}
    options={{
      height: 450,
      // width:1200,
      spacing: 23,
      legendTextStyle: { color: "#FFF" },
      titleTextStyle: { color: "#FFF" },
      isStacked: false,
      bar: { groupWidth: "100%" },
      vAxis: {
        textStyle: { color: "#FFF" },
      },
      hAxis: {
        textStyle: { color: "#FFF" },
      },
      chartArea: {
        title: "Data",
      },
      backgroundColor: {
        fill: "transparent",
      },
      chart: {
        backgroundColor: {
          fill: "transparent",
        },
        title: "Data",
        fill: "#0000000",
      },
      colors: ["#1F7196", "#D00062", "#4991B9"],
    }}
  />
  )
}

export default ChartData