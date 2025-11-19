
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

    console.log("Your connectionId is:", ably.connection.id);

    // Read server
    channel.subscribe("move", (msg) => {
        console.log("Received move from", msg.data.connectionId, ":", msg.data);
        console.log("Raw message:", msg);
    });


    // User action
    function onUserAction(moveData) {
        channel.publish("move", moveData);
        console.log("button pressed, sent move:", moveData);
    };

    // Elements

    const demoButton = document.getElementById('demoButton');

    demoButton.addEventListener('click', () => {
        onUserAction({ action: 'button-pressed' });
    });

});

console.log("we got to this point");
