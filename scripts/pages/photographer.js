let photographerID = new URLSearchParams(document.location.search).get('id');
const linkToData = '././data/photographers.json';
let dataArray;

const filterSelect = document.querySelector('.filter-select');
const filterSelectTop = document.querySelector('.filter-select-top');
const filterOption = document.querySelectorAll('.filter-option');
let TotalPhotographerLikes = [];

async function fetchData() {
  try {
    const response = await fetch(linkToData);

    const results = await response.json();

    dataArray = results;

    return dataArray;
  } catch (error) {
    console.log(`Une erreur est survenu ! `);
  }
}

fetchData();

dataArray = await fetchData();

function returnFilteredPhotograph() {
  const filter = dataArray.photographers.filter(
    (photographers) => photographers.id == photographerID,
  );
  return filter[0];
}

function returnFilteredMedias() {
  const filter = dataArray.media.filter(
    (media) => media.photographerId == photographerID,
  );
  return filter;
}
const myPagePhotograph = returnFilteredPhotograph();
const myPagePhotographMedias = returnFilteredMedias();

console.log(myPagePhotograph, myPagePhotographMedias);

function displayBannerPhotograph(myPagePhotograph) {
  const photographBanner = document.querySelector('.banner-photographe');
  photographBanner.innerHTML = `

      <div class="banner-text-wrapper">
        <h1 class="title" lang="en">${myPagePhotograph.name}</h1>
        <p class="location">${myPagePhotograph.city} ,${myPagePhotograph.country}</p>
        <p class="tagline">${myPagePhotograph.tagline}</p></div>
        <button class="banner-photographer-btn" type="button" aria-haspopup="dialog" aria-controls="dialog"
        aria-label="Contacter ${myPagePhotograph.name}">Contacter ${myPagePhotograph.name}</button>
        <div class="banner-img"><img src="./sources/img/1_small/PhotographersID/${myPagePhotograph.portrait}" alt="${myPagePhotograph.name}"></div>`;
}

function displayTotalCounter(myPagePhotograph, myPagePhotographMedias) {
  const totalLike = document.querySelector('.total-like span');
  const price = document.querySelector('.price');

  price.innerText = `${myPagePhotograph.price}€/ jour`;

  getTotalLikes(myPagePhotographMedias);

  totalLike.innerText = TotalPhotographerLikes;
}

function getTotalLikes(myPagePhotographMedias) {
  let allLikes = [];

  myPagePhotographMedias.forEach((media) => {
    allLikes.push(media.likes);
  });

  TotalPhotographerLikes = allLikes.reduce(
    (sum, currentLikes) => sum + currentLikes,
    0,
  );
}

displayTotalCounter(myPagePhotograph, myPagePhotographMedias);
displayBannerPhotograph(myPagePhotograph);

function openSortFilter(e) {
  filterSelect.classList.toggle('open');

  filterSelectTop.ariaExpanded === 'false'
    ? (filterSelectTop.ariaExpanded = 'true')
    : (filterSelectTop.ariaExpanded = false);
}

function handleDropdownSelection(e) {
  const filterChosen = document.querySelector('.chosen');

  let clickedValue = e.target;

  if (e.target.textContent === 'Date') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });

    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    console.log('Sort by date');
  } else if (e.target.textContent === 'Titre') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });
    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    console.log('Sort by Titre');
  } else if (e.target.textContent === 'Popularité') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });

    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    console.log('Sort by Popularité');
  } else {
    return;
  }
}

// Event Listeners

filterSelect.addEventListener('click', openSortFilter);

filterOption.forEach((filter) => {
  filter.addEventListener('click', handleDropdownSelection);
});
