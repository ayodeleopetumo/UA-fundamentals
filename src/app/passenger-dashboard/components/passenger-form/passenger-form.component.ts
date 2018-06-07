import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" novalidate (ngSubmit)="handleSubmit(form.value, form.valid)">

      <div>
        Passenger ID: <input type="number" #id="ngModel" name="id" required [ngModel]="detail?.id">
      </div>
      <div>
        Passenger name: <input type="text" #fullName="ngModel" name="fullName" required [ngModel]="detail?.fullName">
        <span *ngIf="fullName?.errors?.required && fullName.dirty">Passenger name is required</span>
      </div>
      <div>
        <label>
          Checked In
          <input type="checkbox" name="checkedIn" [ngModel]="detail?.checkedIn" (ngModelChange)="toggleCheckedIn($event)">
          <span *ngIf="id?.errors?.required && id.dirty">Passenger ID is required</span>
        </label>
        <!-- <label>
          <input type="radio" [value]="false" name="checkedIn" [ngModel]="detail?.checkedIn" (ngModelChange)="toggleCheckedIn($event)">
          No
        </label> -->
      </div>
      <div *ngIf="form.value.checkedIn">
        Check in date: <input type="number" name="checkInDate" required [ngModel]="detail?.checkInDate">
      </div>

      <div>
        Baggage:
        <select name="baggage" required [ngModel]="detail?.baggage">
          <!--<option *ngFor="let item of baggage" [value]="item.key" [selected]="item.key === detail?.baggage">{{ item.value }}</option>-->
          <option *ngFor="let item of baggage" [ngValue]="item.key">{{ item.value }}</option>
        </select>
      </div>

      <button type="submit" [disabled]="form.invalid">Update details</button>
    </form>
  `
})
export class PassengerFormComponent implements OnInit {
  @Input() detail: Passenger;
  @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No baggage'
    },
    {
      key: 'hand-only',
      value: 'Hand Baggage'
    },
    {
      key: 'hold-only',
      value: 'Hold Baggage'
    },
    {
      key: 'hand-hold',
      value: 'Hand and Hold Baggage'
    }
  ];

  constructor() {}

  ngOnInit() {}

  toggleCheckedIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
