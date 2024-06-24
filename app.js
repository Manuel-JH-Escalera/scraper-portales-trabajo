const express = require('express');
const cors = require('cors');
const chiletrabajos = require('./scrapers/chiletrabajos');
const trabajando = require('./scrapers/trabajando');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/scrape/chiletrabajos', async (req, res) => {
  try {
    const data = await chiletrabajos();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al realizar el scraping del sitio');
  }
});

app.get('/scrape/trabajando', async (req, res) => {
  try {
    const data = await trabajando();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al realizar el scraping del sitio');
  }
});

app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`);
});