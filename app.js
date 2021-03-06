const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beerID = await punkAPI.getBeer(req.params.id);
    const beersFromAPI = await punkAPI.getBeers();
    console.log(beersFromAPI);
    res.render('beers', { beersFromAPI, beerID });
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeerArray = await punkAPI.getRandom();
    const randomBeer = randomBeerArray[0];
    res.render('random-beer', { randomBeer });
  } catch (err) {
    console.log(err);
  }
});

app.get('/beers/beer/:id', async (req, res) => {
  const beerIDArray = await punkAPI.getBeer(req.params.id);
  const beerID = beerIDArray[0];
  console.log(beerID);
  res.render('beer-details', { beerID });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
