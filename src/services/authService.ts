import {
  AuthResult,
  AuthSession,
  PasswordResetResult,
  SignInCredentials,
} from '../types';

export interface AuthService {
  readonly isDemoMode: boolean;
  signIn(credentials: SignInCredentials): Promise<AuthResult>;
  requestPasswordReset(email: string): Promise<PasswordResetResult>;
  signOut(): Promise<void>;
}

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const API_BASE_URL = env?.VITE_AUTH_API_URL?.trim();

function formatDisplayNameFromEmail(email: string): string {
  const localPart = email.split('@')[0] || 'User';
  const words = localPart
    .replace(/[._-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return 'ShopCo User';

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Future-ready HTTP authentication adapter.
 * Activated automatically when VITE_AUTH_API_URL is configured.
 */
class ApiAuthService implements AuthService {
  readonly isDemoMode = false;

  constructor(private readonly baseUrl: string) {}

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password,
          rememberMe: credentials.rememberMe,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error:
            payload?.message ||
            'Invalid email or password. Please check your credentials and try again.',
        };
      }

      const session: AuthSession = {
        user: payload.user,
        token: payload.token,
        rememberMe: credentials.rememberMe,
        isDemo: false,
        authenticatedAt: new Date().toISOString(),
      };

      return { success: true, session };
    } catch {
      return {
        success: false,
        error: 'Unable to reach the authentication server. Please try again shortly.',
      };
    }
  }

  async requestPasswordReset(email: string): Promise<PasswordResetResult> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        return {
          success: false,
          error: payload?.message || 'Unable to process password reset right now.',
        };
      }

      return {
        success: true,
        message:
          payload?.message ||
          'If an account matches this email, recovery instructions have been sent.',
      };
    } catch {
      return {
        success: false,
        error: 'Unable to reach the authentication server. Please try again shortly.',
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/auth/sign-out`, { method: 'POST' });
    } catch {
      // Clear local session regardless of network failure
    }
  }
}

/**
 * Temporary frontend-only authentication adapter for development and testing
 * while no backend authentication server is connected.
 * Accepts any valid email address and any non-empty password.
 */
class DemoAuthService implements AuthService {
  readonly isDemoMode = true;

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 550));

    const trimmedEmail = credentials.email.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const hasPassword = credentials.password.length > 0;

    if (!isEmailValid || !hasPassword) {
      return {
        success: false,
        error: 'Please enter a valid email address and password.',
      };
    }

    const session: AuthSession = {
      user: {
        id: `temp-user-${Date.now()}`,
        name: formatDisplayNameFromEmail(trimmedEmail),
        email: trimmedEmail,
        role: 'Administrator',
      },
      token: `temp-session-${Date.now()}`,
      rememberMe: credentials.rememberMe,
      isDemo: true,
      authenticatedAt: new Date().toISOString(),
    };

    return { success: true, session };
  }

  async requestPasswordReset(email: string): Promise<PasswordResetResult> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    return {
      success: true,
      message: `If an account matches ${email.trim()}, password reset instructions have been sent.`,
    };
  }

  async signOut(): Promise<void> {
    await Promise.resolve();
  }
}

export const authService: AuthService = API_BASE_URL
  ? new ApiAuthService(API_BASE_URL.replace(/\/+$/, ''))
  : new DemoAuthService();
