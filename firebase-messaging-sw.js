if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./src/firebase-messaging-service-worker.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}