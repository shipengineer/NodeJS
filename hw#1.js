const http = require("http");
const fs = require("fs");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
const server = http.createServer((req, res) => {
  //обработка главной
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/index.html").pipe(res);
  } else if (req.url == "/about") {
    //обработка страницы о нас
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/about.html").pipe(res);
  } else if (req.url == "/api/metrics") {
    //апи запрос на метрику
    res.writeHead(200, { "Content-Type": "application/json;" });
    fs.createReadStream("./metrics.json").pipe(res);
  } else if (req.url == "/api/metrics-write") {
    //апи запрос на запись метрики
    res.writeHead(200, { "Content-Type": "application/json;" });

    req.on("data", function (data) {
      const dataToWrite = JSON.stringify(JSON.parse(data));
      fs.writeFileSync("metrics.json", dataToWrite);
    });
  } else if (req.url == "/api/jsrequest") {
    //попытка в подключение ЖС файла
    res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
    fs.createReadStream("./metrics.js").pipe(res);
  } else {
    //обработка ошибочных роутов
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream("./pages/error.html").pipe(res);
  }
});
server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен:   http://${HOSTNAME}:${PORT}`);
});
