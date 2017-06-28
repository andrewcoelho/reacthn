export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(error => {
        console.error('Error during service worker registration:', error); // eslint-disable-line no-console
      });
    });
  }
}
