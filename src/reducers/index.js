const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null
  },
  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
};

const updateBookList = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return {
        books: [],
        loading: true,
        error: null
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        books: action.payload,
        loading: false,
        error: null
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        books: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const updateSoppingCart = (state, action) => {
  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);

    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);

    case "ALL_BOOKS_REMOVED_FROM_CART":
      const item = state.shoppingCart.cartItems.find(
        ({ id }) => id === action.payload
      );
      return updateOrder(state, action.payload, -item.count);

    default:
      return state;
  }
};

const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }
  if (idx === -1) {
    return [...cartItems, item];
  }
  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book, item = {}, qty) => {
  const { id = book.id, title = book.title, count = 0, total = 0 } = item;

  return {
    id,
    title,
    count: count + qty,
    total: total + qty * book.price
  };
};

const updateOrder = (state, bookId, qty) => {
  const {
    bookList: { books },
    shoppingCart: { cartItems }
  } = state;
  const book = books.find(({ id }) => id === bookId);
  const itemIdx = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIdx];

  const newItem = updateCartItem(book, item, qty);
  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemIdx)
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
    case "FETCH_BOOKS_SUCCESS":
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        bookList: updateBookList(state, action)
      };
    case "BOOK_ADDED_TO_CART":
    case "BOOK_REMOVED_FROM_CART":
    case "ALL_BOOKS_REMOVED_FROM_CART":
      return {
        ...state,
        shoppingCart: updateSoppingCart(state, action)
      };
    default:
      return state;
  }
};

export default reducer;
