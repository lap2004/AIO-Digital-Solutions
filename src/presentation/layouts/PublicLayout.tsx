import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/presentation/components/sections/Navbar';
import { Footer } from '@/presentation/components/sections/Footer';
import { ScrollToTop } from '@/presentation/components/sections/ScrollToTop';
import { LoadingBlock } from '@/presentation/components/common/Feedback';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="pt-32"><LoadingBlock /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
