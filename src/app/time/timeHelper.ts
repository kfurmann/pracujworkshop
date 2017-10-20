export class TimeHelper {

  public static calculateSecondsUntil(until): number {
    return Math.floor((until.getTime() - (new Date()).getTime()) / 1000);
  }

  constructor() { }

}
