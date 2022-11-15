let photographerID = new URLSearchParams(document.location.search).get('id');
const linkToData = '././data/photographers.json';
let dataArray;

const filterSelect = document.querySelector('.filter-select');
const filterSelectTop = document.querySelector('.filter-select-top');
const filterOption = document.querySelectorAll('.filter-option');
const gallery = document.querySelector('.grid-gallerie');
let TotalPhotographerLikes = [];
const PageTitle = document.querySelector('title');

const modalTitle = document.querySelector('.modal-title');
const modalWindow = document.getElementById('modal-window');
const modal = document.querySelector('.modal');
const mainContent = document.getElementById('main-photographe');
const thankYou = document.querySelector('.modal-thanks');

const lightBox = document.querySelector('.lightbox');
const closeLightboxBtn = document.querySelector('button.fermer');
let mediaSrc = [];
let mediaNames = [];

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

displayBannerPhotograph(myPagePhotograph);
displayCardsPhotograph(myPagePhotographMedias);
displayTotalCounter(myPagePhotograph, myPagePhotographMedias);
handleLightbox();

const galleryMedias = document.querySelectorAll('.card');

function displayBannerPhotograph(myPagePhotograph) {
  const photographBanner = document.querySelector('.banner-photographe');
  photographBanner.innerHTML = `

      <div class="banner-text-wrapper">
        <h1 class="title" lang="en">${myPagePhotograph.name}</h1>
        <p class="location">${myPagePhotograph.city} ,${myPagePhotograph.country}</p>
        <p class="tagline">${myPagePhotograph.tagline}</p></div>
        <button class="banner-photographer-btn" type="button" aria-haspopup="dialog" aria-controls="dialog"
        aria-label="Contacter ${myPagePhotograph.name}">Contacter ${myPagePhotograph.name}</button>
        <div class="banner-img"><img src="./sources/img/1_small/PhotographersID/${myPagePhotograph.portrait}" alt=" contacter ${myPagePhotograph.name}"></div>`;

  const formName = document.querySelector('.form-photographer-name');

  formName.innerText = myPagePhotograph.name;

  PageTitle.innerText = `Fisheye - ${myPagePhotograph.name}`;

  const btnContact = document.querySelector('.banner-photographer-btn');

  btnContact.addEventListener('click', openContactModal);
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
    card.dataset.likes = media.likes;
    card.dataset.title = media.title;
    card.dataset.date = media.date;

    if (
      media.media.includes(
        '.jpg' || '.png' || '.gif' || '.svg' || '.jpeg' || '.WebP',
      )
    ) {
      card.innerHTML = `
      <a href="#/${
        media.photographerName
      }" class="card-wrapper" role="button" aria-label="${
        media.title
      }, closeup view">
    
        <div class="img-wrapper">
          <img class="gallerie-img" src="./sources/img/1_small/${
            media.photographerName
          }/${media.media || media.video}" alt="image de la gallerie : ${
        media.title
      }" data-name="${media.title}">
        </div>
      </a>
      <div class="card-footer">
        <p>${media.title}</p>
        <div class="heart-like">
          <p class="like-counter" aria-label="Nombre de likes ${media.likes}">${
        media.likes
      }</p>
          <button class="heart-link" aria-label="aimer cette photo" role="button">
            <i class="heart-icon far fa-heart fa-2xl" aria-label="likes"></i>
          </button>
        </div>
      </div>`;
    } else if (media.media.includes('.mp4' || '.avi' || '.mov')) {
      card.innerHTML = ` <a href="#/${
        media.photographerName
      }" class="card-wrapper" role="button" aria-label="${
        media.title
      }, closeup view">
      <div class="img-wrapper">
      <video src="./sources/img/1_small/${media.photographerName}/${
        media.media || media.video
      }" alt="image de la gallerie : ${media.title}" data-name="${
        media.title
      }" type="video/mp4" autoplay loop class="gallerie-img"></video>
      </div>
    </a>
    <div class="card-footer">
      <p>${media.title}</p>
      <div class="heart-like">
        <p class="like-counter" aria-label="Nombre de likes ${media.likes}">${
        media.likes
      }</p>
        <button class="heart-link" aria-label="aimer cette photo" role="button">
          <i class="heart-icon far fa-heart fa-2xl" aria-label="likes"></i>
        </button>
      </div>
    </div>`;
    } else {
      card.innerHTML = `
      <a href="#/${media.photographerName}" class="card-wrapper" role="button" aria-label="${media.title}, closeup view">
    
        <div class="img-wrapper">
          <img class="gallerie-img" src="./sources/img/1_small/nomedia/nomedia.jpg" alt="error no media found" data-name="${media.title}">
        </div>
      </a>
      <div class="card-footer">
        <p>Media error</p>
        <div class="heart-like">
          <p class="like-counter" aria-label="Nombre de likes : error</p>
          <button class="heart-link" aria-label="aimer cette photo" role="button">
            <i class="heart-icon far fa-heart fa-2xl" aria-label="likes"></i>
          </button>
        </div>
      </div>`;
    }
    gallery.appendChild(card);

    likeMedia(index, media.likes);
    sortMediaByLike();
  });
}

