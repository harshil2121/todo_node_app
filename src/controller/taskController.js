const { body, validationResult } = require("express-validator");
const taskService = require("../services/taskServices");
const responseHandler = require("../common/responceHandler");
const MessageConstant = require("../common/massageConstant");

class TaskController {
  constructor() {}

  async createTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const data = await taskService.createTask(req.body, req.user, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          null
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.CREATE_SUCCESS,
        data
      );
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        500,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async updateTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseHandler.errorResponse(res, 400, errors.array(), errors);
      }

      const data = await taskService.updateTask(req.params.id, req.body);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          null
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.UPDATE_SUCCESS,
        data
      );
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        500,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async getAllTasks(req, res) {
    try {
      const data = await taskService.getAllTasks(req.user._id, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          null
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.SUCCESS,
        data
      );
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        500,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async deleteTask(req, res) {
    try {
      const data = await taskService.deleteTask(req.params.id, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          null
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.DELETE_SUCCESS,
        data
      );
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        500,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  // Define your validation rules here
  static validate(method) {
    switch (method) {
      case "createTask": {
        return [
          body("title").notEmpty().withMessage("Please enter title."),
          body("description")
            .notEmpty()
            .withMessage("Please enter description."),
          body("dueDate").notEmpty().withMessage("Please enter due date."),
        ];
      }
      case "updateTask": {
        return [
          body("title").notEmpty().withMessage("Please enter title."),
          body("description")
            .notEmpty()
            .withMessage("Please enter description."),
          body("dueDate").notEmpty().withMessage("Please enter due date."),
        ];
      }
      default:
        return [];
    }
  }
}

module.exports = new TaskController();
