import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FormErrors {
  email?: string;
  password?: string;
  credentials?: string;
}

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { signIn, requestPasswordReset, rememberedEmail } = useAuth();

  const fromState = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from;
  const redirectPath =
    fromState?.pathname &&
    !['/sign-in', '/login', '/authentication/sign-in'].includes(fromState.pathname)
      ? `${fromState.pathname}${fromState.search || ''}`
      : '/';

  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password inline view state
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);

  useEffect(() => {
    if (rememberedEmail && !email) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [rememberedEmail, email]);

  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Please enter your email address.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return 'Please enter a valid email address (e.g., name@shopco.com).';
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Please enter your password.';
    }
    return undefined;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      credentials: undefined,
      email: touched.email ? validateEmail(value) : prev.email,
    }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      credentials: undefined,
      password: touched.password ? validatePassword(value) : prev.password,
    }));
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError, credentials: undefined });

    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (!result.success) {
        setErrors({
          credentials:
            result.error ||
            'Invalid email or password. Please check your credentials and try again.',
        });
        return;
      }

      navigate(redirectPath, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenForgot = (e: React.MouseEvent) => {
    e.preventDefault();
    setResetEmail(email.trim());
    setResetError('');
    setResetSuccessMessage('');
    setIsForgotMode(true);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingReset) return;

    const err = validateEmail(resetEmail);
    if (err) {
      setResetError(err);
      return;
    }

    setResetError('');
    setIsSendingReset(true);
    try {
      const result = await requestPasswordReset(resetEmail);
      if (!result.success) {
        setResetError(result.error || 'Unable to process password reset right now.');
        return;
      }
      setResetSuccessMessage(
        result.message ||
          `If an account matches ${resetEmail.trim()}, password reset instructions have been sent.`
      );
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient background accents aligned with dashboard palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#5e35b1]/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#1e88e5]/[0.06] blur-3xl"
      />

      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px]"
        >
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sm:p-8">
            {/* ShopCo Brand Mark */}
            <div className="flex flex-col items-center text-center mb-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#ede7f6] flex items-center justify-center text-[#5e35b1] shadow-xs">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  ShopCo
                </span>
              </div>

              {!isForgotMode ? (
                <>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-balance">
                    Welcome Back
                  </h1>
                  <p className="text-sm text-slate-500 mt-1.5">
                    Sign in to access your dashboard.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-balance">
                    Reset Password
                  </h1>
                  <p className="text-sm text-slate-500 mt-1.5">
                    Enter your email and we will send recovery instructions.
                  </p>
                </>
              )}
            </div>

            {!isForgotMode ? (
              <>
                {/* Invalid Credentials Banner */}
                {errors.credentials && (
                  <div
                    role="alert"
                    className="mb-5 rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-3 flex items-start gap-2.5 text-xs font-medium text-rose-700"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{errors.credentials}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="signin-email"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                          errors.email ? 'text-rose-500' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                      <input
                        id="signin-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@shopco.com"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'signin-email-error' : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-60 ${
                          errors.email
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-200 focus:border-[#5e35b1] focus:ring-[#5e35b1]/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="signin-email-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="signin-password"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                          errors.password ? 'text-rose-500' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                      <input
                        id="signin-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? 'signin-password-error' : undefined}
                        className={`w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-60 ${
                          errors.password
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-200 focus:border-[#5e35b1] focus:ring-[#5e35b1]/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isSubmitting}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        title={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#5e35b1] hover:bg-[#ede7f6]/60 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5e35b1]/40 disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p
                        id="signin-password-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.password}</span>
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    <label
                      htmlFor="signin-remember"
                      className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none min-h-[36px]"
                    >
                      <input
                        id="signin-remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isSubmitting}
                        className="w-4 h-4 rounded border-slate-300 accent-[#5e35b1] cursor-pointer focus:ring-2 focus:ring-[#5e35b1]/30"
                      />
                      <span>Remember Me</span>
                    </label>

                    <a
                      href="#forgot-password"
                      onClick={handleOpenForgot}
                      className="text-xs font-semibold text-[#5e35b1] hover:text-[#4527a0] hover:underline transition-colors whitespace-nowrap shrink-0 py-1.5"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Prominent Sign In Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[44px] px-5 py-2.5 bg-[#5e35b1] hover:bg-[#4527a0] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5e35b1]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-5">
                {resetSuccessMessage ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Reset Request Submitted
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {resetSuccessMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleResetSubmit} noValidate className="space-y-4">
                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                            resetError ? 'text-rose-500' : 'text-slate-400'
                          }`}
                          aria-hidden="true"
                        />
                        <input
                          id="reset-email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@shopco.com"
                          value={resetEmail}
                          onChange={(e) => {
                            setResetEmail(e.target.value);
                            if (resetError) setResetError('');
                          }}
                          disabled={isSendingReset}
                          aria-invalid={Boolean(resetError)}
                          className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                            resetError
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                              : 'border-slate-200 focus:border-[#5e35b1] focus:ring-[#5e35b1]/20'
                          }`}
                        />
                      </div>
                      {resetError && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{resetError}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingReset}
                      className="w-full min-h-[44px] px-5 py-2.5 bg-[#5e35b1] hover:bg-[#4527a0] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSendingReset ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Sending instructions...</span>
                        </>
                      ) : (
                        <span>Send Reset Link</span>
                      )}
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => setIsForgotMode(false)}
                  className="w-full min-h-[40px] px-4 py-2 text-xs font-semibold text-slate-600 hover:text-[#5e35b1] hover:bg-[#ede7f6]/50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-center relative z-10">
        <p className="text-xs text-slate-500">
          © 2026 ShopCo. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
