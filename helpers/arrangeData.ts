import mockDay from "../data/mockDay.json";
import mockWeek from "../data/mockWeek.json";
import mockMonth from "../data/mockMonth.json";

export type mockData = {
  money: number;
  waterlevel: number;
  environmentCost: number;
  powerPrice: number;
  timestamp: string;
  turbines: {
    id: number;
    capasityUsage: number;
    production: number;
  }[];
};

export const getSortedDayData = () => {
  const dayDataSorted: mockData[] = mockDay.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });

  return dayDataSorted;
};

export const getSortedDayLabels = () => {
  const timeLabels: string[] = [];

  const dayDataSorted: mockData[] = mockDay.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });

  for (let i = 0; i < dayDataSorted.length; i++) {
    timeLabels.push(
      new Date(dayDataSorted[i].timestamp).toUTCString().slice(17, 26)
    );
  }
  return timeLabels;
};

export const getSortedWeekData = () => {
  const weekDataSorted: mockData[] = mockWeek.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });

  return weekDataSorted;
};

export const getSortedWeekLabels = () => {
  const weekDataSorted: mockData[] = mockWeek.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });

  const timeLabels: string[] = [];

  for (let i = 0; i < weekDataSorted.length; i++) {
    timeLabels.push(
      new Date(weekDataSorted[i].timestamp).toUTCString().slice(17, 26)
    );
  }
  return timeLabels;
};

export const getSortedMonthData = () => {
  const monthDataSorted: mockData[] = mockMonth.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });
  return monthDataSorted;
};

export const getSortedMonthLabels = () => {
  const monthDataSorted: mockData[] = mockMonth.sort(function (a, b) {
    return +new Date(a.timestamp) - +new Date(b.timestamp);
  });

  const timeLabels: string[] = [];

  for (let i = 0; i < monthDataSorted.length; i++) {
    timeLabels.push(
      new Date(monthDataSorted[i].timestamp).toUTCString().slice(17, 26)
    );
  }
  return timeLabels;
};
