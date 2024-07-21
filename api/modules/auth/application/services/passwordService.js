import bcrypt from "bcrypt";

export class PasswordService {
  encryptPasswords(password) {
    return bcrypt.hashSync(password, 10);
  }

  validatePasswords(password, passwordEncrypted) {
    return bcrypt.compareSync(password, passwordEncrypted);
  }
}
