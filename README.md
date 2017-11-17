## **Isomorphic React** ##

Isomorphic React is a quick boilerplate to start coding ES6 React with SSR (Server Side Rendering) and SPA (Single Page Application) builtin.

### Folder structuring ###
The project has the following directories:

 - **config**: config for different enviroments (defined by NODE_ENV) in json format.
 - **src**: all source code is saved here.
 - **src/components**: react components.
 - **src/static**: static files like css, js, etc.
 - **src/views**: dynamic html templates (writting in ejs).
 
![Folder structure](https://image.ibb.co/hnYiiG/dir.png)



### Available commands ###

The project has the next utils commands:

 - `start`: build the project to production and run it without SSR (SPA only).
 - `start:prod`: build the project to production inside *dist* folder and run it with universal rendering (SSR and SPA)
 - `start:universal`: build the project to production and run it with universal rendering (SSR and SPA).
 - `start:dev`: build the project and run it in dev mode (restarting the sever after each change in files) SPA only.
 - `start:dev:universal`: build the project and run it in dev mode (restarting server after each change in files) SSR and SPA.
 - `build`: build the project to production.
 - `build:prod`: build the project to production inside *dist* folder.
 - `build:dev`: build the project in dev mode.
 - `build:dev:watch`: build the project in dev mode watching changes.
 - `test:lint`: run eslint rules.
 - `clear`: delete dist, bundles and cache files.
