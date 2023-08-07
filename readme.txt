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
Week 8: Video 2 start
Under the app folder go to app.component.html and remove everything except <router-outlet></router-outlet>

go to client folder and run following command to generate components: 
ng generate component partials/Header
ng generate component partials/Footer

Add header and footer in the app.component.html
Change the code for header and footer components

Next we are going to create a Home component under pages folder
So go back to client folder and run following command: 
ng generate component pages/Home
ng generate component pages/About
ng generate component pages/Contact
ng g c pages/Products
ng g c pages/Services

in the app-routing.module.ts add item to the array.

const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'products', component: ProductsComponent},
{path: 'services', component: ServicesComponent},
{path: 'contact', component: ContactComponent},
{path: '', redirectTo:'/home', pathMatch:'full'},
];


Summary:
We have added components for each page and have set its path in the app-routing.module.ts file.

Week 8: Video 2 end
>>>>>

>>>>>

Week 8: Video 3 Start
We need to create a new base page So go back to client folder and run following command: 
ng g c partials/BasePage

Added basepage selector to all the pages
go back to client folder and install json server with following command: 
npm install json-server --save-dev
npm install jsonwebtoken --save-dev

start json server with following command: npm run json

Added data in the data.js file
write auth code in to the authMiddleware.js

Week 8: Video 3 end
>>>>>>

>>>>>>
Week 8: Video 4 start
Added model folders and files to create model.
Week 8: Video 4 end
>>>>>>

>>>>>>
Week 8: Video 5 start
go to client/src/app folder and run following command: ng g c BookStore

Created bookstore module and related files
Week 8: Video 5 end
>>>>>>

>>>>>>
Week 8: Video 6 start
Code added for pagination. 
Counter directive created
common modues for pages and partial collected in its own file for clean up

Week 8: Video 6 end
>>>>>>

>>>>>>
Week 8: Video 7 start
We need to add card related items/files here.
go to client folder and execute following command: ng g c book-store/CartSummary
cart code added
Week 8: Video 7 end

>>>>>>>>>>>>>>>>>>>>>>>>>
Week 9 Started
Video 1 start

We are going to create two new components. CartDetail and Checkout
Go to client folder and then to the src\app folder and execute following command: ng g c book-store/CartDetail
and then the next command is: ng g c book-store/Checkout 

Summary: In this video, we have added two more components, CartDetail and Checkout. We have applied respective routing changes.

Video 1 end















