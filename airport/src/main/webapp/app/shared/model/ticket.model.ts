import { IPassenger } from 'app/shared/model/passenger.model';
import { IFlight } from 'app/shared/model/flight.model';

export interface ITicket {
  id?: number;
  passengers?: IPassenger[];
  flight?: IFlight;
}

export class Ticket implements ITicket {
  constructor(public id?: number, public passengers?: IPassenger[], public flight?: IFlight) {}
}
