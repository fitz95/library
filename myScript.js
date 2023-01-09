const bookList = document.getElementsByClassName("bookListItems");
const author = document.getElementById("author");
const book = document.getElementById("book");
const form = document.getElementById("form");
const removebtn = document.getElementsByClassName("removebtn");

const findBooks = () => {
  let books = [];
  if (localStorage.getItem("bookList") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("bookList"));
  }
  return books;
};

const addBook = (bookTitle, authorName) => {
  bookTitle = book.value;
  authorName = author.value;
  let bookstorage = findBooks();
  bookstorage.push({ title: bookTitle, author: authorName });
  localStorage.setItem("bookList", JSON.stringify(bookstorage));
};

const displayBooks = () => {
  const bookstorage = findBooks();
  bookstorage.forEach((book, index) => {
    const { author, title } = book;
    bookList.innerHTML += `
    <div class='listContainer'>
      <p>${author}</p>
      <p>${title}</p>
      <button id=${index} class='removebtn'>remove</button>
      <hr>
    </div>
      `;
  });
};
window.onload = () => {
  displayBooks();
};

form.addEventListener("submit", () => {
  addBook();
  displayBooks();
});

const removeBook = (index) => {
  let bookstorage = findBooks();
  bookstorage.forEach((book, bookIndex) => {
    if (bookIndex === index) {
      bookstorage.splice(index, 1);
    }
  });

  localStorage.setItem("bookList", JSON.stringify(bookstorage));
};

// removebtn.addEventListener("click", (event) => {
//   console.log(event.target.parentElement.id);
//   removeBook(event.target);
//   findBooks();
// });

const remove = document.querySelectorAll(".listContainer");

remove.forEach((deletebook, index) => {
  deletebook.addEventListener("click", () => {
    removeBook(index);
    displayBooks();
  });
});
