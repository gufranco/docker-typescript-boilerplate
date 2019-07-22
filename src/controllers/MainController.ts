import HTTPHelper from "../helpers/HTTPHelper";
import TypeORMHelper from "../helpers/TypeORMHelper";
import UserController from "./UserController";

export default class MainController {
  // @ts-ignore
  private userController: UserController = new UserController(
    HTTPHelper.GET_EXPRESS_INSTANCE()
  );

  public async run() {
    await HTTPHelper.LISTEN();
    await TypeORMHelper.CONNECT();
  }
}
