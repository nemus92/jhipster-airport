import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFlight } from 'app/shared/model/flight.model';

type EntityResponseType = HttpResponse<IFlight>;
type EntityArrayResponseType = HttpResponse<IFlight[]>;

@Injectable({ providedIn: 'root' })
export class FlightService {
  public resourceUrl = SERVER_API_URL + 'api/flights';

  constructor(protected http: HttpClient) {}

  create(flight: IFlight): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(flight);
    return this.http
      .post<IFlight>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(flight: IFlight): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(flight);
    return this.http
      .put<IFlight>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFlight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFlight[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(flight: IFlight): IFlight {
    const copy: IFlight = Object.assign({}, flight, {
      departure: flight.departure && flight.departure.isValid() ? flight.departure.toJSON() : undefined,
      arrival: flight.arrival && flight.arrival.isValid() ? flight.arrival.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.departure = res.body.departure ? moment(res.body.departure) : undefined;
      res.body.arrival = res.body.arrival ? moment(res.body.arrival) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((flight: IFlight) => {
        flight.departure = flight.departure ? moment(flight.departure) : undefined;
        flight.arrival = flight.arrival ? moment(flight.arrival) : undefined;
      });
    }
    return res;
  }
}
