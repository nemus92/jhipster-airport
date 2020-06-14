import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFlight, Flight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { IAirplane } from 'app/shared/model/airplane.model';
import { AirplaneService } from 'app/entities/airplane/airplane.service';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from 'app/entities/airport/airport.service';

type SelectableEntity = IAirplane | IAirport;

@Component({
  selector: 'jhi-flight-update',
  templateUrl: './flight-update.component.html',
})
export class FlightUpdateComponent implements OnInit {
  isSaving = false;
  airplanes: IAirplane[] = [];
  airports: IAirport[] = [];

  editForm = this.fb.group({
    id: [],
    departure: [],
    arrival: [],
    airplaneF: [],
    airplane: [],
    airport: [],
  });

  constructor(
    protected flightService: FlightService,
    protected airplaneService: AirplaneService,
    protected airportService: AirportService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ flight }) => {
      if (!flight.id) {
        const today = moment().startOf('day');
        flight.departure = today;
        flight.arrival = today;
      }

      this.updateForm(flight);

      this.airplaneService.query().subscribe((res: HttpResponse<IAirplane[]>) => (this.airplanes = res.body || []));

      this.airportService.query().subscribe((res: HttpResponse<IAirport[]>) => (this.airports = res.body || []));
    });
  }

  updateForm(flight: IFlight): void {
    this.editForm.patchValue({
      id: flight.id,
      departure: flight.departure ? flight.departure.format(DATE_TIME_FORMAT) : null,
      arrival: flight.arrival ? flight.arrival.format(DATE_TIME_FORMAT) : null,
      airplaneF: flight.airplaneF,
      airplane: flight.airplane,
      airport: flight.airport,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const flight = this.createFromForm();
    if (flight.id !== undefined) {
      this.subscribeToSaveResponse(this.flightService.update(flight));
    } else {
      this.subscribeToSaveResponse(this.flightService.create(flight));
    }
  }

  private createFromForm(): IFlight {
    return {
      ...new Flight(),
      id: this.editForm.get(['id'])!.value,
      departure: this.editForm.get(['departure'])!.value ? moment(this.editForm.get(['departure'])!.value, DATE_TIME_FORMAT) : undefined,
      arrival: this.editForm.get(['arrival'])!.value ? moment(this.editForm.get(['arrival'])!.value, DATE_TIME_FORMAT) : undefined,
      airplaneF: this.editForm.get(['airplaneF'])!.value,
      airplane: this.editForm.get(['airplane'])!.value,
      airport: this.editForm.get(['airport'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlight>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
