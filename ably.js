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

  let senderReady = false;
  let receiverReady = false;

  function evaluate(msg) {
    if (msg.data.role == "sender") {
      console.log("The sender is ready!");
      senderReady = true;
    }
    if (msg.data.role == "receiver") {
      console.log("The receiver is ready!");
      receiverReady = true;
    }
  }

  function checkReady() {
    if (senderReady === true && receiverReady === true) {
      return true;
    } else {
      return false;
    }
  }

  // Read from server
  channel.subscribe("move", (msg) => {
      console.log(msg.data.connectionId, "as", msg.data.role, "sent action:", msg.data.action);
      evaluate(msg);
  });

  // Write on server
  function onUserAction(data) {
      channel.publish("move", data);
      // console.log(data.connectionId, "as", data.role, "sent action:", data.action);
  }

  // Elements

  const startButton = document.getElementById('startButton');
  const startButtonText = document.getElementById('startButtonText');
  const countdownText = document.getElementById('countdownText');

  // Countdown
  
  function countdown(seconds) {
    countdownText.textContent = seconds;

    const interval = setInterval(() => {
      seconds--;
      countdownText.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(interval);
        startButtonText.textContent = "Start";
        countdownText.textContent = "";
      }

      if (checkReady() === true) {
        clearInterval(interval);
        console.log("Both players ready");
        window.location.href = "../intro.html";
      }

    }, 1000);
  }

  startButton.addEventListener('click', () => {
    onUserAction({connectionId: myId, role: role, action: "start"});
    startButtonText.textContent = "Waiting for other player to start...";
    countdown(5);
  });



});
