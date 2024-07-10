const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).send('Image URL parameter is required');
    }

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary').toString('base64');

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(imageData);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
