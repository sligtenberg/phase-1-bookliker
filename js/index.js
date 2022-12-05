document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    // buildUserDropdown();
});

const currentUser = {id: 11, username: 'yourself'}; // this is the current user
// eventually we should add functionality to allow switching between users, but for now, this is the placeholder

// this object will store all of the user objects
// let allUsersObj = getUserData();
// console.log(allUsersObj);

// thi function populates the allUsersObj from the database
// function getUserData () {
//     fetch('http://localhost:3000/users')
//     .then((res) => res.json())
//     .then((userList) => {
//         console.log(userList)
//         return userList});
// }

// let currentUser;


// buids the user dropdown
// function buildUserDropdown () {
//     const userDropdown = document.createElement('div');
//     userDropdown.innerHTML = `
//         <form id='current-user'>
//             <label for="current-user">Current User:</label>
//             <select id="change-user">
//             </select>
//         </form>
//     `
//     document.getElementById('list-panel').appendChild(userDropdown);
//     console.log(allUsersObj);
//     fetch('http://localhost:3000/users')
//     .then((res) => res.json())
//     .then((userList) => {
//         userList = allUsersObj;
//         currentUser = userList[0];
//         console.log(currentUser);
//         for (let user of userList) {
//             const option = document.createElement('option');
//             option.value = user.id;
//             option.textContent = user.username;
//             document.getElementById('change-user').appendChild(option);
//         }
//     })
//     document.getElementById('change-user').addEventListener('change', (event) => {
//         currentUser = event.target.value;
//         console.log(currentUser)
//     })
// }

// function to get the books and render them
function renderBooks () {
    fetch('http://localhost:3000/books')
    .then((res) => res.json())
    .then((allBooks) => {
        for (let book of allBooks) {
            const newBook = document.createElement('li');
            newBook.textContent = book.title;
            newBook.addEventListener('click', () => onBookClick(book))
            document.getElementById('list').appendChild(newBook);
        }
    })
}

// function that executes when a book title is clicked
function onBookClick (book) {
    const bookDisplay = document.getElementById('show-panel');
    bookDisplay.innerHTML = `
        <img src="${book.img_url}"/>
        <h2>${book.title}</h2>
        <h2>By ${book.author}</h2>
        <h2>${book.subtitle}</h2>
        <p>${book.description}</p>
        <button id='like-btn'>Like</button>
    `
    const likesListElement = document.createElement('ul');
    for (let user of book.users) {
        const newUser = document.createElement('li');
        newUser.textContent = user.username;
        likesListElement.appendChild(newUser);
    }
    bookDisplay.appendChild(likesListElement);
    bookDisplay.children[5].addEventListener('click', () => likeBook(book.id))
}

// function that adds user number 11 to the liked list
function likeBook (bookId) {
    fetch(`http://localhost:3000/books/${bookId}`)
    .then((res) => res.json())
    .then((bookObj) => {
        console.log(bookObj.users)
        for (let user of bookObj.users) {
            console.log(user);
            console.log(user.id);
            if (user.id === currentUser.id) {
                removeLike(currentUser, bookId);
                break;
            }
            else addLike(currentUser, bookId)
        }
        // console.log(bookObj.users);
        // console.log(bookObj.users.indexOf(user11));
    });
    // fetch(`http://localhost:3000/books/${bookId}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    // })
}