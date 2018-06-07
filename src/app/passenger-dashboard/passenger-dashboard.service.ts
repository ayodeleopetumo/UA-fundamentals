import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API = 'api/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      .pipe(
        map(response => response.json()),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getPassenger(id): Observable<Passenger> {
    return this.http
      .get(`${PASSENGER_API}/${id}`)
      .pipe(
        map(response => response.json()),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger)
      .pipe(
        map(response => response.json()),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  deletePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .pipe(
        map(response => response.json()),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
