import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = searchForm.elements['search-text'];

const PER_PAGE = 15;

let searchQuery = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  searchQuery = query;
  page = 1;
  totalHits = 0;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
  } catch (error) {
    showLoadMoreButton();  // Показать кнопку обратно при ошибке
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
    });
    return;
  } finally {
    hideLoader();
  }

  if (data.hits.length > 0) {
    createGallery(data.hits);

    // Smooth scroll
    const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  if (page * PER_PAGE < totalHits) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
});
