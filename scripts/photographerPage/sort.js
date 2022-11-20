export const gallery = document.querySelector('.grid-gallerie');

import {
  removeEventFromEachCard,
  attachEventToEachCard,
  handleSliderLightBox,
} from './lightbox.js';

export function clearGalleryPhotograph() {
  gallery.replaceChildren();
}

export function openSortFilter(e) {
  const filterSelectTop = document.querySelector('.filter-select-top');
  const filterSelect = document.querySelector('.filter-select');

  e.preventDefault();
  filterSelect.classList.toggle('open');

  filterSelectTop.ariaExpanded === 'false'
    ? (filterSelectTop.ariaExpanded = 'true')
    : (filterSelectTop.ariaExpanded = false);
}

export function handleDropdownSelection(e) {
  e.preventDefault();
  const filterChosen = document.querySelector('.chosen');
  const filterOption = document.querySelectorAll('.filter-option');

  let clickedValue = e.target;

  if (e.target.textContent === 'Date') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });

    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;

    removeEventFromEachCard();
    sortByDate();
    handleSliderLightBox();
  } else if (e.target.textContent === 'Titre') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });
    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;
    removeEventFromEachCard();
    sortMediaByTitle();
    handleSliderLightBox();
  } else if (e.target.textContent === 'Popularité') {
    filterOption.forEach((options) => {
      options.classList.remove('selected');
    });

    clickedValue.classList.add('selected');

    filterChosen.textContent = e.target.textContent;
    removeEventFromEachCard();
    sortMediaByLike();
    handleSliderLightBox();
  } else {
    return;
  }
}

export function sortMediaByLike() {
  let elements = Array.from(gallery.children);
  let sorted = elements.sort(function (a, b) {
    return b.dataset.likes - a.dataset.likes;
  });
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
  sorted.forEach((elm, index) => (elm.dataset.index = index));
  attachEventToEachCard();
}

export function sortMediaByTitle() {
  console.log();
  let elements = Array.from(gallery.children);
  let sorted = elements.sort((a, b) =>
    a.dataset.title.localeCompare(b.dataset.title),
  );
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
  sorted.forEach((elm, index) => (elm.dataset.index = index));
  attachEventToEachCard();
}

export function sortByDate() {
  // myPagePhotographMedias.sort((a, b) => a.date.localeCompare(b.date));

  let elements = Array.from(gallery.children);
  let sorted = elements.sort((a, b) =>
    a.dataset.date.localeCompare(b.dataset.date),
  );
  clearGalleryPhotograph();
  sorted.forEach((elm) => gallery.append(elm));
  sorted.forEach((elm, index) => (elm.dataset.index = index));
  attachEventToEachCard();
}
