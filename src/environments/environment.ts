// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase :  {
                apiKey: "AIzaSyAu0L8N4BlcSprarFaHROb6b9Ai8E4KcNA",
                authDomain: "traderadi-7864f.firebaseapp.com",
                databaseURL: "https://traderadi-7864f.firebaseio.com",
                projectId: "traderadi-7864f",
                storageBucket: "traderadi-7864f.appspot.com",
                messagingSenderId: "948110998036"
              }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
