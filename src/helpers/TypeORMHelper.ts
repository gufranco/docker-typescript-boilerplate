import "reflect-metadata";
import { createConnection } from "typeorm";

export default class TypeORMHelper {
  /**
   * CONNECT - Conecta ao banco de dados definido
   *
   * @static
   */
  public static async CONNECT() {
    try {
      [
        "TYPEORM_HOST",
        "TYPEORM_USERNAME",
        "TYPEORM_PASSWORD",
        "TYPEORM_DATABASE"
      ].forEach(environmentVar => {
        if (!process.env[environmentVar]) {
          throw new Error(`Missing ${environmentVar} environment var`);
        }
      });

      await createConnection({
        type: "postgres",
        host: process.env.TYPEORM_HOST,
        port: 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: true,
        logging: false,
        entities: [`${__dirname}/../entities/*.js`],
        migrations: [`${__dirname}/../migrations/*.js`],
        subscribers: [`${__dirname}/../subscribers/*.js`]
      });
    } catch (exception) {
      console.error(exception);
    }
  }
}
