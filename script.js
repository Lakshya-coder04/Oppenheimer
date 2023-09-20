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
  const closeButton = document.querySelector('.close');
  const modal = document.querySelector('.modal');
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

//api key forsquare: fsq3bSewMuMRwCzpIJIwIUbeSYR97aUj8yrSO3RB+9ghEGQ=
