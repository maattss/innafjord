import { getSortedDayData } from "./arrangeData";

export const getSortedDayWaterLevel = () => {
  const dayData = getSortedDayData();
  const dayWaterLevel: number[] = [];
  for (let i = 0; i < dayData.length; i++) {
    dayWaterLevel.push(dayData[i].waterlevel);
  }
  return dayWaterLevel;
};

export const getSortedDayProduction = () => {
  const dayData = getSortedDayData();
  const dayProduction: number[] = [];
  for (let i = 0; i < dayData.length; i++) {
    let totalProduction = 0;
    for (let j = 0; j < dayData[i].turbines.length; j++) {
      totalProduction += dayData[i].turbines[j].production;
    }
    dayProduction.push(totalProduction);
  }
  return dayProduction;
};

export const getSortedDayPowerPrice = () => {
  const dayData = getSortedDayData();
  const dayPowerPrice: number[] = [];
  for (let i = 0; i < dayData.length; i++) {
    dayPowerPrice.push(dayData[i].powerPrice);
  }
  return dayPowerPrice;
};

export const getSortedDayEarnings = () => {
  const dayData = getSortedDayData();
  const dayEarnings: number[] = [];
  for (let i = 0; i < dayData.length; i++) {
    dayEarnings.push(dayData[i].money);
  }
  return dayEarnings;
};

export const getSortedDayEnvironmentalCost = () => {
  const dayData = getSortedDayData();
  const dayEnvironmentalCost: number[] = [];
  for (let i = 0; i < dayData.length; i++) {
    dayEnvironmentalCost.push(dayData[i].environmentCost);
  }
  return dayEnvironmentalCost;
};
