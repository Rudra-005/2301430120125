import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { AppErrorBoundary } from '@/components/common/AppErrorBoundary';
import { AppProviders } from '@/app/providers';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </AppProviders>
  </React.StrictMode>,
);
