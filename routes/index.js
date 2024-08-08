import express from "express";
import {
  getUsers,
  getHomePage,
  getUser,
  getErrorPage,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/index.js";
import bodyParser from "body-parser";

const server = express();
const router = express.Router();

// home page end-point : gets home page
router.get("^/$|/eShop", getHomePage);

// users end-point : gets all users
router.get("/users", getUsers);

// user end-point : gets a user by id
router.get("/user/:userID", getUser);

// register end-point : registers a user
router.post("/register", bodyParser.json(), registerUser);

// update end-point : updates a user
router.patch("/users/update/:userID", bodyParser.json(), updateUser);

router.delete("/users/delete/:userID", deleteUser);

router.get("*", getErrorPage);

export { router };
