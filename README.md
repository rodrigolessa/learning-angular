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
npm install @angular-devkit/build-angular

ng --version # Check if the instalation done right
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
# Alternative command with node npm
npm install --save @angular/material @angular/cdk @angular/animations
```

Creating new component for login/auth. Generates files based on a schematic.
```shel
cd src
cd app
ng generate component autenticacao
cd autenticacao
ng generate service autenticacao
```

Configurações do sistema para usuários.
Creating new areas/module and components. Generates files based on a schematic.
```shel
ng generate module configuracao
cd configuracao
ng generate module usuario
cd usuario
ng generate service usuario
ng generate component usuario-parametro
ng generate component usuario-perfil
```

Configurações do cadastro e manutenção de obras. Partindo da raiz do projeto.
Creating new components. Generates files based on a schematic.
```shel
ng generate module obra
cd obra
ng generate service obra
ng generate component dashboard
ng generate component obra-listar
ng generate component obra-manter
```

Creating shared components
```shel
ng generate module shared
cd shared
ng generate component side-menu
ng generate component header
ng generate component alert
ng generate component dialog
ng generate component footer
ng generate component breadcrumb
ng generate component chart
ng generate directive click-out
```

?
ng generate class Hero
ng new angular-forms

Validate application code using basic roles
```shel
ng lint
```

Compiles an angular app. Build for Production. I this project you find extra enviroments files, like Staging and QA. Output directory named dist/
```shel
ng build
# Alternative
ng build --prod
# Alternative
ng build certificador-app -c production
# Alternative
ng build --configuration=production
```

Runs unit tests
```shel
ng test
```

After download this repository, download and install dependencies.
```shel
npm install
```