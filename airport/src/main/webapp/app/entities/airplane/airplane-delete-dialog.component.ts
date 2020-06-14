import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAirplane } from 'app/shared/model/airplane.model';
import { AirplaneService } from './airplane.service';

@Component({
  templateUrl: './airplane-delete-dialog.component.html',
})
export class AirplaneDeleteDialogComponent {
  airplane?: IAirplane;

  constructor(protected airplaneService: AirplaneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.airplaneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('airplaneListModification');
      this.activeModal.close();
    });
  }
}
