import { IFlight } from 'app/shared/model/flight.model';

export interface IAirplane {
  id?: number;
  code?: string;
  flightAirplanes?: IFlight[];
}

export class Airplane implements IAirplane {
  constructor(public id?: number, public code?: string, public flightAirplanes?: IFlight[]) {}
}
