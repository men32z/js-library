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
    let tr = document.createElement("tr");
    for (let book in myLibrary) {
    
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
    }
}

book = new Book("test", "hello", "blha", "1");

addBookToLibrary(book);

render();
