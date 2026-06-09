import { create } from 'zustand';
import type { User } from '@/domain/entities';
import { authService } from '@/infrastructure/auth/auth.service';
import { storage } from '@/infrastructure/storage/local-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storage.get<User | null>('user', null),
  token: storage.get<string | null>('token', null),
  loading: false,
  error: null,
  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const { user, token } = await authService.login(email, password);
      storage.set('user', user);
      storage.set('token', token);
      localStorage.setItem('aio.token', token);
      set({ user, token, loading: false });
      return true;
    } catch (e) {
      set({ loading: false, error: e instanceof Error ? e.message : 'Đăng nhập thất bại' });
      return false;
    }
  },
  logout() {
    storage.remove('user');
    storage.remove('token');
    localStorage.removeItem('aio.token');
    set({ user: null, token: null });
  },
}));
