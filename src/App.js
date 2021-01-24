import React, { Component } from "react";
import Navbar from "./Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./App.css";
import BooksList from "./BooksList";
import SearchBar from "./SearchBar";
import book_filter from "./utility";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: localStorage.getItem("loading") === null ? true : false,
      books_list:
        localStorage.getItem("books_list") === null
          ? []
          : JSON.parse(localStorage.getItem("books_list")),
      title: "",
      language_code: "",
      author: "",
      price: "",
      rating: "",
      show_cart: "",
      sort_type: "alphabet",
    };
    this.handleChange = this.handleChange.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.showCart = this.showCart.bind(this);
    this.hideCart = this.hideCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("cart_items")) {
      localStorage.setItem("cart_items", JSON.stringify([]));
    }
    if (!localStorage.getItem("books_list")) {
      fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("books_list", JSON.stringify(data));
          localStorage.setItem("loading", false);
          this.setState({
            loading: false,
            books_list: JSON.parse(localStorage.getItem("books_list")),
          });
        });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value.toLowerCase().trim(),
    });
  }
  addToCart(book) {
    let cart_items = JSON.parse(localStorage.getItem("cart_items"));
    cart_items.push(book);
    console.log(cart_items);
    localStorage.setItem("cart_items", JSON.stringify(cart_items));
  }
  showCart() {
    this.setState({ show_cart: true });
  }
  hideCart() {
    this.setState({ show_cart: false });
  }
  clearCart() {
    localStorage.setItem("cart_items", JSON.stringify([]));
    this.setState({ a: 1 });
  }
  removeFromCart(book) {
    let index = -1;
    let cart_items = JSON.parse(localStorage.getItem("cart_items"));
    for (let i = 0; i < cart_items.length; i++) {
      if (cart_items[i]["bookID"] === book.bookID) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      cart_items.splice(index, 1);
    }
    localStorage.setItem("cart_items", JSON.stringify(cart_items));
    this.setState({ a: 1 });
  }

  render() {
    console.log(this.state.sort_type);
    return (
      <div className="App">
        {this.state.show_cart ? (
          <div>
            <div className="overlay"></div>
            <Cart
              cart_items={JSON.parse(localStorage.getItem("cart_items"))}
              removeFromCart={this.removeFromCart}
              hideCart={this.hideCart}
              clearCart={this.clearCart}
            />
          </div>
        ) : null}

        <SearchBar handleChange={this.handleChange} />
        <div className="middle-div">
          <div className="sort-div">
            <button className="cart-button" onClick={this.showCart}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>

            <select name="sort_type" onChange={this.handleChange}>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="alphabet" selected="selected">
                Alphabet
              </option>
            </select>
          </div>

          {this.state.loading ? (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={2147483647}
            />
          ) : (
            <BooksList
              books_list={book_filter(
                this.state.title,
                this.state.author,
                this.state.price,
                this.state.language_code,
                this.state.rating,
                this.state.books_list.slice(0, 1000),
                this.state.sort_type
              )}
              addToCart={this.addToCart}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
