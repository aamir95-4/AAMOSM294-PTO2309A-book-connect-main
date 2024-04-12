import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js";

// Establish DOM
export const html = {
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
  },

  list: {
    items: document.querySelector("[data-list-items]"),
    message: document.querySelector("[data-list-message]"),
    button: document.querySelector("[data-list-button]"),
    overlay: document.querySelector("[data-list-active]"),
    blur: document.querySelector("[data-list-blur]"),
    img: document.querySelector("[data-list-img]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
    close: document.querySelector("[data-list-close]"),
  },

  search: {
    overlay: document.querySelector("[data-search-overlay]"),
    form: document.querySelector("[data-search-form]"),
    title: document.querySelector("[data-search-title]"),
    genre: document.querySelector("[data-search-genre]"),
    author: document.querySelector("[data-search-author]"),
    cancel: document.querySelector("[data-search-cancel]"),
  },

  settings: {
    overlay: document.querySelector("[data-settings-overlay]"),
    form: document.querySelector("[data-settings-form]"),
    cancel: document.querySelector("[data-settings-cancel]"),
    theme: document.querySelector("[data-settings-theme]"),
  },
};
// functions
export const createPreview = ({ author, id, image, title }) => {
  const element = document.createElement("div");
  element.className = "preview";
  element.dataset.id = id;

  element.innerHTML = /* html */ `
            <img src="${image}" class="preview__image" />
  
            <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
  
              <p class="preview__author">${author}</p>
            </div>
        `;

  return element;
};
