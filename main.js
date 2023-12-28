/*
**************************
Declaring Global variables 
**************************
 */
const add_button = document.querySelector('.btn');
const list = document.querySelector('ul')
const filter_items = document.querySelector('.filter')
const clear_button = document.querySelector('.btn-clear')


/*
**************************
Adding input items to list
**************************
*/

function addItem(e) {
    let input_item = document.querySelector('#item-input').value.trim();
    e.preventDefault();

    // Check for input value if empty
    if (input_item === '') {
        alert('Please enter a value');
    } else {
        // Check for duplicate item
        if (isDuplicate(input_item)) {
            alert('Item already exists');
        } else {
            // If not a duplicate add to DOM
            addtoDom(input_item);
            addToStorage(input_item);
            checkitem();
        }
    }
    console.log(input_item);
}

// Function to check for duplicate item
function isDuplicate(item) {
    const itemsFromStorage = getItemfromStorage();
    return itemsFromStorage.includes(item);
}

/*
***************************
Display items into App
***************************
*/
function displayItems() {
    const itemsFromStorage = getItemfromStorage();
    itemsFromStorage.forEach(item => addtoDom(item))
}
function addtoDom(item) {
    const li = document.createElement('li')
    li.innerHTML = `${item}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>`
    const ul = document.querySelector('ul')
    ul.appendChild(li)
}
/*
******************************
Fetch Items from local Storage
******************************
*/
function getItemfromStorage() {
    let getStorageVal;
    if (localStorage.getItem('items') === null) {
        getStorageVal = [];
    }
    else {
        getStorageVal = JSON.parse(localStorage.getItem('items'));
    }
    return getStorageVal
}

/*
***********************************
Transfer the input to Local storage
***********************************
*/

function addToStorage(item) {
    let localStorageVal = getItemfromStorage()

    localStorageVal.push(item)
    localStorage.setItem('items', JSON.stringify(localStorageVal));

}

/*
**********************************
Remove List Items from app display
**********************************
*/
function removeItem(e) {
    if (e.target.classList.contains('fa-xmark')) {
        if (confirm('Are you sure you want to delete this')) {
            e.target.parentElement.parentElement.remove()
        }
    }
    checkitem()
    removeFromStorage(e.target.parentElement.parentElement.textContent)//passing text value of li tag that is removed

}
/*
**********************************
Remove List Items from local Storage
**********************************
*/
function removeFromStorage(item) {
    let itemsFromStored = getItemfromStorage();
    itemsFromStored = itemsFromStored.filter((i) => i !== item.trim()) // always use trim with string to remove spaces
    console.log(itemsFromStored)
    localStorage.setItem('items', JSON.stringify(itemsFromStored))
}
/*

******************************
Clear All Items from display
******************************
*/
function clearAll(e) {
    if (confirm('Are you sure you want to delete all Items')) {
        const list = document.querySelectorAll('li')
        list.forEach((items) => items.remove())
    }
    checkitem()
    localStorage.setItem('items', JSON.stringify([]))

}

/* 
**************************************
Filter Items when user inputs in filter
**************************************
*/
function filterItems(e) {
    const filterWord = e.target.value.toLowerCase();// get input convert to lowercase
    const items = document.querySelectorAll('li'); //Get all li tags
    items.forEach((item) => {                     //loop through li tags
        const itemText = item.innerText.toLowerCase();// get the inner text content of li in loop
        if (itemText.includes(filterWord)) {          //check each iteration if it matches input text using includes
            item.style.display = 'flex';                //if that matches diplay it 
        } else {
            item.style.display = 'none';                //if not dont display it
        }
    });
}

/* 
**********************************
Hide button and Filter if no item
**********************************
*/
function checkitem() {
    const list = document.querySelectorAll('li')
    const filter = document.getElementById('filter')
    if (list.length === 0) {
        clear_button.style.display = 'none'
        filter.style.display = 'none'
    }
    else {
        clear_button.style.display = 'block'
        filter.style.display = 'block'
    }
}

/*
***************
Event Listners
***************
*/
add_button.addEventListener('click', addItem) //Event listener to add list items
list.addEventListener('click', removeItem)// Event listener to remove list items
clear_button.addEventListener('click', clearAll)//Clear item list from app
filter_items.addEventListener('input', filterItems)//if user input to search item from filter
document.addEventListener('DOMContentLoaded', displayItems)// When page is loaded run the displayItems function