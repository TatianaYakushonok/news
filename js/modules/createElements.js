import { main } from './const.js';

export const createSection = (title) => {
  const section = document.createElement('section');
  const sectionTitle = document.createElement('h2');
  const container = document.createElement('div');
  const postItems = document.createElement('ul');

  section.classList.add('post-list');
  sectionTitle.classList.add('post-list__title');
  container.classList.add('container');
  postItems.classList.add('post-list__items');

  sectionTitle.textContent = title;

  section.append(sectionTitle, container);
  container.append(postItems);
  main.append(section);

  return postItems;
};

export const createArticles = ({
  urlToImage,
  title,
  description,
  publishedAt,
  author,
  url,
}) => {
  const img = urlToImage !== null ? urlToImage : '../../img/cover.jpg';
  const dateData = new Date(publishedAt).toLocaleDateString('en-US');
  const date = new Date(publishedAt);
  const dateTime = date.toISOString().split('T');
  const time = dateTime[1].slice(0, 5);

  const article = document.createElement('li');
  article.classList.add('post-list__item');
  article.insertAdjacentHTML(
    'beforeend',
    `
    <article class="post-list__card card">
      <div class="card__img-container">
        <img class="card__img" src="${img}" alt="Превью новости ${title}">
      </div>
      <a class="card__link" href="${url}" target="_blank">
        <h3 class="card__title">
          ${title}
        </h3>
        <button class="card__arrow" type="button"
          aria-label="Открыть в новом окне">
          <svg class="card__icon" viewBox="0 0 24 24">
            <use class="arrow-up-right"
              xlink:href="./img/sprite.svg#arrow-up-right">
            </use>
          </svg>
        </button>
      </a>
      <div class="card__content-container">
        <p class="card__description">
          ${description}
        </p>
        <div class="card__info">
          <p class="card__date">${dateData}</p>
          <p class="card__time">${time}</p>
          <p class="card__author">${author}</p>
        </div>
      </div>
    </article>
    `,
  );

  return article;
};
