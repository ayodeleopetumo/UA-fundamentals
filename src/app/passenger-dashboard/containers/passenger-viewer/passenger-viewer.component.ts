import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
      <button (click)="goBack()">← Go back</button>
      <passenger-form
      [detail]='passenger'
      (update)="onUpdatePassenger($event)"></passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.passengerService.getPassenger(params.get('id'))
        )
      )
      .subscribe((data: Passenger) => (this.passenger = data));
  }

  onUpdatePassenger(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .then(
        (data: Passenger) =>
          (this.passenger = Object.assign({}, this.passenger, event))
      );
  }

  goBack() {
    this.router.navigate(['/passengers']);
  }
}
