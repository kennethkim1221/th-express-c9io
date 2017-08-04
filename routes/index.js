const express = require('express');
const router = express.Router();

//ROUTE:GET - index
router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello'); //ES6 obj format. Orig: name: name
  }
});


//ROUTE:GET - hello
router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello'); //ES6 obj format. Orig: {name: name}
  }
});

//ROUTE:POST - hello
router.post('/hello', (req, res) => {
  //res.json(req.body);
  res.cookie('username', req.body.username);
  //res.render('hello', {name: req.body.username});
  res.redirect('/');
});

//ROUTE:POST - goodbye
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;