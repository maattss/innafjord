export const graphOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const getGraphDataSet = (graphData: number[], graphLabels: string[]) => {
  return {
    labels: graphLabels,
    datasets: [
      {
        data: graphData,
        backgroundColor: "rgb(0, 181, 216, 0.5)",
        borderColor: "rgb(0, 181, 216, 0.5)",
      },
    ],
  };
};
