import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAirplane, Airplane } from 'app/shared/model/airplane.model';
import { AirplaneService } from './airplane.service';
import { AirplaneComponent } from './airplane.component';
import { AirplaneDetailComponent } from './airplane-detail.component';
import { AirplaneUpdateComponent } from './airplane-update.component';

@Injectable({ providedIn: 'root' })
export class AirplaneResolve implements Resolve<IAirplane> {
  constructor(private service: AirplaneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAirplane> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((airplane: HttpResponse<Airplane>) => {
          if (airplane.body) {
            return of(airplane.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Airplane());
  }
}

export const airplaneRoute: Routes = [
  {
    path: '',
    component: AirplaneComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'airportApp.airplane.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AirplaneDetailComponent,
    resolve: {
      airplane: AirplaneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'airportApp.airplane.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AirplaneUpdateComponent,
    resolve: {
      airplane: AirplaneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'airportApp.airplane.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AirplaneUpdateComponent,
    resolve: {
      airplane: AirplaneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'airportApp.airplane.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
