import React, { Component } from "react";
import "./BooksList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";

class BooksList extends Component {
  render() {
    let books_list = this.props.books_list;

    books_list = this.props.books_list.map((book) => {
      return (
        <div className="book-div" key={book.id}>
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.authors}</div>
          <div className="book-desc">
            <div className="rating-div">
              Rating -{" "}
              <StarRatings
                className="star-rating"
                rating={parseFloat(
                  book.average_rating > 0 ? book.average_rating : 0
                )}
                starRatedColor="#4f5251"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div>Language - {book.language_code}</div>
            <div>Price - ${book.price}</div>
          </div>
          <button onClick={() => this.props.addToCart(book)}>
            <span>
              <FontAwesomeIcon icon={faCartPlus} />
            </span>
            Add to Cart
          </button>
        </div>
      );
    });

    return <div>{books_list}</div>;
  }
}
export default BooksList;
