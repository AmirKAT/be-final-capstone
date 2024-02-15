const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(request, response, next) {
  const review = await service.read(request.params.reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(request, response) {
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  const movie_id = request.params.movieId;
  const data = await service.list(movie_id);
  response.json({ data });
}

async function update(request, response) {
  const updatedReview = {
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  destroy: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
