const btn = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
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
