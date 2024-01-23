const express = require('express');
const app = express();
const path = require('path');
const coolieParser = require('cookie-parser');
let secret = 'qwerty';
app.use(coolieParser(secret));
let metrics = {
  main: 0,
  about: 0,
  error: 0,
  overAll: 0,
};

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  metrics.main += 1;
  metrics.overAll += 1;
  res.cookie('main', metrics.main);
  res.cookie('overAll', metrics.overAll);

  res.sendFile(__dirname + '/pages/index.html');
});
app.get('/about', function (req, res) {
  metrics.about += 1;
  metrics.overAll += 1;
  res.cookie('about', metrics.about);
  res.cookie('overAll', metrics.overAll);
  res.sendFile(__dirname + '/pages/about.html');
});
app.use(function (req, res) {
  metrics.error += 1;
  metrics.overAll += 1;
  res.cookie('error', metrics.error);
  res.cookie('overAll', metrics.overAll);
  res.status(404).sendFile(__dirname + '/pages/error.html');
});

app.listen(3000, () => {
  console.log('Сервер на  http://127.0.0.1:3000');
});
