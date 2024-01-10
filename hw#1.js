const http = require("http");
const fs = require("fs");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/index.html").pipe(res);
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/about.html").pipe(res);
  } else if (req.url == "/api/metrics") {
    res.writeHead(200, { "Content-Type": "application/json;" });

    fs.createReadStream("./metrics.json").pipe(res);
  } else if (req.url == "/api/metrics-write") {
    res.writeHead(200, { "Content-Type": "application/json;" });

    req.on("data", function (data) {
      const dataToWrite = JSON.stringify(JSON.parse(data));
      fs.writeFileSync("metrics.json", dataToWrite);
    });
  } else if (req.url == "/api/jsrequest") {
    res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
    fs.createReadStream("./metrics.js").pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/error.html").pipe(res);
  }
});
server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен:   http://${HOSTNAME}:${PORT}`);
});
