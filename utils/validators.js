module.exports.validateRegisterInput = (
  username,
  password,
  confirmPassword,
  email
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.match(regEx)) {
      errors.email = "provide valid email address";
    }
  }

  if (password === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }

  if (password === "") {
    errors.password = "password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
