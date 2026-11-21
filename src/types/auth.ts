export type AuthMode = 'login' | 'register';

export interface AuthFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  marketingConsent: boolean;
}

