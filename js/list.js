
list = document.querySelector("#list");
addItemButton = document.querySelector("#addItem");
listItemTextBox = document.querySelector("#listItem");
clearListButton = document.querySelector("#clearList");
let sumItem = document.querySelector("#sum");
console.log(sum)
let listItemArray = [];
/**
 * This method creates a list html element with a text node(The created text node has the value of the variable 'listItem').
 * This list element is then added to the unordered list and the array 'listItemArray'.
 * If this method is being called after listItems from local storage are loaded, 
 * it will add the text value of the list item to local storage.  
 * 
 * @param {Value from the text box} listItem 
 * @param {Is this method being called to load list items that exist in local storage?} loadingFromLocalStorage 
 */
const addListItem = function (listItem, loadingFromLocalStorage) {
    if (listItem.length = 0) {
        alert("You must type somehting to add it to the list")
        console.log(listItem)
    } else if (isNaN(listItem)) {
        alert("Ya must enter a valid number young jit")
    } else {
        row = document.createElement("div");
        row.classList.add("row");
        list.appendChild(row);

        li = document.createElement("li");
        li.classList.add("col-5")
        li.classList.add("col-sm-7")
        li.classList.add("list-group-item")
        li.appendChild(document.createTextNode(listItem));
        row.appendChild(li);
        listItemArray.push(row);
        addListItemButtons(row);

        if (!loadingFromLocalStorage) {
            addListItemToStorage(li.firstChild)
        }
        calculateSum();
   }

}

const addListItemButtons = function (row) {
    buttons = document.createElement("div");
    buttons.classList.add("col-7");
    buttons.classList.add("col-sm-5");
    buttons.classList.add("block");
    row.appendChild(buttons);

    deleteButton = document.createElement("input");
    deleteButton.type = "button"
    deleteButton.value = "Delete"
    buttons.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete the item\n\"" + row.firstChild.firstChild.textContent + "\"?") == true) {
            key = getStorageValueKey(row.firstChild.firstChild.textContent);
            listItemArray[key].remove();
            listItemArray.splice(key, 1);
            removeListItemFromStorage(key)
            calculateSum();
        }
    })

    editButton = document.createElement("input")
    editButton.type = "button"
    editButton.value = "Edit"
    buttons.appendChild(editButton)
    editButton.addEventListener("click", () => {
        changes = prompt("Enter the changes you would like to make to this item\n" + row.firstChild.firstChild.textContent, row.firstChild.firstChild.textContent.substring(2));
        if (changes != null && !isNaN(changes)) {
            key = getStorageValueKey(row.firstChild.firstChild.textContent);
            row.firstChild.firstChild.textContent = parseInt(changes);
            localStorage.setItem(key, changes)
            calculateSum();
        }
    })
}


const getListItemsAsString = function () {
    let message = "";
    for (let index = 0; index < listItemArray.length; index++) {
        message += (index + 1) + ")" + listItemArray[index].textContent + "\n";
    }
    return message;
}

const getListItemWithBullet = function () {
    let listItem = parseInt(document.querySelector("#listItem").value);
    return listItem;
}

const getStorageValueKey = function (textValue) {
    for (let index = 0; index < listItemArray.length; index++) {
        if (textValue == listItemArray[index].firstChild.firstChild.textContent) {
            return index;
        }
    }
    return null;
}

const changeListItemInStorage = function (text) {
    localStorage.getItem();
}
const addListItemToStorage = function (listItemTextNode) {
    try {
        localStorage.setItem(listItemArray.length - 1, listItemTextNode.textContent);
        if (listItemArray.length != null) {
            addListSizeToStorage()
        }
    }
    catch (error) {
        alert("Something went wrong. This entry will not be added to local storage");
    }
}

const removeListItemFromStorage = function (localStorageKey) {
    localStorage.removeItem(localStorageKey)

    addListSizeToStorage()

    for (let index = localStorageKey; index <= localStorage.getItem("size"); index++) {
        localStorage.setItem(index, localStorage.getItem(index + 1));
    }
}

const addListSizeToStorage = function () {
    localStorage.setItem("size", listItemArray.length - 1)
}

function calculateSum(){
    let sum = 0;
    if (localStorage.getItem("size") != null) {
        for (let index = 0; index <= localStorage.getItem("size"); index++) {
            if(!isNaN(parseInt(localStorage.getItem(index)))){
            sum += parseInt(localStorage.getItem(index));
            }
        }
    }
    sumItem.textContent = "Sum: " + sum; 
}

document.addEventListener("DOMContentLoaded", () => {
    sumItem.textContent = "Sum: 0"
    if (localStorage.getItem("size") != null) {
        for (let index = 0; index <= localStorage.getItem("size"); index++) {

            addListItem(localStorage.getItem(index), true);
        }
    }

    addItemButton.addEventListener("click", () => { addListItem(getListItemWithBullet(), false); listItem.value = ""; });
    listItemTextBox.addEventListener("keydown", () => { if (event.key == 'Enter') { addListItem(getListItemWithBullet(), false); listItem.value = ""; } })
    clearListButton.addEventListener("click", () => {
        if (window.confirm("This action will delete all list entries. Are you sure you want to continue?") == true) {
            localStorage.clear();
            for (let index = 0; index < listItemArray.length; index++) {
                listItemArray[index].remove();
            }
            listItemArray.splice(0);
            sumItem.textContent = "Sum : 0"
        }
    })
})

window.addEventListener("beforeunload", () => {

});


