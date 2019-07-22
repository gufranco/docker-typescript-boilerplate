// Express.js
import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

// Passport
import passport, { PassportStatic } from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

export default class HTTPHelper {
  private static expressInstance: Application;
  private static passportInstance: PassportStatic;

  /**
   * GET_EXPRESS_INSTANCE - Gera uma instância do Express já configurada
   *
   * @static
   * @returns {Application}
   */
  public static GET_EXPRESS_INSTANCE(): Application {
    if (!this.expressInstance) {
      this.expressInstance = express();
      this.expressInstance.use(bodyParser.json());
      this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
      this.expressInstance.use(
        "/",
        express.static(`${__dirname}/../../public`)
      );
      this.expressInstance.use(morgan("combined"));
      this.expressInstance.use(helmet());
    }

    return this.expressInstance;
  }

  /**
   * GET_PASSPORT_INSTANCE - Gera uma instância do Passport configurado para
   * autenticação do JSON Web Tokens.
   *
   * @static
   * @return {PassportStatic}
   */
  public static GET_PASSPORT_INSTANCE(): PassportStatic {
    if (!this.passportInstance) {
      this.passportInstance = passport;

      this.passportInstance.use(
        new JwtStrategy({}, (payload, done) => {
          console.log(payload);
        })
      );
    }

    return this.passportInstance;
  }

  /**
   * LISTEN - Começa a aceitar requisições na porta definida
   *
   * @static
   */
  public static async LISTEN() {
    try {
      if (!process.env.EXPRESS_PORT) {
        throw new Error("Missing EXPRESS_PORT environment var");
      }

      this.GET_EXPRESS_INSTANCE().listen(
        parseInt(process.env.EXPRESS_PORT, 10)
      );
    } catch (exception) {
      console.error(exception);
    }
  }
}
