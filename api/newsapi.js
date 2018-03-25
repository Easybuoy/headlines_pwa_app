const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('94446a2fa0e5422499caf4725c83e818');
console.log(newsapi);


var topHeadlines = (question, category) => {
    newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        q: 'lebron',
        category: 'sports',
        language: 'en',
        country: 'us'
    }).then(response => {
        console.log(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });
};

var everyThing = () => {
newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 1
}).then(response => {
    console.log(response);
/*
  {
    status: "ok",
    articles: [...]
  }
*/
});

};

var sources = () => {
newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        sources: [...]
      }
    */
});
};

module.exports = {topHeadlines, everyThing, sources};