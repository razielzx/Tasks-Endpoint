const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const createTask = async (req, res) => {
  try {
    const { userId, title, limitDate, startDate } = req.body;

    const tasks = await Task.create({ userId, title, limitDate, startDate });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: [User] });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaksByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await Task.findAll({ where: { status }, include: [User] });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTaks = async (req, res) => {
  try {
    const { task } = req;

    const { finishDate } = req.body;

    finishDateDate = new Date(finishDate);

    if (task.status === "active") {
      if (finishDateDate < task.limitDate)
        await task.update({ finishDate, status: "completed" });
      else await task.update({ finishDate, status: "late" });

      res.status(200).json({
        status: "success",
        data: {
          task,
        },
      });
    }

    res.status(404).json({
      status: "error",
      message: "taks no active",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTask,
  getTaks,
  getTaksByStatus,
  deleteTask,
  updateTaks,
};
