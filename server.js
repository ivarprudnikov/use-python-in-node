const express = require('express')
const app = express()
const path = require('path')
const {spawn, ChildProcess} = require('child_process')
const http = require("http")
const WebSocket = require("ws")
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const VIEWS_DIR = "views"
const PUBLIC_DIR = "public"
const PORT = 8080
const SCRIPT_PATH = path.join(__dirname, 'scripts/script.py')

app.set('views', path.join(__dirname, VIEWS_DIR));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, PUBLIC_DIR)))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/run-sync', function (req, res) {
  const scriptProcess = runScript("foobar")
  res.set('Content-Type', 'text/plain');
  scriptProcess.stdout.pipe(res)
  scriptProcess.stderr.pipe(res)
})

/**
 * @param param {String}
 * @return {ChildProcess}
 */
function runScript(param) {
  /*
  python -u script.py --foo bar
  */
  return spawn('python', [
    "-u", SCRIPT_PATH,
    "--foo", param,
  ]);
}

/**
 * @param id {String}
 * @param ws {WebSocket}
 */
function runScriptInWebsocket(id, ws) {
  const child = runScript("foobar")
  child.stdout.on('data', (data) => {
    ws.send(`${id}:${data}`);
  });
  child.stderr.on('data', (data) => {
    ws.send(`${id}:error:\n${data}`);
  });
  child.on('close', () => {
    ws.send(`${id}:done`);
  });
}

// Init websocket communication
//////////////////////////////////////////////////////////////////////
let id = 1
wss.on('connection', (ws) => {
  const thisId = id++;
  ws.on('message', (message) => {
    ws.send(`You sent -> ${message}`);
    if ("run" === message) {
      runScriptInWebsocket(thisId, ws)
    }
  });
  ws.send('Connection with WebSocket server initialized');
});

// Start server
//////////////////////////////////////////////////////////////////////

server.listen(PORT, () => {
  console.log('\n');
  console.log('+--------------------------')
  console.log(' PID %d', process.pid)
  console.log(' Listening on port', PORT)
  console.log('+--------------------------')
})
