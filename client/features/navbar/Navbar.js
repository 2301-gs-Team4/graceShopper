import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectCart } from "../../features/cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  // const userId = useSelector((state) => state.auth.me.id);
  const userId = useSelector((state) => isLoggedIn ? state.auth.me.id : "guest");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: implement login logic
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("guestCart");
  // };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate(`/users/${userId}/cart`);
    } else {
      navigate("/cart");
    }
  };

  const renderCartIcon = () => {
    if (cart.length > 0) {
      return <span className="cart-count">{cart.length}</span>;
    }
    return null;
  };

  return (
    <div id="navBarComp">
      <h1>Shop-A-Shaq</h1>
      <p>Your Big And Tall Store</p>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            {/* <button type="button" onClick={handleLogout}>
              Logout
            </button> */}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout{" "}
            </button>
            <button type="button" onClick={handleCartClick}>
              🛒 {renderCartIcon()}
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/* <form onSubmit={handleLogin}>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form> */}

            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/home">Home</Link>
            <button type="button" onClick={handleCartClick}>
              🛒 {renderCartIcon()}
            </button>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
