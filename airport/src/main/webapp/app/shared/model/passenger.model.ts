import { ITicket } from 'app/shared/model/ticket.model';

export interface IPassenger {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  ticketP?: ITicket;
  ticket?: ITicket;
}

export class Passenger implements IPassenger {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public ticketP?: ITicket,
    public ticket?: ITicket
  ) {}
}
