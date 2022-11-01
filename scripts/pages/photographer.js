let photographerID = new URLSearchParams(document.location.search).get('id');
let myPagePhotograph = [];
let dataArray;
let photographerList = [];
let mediaList = [];

const filterSelect = document.querySelector('.filter-select');
const filterSelectTop = document.querySelector('.filter-select-top');
const filterOption = document.querySelectorAll('.filter-option');

async function fetchData() {
  try {
    const response = await fetch(linkToData);

    const results = await response.json();

    dataArray = results;

    dataArray.photographers.forEach((photographer) => {
      photographerList.push(photographer);
    });

    dataArray.media.forEach((media) => {
      mediaList.push(media);
    });
  } catch (error) {
    console.log(`Une erreur est survenu ! `);
  }
}

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
