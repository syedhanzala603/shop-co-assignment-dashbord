import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthResult, AuthSession, AuthUser, PasswordResetResult, SignInCredentials } from '../types';
import { authService } from '../services/authService';

const SESSION_STORAGE_KEY = 'shopco_auth_session';
const REMEMBERED_EMAIL_KEY = 'shopco_remembered_email';

interface AuthContextType {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  rememberedEmail: string;
  signIn: (credentials: SignInCredentials) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<PasswordResetResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredSession(): AuthSession | null {
  try {
    const persistentRaw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (persistentRaw) {
      return JSON.parse(persistentRaw) as AuthSession;
    }
    const tabRaw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (tabRaw) {
      return JSON.parse(tabRaw) as AuthSession;
    }
  } catch {
    // Ignore malformed storage data
  }
  return null;
}

function readRememberedEmail(): string {
  try {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';
  } catch {
    return '';
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession());
  const [rememberedEmail, setRememberedEmail] = useState<string>(() => readRememberedEmail());

  useEffect(() => {
    setSession(readStoredSession());
    setRememberedEmail(readRememberedEmail());
  }, []);

  const signIn = async (credentials: SignInCredentials): Promise<AuthResult> => {
    const result = await authService.signIn(credentials);

    if (result.success && result.session) {
      setSession(result.session);

      try {
        if (credentials.rememberMe) {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(result.session));
          localStorage.setItem(REMEMBERED_EMAIL_KEY, credentials.email.trim());
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          setRememberedEmail(credentials.email.trim());
        } else {
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(result.session));
          localStorage.removeItem(SESSION_STORAGE_KEY);
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
          setRememberedEmail('');
        }
      } catch {
        // Ignore storage quota / privacy mode errors
      }
    }

    return result;
  };

  const requestPasswordReset = async (email: string): Promise<PasswordResetResult> => {
    return authService.requestPasswordReset(email);
  };

  const signOut = async (): Promise<void> => {
    await authService.signOut();
    setSession(null);

    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAuthenticated: Boolean(session),
        isDemoMode: authService.isDemoMode,
        rememberedEmail,
        signIn,
        requestPasswordReset,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
