const router = require("express").Router();
const { isAdmin } = require("./adminaccess");
const userRoutes = require("./users");
const productRoutes = require("./products");

router.use("/users", userRoutes);
router.use("/products", productRoutes);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
