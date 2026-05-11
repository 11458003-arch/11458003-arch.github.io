const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.text({ type: '*/*' }));

// POST proxy: forward body to https://ntfy.sh/:topic
app.post('/send/:topic', async (req, res) => {
  const topic = req.params.topic;
  const body = req.body || '';
  const title = req.header('Title') || '何帥';
  try {
    const r = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST',
      headers: { 'Title': title },
      body: body
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    console.error('proxy error', err);
    res.status(500).send('proxy error');
  }
});

app.get('/', (req, res) => {
  res.send('ntfy proxy running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ntfy proxy listening on http://localhost:${port}`));
