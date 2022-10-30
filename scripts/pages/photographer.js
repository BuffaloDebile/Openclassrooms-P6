import { mediaList } from '../factories/photographer.js';
import { photographerList } from '../factories/photographer.js';

let photographerID = new URLSearchParams(document.location.search).get('id');
let myPagePhotograph = [];

const filterSelect = document.querySelector('.filter-select');
const filterSelectTop = document.querySelector('.filter-select-top');
const filterOption = document.querySelectorAll('.filter-option');

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

for (const filter of filterOption) {
  filter.addEventListener('click', handleDropdownSelection);
}
