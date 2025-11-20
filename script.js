// Content-scaling

function scalePage() {
  const baseWidth = 2160;
  const baseHeight = 1640;

  const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );

  document.querySelector('.design').style.transform = `scale(${scale})`;
}

window.addEventListener('resize', scalePage);
scalePage();

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
  console.log("Connected as:", role, "with Id:", myId);

  // Read from server
  channel.subscribe("move", (msg) => {
      console.log(msg.connectionId, "as", role, "sent action:", msg.action);
      // console.log("Raw message:", msg);
  });

  // Write on server
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
