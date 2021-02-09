let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
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

// addBookToLibrary("bible", "God", "a lot", true);

// alternate… break and build entire table each time…

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
    removebtn.dataset.indexNumber = myLibrary.length-1;
    removebtn.innerHTML = 'Remove';
    removebtn.addEventListener ('click', (e) => {
        let table = document.querySelector('#tbl')
        table.deleteRow(Number(e.target.dataset.indexNumber)+1);
    })
    var readstatusbtn = document.createElement('BUTTON');
    readstatusbtn.classList.add('readstatus');
    readstatusbtn.classList.add('tablebtn');
    readstatusbtn.dataset.indexNumber = myLibrary.length-1;
    readstatusbtn.innerHTML = 'Mark Read';
    readstatusbtn.addEventListener ('click', (e) => {
        let table = document.querySelector('#tbl')
        table.deleteRow(Number(e.target.dataset.indexNumber)+1);
    })
    actions.appendChild(removebtn);
    actions.appendChild(readstatusbtn);

    // doesn’t work because if you delete first entry the data id does not change for second
    // so data id+1 is longer than length of table…
    // loop over all entries and reset data–id to fit w row #? (FOR BOTH READ STATUS AND REMOVE!)
    // this *should* mimic behavior of array + array numbers
    // could make it a function

    // 
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

//EVENT LISTENER FOR REMOVING BOOK

// function buildRemoveArray() {
//     let removeButtons = Array.from(document.querySelectorAll('.remove'))
//     removeButtons.forEach((element) => {
//         element.addEventListener('click', (e) => {
//             let table = document.querySelector('#tbl')
//             table.deleteRow(e.target.dataset.indexNumber)
//             // console.log('this is a start');
//         })
//     })
// }
