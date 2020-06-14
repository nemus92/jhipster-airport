import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AirportSharedModule } from 'app/shared/shared.module';
import { AirportComponent } from './airport.component';
import { AirportDetailComponent } from './airport-detail.component';
import { AirportUpdateComponent } from './airport-update.component';
import { AirportDeleteDialogComponent } from './airport-delete-dialog.component';
import { airportRoute } from './airport.route';

@NgModule({
  imports: [AirportSharedModule, RouterModule.forChild(airportRoute)],
  declarations: [AirportComponent, AirportDetailComponent, AirportUpdateComponent, AirportDeleteDialogComponent],
  entryComponents: [AirportDeleteDialogComponent],
})
export class AirportAirportModule {}
