import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBookOpen,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

class Cart extends Component {
  render() {
    let cart_items = this.props.cart_items.map((cart_item) => {
      return (
        <div className="cart-item">
          <div className="book-icon">
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>{cart_item.title}</div>
          <div>$ {cart_item.price}</div>
          <button onClick={() => this.props.removeFromCart(cart_item)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      );
    });
    let totalPrice = 0;
    for (let i = 0; i < this.props.cart_items.length; i++) {
      totalPrice = totalPrice + parseInt(this.props.cart_items[i].price);
    }
    return (
      <div className="cart">
        <div>
          <div className="header">
            <h1 className="title">Cart</h1>
            <button className="cross" onClick={this.props.hideCart}>
              X
            </button>
          </div>
          <div className="items-div">
            {cart_items.length > 0 ? (
              cart_items
            ) : (
              <div className="empty-cart-div">
                Looks Like You Haven't Added Any Product In The Cart{" "}
              </div>
            )}
          </div>
        </div>

        <div className="bottom-div">
          <div className="price-div">Total: ${totalPrice}/-</div>
          <div className="button-div">
            <button className="purchase-button">
              Purchase
              <span>
                <FontAwesomeIcon icon={faCreditCard} />
              </span>
            </button>
            <button className="clear-button" onClick={this.props.clearCart}>
              Clear Cart
              <span>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;
