# Server manager

This the backend based on expressjs. It provides the API and the client for the
browser.

## Development

_For the client, please refer to
[server-manager-client](../server-manager-client/README.md)._

After any changes on the backend or the API, re-run the node process:

```bash
yarn install
yarn start
```

## Production

Make sure config is ready (`../config`). Then:

```bash
yarn start
```
