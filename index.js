const express = require('express')
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000

const apiKey = "536f5b200c532abd5324287c3444265c";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to amazon api');
})

//Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    
    try {
        const response = await request(`${baseUrl}&url=http://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
        }
    });
// first route done --------^
app.listen(PORT, () => console.log(`server running on port ${PORT}`));