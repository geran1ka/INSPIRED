import { searchController } from '../controllers/searchController';
import { createElement } from '../utils/createElement';

export const search = createElement('div', {
  className: 'search',
});

export const searchToggle = () => {
  search.classList.toggle('search_show');
};

const container = createElement(
  'div',
  {
    className: 'container',
  },
  {
    parent: search,
  },
);

const form = createElement(
  'form',
  {
    className: 'search__form',
  },
  { parent: container, cb: searchController },
);

const inputSearch = createElement(
  'input',
  {
    className: 'search__input',
    type: 'search',
    name: 'search',
    placeholder: 'Найти...',
  },
  {
    parent: form,
  },
);

createElement(
  'button',
  {
    className: 'search__btn',
    type: 'submit',
    textContent: 'Искать',
  },
  {
    parent: form,
  },
);

const searchError = createElement(
  'p',
  {
    className: 'search__error',
    textContent: 'Поле необходимо заполнить',
    _show: true,
  },
  {
    parent: form,
  },
);

export const showSearchError = () => {
  searchError.classList.add('search__error_show');
  inputSearch.classList.add('search__input_error');

  clearTimeout(searchError._showTimer);

  searchError._showTimer = setTimeout(() => {
    searchError.classList.remove('search__error_show');
    inputSearch.classList.remove('search__input_error');
  }, 3000);
};
