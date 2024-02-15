if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require("express");
const app = express();

// Import routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// Middleware to parse JSON bodies
app.use(express.json());

// Use routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err;
    res.status(status).json({ error: message });
});

module.exports = app;
