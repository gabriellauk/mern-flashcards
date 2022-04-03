const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/test/userCards", [authJwt.verifyToken], controller.userCards);
  app.post("/api/test/addCard", [authJwt.verifyToken], controller.addCard);
  app.delete(
    "/api/test/deleteCard/:id",
    [authJwt.verifyToken],
    controller.deleteCard
  );
  app.get(
    "/api/test/cards/:id",
    [authJwt.verifyToken],
    controller.getSpecificCard
  );
  app.post(
    "/api/test/cards/update/:id",
    [authJwt.verifyToken],
    controller.updateCard
  );
  app.get("/api/test/welcome", [authJwt.verifyToken], controller.welcome);
};
