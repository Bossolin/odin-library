const submitBtn = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const bookList = document.querySelector("ul");
const addBookBtn = document.querySelector(".open-button");
const closeAddBookBtn = document.querySelector(".close-button");
const overlay = document.getElementById("overlay");
const modal = document.querySelector(".modal");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  delete() {
    myLocalLibrary = myLocalLibrary.filter((book) => book.title != this.title);

    const bookId = document.querySelector(`[data-book-index="${this.title}"]`);
    bookList.removeChild(bookId.parentNode);
    setLocalData();
  }

  finished() {
    const bookRead = document.querySelector(`[data-read="${this.title}"]`);
    console.log();
    if (this.read) {
      bookRead.innerText = "Not Read";
      bookRead.classList.add("not-read");
      bookRead.classList.remove("read");
    } else {
      bookRead.innerText = "Read";
      bookRead.classList.add("read");
      bookRead.classList.remove("not-read");
    }
    this.read = !this.read;
    setLocalData();
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1225, true);
const thinkLikeAPro = new Book(
  "Think Like A Programmer",
  "V. Anton Spraul",
  256,
  false
);

let myLibrary = [theHobbit, warAndPeace, thinkLikeAPro];

let myLocalLibrary = JSON.parse(localStorage.getItem("myLibrary"));

const setLocalData = function () {
  if (myLocalLibrary === null) {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    myLocalLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  }
  localStorage.setItem("myLibrary", JSON.stringify(myLocalLibrary));
};
setLocalData();

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLocalLibrary.push(newBook);
  setLocalData();
}

const refresh = function () {
  bookList.innerHTML = "";

  myLocalLibrary.forEach((book) => {
    Object.setPrototypeOf(book, new Book());

    const bookCard = document.createElement("li");
    bookCard.innerHTML = `<h3>${book.title}</h3><h4>by ${book.author}</h4><h4>${
      book.pages
    } pages</h4><Button data-read="${book.title}" class="${
      book.read ? "read" : "not-read"
    }">${
      book.read ? "Read" : "Not Read"
    }</Button><button class="remove-btn" data-book-index="${
      book.title
    }">Remove</button>`;

    bookList.appendChild(bookCard);

    const bookRead = document.querySelector(`[data-read="${book.title}"]`);
    bookRead.addEventListener("click", () => {
      book.finished();
    });

    const removeBook = document.querySelector(
      `[data-book-index="${book.title}"]`
    );
    removeBook.addEventListener("click", () => {
      book.delete();
    });
  });
};

refresh();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === "") {
    return alert("Add book title");
  } else if (author.value === "") {
    return alert("Add author of the book");
  } else if (+pages.value === 0) {
    return alert("Add book length");
  }
  if (myLocalLibrary.some((book) => book.title === title.value))
    return alert("Book already exists");
  addBookToLibrary(title.value, author.value, +pages.value, read.checked);

  refresh();

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;

  modal.classList.remove("active");
  overlay.classList.remove("active");
});

addBookBtn.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
  title.focus();
});

closeAddBookBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
