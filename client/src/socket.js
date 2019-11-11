const ws = new WebSocket("ws://127.0.0.1:4400");

ws.onopen = () => {
  console.log('Connected');
};

ws.onmessage = evt => {
  console.log(evt.data);
};

ws.onclose = () => {
  console.log('Closed Connection');
};
