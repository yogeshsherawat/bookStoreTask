function book_filter(
  title,
  author,
  price,
  language_code,
  rating,
  books_list,
  sort_type
) {
  console.log(sort_type);
  if (
    title === "" &&
    author === "" &&
    price === "" &&
    language_code === "" &&
    rating === ""
  ) {
    return custom_sort(books_list.slice(0, 30), sort_type);
  }
  books_list = books_list.filter((book) => {
    let book_title = book.title.toString().toLowerCase();
    let book_author = book.authors.toString().toLowerCase();
    let book_price = parseInt(book.price);
    let book_language_code = book.language_code.toString().toLowerCase();

    let book_rating = parseFloat(book.average_rating);
    let flag = true;
    if (title !== "" && !book_title.includes(title)) flag = false;
    if (author !== "" && !book_author.includes(author)) flag = false;
    if (price !== "" && book_price >= parseInt(price)) flag = false;
    if (language_code !== "" && book_language_code !== language_code)
      flag = false;
    if (rating !== "" && book_rating >= parseFloat(rating)) flag = false;
    return flag;
  });
  return custom_sort(
    books_list.slice(0, Math.min(30, books_list.length), sort_type)
  );
}

function custom_sort(books_list, sort_type) {
  if (sort_type === "alphabet") {
    books_list.sort(function (x, y) {
      if (x.title === y.title) {
        return 0;
      }
      if (x.title.localeCompare(y.title) > 0) {
        return 1;
      }
      return -1;
    });
  }
  if (sort_type === "price") {
    books_list.sort(function (x, y) {
      if (x.price === y.price) {
        return 0;
      }
      if (x.price > y.price) {
        return 1;
      }
      return -1;
    });
  }
  if (sort_type === "rating") {
    books_list.sort(function (x, y) {
      if (parseFloat(x.average_rating) === parseFloat(y.price)) {
        return 0;
      }
      if (parseFloat(x.average_rating) > parseFloat(y.average_rating)) {
        return 1;
      }
      return -1;
    });
  }
  return books_list;
}

export default book_filter;
