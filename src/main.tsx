
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

console.log('🚀 main.tsx: Starting application initialization');

const container = document.getElementById("root");
if (!container) {
  console.error('❌ main.tsx: Root element not found');
  throw new Error('Root element not found');
}

console.log('✅ main.tsx: Root element found, creating React root');

const root = createRoot(container);

try {
  console.log('🔄 main.tsx: Rendering React app');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ main.tsx: React app rendered successfully');
} catch (error) {
  console.error('❌ main.tsx: Error rendering React app:', error);
  throw error;
}
