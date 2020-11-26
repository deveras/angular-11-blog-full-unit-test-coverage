export const environment = {
  production: true,
  api: {
    url: "https://api.andreferreira.website/",
    articles: {
      get: "articles/read.php"
    },
    bookshelf: {
      get: "bookshelf/read.php"
    },
    tutorials: {
      get: "tutorials/read.php"
    },
    quotes: {
      get: "quotes/read.php",
      votes: "quotes/vote.php"
    }
  }
};
