const APIKEY = '94446a2fa0e5422499caf4725c83e818';
this._dbPromise = openDatabase();
$(document).ready(() => {
    $('#searchForm').keyup( (e) => {
        let searchText = $('#searchText').val();
        getNewsBySearch(searchText);
        // console.log(searchText)
        e.preventDefault();


    });
});


$(document).ready(() => {
    $('#sources').on('click', (e) => {

        getNewsBySources();
        e.preventDefault();
    });
});


$(document).ready(() => {
    $('#country').on('change', (e) => {
       let country = $('#country').val();
        getNewsByCountry(country);
        // console.log(searchText)
        e.preventDefault();
    });
});


function getNewsBySearch(searchText) {
    $('#searchnews').empty();

    axios.get('https://newsapi.org/v2/everything?q='+searchText+'&apiKey='+APIKEY)
        .then((response) => {
            let news =  response.data.articles;
            if(news.length == 0){
                noArticleFound();

                return;
            }
            this._dbPromise.then(function(db) {
                if (!db) return;

                var tx = db.transaction('everything', 'readwrite');
                var store = tx.objectStore('everything');
                news.forEach(function (everything) {
                    store.put(everything);
                });

            });


            let output = '';
            $.each(news, (index, singlenews) => {
                console.log(singlenews);
                var trimmedDescription = '';
                if(singlenews.description){
                    var trimmedDescription = singlenews.description.substr(0, 50);
                }

                output += `
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${singlenews.urlToImage}" class="img-fluid" alt="${singlenews.title}" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${singlenews.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-deep-orange btn-sm" href="${singlenews.url}" target="_blank">
                        <i class="fa fa-clone left"></i> View News</a>
                </div>
            </div>
          `;
            });
            $('#searchnews').html(output);
        })
        .catch((err) => {
            if (!err.response) {
                // network error
                errorSnackBar();
            } else {

            }

            //
            // $("#error").click(function () {
            //     jQuery('#error').click()
            //     toastr["info"]("I was launched via jQuery!")
            // });

        });
}

function getNewsBySources(){
    $('#searchnews').empty();
    axios.get('https://newsapi.org/v2/sources?apiKey='+APIKEY)
        .then((response) => {
            let sources =  response.data.sources;
            if(sources.length == 0){
                noArticleFound();

                return;
            }
            this._dbPromise.then(function(db) {
                if (!db) return;

                // TODO: put each message into the 'wittrs'
                // object store.
                var tx = db.transaction('sourcenews', 'readwrite');
                var store = tx.objectStore('sourcenews');
                sources.forEach(function (news) {
                    console.log(news);
                    store.put(news);
                })

            });

            let output = '';
            $.each(sources, (index, source) => {
                console.log(source);

                output += `
            <div class="col-lg-4 col-md-12 mb-4">
                

                <div class="card-body mt-3">
                    <h4>
                        <strong>${source.name}</strong>
                    </h4>
                     <p class="grey-text">${source.description}</p>
                    <a class="btn btn-deep-orange btn-sm" onclick="getNewsBySourceHeadline('${source.id}')" href="#">
                        <i class="fa fa-clone left"></i> View Source Headline</a>
                </div>
            </div>
          `;
            });
            $('#searchnews').html(output);
        })
        .catch((err) => {
            if (!err.response) {
                // network error
                errorSnackBar();
            } else {

            }
        });
}


function getNewsBySourceHeadline(id){
    $('#searchnews').empty();
    axios.get('https://newsapi.org/v2/top-headlines?sources='+id+'&apiKey='+APIKEY)
        .then((response) => {
            let headlinesources =  response.data.articles;
            if(headlinesources.length == 0){
                noArticleFound();

                return;
            }

            let output = '';
            $.each(headlinesources, (index, headlinesource) => {
                console.log(headlinesource);
                var trimmedDescription = '';
                if(headlinesource.description){
                    var trimmedDescription = headlinesource.description.substr(0, 50);
                }
                output += `
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${headlinesource.urlToImage}" class="img-fluid" alt="${headlinesource.title}" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${headlinesource.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-deep-orange btn-sm" href="${headlinesource.url}" target="_blank">
                        <i class="fa fa-clone left"></i> View News</a>
                </div>
            </div>
          `;
            });
            $('#searchnews').html(output);
        })
        .catch((err) => {
            if (!err.response) {
                // network error
                errorSnackBar();
            } else {

            }
        });
}

function getNewsByCountry(country){
    // country = country.toLowerCase();
    $('#searchnews').empty();
    axios.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+APIKEY)
        .then((response) => {
            let countrynews =  response.data.articles;
            if(countrynews.length == 0){
                noArticleFound();

                return;
            }
            this._dbPromise.then(function(db) {
                if (!db) return;

                // TODO: put each message into the 'wittrs'
                // object store.
                var tx = db.transaction('countrynews', 'readwrite');
                var store = tx.objectStore('countrynews');
                countrynews.forEach(function (news) {
                    store.put(news);
                })

            });
            let output = '';
            $.each(countrynews, (index, singlenews) => {
                var trimmedDescription = '';
                if(singlenews.description){
                    var trimmedDescription = singlenews.description.substr(0, 50);
                }
            output += `
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${singlenews.urlToImage}" class="img-fluid" alt="${singlenews.title}" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${singlenews.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-deep-orange btn-sm" href="${singlenews.url}" target="_blank">
                        <i class="fa fa-clone left"></i> View News</a>
                </div>
            </div>
          `;
            });
            $('#searchnews').html(output);

        })
        .catch((err) => {
        console.log(err)
            if (!err.response) {
                // network error
                errorSnackBar();
            } else {

            }
        });
}

function errorSnackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


function openDatabase() {
    // If the browser doesn't support service worker,
    // we don't care about having a database
    if (!navigator.serviceWorker) {
        return Promise.resolve();
    }

    // TODO: return a promise for a database called 'wittr'
    // that contains one objectStore: 'wittrs'
    // that uses 'id' as its key
    // and has an index called 'by-date', which is sorted
    // by the 'time' property
    console.log('a');
    return idb.open('headline', 1, function (upgradeDb) {
        // switch (upgradeDb.oldVersion){
            // case 0:
                var store = upgradeDb.createObjectStore('sourcenews', {
                    keyPath: 'id'
                });
            // case 1:
                upgradeDb.createObjectStore('everything', {
                    keyPath: 'publishedAt'
                });
            // case 2:
                upgradeDb.createObjectStore('countrynews', {
                   keyPath: 'publishedAt'
                });
        // }
    });
}

function noArticleFound() {
    let output = '';
    output = `
 <div class="card-body mt-3">
    <h4>
    No Article Found
    </h4>
                 
    </div>
    `;
    $('#searchnews').html(output);
}