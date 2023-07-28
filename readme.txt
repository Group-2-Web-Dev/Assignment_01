Week 8: Video 1 start

First install angular using this command : npm install -g @angular/cli
Create angular app with this options: ng new BookStore --routing=true --skip-tests=true --style=css --skip-git=true
Above command will create a new book store application.
Now rename the BookStore folder to client
Most of the work will be done inside client so cd into client folder
run following command and install the items: npm install bootstrap @fortawesome/fontawesome-free jquery popper.js --save
run following command and install the items: npm install @types/bootstrap @types/jquery --save-dev
Create two fodlers under client/src/: Content and Scripts


under the client folder go to angular.json file Under build->Option->style add following lines:
"./node_modules/bootstrap/dist/css/bootstrap.min.css",
"./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
"src/Content/styles.css"

under the client folder go to angular.json file Under build->Option->scripts add following lines:
"./node_modules/jquery/dist/jquery.min.js",
"./node_modules/bootstrap/dist/js/bootstrap.min.js",
"src/Scripts/app.js"

Under src folder create a file called app.js and create a IIFE function
// IIFE - Immediately Invoked Function Expression
(() => {

  function Start()
  {
    console.log('App Started...');
  }

  window.addEventListener('load', Start);

})();

--
go to client folder on terminal and run following command
ng serve --open

Week 8: Video 1 end
We have installed angular and created folder structure under client folder for the bookstore example



>>>>>>>

