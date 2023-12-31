//sparkle function for background
function createSparkles() {
  const container = document.querySelector('.text-container');
  const numberOfSparkles = 80;

  for (let i = 0; i < numberOfSparkles; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 120 + 'vh';
    sparkle.style.animationDuration = Math.random() * 2 + 5 + 's';
    container.appendChild(sparkle);
  }
}

createSparkles();

//close button for the spotify modal
function closeSpotify() {
  const closeButton = document.querySelector('.close-spotify');
  const modal = document.querySelector('.modal-spotify');
  const spotify = document.getElementById('spotify');

  spotify.onclick = function () {
    modal.style.display = 'flex';
  };

  closeButton.onclick = function () {
    modal.style.display = 'none';
  };

  //user click anywhere just close the modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
//call the function
closeSpotify();

//cast
function openModal() {
  document.getElementById('castModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('castModal').style.display = 'none';
}

//tickets
function openTickets() {
  document.getElementById('ticketsModal').style.display = 'block';
}

function closeTickets() {
  document.getElementById('ticketsModal').style.display = 'none';
}

//api key forsquare: fsq3bSewMuMRwCzpIJIwIUbeSYR97aUj8yrSO3RB+9ghEGQ=

//get longitude and latitude 0f the user's location\
async function getPos() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        resolve([lat, long]);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

async function placeSearch() {
  try {
    const [lat, long] = await getPos();

    const searchParams = new URLSearchParams({
      query: 'movies',
      ll: `${lat},${long}`,
      open_now: 'false',
      sort: 'DISTANCE',
    });
    const result = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3bSewMuMRwCzpIJIwIUbeSYR97aUj8yrSO3RB+9ghEGQ=',
        },
      }
    );
    const data = await result.json();
    // console.log(data.results[3].name);

    const theaterList = document.querySelector('.theaters');

    for (let index = 0; index < data.results.length; index++) {
      const theater = document.createElement('li');
      theater.innerHTML = data.results[index].name;
      theaterList.appendChild(theater);
    }
  } catch (err) {
    console.error(err);
  }
}

placeSearch();

//cast info 3fd2be6f0c70a2a598f084ddfb75487c

async function getMovieCast(movieId) {
  const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const cast = data.cast;

    // Create an array of objects containing both name and avatar URL
    const castWithAvatars = cast.map((actor) => ({
      name: actor.name,
      avatar: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
    }));

    const castMemebers = document.querySelector('.cast-members');

    for (let index = 0; index < castWithAvatars.length; index++) {
      const castCard = document.createElement('div');
      castCard.className = 'cast-card';
      castCard.innerHTML = `<img src="${castWithAvatars[index].avatar}" alt="${castWithAvatars[index].name}"><h2>${castWithAvatars[index].name}</h2>`;
      castMemebers.appendChild(castCard);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage: Pass the movie ID as an argument
getMovieCast(872585); // Replace 123 with the actual movie ID you want to query
