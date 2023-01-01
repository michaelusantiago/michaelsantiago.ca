/** These are all global the utilities, functions, etc.. */
export type Age = {
    year: number
    months_over: number
    weeks_over: number
    days_over: number
}

export function exactAge(birth_date: string): Age {
    const AVERAGE_DAYS_IN_YEAR = 365.25;
    const MONTHS_IN_YEAR = 12;
    const DAYS_IN_WEEK = 7;
    const AVERAGE_DAYS_IN_MONTH = (AVERAGE_DAYS_IN_YEAR / MONTHS_IN_YEAR);
    const MS_IN_YEAR = 31557600000 // no. of milliseconds in a year
    const MS_IN_DAY = 86400000 // no. of milliseconds in a day
    const MS_IN_MONTH = AVERAGE_DAYS_IN_MONTH * MS_IN_DAY;
    const MS_IN_WEEK = DAYS_IN_WEEK * MS_IN_DAY;
  
    const my_bd = new Date(birth_date).getTime();
    const now = new Date().getTime();
  
    let age_in_ms = (now - my_bd);
    let myAge: Age = {year: 0, months_over: 0, weeks_over: 0, days_over: 0};
  
    // Years
    myAge.year = Math.trunc(age_in_ms / MS_IN_YEAR);
    age_in_ms -= (myAge.year * MS_IN_YEAR); // Update the my_age_in_ms by subracting number of years
  
    // Months over
    myAge.months_over = Math.trunc(age_in_ms / MS_IN_MONTH);
    age_in_ms -= (myAge.months_over * MS_IN_MONTH);
  
    // Weeks over
    myAge.weeks_over = Math.trunc(age_in_ms / MS_IN_WEEK);
    age_in_ms -= (myAge.weeks_over * MS_IN_WEEK);
  
    // Days over
    myAge.days_over = Math.trunc(age_in_ms / MS_IN_DAY);
  
    return (myAge);
}

export const serializeNonPOJ = (data: any) => {
    if (data) return JSON.parse(JSON.stringify(data));
    return null
}