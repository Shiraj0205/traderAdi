// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase :  {
                apiKey: "AIzaSyDqu40u3BL87X1pjMMJBZEk72LPc8zBf8Y",
                authDomain: "reviewly-5de9d.firebaseapp.com",
                databaseURL: "https://reviewly-5de9d.firebaseio.com",
                projectId: "reviewly-5de9d",
                storageBucket: "reviewly-5de9d.appspot.com",
                messagingSenderId: "398781713370"
              }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
