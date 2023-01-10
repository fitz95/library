const bookList = document.getElementById('bookListItems');
const form = document.getElementById('form');
const removebtn = document.getElementsByClassName('removebtn');
const newFormBook = document.getElementById('newFormBook');
const newFormAuthor = document.getElementById('newFormAuthor');
let books = [];
const findBooks = () => {
  if (localStorage.getItem('bookList') !== []) {
    books = JSON.parse(localStorage.getItem('bookList'));
  } else {
    books = [];
  }
  return books;
};

function NewBook(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

function addBook(title, author) {
  const book = new NewBook(title, author, books.length);
  books.push(book);
  return book;
}

function newFormBookItem() {
  const book = addBook(newFormBook.value, newFormAuthor.value);
  form.reset();
  return book;
}

function remove(bookId) {
  function filterFunction(book) {
    return book.id !== parseInt(bookId, 10);
  }
  const removedbook = books.filter(filterFunction);
  books = removedbook;
  localStorage.setItem('bookList', JSON.stringify(removedbook));
}

const displayBooks = () => {
  bookList.innerHTML = '';
  books.forEach((book) => {
    const { author, title, id } = book;
    bookList.innerHTML += `
      <div class='listContainer'>
        <p>${author}</p>
        <p>${title}</p>
        <button id=${id} class='removebtn'>remove</button>
        <hr>
      </div>
        `;
  });

  Array.from(removebtn).forEach((button) => {
    button.addEventListener('click', (e) => {
      remove(e.target.id);
      displayBooks();
    });
  });
};

window.onload = () => {
  findBooks();
  displayBooks();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  newFormBookItem();
  localStorage.setItem('bookList', JSON.stringify(books));
  displayBooks();
});
