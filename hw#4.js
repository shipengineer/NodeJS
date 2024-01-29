const { error } = require('console');
const express = require('express');
const { readFile, readFileSync, writeFile, writeFileSync } = require('fs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const pug = require('pug');
const urlencoderParser = bodyParser.urlencoded({
  extended: false,
});
const jsonParser = bodyParser.json();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));
const getUsers = readFileSync(
  path.join(__dirname, 'database/users.json'),
  (error, data) => {
    if (error) {
      return console.log(error);
    }
    return data;
  }
);
const userList = JSON.parse(getUsers.toString());
const getSafe = readFileSync(
  path.join(__dirname, 'database/safeDeposit.json'),
  (error, data) => {
    if (error) {
      return console.log(error);
    }

    return data;
  }
);
const safe = JSON.parse(getSafe.toString());
app.get('/', async function (req, res) {
  console.log(Object.keys(userList));
  //   if (userList.length !== 0)
  {
    res.render('allUsers', {
      usersName: Object.keys(userList).map((user) => userList[user].name),
    });
  }
});

app.get('/users/:userName', function (req, res, next) {
  if (req.params.userName)
    res.render('user', {
      login: false,
      userName: `${req.params.userName}`,
    });
});

app.post('/auth/:userName', urlencoderParser, function (req, res) {
  const psw = req.body.psw;

  if (psw === userList[req.params.userName].password) {
    const id = userList[req.params.userName].id;
    res.render('user', {
      userMoney: safe[id].amount,
      userName: req.params.userName,
      login: true,
    });
  } else {
    res.render(
      'user',
      res.render('user', {
        login: false,
        userName: `${req.params.userName}`,
      })
    );
  }
});
app.post('/change/:userName', urlencoderParser, function (req, res) {
  const money = req.body.money;
  const id = userList[req.params.userName].id;
  console.log(safe);
  safe[id].amount = req.body.money;
  console.log(JSON.stringify(safe));
  const writeData = JSON.stringify(safe);
  writeFile(
    path.join(__dirname, 'database/safeDeposit.json'),
    writeData,
    function (err) {
      if (err) {
        return console.log(err);
      }
      res.redirect('/users/' + req.params.userName);
    }
  );
});

app.listen(3000, () => {
  console.log('Сервер на  http://127.0.0.1:3000');
});
