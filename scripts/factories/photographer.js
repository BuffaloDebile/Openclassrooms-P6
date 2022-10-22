function photographerFactory(data) {
  const { name, portrait } = data;

  const picture = `sources/img/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

// My JS

const linkToData = '././data/photographers.json';

let dataArray;
let photographerList = [];

window.addEventListener('load', () => {
  async function getPhotographers() {
    try {
      const response = await fetch(linkToData);

      const results = await response.json();

      dataArray = results;

      createPhotographerArray(dataArray);

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
