
// Ably setup

const ably = new Ably.Realtime.Promise({
  key: "MQAXag.a3lYNg:UTSjobvrLkoJ2KoSb7nj5ciU4l5FYyB5DB1VGZiMz08",
});

ably.connection.on('connecting', () => {
  console.log("Ably: connecting…");
});

ably.connection.on('failed', (err) => {
  console.error("Ably: FAILED", err);
});


// Ably connection

ably.connection.once("connected", async (stateChange) => {
  const channel = ably.channels.get("main-channel");
  const myId = ably.connection.id;
  console.log("Connected with connectionId:", myId);

  // Read server
  channel.subscribe("move", (msg) => {
      console.log("Received from:", msg.connectionId, "action", msg.action);
      console.log("Raw message:", msg);
  });

  // User action
  function onUserAction(moveData) {
      channel.publish("move", moveData);
      console.log("button pressed, sent move:", moveData);
  };

  // Elements

  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', () => {
    console.log("Your connectionId is:", myId);
    onUserAction({connectionId: myId, action: 'start'});
  });

});
