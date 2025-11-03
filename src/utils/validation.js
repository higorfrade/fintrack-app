export const validateEmail = (email) => {
    if (email.trim()) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return false;
}

export const validatePassword = (password, confirmPassword) => {
  if (!password || !confirmPassword) {
        return false;
  } 

  return password === confirmPassword;
};