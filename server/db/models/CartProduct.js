const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const CartProduct = db.define("cartproduct", {
  qty: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartProduct;
