const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

//Fetches all Carts
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

//Checks out the cart, creates a new cart, and assigns the new cart to the logged-in user
router.put("/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId, {});
    res.send(await cart.update({ fulfilled: true }));

    const user = await cart.getUser();
    const newCart = await Cart.create();
    await newCart.setUser(user);
    await user.update({
      cartId: newCart.id,
    });
  } catch (error) {
    next(error);
  }
});
