'use strict'

function onInit() {
    renderBooks();
    doTrans();
}

function renderBooks() {
    const books = getBooks();
    var strHtml = '';
    books.forEach(book => {
        strHtml += `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}$</td>
            <td>${book.rate}</td>
            <td>
                <button class="rounded" data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
            <td>
                <button data-trans="update" class="update-btn rounded" onclick="toggleUpdateInput('${book.id}')">Update</button>  
                <input data-trans="new-price" name="new-price" class="update-price" type="number" placeholder="New Price" hidden>
            </td>
            <td>
                <button class="rounded" data-trans="read" onclick="onReadBook('${book.id}')">Read</button>
            </td>
        </tr> `;
    })
    document.getElementById('table-data').innerHTML = strHtml;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    document.querySelector('.input-container').hidden = false;
}

function onSaveBook() {
    const elName = document.querySelector('.add-book input[name=book-name]');
    const elPrice = document.querySelector('.add-book input[name=book-price]');
    const name = elName.value;
    const price = elPrice.value;
    if (!name || !price || price <= 0) return;
    addBook(name, price);
    renderBooks();
    elName.value = '';
    elPrice.value = '';
    document.querySelector('.input-container').hidden = true;
}

function toggleUpdateInput(bookId) {
    if (document.querySelector('.update-price').hidden) document.querySelector('.update-price').hidden = false;
    else onUpdateBook(bookId);
}

function onUpdateBook(bookId) {
    const elPrice = document.querySelector('.update-price').value;
    updateBook(bookId, elPrice);
    renderBooks();
}

function onReadBook(bookId) {
    console.log(bookId);
    const close = (getCurrLang() === 'en') ? 'Close' : 'סגור';
    const price = (getCurrLang() === 'en') ? 'Price' : 'מחיר';
    const book = getBookById(bookId)
    var strHtml = '';
    strHtml += `
        <br></br> <h5 style="font-size: 30px" >${book.title}</h5>
        <h6 data-trans="price" style="font-size: 20px"> ${price}: ${book.price}$</h6>
        <img style="width: 45px;" src="./img/book.png" alt=""><br></br>
        <p>${book.desc}</p>
        <div class="rate-book">
        <button class="rate" onclick="onSetRate('${book.id}', -1)">-</button>
        <span class="sum">${book.rate}</span>
        <button class="rate" onclick="onSetRate('${book.id}', 1)">+</button>
        <button data-trans="close-modal" class="close-btn rounded" onclick="onCloseModal()">${close}</button>
        </div> `;
    const elModal = document.querySelector('.read-modal')
    elModal.innerHTML = strHtml;
    elModal.classList.add('visible');
}

function onCloseModal() {
    document.querySelector('.read-modal').classList.remove('visible');
}

function renderBookRate(bookId) {
    const action = (getCurrLang() === 'en') ? 'Close' : 'סגור';
    const book = getBookById(bookId)
    var strHtml = '';
    strHtml += `
            <button class="rate" onclick="onSetRate('${book.id}', -1)">-</button>
            <span class="sum">${book.rate}</span>
            <button class="rate" onclick="onSetRate('${book.id}', 1)">+</button>
            <button data-trans="close-modal" class="close-btn rounded" onclick="onCloseModal()">${action}</button>`;
    const elModal = document.querySelector('.rate-book')
    elModal.innerHTML = strHtml;
}

function onSetRate(bookId, diff) {
    updateBookRate(bookId, diff);
    renderBookRate(bookId);
    renderBooks();
    doTrans();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    console.log(gBooks);
    renderBooks();
    doTrans();
}

function onChangePage(diff) {
    changePage(diff);
    renderBooks();
    doTrans();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}