import {App} from "uWebSockets.js";

App()
  .ws('/*', {
    message: (ws, message, isBinary) => {
      let ok = ws.send(message, isBinary);
    }
  })
  .any('/*', (res, req) => {
    res.end('Nothing to see here!');
  })
  .listen(4400, (listenSocket) => {
    if (listenSocket) {
      console.log('Listening to port 9001');
    }
  });
