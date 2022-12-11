/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import { sortMediaByLike } from './sort.js';

import { openContactModal } from './modale.js';

import { likeMedia } from './like.js';

const photographerID = new URLSearchParams(document.location.search).get('id');
const linkToData = '././data/photographers.json';
let dataArray;

const gallery = document.querySelector('.grid-gallerie');
const PageTitle = document.querySelector('title');

class Media {
  // eslint-disable-next-line space-before-function-paren
  constructor(media, title, likes, date) {
    this.media = media;
    this.title = title;
    this.likes = likes;
    this.date = date;
  }

  get photographerName() {
    return myPagePhotograph.name.toLowerCase().replace(' ', '');
  }
}

async function fetchData() {
  try {
    const response = await fetch(linkToData);

    const results = await response.json();

    dataArray = results;

    return dataArray;
  } catch (error) {
    console.log('Une erreur est survenu ! ');
  }
}

dataArray = await Promise.resolve(fetchData());

function returnFilteredPhotograph() {
  const filter = dataArray.photographers.filter(
    // eslint-disable-next-line eqeqeq
    (photographers) => photographers.id == photographerID,
  );
  return filter[0];
}

const myPagePhotograph = returnFilteredPhotograph();

export function displayBannerPhotograph(myPagePhotograph) {
  const photographBanner = document.querySelector('.banner-photographe');
  photographBanner.innerHTML = `

  <div class="banner-text-wrapper">
  <h1 class="title" lang="en">${myPagePhotograph.name}</h1>
  <p class="location">${myPagePhotograph.city}, ${myPagePhotograph.country}</p>
  <p class="tagline">${myPagePhotograph.tagline}</p>
</div>
<button class="banner-photographer-btn" type="button" aria-haspopup="dialog" aria-controls="contact" aria-label="Contacter ${myPagePhotograph.name}">Contacter-moi</button>
<div class="banner-img"><img src="./sources/img/1_small/PhotographersID/${myPagePhotograph.portrait}" alt=" contacter ${myPagePhotograph.name}" onerror="this.onerror=null; this.src='./sources/img/1_small/nomedia/nomedia.jpg'" /></div>

`;

  const formName = document.querySelector('.form-photographer-name');

  formName.innerText = myPagePhotograph.name;

  PageTitle.innerText = `Fisheye - ${myPagePhotograph.name}`;

  const btnContact = document.querySelector('.banner-photographer-btn');

  btnContact.addEventListener('click', openContactModal);
}

export function displayCardsPhotograph(myPagePhotographMedias) {
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
      <a
      href="#/${media.photographerName}"
      class="card-wrapper"
      role="button"
      aria-label="${media.title}, closeup view"
      >
      <div class="img-wrapper">
         <img
            class="gallerie-img"
            src="./sources/img/1_small/${media.photographerName}/${
        media.media || media.video
      }"
            alt="image de la gallerie : ${media.title}"
            data-name="${media.title}"
            onerror="this.onerror=null; this.src='./sources/img/1_small/nomedia/nomedia.jpg'"
            />
      </div>
   </a>
   <div class="card-footer">
      <p>${media.title}</p>
      <div class="heart-like">
         <p class="like-counter">${media.likes}</p>
         <button class="heart-link" aria-label="aimer cette photo" role="button" aria-label="like">
         <i class="heart-icon far fa-heart fa-2xl"></i>
         </button>
      </div>
   </div>`;
    } else if (media.media.includes('.mp4' || '.avi' || '.mov')) {
      card.innerHTML = `
      <a href="#/${
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
        <p class="like-counter">${media.likes}</p>
           <button class="heart-link" aria-label="aimer cette photo" role="button" aria-label="like">
           <i class="heart-icon far fa-heart fa-2xl" ></i>
           </button>
        </div>
     </div>
    `;
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
         <p class="like-counter"</p>
            <button class="heart-link" aria-label="aimer cette photo" role="button" aria-label="like">
            <i class="heart-icon far fa-heart fa-2xl" ></i>
            </button>
      </div>
   </div>`;
    }
    gallery.appendChild(card);

    likeMedia(index, media.likes);
    sortMediaByLike();
  });
}
