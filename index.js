//to-do list
//save returned api data to local storage
//add the watchlist button 
//display the plot and actors
//display default image for when image is not available
//add a display more button for the extended plot

//api key
const apikey = '98e1174'

//grab DOM elements
const searchInput = document.getElementById('input-el')
const searchBtn = document.getElementById('button-el')
const movieList = document.getElementById('movies')

//determine whether to display add or remove button 
let addRemoveWatchlist = ''

//fetch api data if search input is truthy
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

async function fetchMoreInfo(movieId) {
    const URL = `http://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`
    const res= await fetch(`${URL}`)
    const moreInfo = await res.json()
    console.log(moreInfo)
}

//loop through the api data array and display in html
function displayMovieList(movies) {
    movieList.innerHTML = ''
    let movieCard = document.createElement('div')
    for (let i = 0; i < movies.length; i++) { 
        fetchMoreInfo(movies[i].imdbID)
        movieCard = `
                    <section class='movie-card'>
                        <img src='${movies[i].Poster}' class='movie-img' />
                        <div class='movie-info'>
                            <div class='movie-title'>${movies[i].Title}</div>
                            <div class='movie-year'>${movies[i].Year}</div>
                            
                        </div>
                        <div>
                            ${addRemoveWatchlist}
                        </div>
                    </section>
                    <hr>
                    `       
        movieList.innerHTML += movieCard
    }
}

//grab search bar input
function findMovies() {
    let searchTerm = searchInput.value
    fetchMovies(searchTerm)
}

//when search field receives inputs fetch api data
searchInput.addEventListener('input', findMovies)
