import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAirplane } from 'app/shared/model/airplane.model';
import { AirplaneService } from './airplane.service';
import { AirplaneDeleteDialogComponent } from './airplane-delete-dialog.component';

@Component({
  selector: 'jhi-airplane',
  templateUrl: './airplane.component.html',
})
export class AirplaneComponent implements OnInit, OnDestroy {
  airplanes?: IAirplane[];
  eventSubscriber?: Subscription;

  constructor(protected airplaneService: AirplaneService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.airplaneService.query().subscribe((res: HttpResponse<IAirplane[]>) => (this.airplanes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAirplanes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAirplane): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAirplanes(): void {
    this.eventSubscriber = this.eventManager.subscribe('airplaneListModification', () => this.loadAll());
  }

  delete(airplane: IAirplane): void {
    const modalRef = this.modalService.open(AirplaneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.airplane = airplane;
  }
}
