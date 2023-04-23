const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
const { isUser, isAdmin } = require("./adminaccess");
module.exports = router;

router.get("/:id/carts", async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: { userId: req.params.id },
      include: {
        model: Product,
        through: CartProduct,
      },
    });
    res.json(userCart);
  } catch (error) {
    next(error);
  }
});
router.get("/", isUser, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
