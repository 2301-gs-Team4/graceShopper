const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const CartProduct = require("../db/models/CartProduct");
module.exports = router;

//Fetches all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//Fetches products by Id
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});
