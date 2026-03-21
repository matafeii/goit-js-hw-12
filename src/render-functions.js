import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animationSlide: true,
  fadeSpeed: 250,
  docClose: true,
  disableRightClick: false,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="gallery-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${downloads}</span>
          </div>
        </div>
      </a>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  if (loaderWrapper) {
    loaderWrapper.classList.add('visible');
  }
}

export function hideLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  if (loaderWrapper) {
    loaderWrapper.classList.remove('visible');
  }
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.add('is-hidden');
  }
}
