export const AppRoutes = {
  auth: {
    root: 'auth',
    login: 'login',
    register: 'register',
    forgotPassword: 'forgot-password',
    verifyOtp: 'verify-otp',
    resetPassword: 'reset-password',
  },
  dashboard: {
    root: 'dashboard',
    diplomas: 'diplomas',
    accountSettings: 'account-settings',
    account: 'account',
    exams: 'exams',
    questions: 'questions',
  },
} as const;
