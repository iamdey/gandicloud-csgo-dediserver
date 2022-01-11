// @ts-check

const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 3000;
const TOKEN = 'foobar';

app.use(helmet());

function authorization(req, res, next) {
  const bearer = req.get('Bearer');
  if (bearer === TOKEN) {
    return next();
  }

  res.status(403).send('Unauthorized');
}

app.use(authorization);

app.get('/host/state', (req, res) => {
  res.send('return current state');
});
app.post('/host/state', (req, res) => {
  res.send('change state');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`server-manager-api running at http://localhost:${port}`);
});
