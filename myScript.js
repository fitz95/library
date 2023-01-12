import NewBook from './NewBook.js';

const bookList = document.getElementById('bookListItems');
const form = document.getElementById('form');
const removebtn = document.getElementsByClassName('removebtn');
const newFormBook = document.getElementById('newFormBook');
const newFormAuthor = document.getElementById('newFormAuthor');
const List = document.getElementById('List');
const AddNew = document.getElementById('AddNew');
const Contact = document.getElementById('Contact');

const listSection = document.getElementById('bookList-section');
const AddNewSection = document.getElementById('AddNewBook');
const ContactSection = document.getElementById('ContactSection');

List.addEventListener('click', () => {
  listSection.style.display = 'block';
  List.style.color = 'blue';
  AddNew.style.color = 'black';
  Contact.style.color = 'black';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'none';
});

AddNew.addEventListener('click', () => {
  listSection.style.display = 'none';
  AddNewSection.style.display = 'block';
  List.style.color = 'black';
  AddNew.style.color = 'blue';
  Contact.style.color = 'black';
  ContactSection.style.display = 'none';
});

Contact.addEventListener('click', () => {
  listSection.style.display = 'none';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'block';
  List.style.color = 'black';
  AddNew.style.color = 'black';
  Contact.style.color = 'blue';
});

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

  displayBooks() {
    bookList.innerHTML = '';
    this.bookstorage.forEach((book) => {
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
        e.preventDefault();
        this.remove(e.target.id);
        this.displayBooks();
      });
    });
    return this.bookstorage;
  }
}
const booked = new Booklibrary();

window.onload = () => {
  listSection.style.display = 'block';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'none';
  booked.displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booked.addBook(newFormBook.value, newFormAuthor.value);
  form.reset();
  booked.displayBooks();
});

const liveDate = new Date();
const date = document.getElementById('date');
date.innerHTML = liveDate.toUTCString();