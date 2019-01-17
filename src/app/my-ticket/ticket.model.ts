export class Ticket {
  constructor(
    public ticketnumber: number,
    public ticketconformed: boolean,
    public ticketdate: string,
    public eventtime: string,
    public eventname: string,
    public ticketRate: number,
    public ticketComment: string,
    public booked: boolean,
    public rated: boolean) {}
}
