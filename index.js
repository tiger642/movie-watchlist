
const apikey = '98e1174'

const searchInput = document.getElementById('input-el')
const formEl = document.getElementById('movie-search')
const movieList = document.getElementById('movies')

const movieArray = []
const watchlistArray = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []

const getMovies = async() => {
    const URL = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}`
    const res = await fetch(`${URL}`)
    const data = await res.json()
    return data;
}

const renderMovies = async(e) => {
    e.preventDefault()
    let movies = await getMovies()
    let movieHTML = ''
    if(movies.Response === 'True') {
       for (let movie of movies.Search) {                          
            const URL = `http://www.omdbapi.com/?apikey=${apikey}&i=${movie.imdbID}`
            const res = await fetch(`${URL}`)
            const movieData = await res.json()
                const {Poster, Title, Year, imdbRating, Rated, Runtime, imdbID, Actors, Director, Plot} = movieData 
                movieHTML +=
                    `<section class='movie-card' id='${imdbID}'>
                        <img src='${Poster}' class='movie-img' />
                        <div class='movie-info'>
                            <section class='section1'>
                                <div class='movie-title'>${Title}</div>
                                <div class='movie-year'>${Year}</div>
                                <div class='imdb-rating'>
                                <i class="fa-solid fa-star"></i>${imdbRating}</div>
                            </section>
                            <section class='section2'>
                                <div class='movie-rating'><b>${Rated}</b></div>
                                <div class='movie-runtime'>${Runtime}</div>
                                <button id='watchlistbtn' onclick='addToWatchlist(${imdbID}, event)'>Add to Watchlist</button>
                            </section>
                            <section class='section3'>
                                <div class='actors'><b>Actors:</b> ${Actors}</div>
                                <div class='director'><b>Director:</b> ${Director}</div>
                                <div class='plot'>${Plot}</div>
                            </section>
                        </div>
                    </section>
                    <hr>`
                    movieList.innerHTML = movieHTML
                    movieArray.push(movieData)
                 }
            } else {
                movieList.innerHTML = 
                   `<section class='movie-card'>
                        We can't seem to find anything . . . try being more specific
                    </section>`
            }
            searchInput.value = ''
        }

        const addToWatchlist = (id, event) => {
            let btn = document.getElementById('watchlistbtn')
            const movieId = id.getAttribute('id')
            if(!watchlistArray.includes(movieId)) {
                btn = event.target
                btn.textContent = 'Added'
                btn.style.color = 'green'
                btn.disabled = true
                watchlistArray.push(movieId)
                localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
            } else {
                watchlistArray.splice(movieId, 1)
            }
        } 

    formEl.addEventListener('submit', renderMovies)