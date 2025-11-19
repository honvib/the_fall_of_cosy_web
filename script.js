
// Ably setup

const ably = new Ably.Realtime.Promise({
  key: "MQAXag.a3lYNg:UTSjobvrLkoJ2KoSb7nj5ciU4l5FYyB5DB1VGZiMz08",
});

ably.connection.once("connected", async () => {
    const channel = ably.channels.get("the-fall-of-cozy-web");

    // Ably code

    channel.subscribe("move", (msg) => {
        console.log("received move:", msg.data);
    });

    function onUserAction(moveData) {
        channel.publish("move", moveData);
        console.log(moveData, "published by", clientId)
    };

    const demoButton = document.getElementById('demoButton');

    demoButton.addEventListener('click', () => {
        onUserAction({ action: 'button-pressed' });
    });

});


