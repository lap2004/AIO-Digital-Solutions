import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from '@/app/router';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/core/theme/theme.store'; // applies persisted theme (default dark) on load
import './index.css';
const sessionId = Math.random().toString(36).substring(2);
setInterval(() => {
  try {
    const sessions = JSON.parse(localStorage.getItem('aio.active_sessions') || '{}');
    const now = Date.now();
    sessions[sessionId] = now;
    for (const key in sessions) {
      if (now - sessions[key] > 5000) delete sessions[key];
    }
    localStorage.setItem('aio.active_sessions', JSON.stringify(sessions));
  } catch (e) {}
}, 2000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingBlock label="Đang khởi tạo…" />}>
      <RouterProvider router={router} />
    </Suspense>
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: '#0b1326',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#e2e8f0',
        },
      }}
    />
  </StrictMode>,
);
