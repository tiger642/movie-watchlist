//to-do list
//save watchlist data to local storage
//change watchlist function to not add data that is already there
//display default image for when image is not available
//add notes to each function

//api key
const apikey = '98e1174'

//grab DOM elements
const searchInput = document.getElementById('input-el')
const searchBtn = document.getElementById('button-el')
const movieList = document.getElementById('movies')

//array of objects that makes up watchlist
let detailedInfo = []

//determine whether to display add or remove button 
let addRemoveWatchlist = ''

//fetch api data if search input is truthy
const fetchMovies = async(searchTerm) => {
    const URL = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`
    const res = await fetch(`${URL}`)
    const movies = await res.json()
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

const fetchMoreInfo = async(movieId) => {
    const URL = `http://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`
    const res = await fetch(`${URL}`)
    const moreInfo = await res.json()
    // console.log(moreInfo)
    return moreInfo 
}

//loop through the api data array and display in html
const displayMovieList = async(movies) => {
    movieList.innerHTML = ''
    let movieCard = document.createElement('div')
    for (let i = 0; i < movies.length; i++) { 
        let data = await fetchMoreInfo(movies[i].imdbID)
        movieCard = 
                    `<section class='movie-card'>
                        <img src='${data.Poster}' class='movie-img' />
                        <div class='movie-info'>
                            <section class='section1'>
                                <div class='movie-title'>${data.Title}</div>
                                <div class='movie-year'>${data.Year}</div>
                                <div class='imdb-rating'><i class="fa-solid fa-star"></i>${data.imdbRating}</div>
                            </section>
                            <section class='section2'>
                                <div class='movie-rating'><b>${data.Rated}</b></div>
                                <div class='movie-runtime'>${data.Runtime}</div>
                                <button class='watchlist'>Add to Watchlist</button>
                            </section>
                            <section class='section3'>
                                <div class='actors'><b>Actors:</b> ${data.Actors}</div>
                                <div class='director'><b>Director:</b> ${data.Director}</div>
                                <div class='plot'>${data.Plot}</div>
                            </section>
                        </div>
                    </section>
                    <hr>`       
        movieList.innerHTML += movieCard 
}
}

// const watchlistEl = document.getElementsByClassName('watchlist')
// for (let i = 0; i < watchlistEl.length; i++) {
// watchlistEl[i].addEventListener('click', (i) => {
    
//     detailedInfo.push({
//         movieId: `${data.imdbID}`,
//         movieTitle: `${data.Title}`,
//         movieYear: `${data.Year}`,
//         imdbRating: `${data.imdbRating}`,
//         movieRating: `${data.Rated}`,
//         movieRuntime: `${data.Runtime}`,
//         actors: `${data.Actors}`,
//         director: `${data.Director}`,
//         moviePlot: `${data.Plot}`
//     })
//     console.log(detailedInfo)
// })}
// }

//grab search bar input
const findMovies = ()  => {
    let searchTerm = searchInput.value
    fetchMovies(searchTerm)
}

searchBtn.addEventListener('click', findMovies)

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click()
    }
})