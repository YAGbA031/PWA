// ===== DOWNLOAD PROMPT CODE =====
let deferredPrompt;
const downloadPrompt = document.getElementById('downloadPrompt');
const downloadBtn = document.getElementById('downloadBtn');
const closePromptBtn = document.getElementById('closePrompt');

// Show prompt after 3 seconds
setTimeout(() => {
    if (downloadPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
        downloadPrompt.style.display = 'flex';
    }
}, 3000);

// Handle install button
if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        downloadPrompt.style.display = 'none';
        
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('Install:', outcome);
        } else {
            alert('📱 Tap Share button → Add to Home Screen');
        }
    });
}

// Close button
if (closePromptBtn) {
    closePromptBtn.addEventListener('click', () => {
        downloadPrompt.style.display = 'none';
    });
}

// Before install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// App installed
window.addEventListener('appinstalled', () => {
    downloadPrompt.style.display = 'none';
});

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}
// ===== END DOWNLOAD PROMPT CODE =====