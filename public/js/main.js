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
    console.log(searchText);
    axios.get('https://newsapi.org/v2/everything?q='+searchText+'&apiKey='+APIKEY)
        .then((response) => {
            let news =  response.data.articles;
// console.log(news)
            let output = '';
            $.each(news, (index, singlenews) => {
                console.log(singlenews);
                var trimmedDescription = '';
                if(singlenews.description){
                    var trimmedDescription = singlenews.description.substr(0, 50);
                }

                output += `
                
        <!--<h2 class="text-center h1 py-5">-->
            <!--<strong>Our best projects</strong>-->
        <!--</h2>-->
            <div class="col-lg-4 col-md-12 mb-4">
                <div class="view overlay rounded z-depth-1">
                    <img src="${singlenews.urlToImage}" class="img-fluid" alt="Sample project image" id="card-img" style="height: 250px; width: 100%;">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <!--Excerpt-->
                <div class="card-body mt-3">
                    <h4>
                        <strong>${singlenews.title}</strong>
                    </h4>
                    <p class="grey-text">${trimmedDescription}</p>
                    <a class="btn btn-indigo btn-sm" href="" target="_blank">
                        <i class="fa fa-clone left"></i> View News</a>
                </div>
            </div>
          `;
            });
            $('#searchnews').html(output);
        })
        .catch((err) => {
            console.log(err);
            if (!err.response) {
                // network error
                console.log('asdas')
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
    axios.get('https://newsapi.org/v2/sources?apiKey='+APIKEY)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err)
        });
}

function getNewsByCountry(country){
    // country = country.toLowerCase();
    axios.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+APIKEY)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err)
        });
}



