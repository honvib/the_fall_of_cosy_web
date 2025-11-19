
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

ably.connection.once("connected", async (statChange) => {
  const channel = ably.channels.get("main-channel");
  const myId = stateChange.current.id;
  console.log("Your connectionId is:", myId);

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

  function startTimer(time){
  }

  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', () => {
    onUserAction({ connectionId: myId, action: 'start'});
  });

});
