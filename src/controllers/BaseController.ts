import { Request, Response, NextFunction } from "express";

export default class BaseController {
  /**
   * isAllowed - Checa se o token informado na requisição pertence a algum
   * usuário existente na aplicação.
   *
   * @param {Request} request
   * @param {Response} response
   * @param {NextFunction} next
   */
  protected isAllowed(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authToken: string | undefined = request.get("X-Auth-Token");

    if (!authToken) {
      response.status(400).send("Missing X-Auth-Token header");
    } else {
      next();
    }
  }
}
