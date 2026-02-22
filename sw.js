// Yubik Arka Plan Servisi
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// Bildirim Gönderme Olayı
self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [200, 100, 200]
    });
});

// Bildirime Tıklandığında Uygulamayı Aç
self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then((cl) => {
            if (cl.length > 0) return cl[0].focus();
            return clients.openWindow('./');
        })
    );
});
