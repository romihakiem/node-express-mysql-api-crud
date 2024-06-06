module.exports = app => {
  const tutorials = require("../controllers/tutorial.js");
  const router = require("express").Router();

  router.get("/", tutorials.findAll);
  router.get("/published", tutorials.findPublished);
  router.get("/:id", tutorials.findOne);
  router.post("/", tutorials.create);
  router.put("/:id", tutorials.update);
  router.delete("/", tutorials.deleteAll);
  router.delete("/:id", tutorials.delete);

  app.use("/api/tutorials", router);
};