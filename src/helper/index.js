import moment from "moment";

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

const isNumber = (value) => {
  if (value !== undefined && value !== null) {
    const check = Number.isInteger(value);
    if (check) {
      return value;
    } else {
      value = value.toString();
      value = value.slice(0, value.indexOf(".") + 3);
      return Number(value);
    }
  } else {
    return 0;
  }
};

export const calc = (num) => {
  if (num !== undefined) {
    const calVolumn = isNumber(parseFloat(num));
    return calVolumn;
  } else {
    return 0;
  }
};

export const CalcOneDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 2);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcTwoDigit = (num) => {
  if (num !== undefined) {
    num = num?.toString();
    num = num?.slice(0, num.indexOf(".") + 3);
    return Number(num);
  } else {
    return 0;
  }
};

export const CalcThreeDigit = (num) => {
  if (num !== undefined) {
    const check = Number.isInteger(num);

    if (check) {
      return Number(num);
    } else {
      num = num?.toString();
      num = num?.slice(0, num.indexOf(".") + 4);
      return Number(num);
    }
  } else {
    return 0;
  }
};

export const numFormatter = (num) => {
  if (num !== undefined) {
    if (num >= 1000 && num < 1000000) {
      return isNumber(num / 1000) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000 && num < 1000000000) {
      return isNumber(num / 1000000) + "M"; // convert to M for number from > 1 million
    } else if (num >= 1000000000) {
      return isNumber(num / 1000000000) + "B";
    } else if (num < 1000) {
      return isNumber(num); // if value < 1000, nothing to do
    }
  } else {
    return 0;
  }
};

export const CalcFiveDigit = (num) => {
  if (num !== undefined) {
    num = num.toString();
    num = num.slice(0, num.indexOf(".") + 6);
    return Number(num);
  } else {
    return 0;
  }
};

export const DataFormatter = (number) => {
  if (number > 1000000000) {
    return `$${isNumber(number / 1000000000).toString()}B`;
  } else if (number > 1000000) {
    return `$${isNumber(number / 1000000).toString()}M`;
  } else if (number > 1000) {
    return `$${isNumber(number / 1000).toString()}K`;
  } else {
    return `$${isNumber(number)}`;
  }
};

export const con_to_Percent = (decimal) => {
  return `${isNumber(decimal)}%`;
};

export const getDate = (timestamp_measured) => {
  return moment(timestamp_measured).format("MMM Do YY, h:mm a");
};

export const toPercent = (decimal, fixed) =>
  `${(decimal * 100).toFixed(fixed)}%`;

export const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

export const DataFormatter1 = (number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};
