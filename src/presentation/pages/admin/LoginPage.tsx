import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/presentation/state/auth.store';
import { authService } from '@/infrastructure/auth/auth.service';
import { Button } from '@/presentation/components/common/Button';
import { FieldWrapper, Input } from '@/presentation/components/common/Field';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Logo } from '@/presentation/components/sections/Logo';
import { Seo } from '@/presentation/components/common/Seo';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState('admin@aio.vn');
  const [password, setPassword] = useState('admin123');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      toast.success('Đăng nhập thành công');
      navigate('/admin');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <Seo title="Đăng nhập quản trị | AIO" />
      <AuroraBackground />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="glass-strong rounded-3xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Cổng quản trị</h1>
            <p className="mt-1 text-sm text-muted">Đăng nhập để quản lý hệ thống AIO</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <FieldWrapper label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@aio.vn" />
            </FieldWrapper>
            <FieldWrapper label="Mật khẩu" error={error ?? undefined}>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </FieldWrapper>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Đang đăng nhập…' : <><LogIn className="h-5 w-5" /> Đăng nhập</>}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-muted">
            <p className="font-semibold text-ink">Tài khoản demo:</p>
            <ul className="mt-2 space-y-1">
              {authService.demoAccounts().map((a) => (
                <li key={a.email}>
                  <button
                    type="button"
                    onClick={() => { setEmail(a.email); setPassword(a.password); }}
                    className="hover:text-brand-cyan"
                  >
                    {a.email} / {a.password} ({a.role})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
