import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";

import "./SearchBar.css";
class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <div className="inner-div">
          <div className="search-icon-div">
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <input
            name="title"
            placeholder="title"
            onChange={this.props.handleChange}
          ></input>
          <input
            name="author"
            placeholder="author"
            onChange={this.props.handleChange}
          ></input>
          <input
            name="price"
            placeholder="price"
            onChange={this.props.handleChange}
          ></input>
          <input
            name="language_code"
            placeholder="language_code"
            onChange={this.props.handleChange}
          ></input>
          <input
            name="rating"
            placeholder="rating"
            onChange={this.props.handleChange}
          ></input>
        </div>
      </div>
    );
  }
}
export default SearchBar;
