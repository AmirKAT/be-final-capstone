const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// Use the reviewsRouter and theatersRouter for related routes
router.use("/:movieId/reviews", reviewsRouter);
router.use("/:movieId/theaters", theatersRouter);
router.get('/:movieId/critics', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Define routes for listing movies and getting a single movie by ID
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;
