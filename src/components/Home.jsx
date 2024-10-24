import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Dashboard Statistik Fakultas",
    },
    xAxis: {
      categories: [
        "Fakultas Teknik",
        "Fakultas Ekonomi",
        "Fakultas Hukum",
        "Fakultas Ilmu Sosial",
      ],
      title: {
        text: "Fakultas",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Jumlah Mahasiswa",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Jumlah Mahasiswa",
        data: [150, 200, 100, 180], // Data contoh jumlah mahasiswa tiap fakultas
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
