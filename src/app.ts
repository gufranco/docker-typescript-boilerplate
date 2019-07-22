import MainController from "./controllers/MainController";

(async () => {
  const mainController: MainController = new MainController();
  await mainController.run();
  console.log("Application is up and running!");
})();
