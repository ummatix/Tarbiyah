import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { useAuth } from './features/auth/hooks/useAuth';
import { OnboardingProvider } from './features/onboarding/context/OnboardingContext';
import { getPostAuthDestination } from './features/onboarding/utils/onboardingNavigation';
import { ThemeProvider } from './features/theme/ThemeContext';
import { AuthenticatedHomePage } from './pages/AuthenticatedHomePage';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingQuizPage } from './pages/OnboardingQuizPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { GuestRoute } from './routes/GuestRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';

function RootRedirect() {
  const { isAuthenticated, isRecoverySession, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">Loading TARBIYAH...</p>
        </div>
      </div>
    );
  }

  if (isRecoverySession) {
    return <Navigate replace to="/reset-password" />;
  }

  return <Navigate replace to={isAuthenticated ? getPostAuthDestination() : '/login'} />;
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <OnboardingProvider>
            <Routes>
              <Route
                element={
                  <GuestRoute>
                    <AuthPage initialMode="login" />
                  </GuestRoute>
                }
                path="/login"
              />
              <Route
                element={
                  <GuestRoute>
                    <AuthPage initialMode="register" />
                  </GuestRoute>
                }
                path="/register"
              />
              <Route
                element={
                  <GuestRoute>
                    <ForgotPasswordPage />
                  </GuestRoute>
                }
                path="/forgot-password"
              />
              <Route element={<ResetPasswordPage />} path="/reset-password" />
              <Route
                element={
                  <ProtectedRoute requireCompletedOnboarding>
                    <AuthenticatedHomePage />
                  </ProtectedRoute>
                }
                path="/app"
              />
              <Route
                element={
                  <ProtectedRoute>
                    <OnboardingQuizPage />
                  </ProtectedRoute>
                }
                path="/onboarding"
              />
              <Route element={<Navigate replace to="/app" />} path="/onboarding/profile" />
              <Route element={<RootRedirect />} path="/" />
              <Route element={<Navigate replace to="/login" />} path="*" />
            </Routes>
          </OnboardingProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
