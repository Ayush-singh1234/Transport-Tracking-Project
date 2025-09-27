// HTML elements ko select karna
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusDiv = document.getElementById('status');

// Backend server se connect karna 
const socket = io("http://localhost:3000");

let watchId = null;


startBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Sorry, Geolocation is not supported by your browser.');
  }

  
  watchId = navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    
    // Server ko location bhejna
    socket.emit('send-location', { latitude, longitude });
    

    console.log(`Bhej raha hoon: ${latitude}, ${longitude}`);
  });

  
  statusDiv.textContent = 'Status: Sharing Location...';
  startBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
});


stopBtn.addEventListener('click', () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  
  statusDiv.textContent = 'Status: Not Sharing';
  stopBtn.classList.add('hidden');
  startBtn.classList.remove('hidden');
});