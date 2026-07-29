const getDateRanges = () => {
  const now = new Date();

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const week = new Date(now);
  week.setDate(now.getDate() - 7);

  const month = new Date(now);
  month.setMonth(now.getMonth() - 1);

  return {
    today,
    week,
    month,
  };
};

module.exports = {
  getDateRanges,
};
