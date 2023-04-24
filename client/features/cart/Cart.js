import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  selectCart,
  checkoutCart,
  deleteCartItem,
} from "./cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userId } = useParams();
  console.log(useParams());
  console.log(userId);
  const dispatch = useDispatch();
  const singleCart = useSelector(selectCart);
  console.log(singleCart);
  const cartId = useSelector((state) => state.auth.me.cartId);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteCartItem(id));
  };

  function handleCheckout(evt) {
    evt.preventDefault();
    dispatch(checkoutCart(cartId));
  }

  const { id, fulfilled, createdAt, products } = singleCart.info;

  const totalCost = products?.reduce(
    (total, prod) => total + prod.cartproduct.qty * prod.price,
    0
  );

  return (
    <div id="userCartCard">
      <h1>
        {" "}
        <pre>Cart # {id}</pre>
      </h1>
      <pre>Submitted: {fulfilled}</pre>
      <pre>Cart since: {createdAt}</pre>
      Items:
      <div id="productsInCart">
        {products && products.length
          ? products.map((prod) => {
              return (
                <div key={`prod inCart:${prod.id}`}>
                  <Link to={`/products/${prod.id}`}>
                    <div id="prodCard">
                      <img id="tinyImg" src={prod.imageUrl} />
                      <div>
                        <p id="prodName">{prod.name}</p>
                        <p id="prodPrice">
                          {prod.cartproduct.qty} Total: $
                          {prod.cartproduct.qty * prod.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="delete-button">
                    <button onClick={() => handleDelete(prod.cartproduct.id)}>
                      X
                    </button>
                  </div>
                </div>
              );
            })
          : "You Got A empty Cart :("}
      </div>
      <div id="cartTotal">
        <p>Total Cost: ${totalCost}</p>
      </div>
      <Link to="/checkout">
        <button id="checkout" onClick={handleCheckout}>
          Checkout Cart
        </button>
      </Link>
    </div>
  );
};

export default Cart;
