import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAirplane, Airplane } from 'app/shared/model/airplane.model';
import { AirplaneService } from './airplane.service';

@Component({
  selector: 'jhi-airplane-update',
  templateUrl: './airplane-update.component.html',
})
export class AirplaneUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
  });

  constructor(protected airplaneService: AirplaneService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ airplane }) => {
      this.updateForm(airplane);
    });
  }

  updateForm(airplane: IAirplane): void {
    this.editForm.patchValue({
      id: airplane.id,
      code: airplane.code,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const airplane = this.createFromForm();
    if (airplane.id !== undefined) {
      this.subscribeToSaveResponse(this.airplaneService.update(airplane));
    } else {
      this.subscribeToSaveResponse(this.airplaneService.create(airplane));
    }
  }

  private createFromForm(): IAirplane {
    return {
      ...new Airplane(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirplane>>): void {
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
}
