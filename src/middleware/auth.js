const JWT = require("jsonwebtoken");
const userTokenModal = require("../model/userToken");
const UserModel = require("../model/userModel");
const responseHandler = require("../common/responceHandler");

module.exports.checkAuthApi = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return responseHandler.errorResponse(
        res,
        401,
        "UNAUTHORIZED_ACCESS",
        [],
        "UNAUTHORIZED_ACCESS"
      );
    }

    let decoded;
    try {
      decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return responseHandler.errorResponse(
        res,
        401,
        "INVALID_TOKEN",
        error.message,
        "INVALID_TOKEN"
      );
    }

    if (!decoded) {
      return responseHandler.errorResponse(
        res,
        401,
        "UNAUTHORIZED_ACCESS",
        [],
        "UNAUTHORIZED_ACCESS"
      );
    }

    const usertoken = await userTokenModal
      .findOne({ userId: decoded.userId, token })
      .populate("userId");

    if (!usertoken) {
      return responseHandler.errorResponse(
        res,
        401,
        "UNAUTHORIZED_ACCESS",
        [],
        "UNAUTHORIZED_ACCESS"
      );
    }

    const user = await UserModel.findById(usertoken.userId);

    if (!user) {
      return responseHandler.errorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        [],
        "USER_NOT_FOUND"
      );
    }

    const userWithToken = {
      ...user.toObject(),
      token: token,
    };

    req.user = userWithToken;
    next();
  } catch (error) {
    return responseHandler.errorResponse(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      error.message,
      "INTERNAL_SERVER_ERROR"
    );
  }
};
