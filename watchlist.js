const apikey = '98e1174'
const movieList = document.getElementById('watchlist')
let watchlist = JSON.parse(localStorage.getItem('watchlist'))

function removeFromWatchlist(movie) {
    let id = movie.getAttribute('id')    
    const movieId = watchlist.indexOf(id)
    watchlist.splice(movieId,1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
     
}

const renderWatchlist = async() => { 
    console.log(watchlist)
    let watchlistHTML = ''
    if(watchlist && watchlist.length > 0) {
        for (let movie of watchlist) {                          
            const URL = `http://www.omdbapi.com/?apikey=${apikey}&i=${movie}`
            const res = await fetch(`${URL}`)
            const data = await res.json()
                const {Poster, Title, Year, imdbRating, Rated, Runtime, imdbID, Actors, Director, Plot} = data 
                watchlistHTML +=
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
                                <button id='watchlistbtn' onclick='removeFromWatchlist(${movie})'>Remove from Watchlist</button>
                            </section>
                            <section class='section3'>
                                <div class='actors'><b>Actors:</b> ${Actors}</div>
                                <div class='director'><b>Director:</b> ${Director}</div>
                                <div class='plot'>${Plot}</div>
                            </section>
                        </div>
                    </section>
                    <hr>`
                    movieList.innerHTML = watchlistHTML             
                }
            } else {
                movieList.innerHTML = 
                    `<section class='movie-card'>
                        We can't seem to find anything . . . try being more specific
                    </section>`
            }
            
     }

     renderWatchlist()