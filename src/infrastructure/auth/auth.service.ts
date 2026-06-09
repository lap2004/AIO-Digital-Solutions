import type { User, UserRole } from '@/domain/entities';

/** Demo accounts for the admin panel (mock auth — replace with real API). */
interface DemoAccount extends User {
  password: string;
}

const ACCOUNTS: DemoAccount[] = [
  { id: 'u1', name: 'Super Admin', email: 'admin@aio.vn', password: 'admin123', role: 'super-admin' },
  { id: 'u2', name: 'Quản trị viên', email: 'editor@aio.vn', password: 'editor123', role: 'editor' },
  { id: 'u3', name: 'Nhân viên Sales', email: 'sales@aio.vn', password: 'sales123', role: 'sales' },
];

export interface AuthResult {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResult> {
    await new Promise((r) => setTimeout(r, 350));
    const found = ACCOUNTS.find((a) => a.email === email && a.password === password);
    if (!found) throw new Error('Email hoặc mật khẩu không đúng.');
    const { password: _pw, ...user } = found;
    return { user, token: `mock-token-${found.id}` };
  },
  demoAccounts(): { email: string; password: string; role: UserRole }[] {
    return ACCOUNTS.map((a) => ({ email: a.email, password: a.password, role: a.role }));
  },
};
