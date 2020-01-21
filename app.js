let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function render() {
  let tbody = document.getElementById("body");
  tbody.innerHTML = "";
  for (let book in myLibrary) {
    let tr = document.createElement("tr");
    cell1 = document.createElement("td");
    node1 = document.createTextNode(myLibrary[book].title);
    cell2 = document.createElement("td");
    node2 = document.createTextNode(myLibrary[book].author);
    cell3 = document.createElement("td");
    node3 = document.createTextNode(myLibrary[book].pages);
    cell4 = document.createElement("td");
    node4 = document.createTextNode(myLibrary[book].status);
    cell1.appendChild(node1);
    cell2.appendChild(node2);
    cell3.appendChild(node3);
    cell4.appendChild(node4);
    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    tbody.appendChild(tr);
    let tdRemoveButton = document.createElement("td");
    tr.appendChild(tdRemoveButton);
    let removeButton = document.createElement("button");
    removeButton.dataset.id = book;
    removeButton.textContent = "X";
    removeButton.classList.add("removeButton", "delete", "is-vcentered");
    tdRemoveButton.appendChild(removeButton);
  }
}

function showModal() {
  document.getElementById("form-modal").classList.add("is-active");
}
function closeModal() {
  document.getElementById("form-modal").classList.remove("is-active");
}


function addBook(){
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let status = document.querySelector("#status").value;
  let book = new Book(title, author, pages, status);
  myLibrary.push(book);
  render();
  cleanForm();
  closeModal();
}

function cleanForm(){
  let fields = ['title', 'author', 'pages', 'status'];
  fields.forEach((item, i) => {
    document.querySelector("#"+item).value = "";
  });
}

function removeBook(e) {
  myLibrary.splice(parseInt(e.target.dataset.id));
  render();
}

document.addEventListener("click", function(e) {
  let modal = document.querySelector("#form-modal .box");
  if (e.target.classList.contains("removeButton")) removeBook(e);
  if (!modal.contains(e.target) && e.target.id != "addBook") {
    closeModal();
  }
});

document.getElementById("addBook").addEventListener("click", showModal);
document.getElementById("addItem").addEventListener("click", addBook);
document.querySelector(".button.cancel").addEventListener("click", closeModal);
document
  .querySelector(".modal-close.is-large")
  .addEventListener("click", closeModal);

book = new Book("test", "hello", "blha", "1");

addBookToLibrary(book);

render();
