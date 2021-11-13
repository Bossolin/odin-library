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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.finished = function () {
  const bookRead = document.querySelector(`[data-read="${this.title}"]`);

  if (this.read) {
    bookRead.innerText = "Not Read";
    bookRead.classList.add("not-read");
    bookRead.classList.remove("read");
  } else {
    bookRead.innerText = "Read";
    bookRead.classList.add("read");
    bookRead.classList.remove("not-read");
  }
  return (this.read = !this.read);
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1225, true);

let myLibrary = [theHobbit, warAndPeace];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
}

const refresh = function () {
  bookList.innerHTML = "";

  myLibrary.forEach((book) => {
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
  });
};

refresh();

const removeBook = () => {
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const node = e.target.dataset.bookIndex;
      myLibrary = myLibrary.filter((book) => book.title != node);
      const bookId = document.querySelector(`[data-book-index="${node}"]`);

      bookList.removeChild(bookId.parentNode);
    });
  });
};

removeBook();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (myLibrary.some((book) => book.title === title.value))
    return alert("Book already exists");
  addBookToLibrary(title.value, author.value, +pages.value, read.checked);

  refresh();
  removeBook();

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
