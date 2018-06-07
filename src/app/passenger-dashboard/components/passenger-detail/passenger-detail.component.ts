import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div class="passenger">
      <div *ngIf="editing">
        <input type="text" [value]="detail.fullName" #nameInput (input)="onNameChange(nameInput.value)">
      </div>
      <div class="fullname" *ngIf="!editing">
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
        Full Name: {{ detail.fullName }}
      </div>
      <div class="date">
        Check in date: {{ detail.checkInDate ? ( detail.checkInDate | date: 'MMMM dd, y' ) : 'Not checked in' }}
      </div>
      <div>
        <button (click)="toggleEdit()">{{ editing ? 'Done' : 'Edit' }}</button>
        <button (click)="onRemove()">Remove</button>
      </div>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges {
  @Input() detail: Passenger;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  editing = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  onNameChange(value: string) {
    this.detail.fullName = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }
}
