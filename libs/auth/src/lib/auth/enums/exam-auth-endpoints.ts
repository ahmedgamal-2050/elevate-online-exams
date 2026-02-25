export class AuthEndpoints {
  static readonly REGISTER = 'https://exam.elevateegy.com/api/v1/auth/signup';
  static readonly LOGIN = 'https://exam.elevateegy.com/api/v1/auth/signin';
  static readonly CHANGE_PASSWORD =
    'https://exam.elevateegy.com/api/v1/auth/changePassword';
  static readonly DELETE_MY_ACCOUNT =
    'https://exam.elevateegy.com/api/v1/auth/deleteMe';
  static readonly EDIT_PROFILE =
    'https://exam.elevateegy.com/api/v1/auth/editProfile';
  static readonly LOGOUT = 'https://exam.elevateegy.com/api/v1/auth/logout';
  static readonly PROFILE_DATA =
    'https://exam.elevateegy.com/api/v1/auth/profileData';
  static readonly FORGOT_PASSWORD =
    'https://exam.elevateegy.com/api/v1/auth/forgotPassword';
  static readonly VERIFY_OTP =
    'https://exam.elevateegy.com/api/v1/auth/verifyResetCode';
  static readonly RESET_PASSWORD =
    'https://exam.elevateegy.com/api/v1/auth/resetPassword';
}
