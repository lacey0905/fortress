import { createRoot } from 'react-dom/client';
import { App } from './App';

function init() {
  const container = document.querySelector('.app');

  if (!container) {
    alert('Failed to initialize. `.app` not found!');
    return;
  }

  const root = createRoot(container);
  root.render(<App />);
}

window.addEventListener('DOMContentLoaded', function () {
  init();
});
