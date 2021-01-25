interface ITotalPerDay {
  day: Date;
  total: number;
}
export interface IObjectTotalPerDayToSave {
  [key: string]: ITotalPerDay;
}
export default interface ICreateOrUpdateDailyEarnings {
  objectTotalPerDayToSave: IObjectTotalPerDayToSave;
  objectTotalPerDaySaved: IObjectTotalPerDayToSave;
}
