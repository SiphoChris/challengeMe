import express from "express";
import bodyParser from "body-parser";
import {
  getHomePage,
  getUsers,
  getUser,
  getErrorPage,
  registerUser,
  updateUser,
  deleteUser,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";

const server = express();
const router = express.Router();

// middleware
router.use(bodyParser.json());

// homepage end-point: gets the home page
router.get("/", getHomePage);

// users end-point : gets all users
router.get("/users", getUsers);

// user end-point : gets a user by id
router.get("/user/:userID", getUser);

// register end-point : registers a user
router.post("/register", registerUser);

// update end-point : updates a user
router.patch("/users/update/:userID", updateUser);

// delete end-point : deletes a user
router.delete("/users/delete/:userID", deleteUser);

// products end-points : get all products
router.get("/products", getProducts);

// product end-point : gets a product by id
router.get("/products/:prodID", getProduct);

// product end-point : adds a product
router.post("/products/add", addProduct);

// product end-point : updates a product
router.patch("/products/update/:prodID", updateProduct);

// product end-point : deletes a product
router.delete("/products/delete/:prodID", deleteProduct);

// error end-point : returns error page
router.get("*", getErrorPage);

export { router };
