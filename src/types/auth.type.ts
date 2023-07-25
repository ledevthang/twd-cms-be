export const Role = {
  admin: 'admin',
  root: 'root'
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type Claims = {
  id: string;
  username: string;
  role: Role;
};
