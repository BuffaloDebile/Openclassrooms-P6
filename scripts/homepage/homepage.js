/* eslint-disable semi */
document.addEventListener('DOMContentLoaded', () => {
  const linkToData = '././data/photographers.json';
  const photographerContainer = document.querySelector(
    '.photographer-container'
  );

  let dataArray;

  async function fetchPhotographers () {
    try {
      const response = await fetch(linkToData);

      const results = await response.json();

      dataArray = results;

      createNewPhotographerCard(dataArray.photographers);
    } catch (error) {
      console.log('Une erreur est survenu ! ');
    }
  }
  fetchPhotographers();

  function createNewPhotographerCard (photographerList) {
    photographerList.forEach((photographer) => {
      const card = document.createElement('section');
      card.className = 'photographer-card';

      card.innerHTML = `
      <header class="header-card">
      <a class="card-photographer-link" href="photographer.html?id=${photographer.id} " role="link">
          <div class="card-img-wrapper">
              <img src="sources/img/1_small/PhotographersID/${photographer.portrait}" alt="image portrait du photographe ${photographer.name}" />
          </div>
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
});
