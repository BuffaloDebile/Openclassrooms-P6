let photographerID = new URLSearchParams(document.location.search).get('id');
const linkToData = '././data/photographers.json';
let dataArray;

const filterSelect = document.querySelector('.filter-select');
const filterSelectTop = document.querySelector('.filter-select-top');
const filterOption = document.querySelectorAll('.filter-option');
const gallery = document.querySelector('.grid-gallerie');
let TotalPhotographerLikes = [];
const PageTitle = document.querySelector('title');

class Media {
  constructor(media, title, likes, date) {
    this.media = media;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.photographerName = myPagePhotograph.name
      .toLowerCase()
      .replace(' ', '');
  }
}

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

displayCardsPhotograph(myPagePhotographMedias);
displayTotalCounter(myPagePhotograph, myPagePhotographMedias);
displayBannerPhotograph(myPagePhotograph);

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

  const formName = document.querySelector('.form-photographer-name');

  formName.innerText = myPagePhotograph.name;

  PageTitle.innerText = `Fisheye - ${myPagePhotograph.name}`;
}

function displayCardsPhotograph(myPagePhotographMedias) {
  myPagePhotographMedias.forEach((media, index) => {
    media = new Media(
      media.image || media.video,
      media.title,
      media.likes,
      media.date,
      media.photographerName,
    );
    const card = document.createElement('article');
    card.className = 'card';

    if (
      media.media.includes(
        '.jpg' || '.png' || '.gif' || '.svg' || '.jpeg' || '.WebP',
      )
    ) {
      card.innerHTML = `
      <a href="#" class="card-wrapper" role="button" aria-describedby="ouvrir le slider">
    
        <div class="img-wrapper">
          <img class="gallerie-img" src="./sources/img/1_small/${
            media.photographerName
          }/${media.media || media.video}" alt="image de la gallerie : ${
        media.title
      }">
        </div>
      </a>
      <div class="card-footer">
        <p>${media.title}</p>
        <div class="heart-like">
          <p class="like-counter" aria-label="Nombre de likes ${media.likes}">${
        media.likes
      }</p>
          <button class="heart-link" aria-label="aimer cette photo" role="button">
            <i class="heart-icon far fa-heart fa-2xl"></i>
          </button>
        </div>
      </div>`;
    } else if (media.media.includes('.mp4' || '.avi' || '.mov')) {
      card.innerHTML = ` <a href="#" class="card-wrapper" role="button" aria-describedby="ouvrir le slider">

      <div class="img-wrapper">
        <video playsinline autoplay muted loop>
          <source src="./sources/img/1_small/${media.photographerName}/${
        media.media || media.video
      }" alt="image de la gallerie : ${media.title}" type="video/mp4">
        </video>
      </div>
    </a>
    <div class="card-footer">
      <p>${media.title}</p>
      <div class="heart-like">
        <p class="like-counter" aria-label="Nombre de likes ${media.likes}">${
        media.likes
      }</p>
        <button class="heart-link" aria-label="aimer cette photo" role="button">
          <i class="heart-icon far fa-heart fa-2xl"></i>
        </button>
      </div>
    </div>`;
    } else {
      card.innerHTML = `
      <a href="#" class="card-wrapper" role="button" aria-describedby="ouvrir le slider">
    
        <div class="img-wrapper">
          <img   class="gallerie-img" src="./sources/img/1_small/nomedia/nomedia.jpg" alt="error no media found">
        </div>
      </a>
      <div class="card-footer">
        <p>Media error</p>
        <div class="heart-like">
          <p class="like-counter" aria-label="Nombre de likes : error</p>
          <button class="heart-link" aria-label="aimer cette photo" role="button">
            <i class="heart-icon far fa-heart fa-2xl"></i>
          </button>
        </div>
      </div>`;
    }
    gallery.appendChild(card);

    likeMedia(index, media.likes);
  });
}

function displayTotalCounter(myPagePhotograph, myPagePhotographMedias) {
  let totalLike = document.querySelector('.total-like span');
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

function likeMedia(index, media) {
  const likeBtn = document.querySelectorAll('.heart-link');
  const likeIcon = document.querySelectorAll('i.heart-icon');
  const likeCount = document.querySelectorAll('.like-counter');
  let totalLike = document.querySelector('.total-like span');
  likeBtn[index].addEventListener('click', () => {
    if (likeIcon[index].classList.contains('far')) {
      likeIcon[index].classList.remove('far');
      likeIcon[index].classList.add('fas');
      likeIcon[index].classList.add('pulse');
      likeCount[index].innerText = ++media;
      totalLike.innerText = ++totalLike.innerText;
    } else if (likeIcon[index].classList.contains('fas')) {
      likeIcon[index].classList.remove('fas');
      likeIcon[index].classList.add('far');
      likeIcon[index].classList.remove('pulse');
      likeCount[index].innerText = --media;
      totalLike.innerText = --totalLike.innerText;
    }
  });
}

function openSortFilter(e) {
  e.preventDefault();
  filterSelect.classList.toggle('open');

  filterSelectTop.ariaExpanded === 'false'
    ? (filterSelectTop.ariaExpanded = 'true')
    : (filterSelectTop.ariaExpanded = false);
}

function handleDropdownSelection(e) {
  e.preventDefault();
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

// Prevent animation from playing on page load
window.addEventListener('load', function () {
  document.body.classList.remove('preload');
});
