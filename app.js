const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;

// MIDDLEWARE: body-parser - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({extended: false}));

// MIDDLEWARE: for cookies storage in the client's browser
app.use(cookieParser());

// serve static elements  
app.use('/static', express.static('public'));

// set template engine for front-end
app.set('view engine', 'pug');

// initilialize route files
// points to the folder from home and locate the default index file or ./routes/index
const mainRoutes = require('./routes'); 
const cardRoutes = require('./routes/cards');

// use appropirate routes depending on request
app.use(mainRoutes); // all routes without any path OR does not have a '/cards' path will go to the default mainRoutes
app.use('/cards',cardRoutes); //all route with /cards extension will go to cardRoutes

// if no valid routes, proceed to 404 Middlewares
// MIDDLEWARE: 404 - Create Error Object
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); // go to next middlewhere and pass err
});

// MIDDLEWARE: 404 - Render Error 404 page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');    
});

// starts the server. Listens for request in the given port 
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});

// MIDDLEWARE: 500 - Create Error Object
app.use((req, res, next) => {
    const err = new Error('SERVER ERROR');
    err.status = 500;
    next(err); //throws an error (stacktrace?)
});

// MIDDLEWARE: 500 - Render Error 500 page
app.use((err, req, res, next) => {
    res.locals.errorMsg1 = err;
    res.locals.errorMsg2 = 'Check server setinngs';
    res.status(err.status);
    res.render('error');    
});


