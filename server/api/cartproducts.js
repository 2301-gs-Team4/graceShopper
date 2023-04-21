const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cartProducts = await CartProduct.findAll();
    res.json(cartProducts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await CartProduct.create(req.body));
  } catch (error) {
    next(error);
  }
});
