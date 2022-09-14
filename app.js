const express = require("express");
const { userRoutes } = require("./routes/users.routes");
const { taskRoutes } = require("./routes/task.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = {
  app,
};
