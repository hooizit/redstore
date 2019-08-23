import updateBookList from "./book-list";
import updateSoppingCart from "./shopping-cart";

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateSoppingCart(state, action)
  };
};

export default reducer;
