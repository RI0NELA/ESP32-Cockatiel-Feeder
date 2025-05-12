const firebaseConfig = {
  apiKey: "AIzaSyDULlR8GGLaCRZCcskW7MvEA8xyaOdyjC0",
  authDomain: "cockatiel-feeder-esp32.firebaseapp.com",
  databaseURL: "https://cockatiel-feeder-esp32-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cockatiel-feeder-esp32",
  storageBucket: "cockatiel-feeder-esp32.appspot.com",
  messagingSenderId: "61638561042",
  appId: "1:61638561042:web:f4b0299b5d32ebbde2b7cb",
  measurementId: "G-ZMXGB63CT8"
};

firebase.initializeApp(firebaseConfig);

function feedNow() {
  firebase.database().ref("feeder").update({
    action: "feed",
    timestamp: new Date().toISOString()
  });
}

function sendMessage() {
  const message = document.getElementById("userMessage").value;
  firebase.database().ref("feeder/message").set({
    text: message,
    timestamp: new Date().toISOString()
  });
  document.getElementById("userMessage").value = "";
}

firebase.database().ref("feeder/status").on("value", (snapshot) => {
  const status = snapshot.val();
  const statusElement = document.getElementById("statusMessage");

  if (status === "feeding") {
    statusElement.textContent = "Status: Currently Feeding";
    statusElement.className = "status feeding";
  } else {
    statusElement.textContent = "Status: Idle";
    statusElement.className = "status idle";
  }
});
