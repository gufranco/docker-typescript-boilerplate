import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

export default class HTTPHelper {
  private static expressInstance: Application;

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
