# Server manager client

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Development

First start `server-manager` which will start the backend on port
http://localhost:3000

```bash
cd ../server-manager
yarn install
yarn start
```

Then launch start script which watch files and run a web server on
http://localhost:3001, api requests will be proxified to the backend (port:
3000).

```bash
yarn install
yarn start
```

## Build

Create the client files:

```bash
yarn install
yarn build
```