function clearGalleryPhotograph() {
  gallery.replaceChildren();
}

function openContactModal() {
  modal.style.visibility = 'visible';
  modalWindow.classList.add('open');
  document.body.classList.add('modal-open-antiscroll');
  modalWindow.ariaHidden = 'false';
  mainContent.ariaHidden = 'true';
  thankYou.style.display = 'none';
  modalTitle.style.display = 'block';
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

    sortByDate();
  } else if (e.target.textContent === 'Titre') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });
    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    sortMediaByTitle();
  } else if (e.target.textContent === 'Popularité') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });

    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    sortMediaByLike();
  } else {
    return;
  }
}

function sortMediaByLike() {
  let elements = Array.from(gallery.children);
  let sorted = elements.sort(function (a, b) {
    return b.dataset.likes - a.dataset.likes;
  });
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
}

function sortMediaByTitle() {
  let elements = Array.from(gallery.children);
  let sorted = elements.sort((a, b) =>
    a.dataset.title.localeCompare(b.dataset.title),
  );
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
}

function sortByDate() {
  // myPagePhotographMedias.sort((a, b) => a.date.localeCompare(b.date));

  let elements = Array.from(gallery.children);
  let sorted = elements.sort((a, b) =>
    a.dataset.date.localeCompare(b.dataset.date),
  );
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
}

function closeLightBox(e) {
  e.preventDefault();
  lightBox.style.visibility = 'hidden';
  lightBox.style.opacity = '0';
  document.body.classList.remove('modal-open-antiscroll');
  lightBox.ariaHidden = 'true';
  mainContent.ariaHidden = 'false';
  mainContent.style.display = 'block';
}

// LightBox

function handleLightbox() {
  const cardImg = document.querySelectorAll('.card-wrapper');
  const btnLeft = document.querySelector('button.gauche');
  const btnRight = document.querySelector('button.droit');
  const cardMediaSrc = document.querySelectorAll('.gallerie-img');
  const containerSlides = document.querySelector('.container-slides');
  const titreImgLightbox = document.querySelector('.titre-lightbox');
  let indexOfLightbox = undefined;

  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
    cardImg[index].addEventListener('click', openLightbox);

    function openLightbox(e) {
      e.preventDefault();
      lightBox.style.visibility = 'visible';
      lightBox.style.opacity = '1';
      document.body.classList.add('modal-open-antiscroll');
      lightBox.ariaHidden = 'false';
      mainContent.ariaHidden = 'true';
      mainContent.style.display = 'none';

      containerSlides.innerHTML = '';

      let innerMediaLightbox = cardMediaSrc[index].cloneNode();
      let imgName = innerMediaLightbox.getAttribute('data-name');

      let largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

      containerSlides.appendChild(innerMediaLightbox);
      innerMediaLightbox.src = largeImg;
      titreImgLightbox.innerText = imgName;

      indexOfLightbox = index;
    }
  });

  btnLeft.addEventListener('click', function () {
    containerSlides.innerHTML = '';
    let innerMediaLightbox = cardMediaSrc[--indexOfLightbox].cloneNode();
    let imgName = innerMediaLightbox.getAttribute('data-name');
    let largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

    innerMediaLightbox.src = largeImg;
    titreImgLightbox.innerText = imgName;
    containerSlides.appendChild(innerMediaLightbox);

    console.log(indexOfLightbox);
  });
}

// Event Listeners

closeLightboxBtn.addEventListener('click', closeLightBox);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && lightBox.style.display == 'block') {
    closeLightBox();
  }
});

filterSelect.addEventListener('click', openSortFilter);

filterOption.forEach((filter) => {
  filter.addEventListener('click', handleDropdownSelection);
});

// Prevent animation from playing on page load
window.addEventListener('load', function () {
  document.body.classList.remove('preload');
});
