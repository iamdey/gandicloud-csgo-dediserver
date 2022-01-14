// @ts-check

const fs = require('fs/promises');
const path = require('path');
const util = require('util');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const exec = util.promisify(require('child_process').exec);

const app = express();

/**
 * @typedef {{ api: { api_port: number, api_token: string }, host: { hostname: string, ip: string, gslt: ?string, port: number, rcon: ?string, pass: ?string}, os_token: string }} Config
 * @returns {Promise<Config>}
 */
async function readConfig() {
  const apiBuf = await fs.readFile(
    path.resolve(__dirname, '..', 'config', 'api.json')
  );
  const hostBuf = await fs.readFile(
    path.resolve(__dirname, '..', 'config', 'host.json')
  );
  const tokenBuf = await fs.readFile(
    path.resolve(__dirname, '..', 'config', 'token')
  );

  return {
    api: JSON.parse(apiBuf.toString()),
    host: JSON.parse(hostBuf.toString()),
    os_token: tokenBuf.toString(),
  };
}

async function main() {
  const config = await readConfig();
  // @ts-ignore
  app.use(helmet());
  app.use(bodyParser.json());

  function authorization(req, res, next) {
    const bearer = req.get('Bearer');
    if (bearer === config.api.api_token) {
      return next();
    }

    res.status(403).send('Unauthorized');
  }

  app.use(authorization);

  async function getHostState() {
    try {
      await exec(`ping ${config.host.ip} -c 1 -W 10`);

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
      await exec(
        `openstack server ${mapOpenstackCmd[action]} ${config.host.hostname}`
      );
    } catch (err) {
      console.error(err.toString());
      return res.status(500).send('Unable to change host state');
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(config.api.api_port, () => {
    console.log(
      `server-manager-api running at http://localhost:${config.api.api_port}`
    );
  });
}

main();
