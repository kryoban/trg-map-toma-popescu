# TrgMapTomaPopescu

## Please read before reviewing the application
I created a "hack" to easily toggle between the small and large dataset so that whoever's reviewing my work doesn't have to modify the code in order to switch between the two.

To switch between the small dataset (list of European capitals) and the large one (50k randomly generated rows) one can click the "globe" icon 🌍 in the top right hand corner of the screen and can select "More / less data" below the 3 available languages.

The small dataset has the marker clusters disabled (added a check in `location.service` which disables marker clusters when the locations number exceeds the arbitrary value of 500) so it's easier to review the basic map / dashboard functionalities.

The large dataset will display the marker clusters as the browser would otherwise be in severe pain. :3


Other things to consider 
- the data is fetched / created using a single file - `src/backend/data` (not very async of me, I know)
- the random dataset generator can be customised to return more / less locations, please check `location.service`
- created custom sorting functions for the table (as by default it was not correctly sorting strings)
- added an input above the table which allows filtering by name and address

Hope you will enjoy my output as much as I enjoyed the journey :)

##
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
