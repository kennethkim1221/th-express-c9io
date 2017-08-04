const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json'); // ES6 equal to data = require(etc).data
const { cards } = data; // ES6 equal to cards = data.cards (check the flashcardData.json )

//ROUTE:GET - default: generate random number from 0 to cards.length then redirects to other router
router.get('/', (req, res) => {
  if ( !req.cookies.username ) {
    console.log(`NO USERNAME redirecting to login`);
    return res.redirect('/');  
  }
  console.log(`LOG: entered cards.js index rounter URL = ${req.url}`);
  const numberOfCards = cards.length;
  const flashCardIndex = Math.floor( Math.random() * numberOfCards)
  return res.redirect(`/cards/${flashCardIndex}`); 
});

/* EXPLNATION FOR RETURN
res.redirect() doesn't stop the execution in the router.get() method, 
since your also calling res.render() at the bottom of the function, you get an error. 
So it's a simple fix, just use return...
*/

//ROUTE:GET - handles requests with an id parameter regardless if it has key-value pair
router.get('/:id', (req, res) => { // ':' - tell express to treat this part of url as a variable and store to variable id and store to the request parameters
  console.log(`LOG: entered cards.js /:id router URL = ${req.url}`);
  /*
  const { side } = req.query; //ES6 : side = req.query.side which is a 'key' to get the value
  const { id } = req.params; //ES6: id = req.params.id which came from the route parameter
  const text = cards[id][side]; // id finds the element index, side find the 'key' which in tern will gove us access tot the value
  const { hint } = cards[id]; //get the 'hint' key-value of the current cards[i] object
  const tempalteData = { text };
  if(side === 'question') {
    templateData.hint = hint;
  }
  //below is a simpler one:
  */
  const side = req.query.side; //req.query.[anything] as lon as it is what you type in the URL
  const id = req.params.id;
  
  if ( !side ) {
    console.log(`LOG: NO SIDE FOUND. Redirecting to /cards/${id}?side=question URL = ${req.url}`);
    return res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  const hint = cards[id].hint; 
  const templateData = { id, text, side, name};
  console.log(`Name:${name} value:${text} hint:${hint} side:${side}`);
  
  if ( side === 'question' ) {
    templateData.hint = hint; 
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'See answer';
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'See question';
  } else {
    //returns to app.js and will redirect to route with 404 path. But no such path exist therefore will reach the middleware: Error 404 - Create Error Object
    return res.redirect(`/404`); // /404 can be anything. Only used 404 to be descriptive
  }
    console.log(`Start rendering card`);
  res.render('card', templateData); //renders the card template with templateData for the values
});

//ROUTE:GET - other
router.get('/other', (req, res) => {
  res.render('card', {prompt: "Other Card Page", hints: "Think about whose tomb it is.", prompt2: "Ow Really?"});
});

module.exports = router;

/* below is a simple explanation of what happend above. source: Team Treehouse Modulator
router.get('/:id', (req, res) => {
    // Here, we're setting either the string "answer" or the string "question" to a variable called side
    const side = req.query.side; // "answer"
    // Here, we're setting the index of the client's desired "card" to a variable called id
    const id = req.params.id; // 1232
    // This step has two parts: we're getting the specific "card" from the "cards" array using the id variable as an index number
    // Then, once we have a "card" object, we're grabbing the string of text inside of its "answer" property and assigning it to the variable "text"
    // We get the string of text inside of "answer" — instead of "question" — because that's what the value of "side" above happens to be
    const text = cards[id][side];
    // Similarily, "hint" will contain the the string of text inside of the "hint" property of the the selected "card" object
    const hint = cards[id].hint;
    // This step is really for readability and is arguably unnecessary
    // Basically, you're setting "templateData" with {text: "Something, something, answer", hint: "hint for the question"}
    const templateData = { text, hint };
    // Finally, we build our card.pug template using the contents of templateData, and send the resulting HTML to the client
    res.render('card', templateData);
});

*/