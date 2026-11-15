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

/**
 * Demo credentials used strictly when no authentication backend URL
 * (VITE_AUTH_API_URL) is configured.
 */
export const DEMO_ACCOUNT = {
  email: 'admin@shopco.com',
  password: 'ShopCo2026',
  user: {
    id: 'demo-admin-1',
    name: 'ShopCo Admin',
    email: 'admin@shopco.com',
    role: 'Administrator',
  },
} as const;

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const API_BASE_URL = env?.VITE_AUTH_API_URL?.trim();

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
 * Client-side demo authentication adapter.
 * Clearly separated from real backend authentication.
 */
class DemoAuthService implements AuthService {
  readonly isDemoMode = true;

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 650));

    const normalizedEmail = credentials.email.trim().toLowerCase();
    const isValidEmail = normalizedEmail === DEMO_ACCOUNT.email.toLowerCase();
    const isValidPassword = credentials.password === DEMO_ACCOUNT.password;

    if (!isValidEmail || !isValidPassword) {
      return {
        success: false,
        error: 'Invalid email or password. Please check your credentials and try again.',
      };
    }

    const session: AuthSession = {
      user: { ...DEMO_ACCOUNT.user },
      token: `demo-session-${Date.now()}`,
      rememberMe: credentials.rememberMe,
      isDemo: true,
      authenticatedAt: new Date().toISOString(),
    };

    return { success: true, session };
  }

  async requestPasswordReset(email: string): Promise<PasswordResetResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: `Demo preview: no email was actually sent, but a reset request for ${email.trim()} was simulated.`,
    };
  }

  async signOut(): Promise<void> {
    await Promise.resolve();
  }
}

export const authService: AuthService = API_BASE_URL
  ? new ApiAuthService(API_BASE_URL.replace(/\/+$/, ''))
  : new DemoAuthService();
