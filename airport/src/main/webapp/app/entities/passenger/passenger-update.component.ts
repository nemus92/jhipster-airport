import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPassenger, Passenger } from 'app/shared/model/passenger.model';
import { PassengerService } from './passenger.service';
import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from 'app/entities/ticket/ticket.service';

@Component({
  selector: 'jhi-passenger-update',
  templateUrl: './passenger-update.component.html',
})
export class PassengerUpdateComponent implements OnInit {
  isSaving = false;
  tickets: ITicket[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    ticketP: [],
    ticket: [],
  });

  constructor(
    protected passengerService: PassengerService,
    protected ticketService: TicketService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ passenger }) => {
      this.updateForm(passenger);

      this.ticketService.query().subscribe((res: HttpResponse<ITicket[]>) => (this.tickets = res.body || []));
    });
  }

  updateForm(passenger: IPassenger): void {
    this.editForm.patchValue({
      id: passenger.id,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      email: passenger.email,
      phoneNumber: passenger.phoneNumber,
      ticketP: passenger.ticketP,
      ticket: passenger.ticket,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const passenger = this.createFromForm();
    if (passenger.id !== undefined) {
      this.subscribeToSaveResponse(this.passengerService.update(passenger));
    } else {
      this.subscribeToSaveResponse(this.passengerService.create(passenger));
    }
  }

  private createFromForm(): IPassenger {
    return {
      ...new Passenger(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      ticketP: this.editForm.get(['ticketP'])!.value,
      ticket: this.editForm.get(['ticket'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPassenger>>): void {
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

  trackById(index: number, item: ITicket): any {
    return item.id;
  }
}
