let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggle = function () {
  this.status = !this.status;
};

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function render() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  const tbody = document.getElementById('body');
  tbody.innerHTML = '';
  for (const book in myLibrary) {
    const tr = document.createElement('tr');
    const cell1 = document.createElement('td');
    const node1 = document.createTextNode(myLibrary[book].title);
    const cell2 = document.createElement('td');
    const node2 = document.createTextNode(myLibrary[book].author);
    const cell3 = document.createElement('td');
    const node3 = document.createTextNode(myLibrary[book].pages);
    const cell4 = document.createElement('td');
    const node4 = document.createTextNode(
      myLibrary[book].status ? 'Read' : 'Unread'
    );
    const readButton = document.createElement('button');
    readButton.classList.add('changeStatus', 'button', 'is-dark');
    cell1.appendChild(node1);
    cell2.appendChild(node2);
    cell3.appendChild(node3);
    cell4.appendChild(node4);
    cell4.appendChild(readButton);
    readButton.appendChild(node4);
    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    tr.dataset.id = book;
    tbody.appendChild(tr);
    const tdRemoveButton = document.createElement('td');
    tr.appendChild(tdRemoveButton);
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('removeButton', 'delete', 'is-vcentered');
    tdRemoveButton.appendChild(removeButton);
  }
}

function showModal() {
  document.getElementById('form-modal').classList.add('is-active');
}

function closeModal() {
  document.getElementById('form-modal').classList.remove('is-active');
}

function addBook() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').value == 'true' ? true : false;
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  render();
  cleanForm();
  closeModal();
}

function cleanForm() {
  const fields = ['title', 'author', 'pages', 'status'];
  fields.forEach((item, i) => {
    document.querySelector('#' + item).value = '';
  });
}

function removeBook(e) {
  myLibrary.splice(
    parseInt(e.target.parentElement.parentElement.dataset.id),
    1
  );
  render();
}

function changeStatus(e) {
  console.log(e.target.parentElement.parentElement.dataset.id);
  myLibrary[parseInt(e.target.parentElement.parentElement.dataset.id)].toggle();
  render();
}

document.addEventListener('click', function(e) {
  const modal = document.querySelector('#form-modal .box');
  if (e.target.classList.contains('removeButton')) removeBook(e);
  if (e.target.classList.contains('changeStatus')) changeStatus(e);

  if (!modal.contains(e.target) && e.target.id != 'addBook') {
    closeModal();
  }
});

document.getElementById("addBook").addEventListener("click", showModal);
document.getElementById("addItem").addEventListener("click", addBook);
document.querySelector(".button.cancel").addEventListener("click", closeModal);
document
  .querySelector(".modal-close.is-large")
  .addEventListener("click", closeModal);

book = new Book("test", "hello", "blha", true);

addBookToLibrary(book);

if (localStorage.getItem("myLibrary") !== null) {
  myLibraryLocal = JSON.parse(localStorage.getItem("myLibrary"));
  myLibrary = [];
  myLibraryLocal.forEach((item, i) => {
    myLibrary.push(new Book(item.title, item.author, item.pages, item.status));
  });
}

render();
