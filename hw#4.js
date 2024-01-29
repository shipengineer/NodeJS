const { error } = require("console");
const express = require("express");
const { readFile, readFileSync } = require("fs");
const app = express();
const path = require("path");
const pug = require("pug");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));
const getUsers = readFileSync(
  path.join(__dirname, "database/users.json"),
  (error, data) => {
    if (error) {
      return console.log(error);
    }
    return data;
  }
);
const userList = JSON.parse(getUsers.toString());

app.get("/users", async function (req, res) {
  console.log(userList);
  //   if (userList.length !== 0)
  {
    res.render("allUsers", {
      usersName: userList,
    });
  }
});
app.get("/users/:userName", function (req, res, next) {
  if (req.params.userName)
    res.render("user", { userName: `${req.params.userName}` });
});

app.listen(3000, () => {
  console.log("Сервер на  http://127.0.0.1:3000");
});
