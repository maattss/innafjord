import { GroupStateData } from "../pages/index";
import { TurbineData } from "../pages/turbines";

export const getDummyPowerPrice = () => {
  return Math.round(Math.random() * 1000);
};

export const getDummyMoney = () => {
  return Math.round(Math.random() * 1000_000_000);
};

export const getDummyWaterLevel = () => {
  return Math.round(Math.random() * 50);
};

export const getDummyGroupStateData = () => {
  const data: GroupStateData = {
    groupName: "Gruppe 1",
    money: getDummyMoney(),
    waterLevel: getDummyWaterLevel(),
    environmentCost: getDummyMoney(),
  };
  return data;
};

export const getDummyTurbinesData = () => {
  const data: TurbineData[] = [];
  for (let i = 0; i < 14; i++) {
    data.push({
      id: getRandomUUID(),
      capacityUsage: Math.random(),
    });
  }
  return data;
};

const getRandomUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
