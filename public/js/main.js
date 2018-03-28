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
                output += `

            <div class="col-md-4">
            <div class="card-body text-center">
         <img class="card-image-top" src="${singlenews.urlToImage}">
            <h5>${singlenews.title}</h5>
            <a onclick="movieSelected('${singlenews.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>

            </div>
            </div>
          `;
            });

            $('#searchnews').html(output);
        })
        .catch((err) => {
            console.log(err)
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