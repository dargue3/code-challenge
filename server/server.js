require('./dotenvConfig.js');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

const port = process.env.PORT_WEB ? process.env.PORT_WEB : 8000;

const app = express();
app.use(bodyParser.json());
app.set('trust proxy', true);

// auth setup
app.use(cookieParser());

async function serveReactApp(req, res) {
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.error('\n\n❌  Failed to server render HTML — ', err.message);
    }
    return res.send(data.replace(/__SERVER_DATA__/g, encodeURIComponent(JSON.stringify({}))));
  });
}

// leave this above express.static so that a request to '/'
// doesn't immediately get served by the static handler
app.get('/', serveReactApp);

// serves static assets
app.use(express.static('./build'));

app.get('/__health', (_, res) => res.status(200).end());

// then serve the app
app.listen({ port }, () => console.log(`🚀  Server ready at port ${port}`));
