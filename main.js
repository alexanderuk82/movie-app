const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=295ebb8defea3f82877ca333f3f8e3d9&page=';

const IMG_URl = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=295ebb8defea3f82877ca333f3f8e3d9&query='";

const main = document.querySelector('.main__movies');
const form = document.getElementById('form');
const search = document.querySelector('.header__search');
const clickLogo = document.querySelector('.logo');

clickLogo.addEventListener('click', () => {
  window.location.reload();
});

getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  //   console.log(movies);
  main.innerHTML = '';
  movies.forEach(movie => {
    const {
      title,
      poster_path,
      overview,
      release_date,
      vote_average,
      original_language,
    } = movie;
    const moviEl = document.createElement('div');
    moviEl.classList.add('main__movie');
    moviEl.innerHTML = `
          <img src="${
            IMG_URl + poster_path
          }" alt ="${title}" class="main__image"/>
          <span class="${getRate(vote_average)}">${vote_average}</span>
          <div class="main__overview">
            <div class="main__overview--top">
              <div class="main__overview--lang">
                <small>Lang</small>
                <p class="language">${original_language}</p>
              </div>
              <div class="main__overview--date">
                <img src="/images/icons/calendar.svg" alt="date" />
                <p class="date">${release_date}</p>
              </div>
            </div>
            <p class="main__overview--text">
              ${overview}
               </p
            </p>
            <a class="main__overview--btn">
              <img
                src="images/icons/play.svg
            "
                alt=""
              />
              Watch Movie
            </a>
          </div>
            
            `;
    main.appendChild(moviEl);
  });
}

//function for rating

function getRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
}

//Search button
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && search !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
