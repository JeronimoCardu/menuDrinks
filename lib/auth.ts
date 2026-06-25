export const SESSION_COOKIE = 'aero_admin_session';
export const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export function verifyCredentials(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_TOKEN ?? '';
}
