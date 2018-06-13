import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable, ObservableInput } from 'rxjs';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API = '/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private db: AngularFireDatabase) {}

  getPassengers(): Observable<any[]> {
    return this.db.list(PASSENGER_API).valueChanges();
  }

  getPassenger(id): Promise<any> {
    return this.db.database
      .ref(`${PASSENGER_API}/${id - 1}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  updatePassenger(passenger: Passenger) {
    return this.db.database
      .ref(`${PASSENGER_API}/${passenger.id - 1}`)
      .update(passenger);
  }

  deletePassenger(passenger: Passenger) {
    return this.db.database
      .ref(`${PASSENGER_API}/${passenger.id - 1}`)
      .remove();
  }
}
