// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
// const firebaseApp = initializeApp({

// });


importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

firebase.initializeApp({ 
    apiKey: 'AIzaSyDkZSndxYuL_T_BuI3mJjXYc_woBcL2uDM',
    authDomain: 'thoikhoabieu-a5075.firebaseapp.com',
    projectId: 'thoikhoabieu-a5075',
    storageBucket: 'thoikhoabieu-a5075.appspot.com',
    messagingSenderId: '296430630672',
    appId: '1:296430630672:web:548df9d6b28bfbc9e75795',
});
// const messaging = getMessaging(firebaseApp);

// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
 const messaging = firebase.messaging();

  








// apiKey: 'AIzaSyDkZSndxYuL_T_BuI3mJjXYc_woBcL2uDM',
// authDomain: 'thoikhoabieu-a5075.firebaseapp.com',
// projectId: 'thoikhoabieu-a5075',
// storageBucket: 'thoikhoabieu-a5075.appspot.com',
// messagingSenderId: '296430630672',
// appId: '1:296430630672:web:548df9d6b28bfbc9e75795',


// apiKey: '',
// authDomain: '',
// projectId: '',
// storageBucket: '',
// messagingSenderId: '',
// appId: ''



// const messaging = getMessaging(firebaseApp);


// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw"



// Retrieve firebase messaging
//  const messaging = firebase.messaging();
