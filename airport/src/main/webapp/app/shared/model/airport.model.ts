import { ILocation } from 'app/shared/model/location.model';
import { IFlight } from 'app/shared/model/flight.model';

export interface IAirport {
  id?: number;
  name?: string;
  location?: ILocation;
  flightAirports?: IFlight[];
}

export class Airport implements IAirport {
  constructor(public id?: number, public name?: string, public location?: ILocation, public flightAirports?: IFlight[]) {}
}
