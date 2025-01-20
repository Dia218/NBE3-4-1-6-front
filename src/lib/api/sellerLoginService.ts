export const passwordValidationService = {
  validatePassword: (password: string): boolean => {
    const VALID_PASSWORD = "1111"; // 고정된 비밀번호
    return password === VALID_PASSWORD;
  },
};
