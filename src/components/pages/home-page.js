import React from "react";
import BookList from "../book-list";

const HomePage = () => {
  const books = [
    {
      id: 1,
      title: "Prodaction-Ready Microsevices",
      author: "Susan J. Fowler"
    },
    {
      id: 2,
      title: "Release It!",
      author: "Michael T. Nygard"
    }
  ];

  return <BookList books={books} />;
};

export default HomePage;