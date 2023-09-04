export const getFormattedTodayDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

export const getFormattedTomorrowDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate() + 1;
  let lastDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0
  );
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  if (new Date() === lastDay) {
    month = targetDate.getMonth() + 2;
    date = `01`;
  }
  return `${year}-${month}-${date}`;
};
