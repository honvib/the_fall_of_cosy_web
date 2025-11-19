// Ably connect

const ably = new Ably.Realtime.Promise({
  key: "MQAXag.a3lYNg:UTSjobvrLkoJ2KoSb7nj5ciU4l5FYyB5DB1VGZiMz08",
  clientId: "user" + Math.random()
});

  ably.connection.once('connected', async () => {
    const channel = ably.channels.get('the-fall-of-cozy-web');

    // listen for updates from the other tablet
    channel.subscribe('move', (msg) => {
      const data = msg.data;
      // update your UI based on data
      console.log('Received move:', data);
    });

    // when the user does something:
    function onUserAction(moveData) {
      channel.publish('move', moveData);
    }

    // hook `onUserAction` into your UI
  });