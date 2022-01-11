// @ts-check

const util = require('util');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const exec = util.promisify(require('child_process').exec);

const app = express();
const port = 3000;
const TOKEN = 'foobar';

app.use(helmet());
app.use(bodyParser.json());

function authorization(req, res, next) {
  const bearer = req.get('Bearer');
  if (bearer === TOKEN) {
    return next();
  }

  res.status(403).send('Unauthorized');
}

app.use(authorization);

async function getHostState() {
  try {
    await exec(`ping ${SERVER_IP} -c 1 -W 10`);

    return 'alive';
  } catch (err) {
    return 'offline';
  }
}

app.get('/host/state', async (req, res) => {
  const state = await getHostState();
  return res.json({ state });
});

app.post('/host/state', async (req, res) => {
  const { action } = req.body;
  if (!['boot', 'shutdown'].includes(action)) {
    return res.status(400).json({ err: `Unknown action "${action}"` });
  }

  const state = await getHostState();
  if (state === 'alive' && action === 'boot') {
    return res.status(400).json({ err: 'Host already started' });
  }
  if (state === 'offline' && action === 'shutdown') {
    return res.status(400).json({ err: 'Host already stoped' });
  }

  const mapOpenstackCmd = {
    boot: 'start',
    shutdown: 'stop',
  };

  try {
    await exec(`openstack server ${mapOpenstackCmd[action]} ${HOSTNAME}`);
  } catch (err) {
    console.error(err.toString());
    return res.status(500).send('Unable to change host state');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`server-manager-api running at http://localhost:${port}`);
});
