import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCart } from "./cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userId } = useParams();
  console.log(useParams());
  console.log(userId);
  const dispatch = useDispatch();
  const singleCart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);

  function handleDelete(evt) {
    console.log("delete" + evt.target);
    // dispatch(clearCart)
    //need to use clear cart for the delete functionality
  }

  const { id, fulfilled, createdAt, products } = singleCart.info;

  const totalCost = products?.reduce(
    (total, prod) => total + prod.cartproduct.qty * prod.price,
    0
  );

  return (
    <div id="userCartCard">
      <h1>Cart</h1>
      <span>Cart ID:{id}</span>
      <span>Submitted:{fulfilled}</span>
      <span>Cart since:{createdAt}</span>
      <div id="productsInCart">
        products:
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
                  <button id="cartDeleteItemBtn" onClick={handleDelete}>
                    Remove
                  </button>
                </div>
              );
            })
          : "empty"}
      </div>
      <div id="cartTotal">
        <p>Total Cost: ${totalCost}</p>
        <Link to="/checkout">
          <button id="checkoutBtn">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
