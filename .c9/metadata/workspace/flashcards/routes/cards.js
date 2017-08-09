{"changed":true,"filter":false,"title":"cards.js","tooltip":"/flashcards/routes/cards.js","value":"const express = require('express');\nconst router = express.Router();\nconst { data } = require('../data/flashcardData.json'); // ES6 equal to data = require(etc).data\nconst { cards } = data; // ES6 equal to cards = data.cards (check the flashcardData.json )\n\n//ROUTE:GET - default: generate random number from 0 to cards.length then redirects to other router\nrouter.get('/', (req, res) => {\n  if ( !req.cookies.username ) {\n    console.log(`NO USERNAME redirecting to login`);\n    return res.redirect('/');  \n  }\n  console.log(`LOG: entered cards.js index rounter URL = ${req.url}`);\n  const numberOfCards = cards.length;\n  const flashCardIndex = Math.floor( Math.random() * numberOfCards)\n  return res.redirect(`/cards/${flashCardIndex}`); \n});\n\n  /* EXPLNATION FOR RETURN\n  res.redirect() doesn't stop the execution in the router.get() method, \n  since your also calling res.render() at the bottom of the function, you get an error. \n  So it's a simple fix, just use return...\n  */\n\n//ROUTE:GET - handles requests with an id parameter regardless if it has key-value pair\nrouter.get('/:id', (req, res) => { // ':' - tell express to treat this part of url as a variable and store to variable id and store to the request parameters\n  console.log(`LOG: entered cards.js /:id router URL = ${req.url}`);\n  /*\n  const { side } = req.query; //ES6 : side = req.query.side which is a 'key' to get the value\n  const { id } = req.params; //ES6: id = req.params.id which came from the route parameter\n  const text = cards[id][side]; // id finds the element index, side find the 'key' which in tern will gove us access tot the value\n  const { hint } = cards[id]; //get the 'hint' key-value of the current cards[i] object\n  const tempalteData = { text };\n  if(side === 'question') {\n    templateData.hint = hint;\n  }\n  //below is a simpler one:\n  */\n  const side = req.query.side; //req.query.[anything] as lon as it is what you type in the URL\n  const id = req.params.id;\n  \n  if ( !side ) {\n    console.log(`LOG: NO SIDE FOUND. Redirecting to /cards/${id}?side=question URL = ${req.url}`);\n    return res.redirect(`/cards/${id}?side=question`);\n  }\n  const name = req.cookies.username;\n  const text = cards[id][side];\n  const hint = cards[id].hint; \n  const templateData = { id, text, side, name};\n  console.log(`Name:${name} value:${text} hint:${hint} side:${side}`);\n  \n  if ( side === 'question' ) {\n    templateData.hint = hint; \n    templateData.sideToShow = 'answer';\n    templateData.sideToShowDisplay = 'See answer';\n  } else if ( side === 'answer' ) {\n    templateData.sideToShow = 'question';\n    templateData.sideToShowDisplay = 'See question';\n  } else {\n    //returns to app.js and will redirect to route with 404 path. But no such path exist therefore will reach the middleware: Error 404 - Create Error Object\n    return res.redirect(`/404`); // /404 can be anything. Only used 404 to be descriptive\n  }\n    console.log(`Start rendering card`);\n  res.render('card', templateData); //renders the card template with templateData for the values\n});\n\n//ROUTE:GET - other\nrouter.get('/other', (req, res) => {\n  res.render('card', {prompt: \"Other Card Page\", hints: \"Think about whose tomb it is.\", prompt2: \"Ow Really?\"});\n});\n\nmodule.exports = router;\n\n/* below is a simple explanation of what happend above. source: Team Treehouse Modulator\nrouter.get('/:id', (req, res) => {\n    // Here, we're setting either the string \"answer\" or the string \"question\" to a variable called side\n    const side = req.query.side; // \"answer\"\n    // Here, we're setting the index of the client's desired \"card\" to a variable called id\n    const id = req.params.id; // 1232\n    // This step has two parts: we're getting the specific \"card\" from the \"cards\" array using the id variable as an index number\n    // Then, once we have a \"card\" object, we're grabbing the string of text inside of its \"answer\" property and assigning it to the variable \"text\"\n    // We get the string of text inside of \"answer\" — instead of \"question\" — because that's what the value of \"side\" above happens to be\n    const text = cards[id][side];\n    // Similarily, \"hint\" will contain the the string of text inside of the \"hint\" property of the the selected \"card\" object\n    const hint = cards[id].hint;\n    // This step is really for readability and is arguably unnecessary\n    // Basically, you're setting \"templateData\" with {text: \"Something, something, answer\", hint: \"hint for the question\"}\n    const templateData = { text, hint };\n    // Finally, we build our card.pug template using the contents of templateData, and send the resulting HTML to the client\n    res.render('card', templateData);\n});\n\n*/","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":17,"column":0},"end":{"row":17,"column":2},"action":"insert","lines":["  "],"id":3965},{"start":{"row":18,"column":0},"end":{"row":18,"column":2},"action":"insert","lines":["  "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"insert","lines":["  "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":2},"action":"insert","lines":["  "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"insert","lines":["  "]}]]},"ace":{"folds":[],"scrolltop":120,"scrollleft":0,"selection":{"start":{"row":54,"column":35},"end":{"row":54,"column":35},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1501708584638}