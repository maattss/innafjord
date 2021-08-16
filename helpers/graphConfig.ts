export const graphOptions = {
  scales: {
    x: {
      grid: {
        color: "rgb(45, 55, 72)", // Horizontal grid colour
        borderColor: "rgb(45, 55, 72)", // X-axis color
      },
      ticks: {
        beginAtZero: false,
      },
    },
    y: {
      grid: {
        color: "rgb(45, 55, 72)", // Horizontal grid colour
        borderColor: "rgb(45, 55, 72)", // Y-axis color
      },
      ticks: {
        beginAtZero: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const getGraphDataset = (graphData: number[], graphLabels: string[]) => {
  return {
    labels: graphLabels,
    datasets: [
      {
        data: graphData,
        backgroundColor: "rgb(0, 181, 216, 0.5)", // Graph data points color
        borderColor: "rgb(0, 181, 216, 0.5)", // Graph line color
      },
    ],
  };
};
