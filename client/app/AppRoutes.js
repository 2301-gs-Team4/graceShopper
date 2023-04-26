import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import SingleProduct from "../features/products/singleProduct/SingleProduct";
import { me } from "./store";
import AllProducts from "../features/products/allProducts/AllProducts";
import Cart from "../features/cart/Cart";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me);
  console.log(userId);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div id="AppRoutes">
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route exact path="/home" element={<AllProducts />} />
          <Route
            exact
            path="/products/:productId/"
            element={<SingleProduct />}
          />
          <Route path={`users/:userId/cart`} element={<Cart />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route exact path="/home" element={<AllProducts />} />
          <Route
            exact
            path="/products/:productId/"
            element={<SingleProduct />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
