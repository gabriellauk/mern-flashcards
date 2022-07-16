const { authJwt } = require("../middlewares");
const controller = require("../controllers/card.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Get Active Cards list
  app.get(
    "/api/activeCards",
    [authJwt.verifyToken],
    controller.activeCards
  );
  // Get Inactive Cards list
  app.get(
    "/api/inactiveCards",
    [authJwt.verifyToken],
    controller.inactiveCards
  );
  // Add a Card
  app.post("/api/addCard", [authJwt.verifyToken], controller.addCard);
  // Delete a Card
  app.delete(
    "/api/deleteCard/:id",
    [authJwt.verifyToken],
    controller.deleteCard
  );
  // Get a specific Card by ID
  app.get(
    "/api/cards/:id",
    [authJwt.verifyToken],
    controller.getSpecificCard
  );
  // Update a specific Card
  app.post(
    "/api/cards/update/:id",
    [authJwt.verifyToken],
    controller.updateCard
  );
  // Update a Card's status (active vs. inactive)
  app.post(
    "/api/cards/updateCardStatus/:id",
    [authJwt.verifyToken],
    controller.updateCardStatus
  );
};
