// My JS

const linkToData = '././data/photographers.json';
const photographerContainer = document.querySelector('.photographer-container');

let dataArray;
let photographerList = [];

window.addEventListener('load', () => {
  async function getPhotographers() {
    try {
      const response = await fetch(linkToData);

      const results = await response.json();

      dataArray = results;

      createPhotographerArray(dataArray);
      createNewPhotographerCard(photographerList);
    } catch (error) {
      console.log(`Une erreur est survenu ! `);
    }
  }
  getPhotographers();
});

function createPhotographerArray(results) {
  results.photographers.forEach((photographer) => {
    photographerList.push(
      new Photographer(
        photographer.city,
        photographer.country,
        photographer.id,
        photographer.name,
        photographer.portrait,
        photographer.price,
        photographer.tagline,
      ),
    );
  });
}

function createNewPhotographerCard(photographerList) {
  photographerList.forEach((photographer) => {
    const card = document.createElement('section');
    card.className = 'photographer-card';
    card.innerHTML = `
    <header class="header-card">
    <a class="card-photographer-link" href="photographer.html?id=${photographer.id} " role="link">
      <img src="sources/img/1_small/PhotographersID/${photographer.portrait}" alt="image portrait du photographe ${photographer.name}">
      <h2 class="card-title">${photographer.name}</h2>
    </a>
  </header>
  <div class="cards-body">
    <h3 class="cards-location">${photographer.city}, ${photographer.country}</h3>
    <p class="cards-tagline">${photographer.tagline}</p>
    <p class="cards-price">${photographer.price}€/Jour</p>
  </div>`;
    photographerContainer.appendChild(card);
  });
}

class Photographer {
  constructor(city, country, id, name, portrait, price, tagline) {
    this.city = city;
    this.country = country;
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.price = price;
    this.tagline = tagline;
  }
}

console.log(photographerList);
