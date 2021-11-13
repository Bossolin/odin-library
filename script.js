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

addBookBtn.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
});

closeAddBookBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1225, true);

let myLibrary = [theHobbit, warAndPeace];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
}

myLibrary.forEach((book, index) => {
  console.log(index);
  let li = document.createElement("li");
  let bookDescrtiption = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read} <button class="remove-btn" data-book-index='${book.title}'>Remove</button>`;
  li.innerHTML = bookDescrtiption;
  bookList.appendChild(li);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, +pages.value, read.checked);

  let li = document.createElement("li");
  let bookDescrtiption = `${title.value} by ${author.value}, ${pages.value} pages, ${read.checked} <button class="remove-btn" data-book-index='${title.value}'>Remove</button>`;
  li.innerHTML = bookDescrtiption;
  bookList.appendChild(li);
  removeBook();

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;

  modal.classList.remove("active");
  overlay.classList.remove("active");
});

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
