const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://static.vecteezy.com/system/resources/thumbnails/000/072/997/small/colorful-shoes-vector.jpg",
  },
});

module.exports = Product;

/**
 * instanceMethods
 */
