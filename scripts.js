// Import from data and view
import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { html, createPreview } from "./view.js";

/* ------------------------------------ x ----------------------------------- */

/* ------------------------------------ x ----------------------------------- */
// Search Functionality
const searchToggle = (event) => {
  const { target } = event;
  const isCancel = target === html.search.cancel;

  if (isCancel) {
    html.search.overlay.open = false;
  } else {
    html.search.overlay.open = true;
  }
  html.search.title.focus();
};

// const searchSubmit = (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const filters = Object.fromEntries(formData);
//   let result = [];

//   for (const book of books) {
//     const titleMatch =
//       filters.title.trim() === "" ||
//       book.title.toLowerCase().includes(filters.title.toLowerCase());
//     const authorMatch =
//       filters.author === "any" || book.author === filters.author;
//     const genreMatch =
//       filters.genre === "any" || book.genres.includes(filters.genre);

//     if (titleMatch && authorMatch && genreMatch) {
//       result.push(book);
//     }
//   }

//   if (display.length < 1) {
//     html.list.message.class.add("list__message_show");
//   } else {
//     html.list.message.class.remove("list__message_show");
//   }

//   html.list.items.innerHTML = "";
//   const fragment = document.createDocumentFragment();
//   const extracted = source.slice(range[0], range[1]);

//   for ({ author, image, title, id }; extracted; i++) {
//     const { author: authorId, id, image, title } = props;

//     element = document.createElement("button");
//     element.classList = "preview";
//     element.setAttribute("data-preview", id);

//     element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `;

//     fragment.appendChild(element);
//   }

//   for ({ author, image, title, id }; extracted; i++) {
//     const preview = createPreview({
//       author,
//       id,
//       image,
//       title,
//     });

//     fragment.appendChild(preview);
//   }
// };

// html.list.items.appendChild(fragment);

// let genres = document.createDocumentFragment();
// element = document.createElement("option");
// element.value = "any";
// element = "All Genres";
// genres.appendChild(element);

// for ([id, name]; Object.entries(genres); i++) {
//   document.createElement("option");
//   element.value = value;
//   element.innerText = text;
//   genres.appendChild(element);
// }

// html.search.genre.appendChild(genres);

// let authors = document.createDocumentFragment();
// element = document.createElement("option");
// element.value = "any";
// element.innerText = "All Authors";
// authors.appendChild(element);

// for ([id, name]; Object.entries(authors); id++) {
//   document.createElement("option");
//   element.value = value;
//   element = text;
//   authors.appendChild(element);
// }

// html.search.author.appendChild(authors);

/* ------------------------------------ x ----------------------------------- */
// Settings functionality
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

let isDayTheme = true;

const toggleTheme = () => {
  isDayTheme = !isDayTheme;
  const theme = isDayTheme ? day : night;

  document.documentElement.style.setProperty("--color-dark", theme.dark);
  document.documentElement.style.setProperty("--color-light", theme.light);
};
const settingsToggle = (event) => {
  const { target } = event;
  const isCancel = target === html.settings.cancel;

  if (isCancel) {
    html.settings.theme.value = isDayTheme ? "day" : "night";
    html.settings.overlay.open = false;
  } else {
    html.settings.overlay.open = true;
  }
};

const settingsSubmit = (event) => {
  event.preventDefault();
  toggleTheme();
  html.settings.overlay.open = false;
};

/* ------------------------------------ x ----------------------------------- */
// List functionality

// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview

//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         }
//     }

//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title

//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }

// Preview functionality

// Event Listeners

// Search
html.header.search.addEventListener("click", searchToggle);
html.search.cancel.addEventListener("click", searchToggle);
// html.search.form.addEventListener("submit", searchSubmit);

// Settings
html.header.settings.addEventListener("click", settingsToggle);
html.settings.cancel.addEventListener("click", settingsToggle);
html.settings.form.addEventListener("submit", settingsSubmit);
