const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.REACT_APP_PORT|| 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API.');
});

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(express.json());

//GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

//GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

//GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});


