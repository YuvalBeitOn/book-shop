'use strict'

const gTrans = {
    title: {
        en: 'Book Shop Management',
        he: 'הנהלת חנות ספרים'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    },
    'id': {
        en: 'Id',
        he: 'מספר סידורי'
    },
    'book-title': {
        en: 'Title - sort',
        he: 'שם הספר - מיין'
    },
    'price': {
        en: 'Price - sort',
        he: 'מחיר - מיין'
    },
    'rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'next-page': {
        en: 'Next-Page',
        he: 'עמוד הבא'
    },
    'prev-page': {
        en: 'Prev-Page',
        he: 'העמוד הקודם'
    },
    'copyrights': {
        en: 'CopyRights',
        he: 'זכויות יוצרים'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'update': {
        en: 'Update',
        he: 'עדכן מחיר'
    },
    'read': {
        en: 'Read',
        he: 'קרא עוד'
    },
    'close-modal': {
        en: 'Close',
        he: 'סגור'
    },

    'actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'new-price': {
        en: 'New-price',
        he: 'מחיר חדש'
    },
    'input-book-name': {
        en: 'Enter book name',
        he: 'הקלד שם ספר'
    },
    'input-book-price': {
        en: 'Enter book price',
        he: 'הקלד מחיר'
    },
    'home': {
        en: 'Home',
        he: 'בית'
    },
    'shop': {
        en: 'Shop',
        he: 'חנות'
    },
    'about': {
        en: 'About',
        he: 'עלינו'
    },
    'account': {
        en: 'My account',
        he: 'המשתמש שלי'
    },
    'search-book': {
        en: 'Search',
        he: 'חיפוש'
    },
    'search-placeholder': {
        en: 'Search in our store',
        he: 'חיפוש בחנות'
    }
}

var gCurrLang = 'en';

function getCurrLang() {
    return gCurrLang;
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN';
    const trans = transMap[gCurrLang]
    if (!trans) trans = transMap['en'];
    return trans;
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        const transKey = el.dataset.trans;
        if (el.placeholder) el.placeholder = getTrans(transKey)
        else el.innerText = getTrans(transKey)
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

// function formatNumOlder(num) {
//     return num.toLocaleString('es')
// }

// function formatNum(num) {
//     return new Intl.NumberFormat(gCurrLang).format(num);
// }

// function formatCurrency(num) {
//     return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
// }

// function formatDate(time) {

//     var options = {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//     };

//     return new Intl.DateTimeFormat(gCurrLang, options).format(time);
// }

// function kmToMiles(km) {
//     return km / 1.609;
// }