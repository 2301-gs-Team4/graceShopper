const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const CartProduct = db.define("cartproduct", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
});

module.exports = CartProduct;
