import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";
import BcryptHelper from "../helpers/BcryptHelper";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  /**
   * findByUsernameAndPassword - Encontra o registro de usuário através do email
   * e da senha informada.
   *
   * @param {string} email
   * @param {string} password
   */
  async findByUsernameAndPassword(email: string, password: string) {
    password = <string>await BcryptHelper.HASH(password);

    return this.findOne({ email, password });
  }
}
