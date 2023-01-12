/* eslint-disable max-classes-per-file */
const bookList = document.getElementById('bookListItems');
const form = document.getElementById('form');
const removebtn = document.getElementsByClassName('removebtn');
const newFormBook = document.getElementById('newFormBook');
const newFormAuthor = document.getElementById('newFormAuthor');

class NewBook {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Booklibrary {
  constructor() {
    this.bookstorage = JSON.parse(localStorage.getItem('bookList1')) || [];
  }

  addBook(title, author) {
    const booked = new NewBook(title, author, this.bookstorage.length);
    this.bookstorage.push(booked);
    localStorage.setItem('bookList1', JSON.stringify(this.bookstorage));
    return this.bookstorage;
  }

  remove(bookId) {
    function filterFunction(book) {
      return book.id !== parseInt(bookId, 10);
    }
    const filteredBooks = this.bookstorage.filter(filterFunction);
    this.bookstorage = filteredBooks;
    localStorage.setItem('bookList1', JSON.stringify(filteredBooks));
    return this.bookstorage;
  }
}
const booked = new Booklibrary();

const displayBooks = () => {
  bookList.innerHTML = '';
  booked.bookstorage.forEach((book) => {
    const { author, title, id } = book;
    bookList.innerHTML += `
      <div class='listContainer'>
        <p>'${title}' by ${author}</p>
        <button id=${id} class='removebtn'>Remove</button>
      </div>
        `;
  });

  Array.from(removebtn).forEach((button) => {
    button.addEventListener('click', (e) => {
      booked.remove(e.target.id);
      displayBooks();
    });
  });
};

window.onload = () => {
  displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booked.addBook(newFormBook.value, newFormAuthor.value);
  form.reset();
  displayBooks();
});
