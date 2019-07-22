import { Application, Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
import UserRepository from "../repositories/UserRepository";

export default class UserController extends BaseController {
  private userRepository: UserRepository = new UserRepository();

  /**
   * constructor
   *
   * @param {Application} httpRouter?
   */
  constructor(httpRouter?: Application) {
    super();

    if (httpRouter) {
      this.applyRoutes(httpRouter);
    }
  }

  /**
   * applyRoutes
   *
   * @param {Application} httpRouter
   */
  private applyRoutes(httpRouter: Application) {
    // Rotas públicas
    httpRouter.post(
      "/api/users/sign_in",
      (request: Request, response: Response) => this.signin(request, response)
    );
    httpRouter.post(
      "/api/users/sign_up",
      (request: Request, response: Response) => this.signup(request, response)
    );

    // Rotas privadas
    httpRouter.post(
      "/api/users/sign_off",
      (request: Request, response: Response, next: NextFunction) =>
        this.isAllowed(request, response, next),
      (request: Request, response: Response) => this.signoff(request, response)
    );
  }

  /**
   * signup - Efetua cadastro do usuário
   *
   * @param {Request} request
   * @param {Response} response
   */
  private async signup(request: Request, response: Response) {
    try {
      const user = await this.userRepository.create(request.body);
      response.json(user);
    } catch (exception) {
      response.status(400).json(exception.message);
    }
  }

  /**
   * signin - Efetua autenticação do usuário
   *
   * @param {Request} request
   * @param {Response} response
   */
  private async signin(request: Request, response: Response) {
    console.log(request.body);
    console.log("signin...");
    response.json("signin...");
  }

  /**
   * signoff - Efetua desautenticação do usuário
   *
   * @param {Request} request
   * @param {Response} response
   */
  private async signoff(request: Request, response: Response) {
    console.log(request.body);
    console.log("signoff...");
    response.json("signoff...");
  }
}
