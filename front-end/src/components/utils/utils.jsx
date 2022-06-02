const validateLogin = (userEmail, userPassword) => {
  const regex = /\S+@\S+\.[a-zA-Z]+/;
  const validEmail = regex.test(userEmail);
  const SIX = 6;

  if (validEmail && userPassword.length >= SIX) {
    return false;
  }
  return true;
};

const validateRegister = (email, name, password) => {
  const regex = /\S+@\S+\.[a-zA-Z]+/;
  const validEmail = regex.test(email);
  const SIX = 6;
  const TWELVE = 12;

  if (validEmail && password.length >= SIX && name.length >= TWELVE) {
    return false;
  }

  return true;
};

export { validateLogin, validateRegister };
