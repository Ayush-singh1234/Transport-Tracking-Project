// 1. Map ko initialize karo
const map = L.map('map').setView([20.5937, 78.9629], 5);

// 2. Map ki tile layer add karo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 3. Ek bus ka icon banao
const busIcon = L.icon({
    iconUrl: 'https://i.imgur.com/gCdC1G4.png', // Bus icon ka link
    iconSize: [35, 35],
});

// 4. Marker ko shuru mein map par daalo (abhi location nahi pata)
const marker = L.marker([0, 0], { icon: busIcon }).addTo(map);

// 5. Backend server se connect karo
const socket = io("http://localhost:3000");

// 6. Jaise hi 'receive-location' message aaye...
socket.on('receive-location', (data) => {
    const { latitude, longitude } = data;
    console.log(`Mili: ${latitude}, ${longitude}`);
    
    // Marker ki position update karo
    marker.setLatLng([latitude, longitude]);
    
    // Map ko marker par center kar do
    map.setView([latitude, longitude], 16);
});