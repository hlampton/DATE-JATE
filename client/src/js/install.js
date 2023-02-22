const butInstall = document.getElementById('butInstall');

async function registerPwa() {
  // Register the service worker
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker registered');
    } catch (e) {
      console.warn('Failed to register service worker', e);
    }
  }

  // Add event handlers for PWA installation
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  butInstall.addEventListener('click', handleInstallButtonClick);
  window.addEventListener('appinstalled', handleAppInstalled);
}

function handleBeforeInstallPrompt(event) {
  // Store the prompt event for later use
  window.deferredPrompt = event;

  // Show the install button
  butInstall.classList.toggle('hidden', false);
}

async function handleInstallButtonClick() {
  // Show the install prompt and hide the install button
  const promptEvent = window.deferredPrompt;
  if (promptEvent) {
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
  }
}

function handleAppInstalled(event) {
  // Clear the prompt event
  window.deferredPrompt = null;
}

registerPwa();

