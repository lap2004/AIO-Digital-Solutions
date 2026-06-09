export type UserRole = 'super-admin' | 'admin' | 'editor' | 'sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  'super-admin': 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
  sales: 'Sales',
};
