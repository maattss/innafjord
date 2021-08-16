import { getSortedWeekData } from "./arrangeData";

export const getSortedWeekWaterLevel = () => {
  const weekData = getSortedWeekData();
  const weekWaterLevel: number[] = [];
  for (let i = 0; i < weekData.length; i++) {
    weekWaterLevel.push(weekData[i].waterlevel);
  }
  return weekWaterLevel;
};

export const getSortedWeekProduction = () => {
  const weekData = getSortedWeekData();
  const weekProduction: number[] = [];
  for (let i = 0; i < weekData.length; i++) {
    let totalProduction = 0;
    for (let j = 0; j < weekData[i].turbines.length; j++) {
      totalProduction += weekData[i].turbines[j].production;
    }
    weekProduction.push(totalProduction);
  }
  return weekProduction;
};

export const getSortedWeekPowerPrice = () => {
  const weekData = getSortedWeekData();
  const weekPowerPrice: number[] = [];
  for (let i = 0; i < weekData.length; i++) {
    weekPowerPrice.push(weekData[i].powerPrice);
  }
  return weekPowerPrice;
};

export const getSortedWeekEarnings = () => {
  const weekData = getSortedWeekData();
  const weekEarnings: number[] = [];
  for (let i = 0; i < weekData.length; i++) {
    weekEarnings.push(weekData[i].money);
  }
  return weekEarnings;
};

export const getSortedWeekEnvironmentalCost = () => {
  const weekData = getSortedWeekData();
  const weekEnvironmentalCost: number[] = [];
  for (let i = 0; i < weekData.length; i++) {
    weekEnvironmentalCost.push(weekData[i].environmentCost);
  }
  return weekEnvironmentalCost;
};
