let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        // included for prompt… no functionality… but doesn’t work because it we mess with array
        // doing so doesn’t update the function…
        if (read) {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, read`)
        }
        else {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, not yet read`)
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);
}

function addLastToTable() {
    let table = document.querySelector('#tbl');
    var row = table.insertRow(myLibrary.length);
    var title = row.insertCell(0);
    var titleText = document.createTextNode(myLibrary[myLibrary.length-1].title);
    title.style.fontStyle = "italic";
    title.appendChild(titleText);
    var author = row.insertCell(1);
    var authorText = document.createTextNode(myLibrary[myLibrary.length-1].author);
    author.appendChild(authorText);
    var pages = row.insertCell(2);
    var pagesText = document.createTextNode(myLibrary[myLibrary.length-1].pages);
    pages.appendChild(pagesText);
    var read = row.insertCell(3);
    var readText = document.createTextNode(myLibrary[myLibrary.length-1].read);
    read.appendChild(readText);
    var actions = row.insertCell(4);
    var removebtn = document.createElement('BUTTON');
    removebtn.classList.add('remove');
    removebtn.classList.add('tablebtn');
    removebtn.innerHTML = 'Remove';
    removebtn.addEventListener ('click', (e) => {
        let table = document.querySelector('#tbl')
        table.deleteRow(Number(e.target.dataset.indexNumber));
        idSync();
        myLibrary.splice(Number(e.target.dataset.indexNumber)-1, 1);
    })
    var readstatusbtn = document.createElement('BUTTON');
    readstatusbtn.classList.add('readstatus');
    readstatusbtn.classList.add('tablebtn');
    readstatusbtn.innerHTML = 'Mark Read';
    readstatusbtn.addEventListener ('click', (e) => {
        myLibrary[e.target.parentNode.parentNode.rowIndex-1].read = true;
        e.target.parentNode.parentNode.children[3].textContent = myLibrary[e.target.parentNode.parentNode.rowIndex-1].read;
    })
    actions.appendChild(removebtn);
    actions.appendChild(readstatusbtn);
    idSync();
}

// FUNCTION TO SYNC IDS AND TABLE ROW
function idSync() {
    const tablerows = Array.from(document.getElementById('tbl').rows);
    for (let i=1; i < tablerows.length; i++) {
        for (let j=0; j < tablerows[i].getElementsByClassName('tablebtn').length; j++) {
            tablerows[i].getElementsByClassName('tablebtn')[j].dataset.indexNumber = i;
        }
    }
}    

// EVENT LISTENER FOR NEW BOOK

let newbook = document.querySelector('#newbook');
newbook.addEventListener('click', () => {
    addBookToLibrary(
        prompt('Title?'),
        prompt('Author?'),
        prompt('Page count?'),
        confirm('Have you finished it? (Click \'OK\' for yes, or \'Cancel\' for no.)')
    )
    addLastToTable();
})
