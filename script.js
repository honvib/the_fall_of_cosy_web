
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

ably.connection.once("connected", async () => {
  const channel = ably.channels.get("main-channel");
  const myId = ably.connection.id;
  console.log("Connected as", role, "with connectionId:", myId);

  // Read server
  channel.subscribe("move", (msg) => {
      console.log(msg.connectionId, "as", role, "sent action:", msg.action);
      console.log("Raw message:", msg);
  });

  // User action
  function onUserAction(msg) {
      channel.publish("move", msg);
      console.log(msg.connectionId, "as", role, "sent action:", msg.action);
  };

  // Elements

  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', () => {
    onUserAction({connectionId: myId, role: role, action: "start"});
  });

});
