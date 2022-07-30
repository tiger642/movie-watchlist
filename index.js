//on input call a function that searches the database and returns movies that match the current string
//once the movies are returned manipulate the dom to show the search results

//on click event that adds a returned movie to a list that is saved to local storage

const inputEl = document.getElementById('input-el')
const buttonEl = document.getElementById('button-el')
const movieSection = document.getElementById('movies')
const OMDB_API_KEY = '98e1174'


buttonEl.addEventListener('click', async () => {
    let searchInput = inputEl.value
    const response = await 
    fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchInput}&type=Movie`)
    const data = await response.json()
    console.log(data)
    movieSection.innerHTML = 
    `
        <hr>
            <div class='movie-card'>
                <img class='movie-img' src='${data.Poster}'>            
                <div class='movie-info'>
                    <div class='section1'>
                        <h4>${data.Title}</h4>
                        <p>${data.Ratings[0].Value}</p>
                    </div>
                    <div class='section2'>
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <p></p> 
                    </div>
                    <p class='section3'>${data.Plot}</p>
                </div> 
            </div>
        <hr>
    `
})