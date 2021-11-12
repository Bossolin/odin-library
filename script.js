const btn = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const bookList = document.querySelector("ul");

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

myLibrary.forEach((book) => {
  console.log(book);
  let li = document.createElement("li");
  let bookDescrtiption = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
  li.innerText = bookDescrtiption;
  bookList.appendChild(li);
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, +pages.value, read.checked);

  let li = document.createElement("li");
  let bookDescrtiption = `${title.value} by ${author.value}, ${pages.value} pages, ${read.checked}`;
  li.innerText = bookDescrtiption;
  bookList.appendChild(li);

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
});
