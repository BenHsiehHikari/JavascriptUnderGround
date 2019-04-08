document.querySelector('#myForm').addEventListener('submit', saveBookmark);


function saveBookmark(e) {

    let siteName = document.querySelector('#siteName').value;
    let siteUrl = document.querySelector('#siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }


    if (localStorage.getItem('bookmarks') === null) {

        let bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {

        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();

    fetchBookmarks();

    e.preventDefault();
}


function deleteBookmark(url) {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {

            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


    fetchBookmarks();
}


function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarkResults = document.querySelector('#bookmarksResults');

    bookmarkResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarkResults.innerHTML += `
            <div class="well">
                <h3>${name}</h3>
                <a class="btn btn-default" target="_blank" href="${addhttp(url)}">
                    瀏覽
                </a>
                <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">
                    刪除
                </a>
            </div>
        `;
    }
}

// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('無效網址');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}