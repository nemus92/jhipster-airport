import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.AirportLocationModule),
      },
      {
        path: 'airport',
        loadChildren: () => import('./airport/airport.module').then(m => m.AirportAirportModule),
      },
      {
        path: 'passenger',
        loadChildren: () => import('./passenger/passenger.module').then(m => m.AirportPassengerModule),
      },
      {
        path: 'flight',
        loadChildren: () => import('./flight/flight.module').then(m => m.AirportFlightModule),
      },
      {
        path: 'ticket',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.AirportTicketModule),
      },
      {
        path: 'airplane',
        loadChildren: () => import('./airplane/airplane.module').then(m => m.AirportAirplaneModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AirportEntityModule {}
