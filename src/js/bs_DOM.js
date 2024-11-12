//variabler
const mtName = document.getElementById('nameField');
const mtHight = document.getElementById('hightField');
const mtContinent = document.getElementById('continentField');
const mtClimbed = document.getElementById('confirmField');
const mtComment = document.getElementById('commentField');

const submitButton = document.getElementById('submitBtn');
const message = document.getElementById('errorMessage');
const deleteButton = document.getElementById('deleteBtn');

const mtTable = document.getElementById('DOM_mt');


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
    if (mtName.value === "" || mtHight.value === "" || mtContinent.value === "" || mtClimbed.value === "" || mtComment.value === "") {
        message.innerHTML ="Vänligen fyll i alla fält";
        return;
    }

    //skapa ett objekt
    let mt = {
        name: mtName.value,
        hight: mtHight.value,
        continent: mtContinent.value,
        climbed: mtClimbed.value,
        comment: mtComment.value
    };

    //lägg till objektet i arrayen
    mtArray.push(mt);

    //anropa funktion för att skriva ut till DOM
    displayMt();

    //återställ input fälten
    mtName.value = "";
    mtHight.value = "";
    mtContinent.value = "Europa";
    mtComment.value = "";
    //nollställ felmeddelandet
    message.innerHTML = "";

    //spara till web storage
    saveToStorage();

}



//lagra
function saveToStorage() {
    //konvertera arrayen till en JSON-sträng och lagra den
    localStorage.setItem('mtArray', JSON.stringify(mtArray));
}


//läs in web storage
function loadFromStorage() {
    //hämta tillbaka lista från storage
    const storedMt = localStorage.getItem('mtArray');

    //OM det finns något, konvertera JSON tillbaka till array
    if (storedMt) {
        mtArray = JSON.parse(storedMt);
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
    mtArray.forEach((mt) => {
        //skapa en ny rad för varje bok
        const newRow = document.createElement('tr');
        //lägg till klass
        newRow.classList.add('mtInfo');
        newRow.innerHTML = `
            <th scope="row">${mtArray.indexOf(mt) + 1}</th>
            <td>${mt.name}</td>
            <td>${mt.hight}</td>
            <td>${mt.continent}</td>
            <td>${mt.climbed}</td>
            <td>${mt.comment}</td>          
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