// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDvO1CoSZLxIgyXADR6yoeEKlJKNlBv0F8',
    authDomain: 'pwa-demo-43ffe.firebaseapp.com',
    databaseURL: 'https://pwa-demo-43ffe.firebaseio.com',
    projectId: 'pwa-demo-43ffe',
    storageBucket: 'pwa-demo-43ffe.appspot.com',
    messagingSenderId: '1027087261787'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
