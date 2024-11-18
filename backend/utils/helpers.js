const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt); // хэшируем пароль
};

const comparePassword = (raw, hash) => {
  return bcrypt.compareSync(raw, hash); // проверяем совпадает ли хэш с изначальным
};

module.exports = {
  hashPassword,
  comparePassword,
};
