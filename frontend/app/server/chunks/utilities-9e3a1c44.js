function exactAge(birth_date) {
  const AVERAGE_DAYS_IN_YEAR = 365.25;
  const MONTHS_IN_YEAR = 12;
  const DAYS_IN_WEEK = 7;
  const AVERAGE_DAYS_IN_MONTH = AVERAGE_DAYS_IN_YEAR / MONTHS_IN_YEAR;
  const MS_IN_YEAR = 315576e5;
  const MS_IN_DAY = 864e5;
  const MS_IN_MONTH = AVERAGE_DAYS_IN_MONTH * MS_IN_DAY;
  const MS_IN_WEEK = DAYS_IN_WEEK * MS_IN_DAY;
  const my_bd = new Date(birth_date).getTime();
  const now = new Date().getTime();
  let age_in_ms = now - my_bd;
  let myAge = { year: 0, months_over: 0, weeks_over: 0, days_over: 0 };
  myAge.year = Math.trunc(age_in_ms / MS_IN_YEAR);
  age_in_ms -= myAge.year * MS_IN_YEAR;
  myAge.months_over = Math.trunc(age_in_ms / MS_IN_MONTH);
  age_in_ms -= myAge.months_over * MS_IN_MONTH;
  myAge.weeks_over = Math.trunc(age_in_ms / MS_IN_WEEK);
  age_in_ms -= myAge.weeks_over * MS_IN_WEEK;
  myAge.days_over = Math.trunc(age_in_ms / MS_IN_DAY);
  return myAge;
}
const serializeNonPOJ = (data) => {
  if (data)
    return JSON.parse(JSON.stringify(data));
  return null;
};

export { exactAge as e, serializeNonPOJ as s };
//# sourceMappingURL=utilities-9e3a1c44.js.map
