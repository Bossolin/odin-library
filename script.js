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

function addBookToLibrary() {
  const newBook = new Book(
    prompt("Book title:"),
    prompt("Book author:"),
    prompt("Length:"),
    prompt("Read:")
  );

  myLibrary.push(newBook);
}
