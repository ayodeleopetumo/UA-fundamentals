import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-found',
  template: `
    <div>404 Not Found, <a routerLink="/">go home</a>?</div>
  `
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
