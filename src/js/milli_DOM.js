//variabler
const bookTitle = document.getElementById('titleField');
const bookAuthor = document.getElementById('authorField');
const bookRating = document.getElementById('ratingField');
const bookStatus = document.getElementById('statusField');
const bookOwnership = document.getElementById('confirmField');
const bookComment = document.getElementById('commentField');

const submitButton = document.getElementById('submitBtn');
const message = document.getElementById('errorMessage');
const deleteButton = document.getElementById('deleteBtn');

const mtTable = document.getElementById('DOM_books');


//lyssnare
if (submitButton) {
    submitButton.addEventListener('click', addMt);
}
if (deleteButton) {
    deleteButton.addEventListener('click', clearStorage);
}

//array att lagra datan i 
let mtArray = [];


//initiering
window.onload = init;

function init() {
    //läs in från storage
    mtArray = loadFromStorage();

    //skriv ut till DOM
    displayMt();
}


//FUNKTIONER

//lägg till
function addMt() {

    event.preventDefault();
    //validera att alla input fält är ifyllda
    if (bookTitle.value === "" || bookAuthor.value === "" || bookRating.value === "" || bookStatus.value === "" || bookOwnership.value === "" || bookComment.value === "") {
        message.innerHTML ="Vänligen fyll i alla fält";
        return;
    }

    //skapa ett objekt
    let book = {
        title: bookTitle.value,
        author: bookAuthor.value,
        rating: bookRating.value,
        status: bookStatus.value,
        ownership: bookOwnership.value,
        comment: bookComment.value
    };

    //lägg till objektet i arrayen
    mtArray.push(book);

    //anropa funktion för att skriva ut till DOM
    displayMt();

    //återställ input fälten
    bookTitle.value = "";
    bookAuthor.value = "";
    bookRating.value = "Ej läst...";
    bookStatus.value = "Vill läsa";
    bookComment.value = "";
    //nollställ felmeddelandet
    message.innerHTML = "";

    //spara till web storage
    saveToStorage();

}



//lagra
function saveToStorage() {
    //konvertera arrayen till en JSON-sträng och lagra den
    localStorage.setItem('bookArray', JSON.stringify(mtArray));
}


//läs in web storage
function loadFromStorage() {
    //hämta tillbaka lista från storage
    const storedBooks = localStorage.getItem('bookArray');

    //OM det finns något, konvertera JSON tillbaka till array
    if (storedBooks) {
        mtArray = JSON.parse(storedBooks);
        return mtArray;
    }

    //annars returnera en tom array
    return [];
}

//skriv ut till DOM
function displayMt() {

    //rensa DOM
    mtTable.innerHTML = "";

    //loopa igenom arrayen
    mtArray.forEach((book) => {
        //skapa en ny rad för varje bok
        const newRow = document.createElement('tr');
        //lägg till klass
        newRow.classList.add('bookInfo');
        newRow.innerHTML = `
            <td class="booktitle">${book.title}</td>
            <td class="bookauthor">${book.author}</td>
            <td class="bookrating">${book.rating}</td>
            <td class="bookstatus">${book.status}</td>
            <td class="bookownership">${book.ownership}</td>
            <td class="bookcomment">${book.comment}</td>
        `;

        //lägg till raden i tabellen
        mtTable.appendChild(newRow);
    })
}

//Rensa
function clearStorage() {

    //rensa storage
    localStorage.clear();
    //rensa DOM
    mtTable.innerHTML = "";
}