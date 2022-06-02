const validateInputs = (userEmail, userPassword) => {
  const regex = /\S+@\S+\.[a-zA-Z]+/;
  const validEmail = regex.test(userEmail);
  const SIX = 6;

  if (validEmail && userPassword.length >= SIX) {
    return false;
  }
  return true;
};

export default validateInputs;
