const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Correct import syntax for ObjectId
const taskModal = require("../model/taskModel");
const MessageConstant = require("../common/massageConstant");
const responseHandler = require("../common/responceHandler");

class taskServices {
  constructor() {}

  async createTask(payload, user, res) {
    try {
      const task = await taskModal.find({ title: payload.title });

      if (task.length > 0) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.INVALID_DETAILS,
          errors
        );
      }

      const taskData = await taskModal.create({
        userId: user._id,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        status: payload.status,
      });

      return taskData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTask(id, payload) {
    try {
      const task = await taskModal.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }
      );

      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTasks(id) {
    try {
      const tasks = await taskModal.find({ userId: id });
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTask(id, res) {
    try {
      const user = await taskModal.deleteOne({ _id: id });
      if (!user) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.INVALID_DETAILS,
          errors
        );
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new taskServices();
