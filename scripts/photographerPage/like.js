export function likeMedia(index, media) {
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

export function displayTotalCounter(myPagePhotograph, myPagePhotographMedias) {
  let totalLike = document.querySelector('.total-like span');
  const price = document.querySelector('.price');

  price.innerText = `${myPagePhotograph.price}€/ jour`;

  totalLike.innerText = getTotalLikes(myPagePhotographMedias);
}

export function getTotalLikes(myPagePhotographMedias) {
  let TotalPhotographerLikes = [];
  let allLikes = [];

  myPagePhotographMedias.forEach((media) => {
    allLikes.push(media.likes);
  });

  TotalPhotographerLikes = allLikes.reduce(
    (sum, currentLikes) => sum + currentLikes,
    0,
  );

  return TotalPhotographerLikes;
}
