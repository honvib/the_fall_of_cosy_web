
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
  let myId = ably.connection.Id;
  console.log("Your connectionId is:", myId);
  console.log("Your connectionId is:", ably.connection.Id);

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

  demoButton.addEventListener('click', () => {
    let myId = ably.connection.Id;
    onUserAction({ connectionId: myId, action: 'start' });
    startTimer(1);
  });

});
