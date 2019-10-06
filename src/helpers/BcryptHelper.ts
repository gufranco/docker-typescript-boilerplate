import bcryptjs from "bcryptjs";

export default class BcryptHelper {
  /**
   * HASH - Gera o hash do valor informado
   *
   * @param {string} value
   * @returns {Promise<string | undefined>}
   */
  public static async HASH(value: string): Promise<string | undefined> {
    try {
      if (!process.env.BCRYPT_SALT) {
        throw new Error(`Missing BCRYPT_SALT environment var`);
      }

      return bcryptjs.hash(
        await bcryptjs.genSalt(parseInt(process.env.BCRYPT_SALT, 10)),
        value
      );
    } catch (exception) {
      console.error(exception);
    }
  }

  /**
   * COMPARE - Compara se o valor informado é compatível com o hash
   *
   * @param {string} value
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  public static async COMPARE(
    value: string,
    hash: string
  ): Promise<boolean | undefined> {
    try {
      return bcryptjs.compare(value, hash);
    } catch (exception) {
      console.error(exception);
    }
  }
}
