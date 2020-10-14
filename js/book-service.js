'use strict';

const STORAGE_KEY = 'bookshopDB';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gSortBy = 'Name';

const gBooks = _createBooks();

function getBooks() {
    getBooksSorted();
    _saveBooksToStorage(gBooks);
    const fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

function changePage(diff) {
    if ((gPageIdx * PAGE_SIZE >= gBooks.length - PAGE_SIZE && diff > 0) || (gPageIdx <= 0 && diff < 0)) return;
    gPageIdx += diff;
}

function getBookById(bookId) {
    const book = gBooks.find(book => {
        return bookId === book.id;
    })
    return book;
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.unshift(book);
    _saveBooksToStorage(gBooks);
}

function updateBook(bookId, newPrice) {
    const book = getBookById(bookId);
    book.price = newPrice;
    _saveBooksToStorage(gBooks);
}

function getBookIdxById(bookId) {
    const bookIdx = gBooks.findIndex(book => {
        return bookId === book.id;
    });
    return bookIdx;
}

function removeBook(bookId) {
    const bookIdx = getBookIdxById(bookId);
    if (bookIdx < 0) return;
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage(gBooks);
}

function updateBookRate(bookId, diff) {
    const currBook = getBookById(bookId);
    if (diff === -1 && currBook.rate === 0 || diff === 1 && currBook.rate === 10) return;
    currBook.rate += diff
    _saveBooksToStorage(gBooks);
}

function getBooksSorted() {
    if (gSortBy === 'Name') sortByName();
    else if (gSortBy === 'Price') sortByPrice();
}

function setSort(sortBy) {
    gSortBy = sortBy;
}


function sortByName() {
    gBooks.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    });
}

function sortByPrice() {
    gBooks.sort((a, b) => {
        return a.price - b.price;
    });
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        rate: 0,
        desc: makeLorem()
    };
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books) {
        books = [];
        books.push(_createBook('Harry Potter', 40));
        books.push(_createBook('Twilight', 35));
        books.push(_createBook('The Alchemist', 50));
    }
    _saveBooksToStorage(books);
    return books;
}

function _saveBooksToStorage(books) {
    saveToStorage(STORAGE_KEY, books);
}