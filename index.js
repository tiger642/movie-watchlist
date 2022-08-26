//api key
const apikey = '98e1174'

//grab DOM elements
const searchInput = document.getElementById('input-el')
const searchBtn = document.getElementById('button-el')
const movieList = document.getElementById('movies')


async function fetchMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`
    const res = await fetch(`${URL}`)
    const movies = await res.json()
    console.log(movies.Search)
    if(movies.Response == 'True') {
        displayMovieList(movies.Search)
    } else {
        movieList.innerHTML = `
            <section class='movie-card'>
                We can't seem to find anything . . . try being more specific
            </section>
            `
    }
}

function displayMovieList(movies) {
    movieList.innerHTML = ''
    let movieCard = document.createElement('div')
    for (let i = 0; i < movies.length; i++) { 
        movieCard = `
                    <section class='movie-card'>
                        <img src='${movies[i].Poster}' class='movie-img' />
                        <div class='movie-info'>
                            <div class='movie-title'>${movies[i].Title}</div>
                            <div>${movies[i].Year}</div>
                        </div>
                    </section>
                    <hr>
                    `       
        movieList.innerHTML += movieCard

        onmouseover = (moreInfo) => {  }
    }
}

function findMovies() {
    let searchTerm = searchInput.value
    fetchMovies(searchTerm)
}


searchInput.addEventListener('input', findMovies)