import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AirportSharedModule } from 'app/shared/shared.module';
import { AirplaneComponent } from './airplane.component';
import { AirplaneDetailComponent } from './airplane-detail.component';
import { AirplaneUpdateComponent } from './airplane-update.component';
import { AirplaneDeleteDialogComponent } from './airplane-delete-dialog.component';
import { airplaneRoute } from './airplane.route';

@NgModule({
  imports: [AirportSharedModule, RouterModule.forChild(airplaneRoute)],
  declarations: [AirplaneComponent, AirplaneDetailComponent, AirplaneUpdateComponent, AirplaneDeleteDialogComponent],
  entryComponents: [AirplaneDeleteDialogComponent],
})
export class AirportAirplaneModule {}
