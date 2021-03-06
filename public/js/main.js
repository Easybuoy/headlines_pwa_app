const APIKEY = '94446a2fa0e5422499caf4725c83e818';
this._dbPromise = openDatabase();
$(document).ready(() => {
    $('#searchForm').keyup( (e) => {
        let searchText = $('#searchText').val();
        getNewsBySearch(searchText);
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

                cleanDB(store)
            }); 


            let output = '';
            $.each(news, (index, singlenews) => {
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

                var tx = db.transaction('sourcenews', 'readwrite');
                var store = tx.objectStore('sourcenews');
                sources.forEach(function (news) {
                    store.put(news);
                });

                cleanDB(store)
            });

            let output = '';
            $.each(sources, (index, source) => {
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

                var tx = db.transaction('countrynews', 'readwrite');
                var store = tx.objectStore('countrynews');
                countrynews.forEach(function (news) {
                    store.put(news);
                });

                cleanDB(store);
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

function getNewsFromIDB(tbname) {

    this._dbPromise.then(function(db) {
        if (!db) return;
        var index = db.transaction(tbname)
            .objectStore(tbname);

        index.getAll().then(function (response) {
            output(response, tbname);
        });

    });


};

function cleanDB(store) {
    store.openCursor(null, 'prev').then(function (cursor) {
        return cursor.advance(100);
    }).then(function deleteReset(cursor) {
        if(!cursor) return;
        cursor.delete();
        return cursor.continue().then(deleteReset);
    })
};

function output(response, tbname) {
    let output = '';
    if(tbname == 'headline'){
        var storednews = response.reverse();

        $.each(storednews, (index, news) => {
            var trimmedDescription = '';
            if(news.description){
                var trimmedDescription = news.description.substr(0, 50);
            }
            output += `
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${news.urlToImage}" class="img-fluid" alt="${news.title}" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${news.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-deep-orange btn-sm" href="${news.url}" target="_blank">
                        <i class="fa fa-clone left"></i> View News</a>
                </div>
            </div>
          `;
        });
    }else if(tbname == 'sourcenews'){
        var sources = response;
        $.each(sources, (index, source) => {
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
    }else{
        var countrynews = response.reverse();
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
    }

    $('#searchnews').html(output);
}