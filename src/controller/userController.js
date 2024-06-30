const { body, validationResult } = require("express-validator");
const userService = require("../services/userServices");
const responseHandler = require("../common/responceHandler");
const MessageConstant = require("../common/massageConstant");

class userController {
  constructor() {}

  async loginUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const data = await userService.loginUser(req.body, res);

      if (data) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.LOGIN_SUCCESS,
          data
        );
      }
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async logout(req, res) {
    try {
      const result = await userService.logout(req.user);

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.LOGOUT_SUCCESS,
        result
      );
    } catch (e) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        errors
      );
    }
  }

  async registerUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const data = await userService.registerUser(req.body, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          "Registration failed"
        );
      }

      return responseHandler.successResponse(
        res,
        200,
        MessageConstant.REGISTER_SUCCESS,
        data
      );
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        error.message
      );
    }
  }

  async getByuserId(req, res) {
    try {
      const data = await userService.getByuserId(req.params.id, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      if (data) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUCCESS,
          data
        );
      }
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async checkLogin(req, res) {
    try {
      const data = await userService.getByuserId(req.user._id, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      if (data) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUCCESS,
          data
        );
      }
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  async getAllUserList(req, res) {
    try {
      const data = await userService.getAllUserList(req.params.id, res);

      if (!data) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          errors
        );
      }

      if (data) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.SUCCESS,
          data
        );
      }
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        400,
        MessageConstant.SOMETHING_WRONG,
        error
      );
    }
  }

  // Define your validation rules here
  static validate(method) {
    switch (method) {
      case "registerUser": {
        return [
          body("username")
            .notEmpty()
            .withMessage("Please enter username.")
            .matches(/^[a-zA-Z][a-zA-Z0-9 ]*$/)
            .withMessage("Please enter a valid username.")
            .isLength({ max: 20 })
            .withMessage("Username should not be more than 20 Characters."),
          body("first_name")
            .notEmpty()
            .withMessage("Please enter first name.")
            .matches(/^[a-zA-Z][a-zA-Z0-9 ]*$/)
            .withMessage("Please enter a valid first name.")
            .isLength({ max: 20 })
            .withMessage("First name should not be more than 20 Characters."),
          body("last_name")
            .notEmpty()
            .withMessage("Please enter last name.")
            .matches(/^[a-zA-Z][a-zA-Z0-9 ]*$/)
            .withMessage("Please enter a valid last name.")
            .isLength({ max: 20 })
            .withMessage("Last name should not be more than 20 Characters."),
          body("email")
            .notEmpty()
            .withMessage("Please enter email.")
            .isEmail()
            .withMessage("The email you have entered is invalid")
            .isLength({ max: 60 })
            .withMessage("Email id should not be more than 60 Characters."),
          body("password")
            .notEmpty()
            .withMessage("Please enter password.")
            .isLength({ min: 8, max: 16 })
            .withMessage("The password must be 8 to 16 characters in length."),
          body("profile_pic")
            .notEmpty()
            .withMessage("Please upload profile picture."),
        ];
      }
      case "loginUser": {
        return [
          body("identifier")
            .notEmpty()
            .withMessage("Please enter your email or username."),
          body("password")
            .notEmpty()
            .withMessage("Please enter password.")
            .isLength({ min: 8, max: 16 })
            .withMessage("The password must be 8 to 16 characters in length."),
        ];
      }
      case "changePassword": {
        return [
          body("currentPassword")
            .notEmpty()
            .withMessage("Please enter current password.")
            .isLength({ min: 8, max: 16 })
            .withMessage("The password must be 8 to 16 characters in length."),
          body("newPassword")
            .notEmpty()
            .withMessage("Please enter new password.")
            .isLength({ min: 8, max: 16 })
            .withMessage("The password must be 8 to 16 characters in length."),
          body("confirmPassword")
            .notEmpty()
            .withMessage("Please enter confirm password.")
            .isLength({ min: 8, max: 16 })
            .withMessage("The password must be 8 to 16 characters in length."),
        ];
      }
      // Add validation rules for other methods if needed
      default:
        return [];
    }
  }
}
module.exports = new userController();
