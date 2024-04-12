// Import from data and view
import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { html, createPreview } from "./view.js";

// Variables
let page = 1;
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

let isDayTheme = true;
/* ------------------------------------ x ----------------------------------- */
if (!books && !Array.isArray(books)) throw new Error("Source required");
/* ------------------------------------ x ----------------------------------- */
// Search Functionality
const searchToggle = (event) => {
  const { target } = event;
  const isCancel = target === html.search.cancel;

  if (isCancel) {
    html.search.overlay.open = false;
  } else {
    html.search.overlay.open = true;

    const allGenresOption = document.createElement("option");
    allGenresOption.value = "any";
    allGenresOption.innerText = "All Genres";
    search.genre.appendChild(allGenresOption);

    for (const [id, name] of Object.entries(genres)) {
      const genreOption = document.createElement("option");
      genreOption.value = id;
      genreOption.innerText = name;
      search.genre.appendChild(genreOption);
    }

    const allAuthorsOption = document.createElement("option");
    allAuthorsOption.value = "any";
    allAuthorsOption.innerText = "All Authors";

    search.author.appendChild(allAuthorsOption);

    for (const [id, name] of Object.entries(authors)) {
      const authorOption = document.createElement("option");
      authorOption.value = id;
      authorOption.innerText = name;
      search.author.appendChild(authorOption);
    }
  }
  html.search.title.focus();
};

const searchSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(html.search.form);
  const filters = Object.fromEntries(formData);

  const { title, author, genre } = filters;

  const filteredBooks = books.filter((book) => {
    const titleMatch =
      title.trim() === "" ||
      book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;
    const genreMatch = genre === "any" || book.genres.includes(genre);

    return titleMatch && authorMatch && genreMatch;
  });

  html.list.items.innerHTML = ""; // Clear previous search results

  if (filteredBooks.length === 0) {
    html.list.message.classList.add("list__message_show");
  } else {
    html.list.message.classList.remove("list__message_show");

    const fragment = document.createDocumentFragment();
    filteredBooks.forEach((book) => {
      const preview = createPreview({
        author: book.author,
        id: book.id,
        image: book.image,
        title: book.title,
      });
      fragment.appendChild(preview);
    });

    html.list.items.appendChild(fragment);
    html.search.overlay.open = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
/* ------------------------------------ x ----------------------------------- */
// Settings functionality

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
        author: book,
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
  const isClose = target === html.list.close;

  if (isClose) {
    html.list.overlay.open = false;
    console.log("Closing overlay...");
  } else {
    const id = target.dataset.id || target.closest(".preview")?.dataset.id;
    const book = books.find((item) => item.id === id);

    if (book) {
      const publishedDate = new Date(book.published);

      html.list.image.setAttribute("src", book.image);
      html.list.blur.setAttribute("src", book.image);
      html.list.title.innerText = book.title;
      html.list.subtitle.innerText = `${
        authors[book.author]
      } (${publishedDate.getFullYear()})`;
      html.list.description.innerText = book.description;

      html.list.overlay.open = true;
      console.log("Opening overlay...");
    }
  }
};
/* ------------------------------------ x ----------------------------------- */
// Event Listeners

// Search
html.header.search.addEventListener("click", searchToggle);
html.search.cancel.addEventListener("click", searchToggle);
html.search.form.addEventListener("submit", searchSubmit);

// Settings
html.header.settings.addEventListener("click", settingsToggle);
html.settings.cancel.addEventListener("click", settingsToggle);
html.settings.form.addEventListener("submit", settingsSubmit);

// List
window.addEventListener("load", loadInitialBooks);
html.list.button.addEventListener("click", loadMore);
html.list.items.addEventListener("click", showSummary);
html.list.close.addEventListener("click", showSummary);
