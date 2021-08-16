import { getSortedMonthData } from "./arrangeData";

export const getSortedMonthWaterLevel = () => {
  const monthData = getSortedMonthData();
  const monthWaterLevel: number[] = [];
  for (let i = 0; i < monthData.length; i++) {
    monthWaterLevel.push(monthData[i].waterlevel);
  }
  return monthWaterLevel;
};

export const getSortedMonthProduction = () => {
  const monthData = getSortedMonthData();
  const monthProduction: number[] = [];

  for (let i = 0; i < monthData.length; i++) {
    let totalProduction = 0;
    for (let j = 0; j < monthData[i].turbines.length; j++) {
      totalProduction += monthData[i].turbines[j].production;
    }
    monthProduction.push(totalProduction);
  }
  return monthProduction;
};

export const getSortedMonthPowerPrice = () => {
  const monthData = getSortedMonthData();
  const monthPowerPrice: number[] = [];

  for (let i = 0; i < monthData.length; i++) {
    monthPowerPrice.push(monthData[i].powerPrice);
  }
  return monthPowerPrice;
};

export const getSortedMonthEarnings = () => {
  const monthData = getSortedMonthData();
  const monthEarnings: number[] = [];

  for (let i = 0; i < monthData.length; i++) {
    monthEarnings.push(monthData[i].money);
  }

  return monthEarnings;
};

export const getSortedMonthEnvironmentalCost = () => {
  const monthData = getSortedMonthData();
  const monthEnvironmentalCost: number[] = [];

  for (let i = 0; i < monthData.length; i++) {
    monthEnvironmentalCost.push(monthData[i].environmentCost);
  }

  return monthEnvironmentalCost;
};
