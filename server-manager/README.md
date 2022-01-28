# Server manager

This the backend based on expressjs. It provides the API and the client for the
browser.

## Requirement

In order to work the backend requires [nodejs](https://nodejs.org) and
[openstack python client](https://docs.openstack.org/python-openstackclient/latest/).

## Development

_For the client, please refer to
[server-manager-client](../server-manager-client/README.md)._

After any changes on the backend or the API, re-run the node process:

```bash
yarn install
yarn start
```

## Production

Make sure config is ready (`../config`). Then start server (port 3000).

```bash
yarn start
```

Configure a reverse proxy and set basicauth, a
[Caddyfile](https://caddyserver.com) is provided but any other proxy can be
used.

```
SVM_USERNAME=<username default is admin> SVM_PASSWORD=<hashed_password_base64> caddy start --config server-manager/Caddyfile
```
