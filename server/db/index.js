//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartProduct = require("./models/CartProduct");

//associations could go here!

User.hasMany(Cart);

Product.belongsToMany(Cart, { through: CartProduct });

Cart.belongsToMany(Product, { through: CartProduct });

// o: you always place your foreign key in the model that
//  belongs to the other (i.e the userId foreign key should exist on Cart 
//  because it belongs to User)
Cart.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartProduct,
  },
};
