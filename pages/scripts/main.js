// async function getMetrics() {
//   const responce = await fetch('http://127.0.0.1:3000/api/metrics');
//   const data = await responce.json();
//   return data;
// }
// async function sendData(url, data) {
//   const responce = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   console.log('запрос отправлен');
//   return responce.json();
// }
// async function setMetrics() {
//   const data = await getMetrics();
//   document.body.insertAdjacentHTML(
//     'afterbegin',
//     `<span>Вы на главной уже ${++data.main} раз<br> Всего прыжков :${++data.overAll} раз</span>`
//   );
//   sendData('http://127.0.0.1:3000/api/metrics-write', data);
// }
// setMetrics();
console.log('Hi');
