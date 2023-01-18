const express = require('express')
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000


const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to amazon api');
})

//Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query
    
    try {
        const response = await request(
          `${generateScraperUrl(apiKey)}&url=http://www.amazon.com/dp/${productId}`
        );
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
        }
    });
// first route done --------^
//Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(
          `${generateScraperUrl(
            apiKey
          )}&url=http://www.amazon.com/product-reviews/${productId}`
        );
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
        }
    });
// second route done --------^
//Get product offers
app.get('/products/:productId/offers/', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(
          `${generateScraperUrl(
            apiKey
          )}&url=http://www.amazon.com/gp/offer-/${productId}`
        );
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
        }
    });
// third route done --------^
//Get search Query 
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        apiKey
      )}&url=http://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// fourth route done --------^
app.listen(PORT, () => console.log(`server running on port ${PORT}`));