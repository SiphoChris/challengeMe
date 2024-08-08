import path from "node:path";
import { connection as db } from "../config/index.js";

function getUsers(_req, res) {
  try {
    const strQry = `
                SELECT *
                from Users;
                `;
    db.query(strQry, (err, results) => {
      if (err) throw new Error(`Unable to fetch all users`);
      res.json({
        status: res.statusCode,
        results: results,
      });
    });
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message,
    });
  }
}

function getUser(req, res) {
  try {
    let userID = +req.params.userID;
    const strQry = `
                SELECT *
                from Users
                where userID = ${userID};
                `;
    db.query(strQry, (err, results) => {
      if (err) throw new Error(`Unable to fetch all users`);
      res.json({
        status: res.statusCode,
        results: results[0],
      });
    });
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message,
    });
  }
}

function registerUser(req, res) {
  let { userID, userName, userSurname, userAge, userEmail, userPwd } = req.body;
  let strQry = `INSERT INTO Users (userID, userName, userSurname, userAge, userEmail, userPwd)
                VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    strQry,
    [userID, userName, userSurname, userAge, userEmail, userPwd],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to register user" });
      }
      res.json({
        status: res.statusCode,
        results: results,
      });
    }
  );
}

function updateUser(req, res) {
  let { userID, userName, userSurname, userAge, userEmail, userPwd } = req.body;
  const userToBeUpdated = req.params.userID;
  let strQry = `UPDATE Users
                SET userName = ?, userSurname = ?, userAge = ?, userEmail = ?, userPwd = ?
                WHERE userID = ${userToBeUpdated};`;
  db.query(
    strQry,
    [userName, userSurname, userAge, userEmail, userPwd, userID],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to update user" });
      }
      res.json({
        status: res.statusCode,
        results: results,
      });
    }
  );
}

function deleteUser(req, res) {
  const userToBeDeleted = req.params.userID;
  let strQry = `DELETE FROM Users
                WHERE userID = ${userToBeDeleted};`;
  db.query(strQry, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Unable to delete user" });
    }
    res.json({
      status: res.statusCode,
      results: results,
    });
  });
}

function getProducts(_req, res) {
  res.sendFile(path.resolve("./static/html/products.html"));
}

function getProduct(req, res) {
  try {
    let productID = +req.params.userID;
    const strQry = `
                  SELECT *
                  from Products
                  where prodID = ${userID};
                  `;
    db.query(strQry, (err, results) => {
      if (err) throw new Error(`Unable to fetch all users`);
      res.json({
        status: res.statusCode,
        results: results[0],
      });
    });
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message,
    });
  }
}

function getErrorPage(_req, res) {
  res.sendFile(path.resolve("./static/html/error.html"));
}

function addProduct(req, res) {
  let { prodID, prodName, prodQuantity, prodPrice, prodURL, userID } = req.body;
  let strQry = `INSERT INTO Products (prodID, prodName, prodQuantity, prodPrice, prodURL, userID)
                  VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    strQry,
    [prodID, prodName, prodQuantity, prodPrice, prodURL, userID],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to create product" });
      }
      res.json({
        status: res.statusCode,
        results: results,
      });
    }
  );
}

function updateProduct(req, res) {
    let {  prodID, prodName, prodQuantity, prodPrice, prodURL, userID } = req.body;
    const productToBeUpdated = req.params.prodID;
    let strQry = `UPDATE Products
                  SET prodID = ?, prodName = ?, prodQuantity = ?, prodPrice = ?, prodURL = ?, userID = ?
                  WHERE prodID = ${productToBeUpdated};`;
    db.query(
      strQry,
      [prodID, prodName, prodQuantity, prodPrice, prodURL, userID],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Unable to update product" });
        }
        res.json({
          status: res.statusCode,
          results: results,
        });
      }
    );
  }

function deleteProduct(req, res) {
const productToBeDeleted = req.params.prodID;
let strQry = `DELETE FROM Products
                WHERE prodID = ${productToBeDeleted};`;
db.query(strQry, (err, results) => {
    if (err) {
    return res.status(500).json({ error: "Unable to delete product" });
    }
    res.json({
    status: res.statusCode,
    results: results,
    });
});
}

export {
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
};
