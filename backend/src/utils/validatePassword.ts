export const validatePasswordStrength = (password: string) => {
  if (!password || password.length < 8) {
    throw {
      status: 400,
      message: "New password is required and must be at least 8 characters long",
    };
  }
};
