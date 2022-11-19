// VARIABLES

let photographerID = new URLSearchParams(document.location.search).get('id');
const linkToData = '././data/photographers.json';
let dataArray;
const filterSelect = document.querySelector('.filter-select');
const filterOption = document.querySelectorAll('.filter-option');

// FETCHING DATA

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

const myPagePhotograph = returnFilteredPhotograph();
const myPagePhotographMedias = returnFilteredMedias();

// JS MODULES

import { displayBannerPhotograph, displayCardsPhotograph } from './factory.js';

import { openSortFilter, handleDropdownSelection } from './sort.js';

import { displayTotalCounter } from './like.js';

import { handleSliderLightBox } from './lightbox.js';

// CALLING FUNCTIONS

displayBannerPhotograph(myPagePhotograph);
displayCardsPhotograph(myPagePhotographMedias);
displayTotalCounter(myPagePhotograph, myPagePhotographMedias);
handleSliderLightBox();

// FUNCTIONS

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

// EVENT LISTENERS

filterSelect.addEventListener('click', openSortFilter);

filterOption.forEach((filter) => {
  filter.addEventListener('click', handleDropdownSelection);
});
