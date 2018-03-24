$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val());
        e.preventDefault();
    });
});

