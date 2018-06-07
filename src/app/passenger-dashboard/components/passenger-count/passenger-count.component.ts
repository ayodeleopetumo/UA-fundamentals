import { Component, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'passenger-count',
  template: `
    <div>
      <h3>Airline Passengers</h3>
      <p>Total checked in: {{ totalCheckedIn() }} / {{ items?.length }}</p>
    </div>
  `
})
export class PassengerCountComponent {
  @Input() items: Passenger[];

  totalCheckedIn(): number {
    if (!this.items) {
      return;
    }

    return this.items.filter((passenger: Passenger) => passenger.checkedIn)
      .length;
  }
}
