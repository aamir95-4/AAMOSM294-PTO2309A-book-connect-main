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
// Load inital books
const loadInitialBooks = () => {
  const initialBooks = books.slice(0, BOOKS_PER_PAGE);
  const fragment = document.createDocumentFragment();

  initialBooks.forEach((book) => {
    const preview = createPreview({
      author: book.author,
      id: book.id,
      image: book.image,
      title: book.title,
    });
    fragment.appendChild(preview);
  });

  html.list.items.appendChild(fragment);
  updateButton();
};
// Load more button
let page = 1;
const updateButton = () => {
  const remainingBooks = books.length - page * BOOKS_PER_PAGE;
  html.list.button.innerHTML = `Show more (${remainingBooks})`;
};

const loadMore = (event) => {
  const { target } = event;
  const isButton = target === html.list.button;
  const remainingBooks = books.length - page * BOOKS_PER_PAGE;

  if (isButton && remainingBooks > 0) {
    const startIndex = (page - 1) * BOOKS_PER_PAGE;
    const endIndex = page * BOOKS_PER_PAGE;
    const nextBooks = books.slice(startIndex, endIndex);

    const fragment = document.createDocumentFragment();
    nextBooks.forEach((book) => {
      const preview = createPreview({
        author: book.author,
        id: book.id,
        image: book.image,
        title: book.title,
      });
      fragment.appendChild(preview);
    });

    html.list.items.appendChild(fragment);
    updateRemaining();

    page++;
    updateButton();
  }
};

const updateRemaining = () => {
  const initial = books.length;
  const remaining = books.length - page * BOOKS_PER_PAGE;
  html.list.button.disabled = initial > 0 ? false : true;
};

/* ------------------------------------ x ----------------------------------- */
// Preview functionality

const showSummary = (event) => {
  const { target } = event;
  const isItem = target === html.list.item;
  //   let active;

  //   const pathArray = Array.from(event.path || event.composedPath());

  //   for (let i = 0; i < pathArray.length; i++) {
  //     const {target} = event
  //     if (active) break;
  //     const node = pathArray[i];
  //     const id = node?.dataset?.preview;

  //     for (const singleBook of books) {
  //       if (singleBook.id === id) {
  //         active = singleBook;
  //         break;
  //       }
  //     }
  //   }

  //   if (!active) return;

  //   html.list.active.open = true;
  //   // html.list.blur + html.list.image = active.image;
  //   html.list.title = active.title;
  //   html.list.subtitle = `${authors[active.author]} (${new Date(
  //     active.published
  //   ).getFullYear()})`;
  //   html.list.description = active.description;
};
/* ------------------------------------ x ----------------------------------- */
// Event Listeners

// Search
html.header.search.addEventListener("click", searchToggle);
html.search.cancel.addEventListener("click", searchToggle);
// html.search.form.addEventListener("submit", searchSubmit);

// Settings
html.header.settings.addEventListener("click", settingsToggle);
html.settings.cancel.addEventListener("click", settingsToggle);
html.settings.form.addEventListener("submit", settingsSubmit);

// List
window.addEventListener("load", loadInitialBooks);
html.list.button.addEventListener("click", loadMore);
html.list.items.addEventListener("click", showSummary);
