const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('94446a2fa0e5422499caf4725c83e818');
console.log(newsapi);


// newsapi.v2.topHeadlines({
//     sources: 'bbc-news,the-verge',
//     q: 'bitcoin',
//     category: 'business',
//     language: 'en',
//     country: 'us'
// }).then(response => {
//     console.log(response);
//     /*
//       {
//         status: "ok",
//         articles: [...]
//       }
//     */
// });


// newsapi.v2.everything({
//     q: 'bitcoin',
//     sources: 'bbc-news,the-verge',
//     domains: 'bbc.co.uk, techcrunch.com',
//     from: '2017-12-01',
//     to: '2017-12-12',
//     language: 'en',
//     sortBy: 'relevancy',
//     page: 2
// }).then(response => {
//     console.log(response);
// /*
//   {
//     status: "ok",
//     articles: [...]
//   }
// */
// });


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