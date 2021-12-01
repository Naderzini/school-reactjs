importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAnMTF6XEw7Xlo-GnA-rwneGi9DRBn56Eo",
  authDomain: "school-25479.firebaseapp.com",
  projectId: "school-25479",
  storageBucket: "school-25479.appspot.com",
  messagingSenderId: "680394915193",
  appId: "1:680394915193:web:0b4b60b732d8a97a4c83a8",
});

const initMessaging = firebase.messaging();

// initMessaging.onBackgroundMessage(payload=>{
//   console.log(payload);
//   const notificationOptions = {
//     body: payload.data.message,
//     icon : "/img/avatar.png"
// };
//   return self.registration.showNotification(payload.data.title,
//     notificationOptions);
// })