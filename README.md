# use-python-in-node

**Prerequisites**

- _Node.js_ `v10` installed
- _Python_ `v3` available in the `PATH`
- Browser supporting _WebSockets_

## About

![Preview of sample app](https://github.com/ivarprudnikov/use-python-in-node/raw/master/node-python-websockets-preview.png "Preview of sample app")

This is a simple example of a _Node.js_ server with following features:
- Enabled WebSocket communication
- HTTP endpoint which runs `python` script synchronously and returns its output
- WebSocket can run `python` script asynchronously and send output back in chunks
- Simple `html` page with 2 buttons to execute above actions and 2 panes to see preview output

## Running locally

Following assumes you have `python` `v3` installed and have it available in the `PATH`:

- Checkout this repository `git clone repository && cd repository_folder`
- Set _Node.js_ version in terminal `nvm use` - defined in `.nvmrc`
- Install dependencies `npm i`
- Start server `npm start` or `node server.js`

