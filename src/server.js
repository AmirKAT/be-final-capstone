const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

// Run database migrations and then start the server
knex.migrate.latest()
  .then(migrations => {
    console.log("Migrations are successful:", migrations);
    app.listen(PORT, listener);
  })
  .catch(error => {
    console.error("Failed to run migrations:", error);
    process.exit(1);
  });
