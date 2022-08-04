import { Percent, UnlimitedPercent } from "./types";

export const getPercentageNumber = (percent: Percent | UnlimitedPercent) => {
  const number = /\d+/.exec(percent)?.[0];
  return Number(number);
};
