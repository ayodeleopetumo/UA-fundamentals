import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div class="passengers">
      <passenger-count [items]="passengers"></passenger-count>
      <passenger-detail
        *ngFor="let passenger of passengers"
        [detail]="passenger"
        (view)="handleView($event)"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
        ></passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => (this.passengers = data));
  }

  handleEdit(data: Passenger) {
    this.passengerService.updatePassenger(data).subscribe((pass: Passenger) => {
      this.passengers = this.passengers.map((passenger: Passenger) => {
        if (passenger.id === data.id) {
          passenger = Object.assign({}, passenger, data);
        }
        return passenger;
      });
    });
  }

  handleRemove(data: Passenger) {
    this.passengerService.deletePassenger(data).subscribe((pass: Passenger) => {
      this.passengers = this.passengers.filter(
        (passenger: Passenger) => passenger.id !== data.id
      );
    });
  }

  handleView(data: Passenger) {
    this.router.navigate(['/passengers', data.id]);
  }
}
