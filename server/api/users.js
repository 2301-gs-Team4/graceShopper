const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

//Fetches cart by userId and includes products
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: { userId: req.params.userId, fulfilled: false },
      include: {
        model: Product,
        through: CartProduct,
      },
    });
    res.json(userCart[0]);
  } catch (error) {
    next(error);
  }
});

//Fetches all users and includes Id and username
router.get("/", async (req, res, next) => {
  try {
    // o: only admins should be able to see this
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
