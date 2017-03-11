// Abstraction of Action Redux
SearchBooks = function(books, action) {
  switch(action.type) {
    case ActionTypes.SEARCH_BY_QUERY:
      return _.filter(books, function(book) {
        return book.title.toLowerCase().search(action.query.toLowerCase()) !== -1;
      });

    case ActionTypes.SEARCH_BY_CATEGORY:
      if (action.category === "all") {
        return books;
      } else {
        return _.filter(books, function(book) {
          return _.includes(book.categories, action.category);
        });
      }

    case ActionTypes.SEARCH_BY_LANGUAGE:
      if (action.language === "all") {
        return books;
      } else {
        return _.filter(books, function(book) {
          return _.includes(book.lang, action.language);
        });
      }

    case ActionTypes.SEARCH_BY_TIME_AGO:
      if (action.ago === "all") {
        return books;
      } else {
        return _.filter(books, function(book) {
          return action.ago === Utilty.timeAgo(book.date_pub);
        });
      }

    case ActionTypes.SEARCH_BY_PRESENTATION:
      if (action.presentation === "all") {
        return books;
      } else {
        return _.filter(books, function(book) {
          return _.includes(book.mode, action.presentation);
        });
      }

    default:
      return books;
  }
};
