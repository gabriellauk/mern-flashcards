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
  app.get(
    "/api/activeCards",
    [authJwt.verifyToken],
    controller.activeCards
  );
  app.get(
    "/api/inactiveCards",
    [authJwt.verifyToken],
    controller.inactiveCards
  );
  app.post("/api/addCard", [authJwt.verifyToken], controller.addCard);
  app.delete(
    "/api/deleteCard/:id",
    [authJwt.verifyToken],
    controller.deleteCard
  );
  app.get(
    "/api/cards/:id",
    [authJwt.verifyToken],
    controller.getSpecificCard
  );
  app.post(
    "/api/cards/update/:id",
    [authJwt.verifyToken],
    controller.updateCard
  );
  app.post(
    "/api/cards/updateCardStatus/:id",
    [authJwt.verifyToken],
    controller.updateCardStatus
  );
};
