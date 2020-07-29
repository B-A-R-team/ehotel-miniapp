const formatTime = (date, isShort) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  if (isShort) {
    return [year, month, day].map(formatNumber).join('-');
  }
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
 * 判断该月是否有31天
 * @param {number} month 月份
 */
const is31 = (month) => {
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return true;
  }
};

/**
 * 计算闰年
 * @param {numebr} year 年份
 */
const isLeapYear = (year) => {
  return (year % 100 != 0 && year % 4 == 0) || year % 400 == 0;
};

module.exports = {
  formatTime: formatTime,
  is31: is31,
  isLeapYear: isLeapYear,
};
