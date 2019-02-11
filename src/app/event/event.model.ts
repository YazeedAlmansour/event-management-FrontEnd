export class Events {
  constructor(
  public eventnumber: number,
  public eventname: string,
  public eventlocation: string,
  public eventcapacity: number,
  public eventdate: string,
  public eventtime: string,
  public eventapproval: boolean,
  public orgid: number,
  public counter: number) {}
}
