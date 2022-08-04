import { USER_EMAIL } from './types';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const a = (ab) => ({ ab });
