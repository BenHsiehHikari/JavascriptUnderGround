let key = '57b31362',
    baseUrl = 'https://www.omdbapi.com/?apikey=' + key;

let vm = new Vue({
    el: '#movies-container',
    data: {
        movies: []
    },
    components: {
        'movies': {
            props: ['movieresult'],
            template: '<div class="img" :data-id="movieresult.imdbID" @click="loadDetails(movieresult.imdbID)"><img :src="movieresult.Poster"></div>',
            methods: {
                loadDetails: function(id) {
                    loadMovie(id);
                }
            }
        }
    }
});

let modalApp = new Vue({
    el: '#basicExampleModal',
    data: {
        Title: '',
        Year: '',
        Plot: '',
        Actors: '',
    }
});

function searchMovies(keyword) {
    $.ajax({
        url: baseUrl + '&s=' + encodeURIComponent(keyword)
    }).then(function(data) {
        console.log(data.Search);
        let movieArray = [];
        for (let i = 0; i < data.Search.length; i++) {
            if (data.Search[i].Poster != "N/A") {
                movieArray.push(data.Search[i]);
            }
        }
        vm.movies = movieArray;
    });
}

function loadMovie(id) {
    $.ajax({
        url: baseUrl + '&i=' + id
    }).then(function(data) {
        modalApp.Title = data.Title;
        modalApp.Year = data.Year;
        modalApp.Plot = data.Plot;
        modalApp.Actors = data.Actors;
        $('#basicExampleModal').modal('show');
    })
}

searchMovies('Shazam');

$('.btn--danger').on('click', function() {
    let $text = $('.form-control');
    if ($text.val() != '') {
        searchMovies($text.val());
    }
})