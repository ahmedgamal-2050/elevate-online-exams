export class AuthEndpoints {
  static readonly REGISTER = 'https://flower.elevateegy.com/api/v1/auth/signup';
  static readonly LOGIN = 'https://flower.elevateegy.com/api/v1/auth/signin';
  static readonly CHANGE_PASSWORD =
    'https://flower.elevateegy.com/api/v1/auth/change-password';
  static readonly DELETE_MY_ACCOUNT =
    'https://flower.elevateegy.com/api/v1/auth/deleteMe';
  static readonly EDIT_PROFILE =
    'https://flower.elevateegy.com/api/v1/auth/editProfile';
  static readonly UPLOAD_PROFILE_PHOTO =
    'https://flower.elevateegy.com/api/v1/auth/upload-photo';
  static readonly LOGOUT = 'https://flower.elevateegy.com/api/v1/auth/logout';
  static readonly PROFILE_DATA =
    'https://flower.elevateegy.com/api/v1/auth/profile-data';
  static readonly FORGOT_PASSWORD =
    'https://flower.elevateegy.com/api/v1/auth/forgotPassword';
  static readonly VERIFY_OTP =
    'https://flower.elevateegy.com/api/v1/auth/verifyResetCode';
  static readonly RESET_PASSWORD =
    'https://flower.elevateegy.com/api/v1/auth/resetPassword';
  static readonly CHANGE_USER_ROLE =
    'https://flower.elevateegy.com/api/v1/auth/update-role/{userId}';
}
