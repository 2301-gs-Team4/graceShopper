const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const CartProduct = db.define("cartproduct", {
  // o: you don't need to set an id here, this is taken care of by Sequelize
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // o: why not quantity?
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
});

module.exports = CartProduct;
