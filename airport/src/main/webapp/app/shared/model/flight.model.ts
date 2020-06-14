import { Moment } from 'moment';
import { ITicket } from 'app/shared/model/ticket.model';
import { IAirplane } from 'app/shared/model/airplane.model';
import { IAirport } from 'app/shared/model/airport.model';

export interface IFlight {
  id?: number;
  departure?: Moment;
  arrival?: Moment;
  ticketFS?: ITicket[];
  airplaneF?: IAirplane;
  airplane?: IAirplane;
  airport?: IAirport;
}

export class Flight implements IFlight {
  constructor(
    public id?: number,
    public departure?: Moment,
    public arrival?: Moment,
    public ticketFS?: ITicket[],
    public airplaneF?: IAirplane,
    public airplane?: IAirplane,
    public airport?: IAirport
  ) {}
}
