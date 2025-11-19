
// Ably setup

const ably = new Ably.Realtime.Promise({
  key: "MQAXag.a3lYNg:UTSjobvrLkoJ2KoSb7nj5ciU4l5FYyB5DB1VGZiMz08",
  clientId: "demo-user-" + Math.random()
});

ably.connection.once("connected", async () => {
  const channel = ably.channels.get("the-fall-of-cozy-web");

  channel.subscribe("move", (msg) => {
    console.log("Received move:", msg.data);
    // update UI
  });

  function onUserAction(moveData) {
    channel.publish("move", moveData);
  }
});

// Ably application

const demoButton = document.getElementById('myButton');

demoButton.addEventListener('click', () => {
    onUserAction({ action: 'button-pressed' });
});