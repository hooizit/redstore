import React from "react";

const {
  Provider: BookstoreServiceProvider,
  Consumer: BookstoreServiceCounsumer
} = React.createContext();

export { BookstoreServiceProvider, BookstoreServiceCounsumer };
