let Cabinets = [];
const places = {
    midbod: document.querySelector(".midbod"),
    controlSpace: document.querySelector(".control-space"),
    apCab: function (Cabinet) {
        places.midbod.appendChild(Cabinet.cabEl);
        for (let i =0;i<5; i++) {
            Cabinet.cabEl.appendChild(Cabinet.shAr[i].shelfEl);
        }
    }
}

//#region Конструкторы

function Book (bookUrl = {}, book = "The Adventures of Sherlock Holmes", author = "Arthur Conan Doyle", publised = "14 October 1892") {
    this.bookUrl = bookUrl;
    this.bookEl = document.createElement("div");
    this.bookEl.className = "book";
    this.bookEl.style.backgroundColor = `hsl(${rndCol()}, 30%, 30%)`;
    this.title = book;
    this.author = author;
    this.publised = publised;
}

function Cabinet () {
    this.cabEl = document.createElement("div");
    this.cabEl.className = "cabinet";
    this.shAr = shelfZav();
}
function shelfZav () {
    let shAr = [];
    for(let i =0;i<5;i++) {
        shAr.push(new Shelf);
    }
    return shAr;
}

function Shelf () {
    this.shelfEl = document.createElement("div");
    this.shelfEl.className = "shelf";
    this.bookAr = new Array();
    this.setBook = function (book) {
        this.shelfEl.appendChild(book.bookEl);
        this.bookAr.push(book);

    }
}

function rndCol () {
    const hueProc = Math.floor(Math.ceil(Math.random()*100)*3.6);
    return hueProc;
}

//#endregion

//#region Привязка кнопок
    //Кабинетные кнопки
places.controlSpace.firstElementChild.firstElementChild.addEventListener("click", () => buttAddCabb());
places.controlSpace.firstElementChild.lastElementChild.addEventListener("click", () => buttDelCabb());

    //Книжные кнопки
places.controlSpace.firstElementChild.nextElementSibling.firstElementChild.addEventListener("click", () => buttAddBook());
places.controlSpace.firstElementChild.nextElementSibling.lastElementChild.addEventListener("click", () => buttDelBook());

    // "Всё" кнопки
places.controlSpace.lastElementChild.firstElementChild.addEventListener("click", () => ButtAddAll());
places.controlSpace.lastElementChild.lastElementChild.addEventListener("click", () => ButtDelAll());

//#endregion

//#region Кнопочные функции 
    //Кабинетки
function buttAddCabb () {
    if (Cabinets.length == 5) {
        console.log("Cabb no more");
        return false;
    }
    Cabinets.push(new Cabinet());
    let i = Cabinets.length-1;
    places.apCab(Cabinets[i]);
}
function buttDelCabb () {
    if (Cabinets.length == 0) {
        console.log("All Cabb Del");
        return false;
    }
    Cabinets[Cabinets.length-1].cabEl.remove();
    Cabinets.pop();
}

    //Книги
function buttAddBook () {
    let emptyPlace = emptyPlaceFun();
    if (emptyPlace.anyEmpty == false) {
        console.log("No room for books")
        return true;
    }
    emptyPlace.bId = Cabinets[emptyPlace.cabId].shAr[emptyPlace.shId].bookAr.length;
    Cabinets[emptyPlace.cabId].shAr[emptyPlace.shId].setBook(new Book({emptyPlace}));
    return false;
}

function buttDelBook () {
    let emptyPlace = emptyPlaceFun();
    console.log(emptyPlace);
    for (let i = emptyPlace.cabId; i > -1; i--) {
        for (let k = 4; k >= 0; k--) {
            if (Cabinets[i].shAr[k].bookAr.length ===0) {continue}
            if (Cabinets[i].shAr[k].bookAr.length !==0) {
                Cabinets[i].shAr[k].bookAr[Cabinets[i].shAr[k].bookAr.length-1].bookEl.remove();
                Cabinets[i].shAr[k].bookAr.pop();
                return true;
            }      
        }
    }
}

    //Ставлю всё
function ButtAddAll () {
    console.log("1");
    let full = false;
    while (full == false) {
        full = buttAddBook();
    }
}

function ButtDelAll () {
    let emptyPlace = emptyPlaceFun();
    console.log(emptyPlace);
    for (let i = emptyPlace.cabId; i > -1; i--) {
        for (let k = 4; k >= 0; k--) {
            for (let j = Cabinets[i].shAr[k].bookAr.length-1; j >= 0; j--) {
                Cabinets[i].shAr[k].bookAr[Cabinets[i].shAr[k].bookAr.length-1].bookEl.remove();
                Cabinets[i].shAr[k].bookAr.pop();
            }
        }
    }
}

//#endregion

//#region Определение позиции
    //Определение пустой позиции
function emptyPlaceFun () {
    let i = 0;
    let k = 0;
    for ( i = 0; i < Cabinets.length; i++) {        
        for ( k = 0; k < 5; k++) {
            if (Cabinets[i].shAr[k].bookAr.length < 20) {
                return {cabId: i,shId:k, anyEmpty: true};
            }
        }
    }
    return {cabId: i-1,shId:k-1,anyEmpty: false};
}
    //Поиск книги
function bookSearch (bookUrl) {

}

//#endregion

//#region Мусорка

function fun () {
    for (let u = 0; u < 99; u++) {
        buttAddBook();
    }
}

//#endregion