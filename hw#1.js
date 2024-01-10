const http = require("http");
const fs = require("fs");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  if (req.url == "/") {
    fs.createReadStream("./pages/index.html").pipe(res);
  } else if (req.url == "/about") {
    console.log("about");
    fs.createReadStream("./pages/about.html").pipe(res);
  } else {
    fs.createReadStream("./pages/error.html").pipe(res);
  }
});
server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен:   http://${HOSTNAME}:${PORT}`);
});
