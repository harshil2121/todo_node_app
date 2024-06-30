const express = require("express");
const router = express.Router();
const task = require("../controller/taskController");
const { checkAuthApi } = require("../middleware/auth");

router.post("/", checkAuthApi, task.createTask);
router.put("/:id", checkAuthApi, task.updateTask);
router.get("/", checkAuthApi, task.getAllTasks);
router.delete("/:id", checkAuthApi, task.deleteTask);

module.exports = router;
