const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Correct import syntax for ObjectId
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userModal = require("../model/userModel");
const userTokenModal = require("../model/userToken");
const MessageConstant = require("../common/massageConstant");
const responseHandler = require("../common/responceHandler");

class userServices {
  constructor() {}

  async loginUser(payload, res) {
    try {
      const user = await userModal.findOne({
        $or: [{ email: payload.identifier }, { username: payload.identifier }],
      });

      if (!user) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.ALREADY_DATA_HERE,
          "user is not exits"
        );
      }

      // Compare hashed password with provided password
      const passwordMatch = await bcrypt.compare(
        payload.password,
        user.password
      );

      if (!passwordMatch) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.INVALID_PASSWORD,
          errors
        );
      }

      // Generate JWT token
      const token = JWT.sign(
        { userId: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );

      await userTokenModal.create({
        userId: user._id,
        token: token,
      });
      const userData = { user: user, accessToken: token };
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(paylaod) {
    try {
      const result = await userTokenModal.deleteOne({
        userId: paylaod._id,
        token: paylaod.token,
      });

      return result;
    } catch (e) {
      throw Error(e);
    }
  }

  async registerUser(payload, res) {
    try {
      const existingUser = await userModal.findOne({ email: payload.email });
      if (existingUser) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.EMAIL_ALREADY_REGISTERED,
          ""
        );
      }

      const hashedPassword = await bcrypt.hash(payload?.password, 10);

      const newUser = await userModal.create({
        email: payload?.email,
        password: hashedPassword,
        username: payload?.username,
        first_name: payload?.first_name,
        last_name: payload?.last_name,
      });

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByuserId(id, res) {
    try {
      const user = await userModal.findOne({ _id: id });

      const accessToken = await userTokenModal.findOne({ userId: id });
      if (!user) {
        return responseHandler.errorResponse(
          res,
          404,
          MessageConstant.INVALID_DETAILS,
          errors
        );
      }

      return { user, accessToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUserList(id) {
    try {
      const users = await userModal.find({ _id: { $ne: new ObjectId(id) } });

      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new userServices();
