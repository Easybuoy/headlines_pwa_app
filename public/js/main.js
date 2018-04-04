const APIKEY = '94446a2fa0e5422499caf4725c83e818';
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
    console.log(searchText);
    axios.get('https://newsapi.org/v2/everything?q='+searchText+'&apiKey='+APIKEY)
        .then((response) => {
            let news =  response.data.articles;

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
                    <img src="${singlenews.urlToImage}" class="img-fluid" alt="Sample project image" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${singlenews.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-indigo btn-sm" href="${singlenews.url}" target="_blank">
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
            let output = '';
            $.each(sources, (index, source) => {
                console.log(source);
                // var trimmedDescription = '';
                // if(singlenews.description){
                //     var trimmedDescription = singlenews.description.substr(0, 50);
                // }

                output += `
            <div class="col-lg-4 col-md-12 mb-4">
                

                <div class="card-body mt-3">
                    <h4>
                        <strong>${source.name}</strong>
                    </h4>
                     <p class="grey-text">${source.description}</p>
                    <a class="btn btn-indigo btn-sm" href="${source.url}" target="_blank">
                        <i class="fa fa-clone left"></i> View Source</a>
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
    openDatabase();
    axios.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+APIKEY)
        .then((response) => {
            console.log(response);
            let countrynews =  response.data.articles;

            let output = '';
            $.each(countrynews, (index, singlenews) => {
                var trimmedDescription = '';
                if(singlenews.description){
                    var trimmedDescription = singlenews.description.substr(0, 50);
                }

                output += `
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${singlenews.urlToImage}" class="img-fluid" alt="Sample project image" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <div class="card-body mt-3">
                    <h4>
                        <strong>${singlenews.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-indigo btn-sm" href="${singlenews.url}" target="_blank">
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

    // TODO: return a promise for a database called 'wittr'
    // that contains one objectStore: 'wittrs'
    // that uses 'id' as its key
    // and has an index called 'by-date', which is sorted
    // by the 'time' property
    console.log('a');
    return idb.open('headline', 1, function (upgradeDb) {
        var store = upgradeDb.createObjectStore('news', {
            keyPath: 'id'
        });
    })
}