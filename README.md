# learning-angular

Angular 8 CRUD

# Table of Content
- Prerequisites
- Installing Angular CLI
- Basic workflow

## Prerequisites

- Node.js version 10.9.0 or later. Go to nodejs.org.
- https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi

## Installing Angular CLI

- Install the Angular command-line interface CLI globally. Using npm command line intreface, wich is installed with Node.js.
- Install angular material framework
```shel
npm install -g @angular/cli
npm i @angular-devkit/build-angulars
```

## Basic workflow

List of command of templates available
```shel
ng generate --help
```

To create a new workspace and initial starter app:
```shel
ng new certificador-app
cd certificador-app
```

See the basic template. Launch the server end open the browser
```shel
ng serve -o
```

Retrieves or sets Angular configuration values
```shel
ng config
```

Add Dependency of Angular Material
```shel
ng add @angular/material
```
Alternative
```shel
npm install --save @angular/material @angular/cdk @angular/animations
```

New Component. Generates files based on a schematic.
```shel
ng generate component xyz
```

Output directory named dist/
```
ng build
```

ng lint



Runs unit tests
ng test

Compiles an angular app. Build for Production
```shel
ng build certificador-app -c production
```

Download dependencies:
```shel
npm install
```

