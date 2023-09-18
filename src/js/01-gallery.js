import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
galleryContainer.insertAdjacentHTML(
  'beforeend',
  createGalleryMarkup(galleryItems)
);

function createGalleryMarkup(galleryItems) {
  return galleryItems.reduce((html, { preview, original, description }) => {
    return (
      html +
      `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"" />
        </a>
        </li>
        `
    );
  }, '');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'gallery__caption',
  overlayOpacity: 0.9,
  fadeSpeed: 350,
});
