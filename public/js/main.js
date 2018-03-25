$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});


function getMovies(searchText) {
    console.log(searchText);
    axios.get('https://newsapi.org/v2/articles?apiKey=94446a2fa0e5422499caf4725c83e818&q=' + searchText + '&category=sports')
        .then((response) => {
            console.log(response);
            })
        .catch((err) => {
        console.log(err)
        })
}
