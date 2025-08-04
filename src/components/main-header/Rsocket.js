const { RSocketClient } = require("rsocket-core");
const RSocketWebsocketClient = require("rsocket-websocket-client").default;

export default class Rsocket {
  // rsocket-client.js

  static now() {
    return new Date().getTime();
  }

  static async connect(options) {
    const transportOptions = {
      url: "ws://whskr-saloonapi.hurekagrow.com:9091/rsocket",
      // wsCreator: (url) => {
      //   return new WebSocket(url);
      // },
    };
    const setup = {
      keepAlive: 1000000,
      lifetime: 100000,
      dataMimeType: "application/json",
      metadataMimeType: "message/x.rsocket.routing.v0",
    };
    const transport = new RSocketWebsocketClient(transportOptions);
    const client = new RSocketClient({ setup, transport });
    return await client.connect();
  }

  static async run() {
    return new Promise(async (resolve, reject) => {
      const rsocket = await this.connect();
      const start = this.now();
      rsocket.requestStream().subscribe({
        onComplete: (socket) => {
          // socket provides the rsocket interactions fire/forget, request/response,
          // request/stream, etc as well as methods to close the socket.
          socket
            .requestStream({
              data: {
                author: "Martin Fowler",
              },
              metadata:
                String.fromCharCode("tweets.by.author".length) +
                "tweets.by.author",
            })
            .subscribe({
              onComplete: () => console.log("complete"),
              onError: (error) => {
                console.log(error);
                // addErrorMessage("Connection has been closed due to ", error);
              },
              onNext: (payload) => {
                console.log(payload.data);
                // reloadMessages(payload.data);
              },
              onSubscribe: (subscription) => {
                console.log("onSubsribe");

                subscription.request(2147483647);
              },
            });
        },
        onError: (error) => {
          console.log(error);
          // addErrorMessage("Connection has been refused due to ", error);
        },
        onSubscribe: (cancel) => {
          console.log("onSubsribe");

          /* call cancel() to abort
           */
        },
      });
      // const interval = setInterval(() => {
      //   rsocket.requestResponse({ data: 'What is the current time?' }).subscribe({
      //     onComplete: (response) => {
      //       console.log(response);
      //     },
      //     onError: (error) => {
      //       console.error(error);
      //     },
      //     onSubscribe: (cancel) => {
      //       /* call cancel() to stop onComplete/onError */
      //     },
      //   });

      //   if (this.now() - start >= 5000) {
      //     clearInterval(interval);
      //     resolve();
      //   }
      // }, 750);
    });
  }
}
