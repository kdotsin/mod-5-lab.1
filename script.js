const addBtn = document.getElementById('add-item');
const rmAllBtn = document.getElementById('remove-all-btn');
const shoppingList = document.getElementById('shopping-list');
let inputName = document.getElementById('item-name');
let inputPrice = document.getElementById('item-price');
let totalPrice = document.getElementById('total-price');
let itemList = [];

addBtn.addEventListener('click', handleAddEvent)
rmAllBtn.addEventListener('click', handleRmEvent)
shoppingList.addEventListener('click', handleQuantity)

function handleAddEvent(event) {
    if (!inputName.value && !inputPrice.value) {
        alert('add inputs!');
    } else {
        let shoppingItem = {
            name: inputName.value,
            price: inputPrice.value,
            quantity: 1,
        }
        console.log(event)
        console.dir(totalPrice)
        addItem(shoppingItem);
        displayList();
        inputName.value = '';
        inputPrice.value = '';
    }
}

function handleRmEvent(event) {
    itemList = [];
    displayList();
    inputName.value = '';
    inputPrice.value = '';
}

function handleQuantity(event) {
    if (event.target.id == 'add-quantity') {
        searchItem(event.target.parentElement.dataset.name).quantity++
        displayList();
    } else if (event.target.id == 'sub-quantity') {
        if (event.target.parentElement.dataset.quantity <= 1) {
            alert('Cannot go below 1');
        } else {
            searchItem(event.target.parentElement.dataset.name).quantity--
            displayList();
        }
    }
}

function displayList() {
    shoppingList.innerHTML = '';
    for (let i = 0; i < itemList.length; i++) {
        let listedItem = document.createElement('li');
        let quantityItem = document.createElement('span');
        let addQuantity = document.createElement('span');
        let subQuantity = document.createElement('span');
        listedItem.dataset.name = itemList[i].name;
        listedItem.dataset.price = itemList[i].price;
        listedItem.dataset.quantity = itemList[i].quantity;
        listedItem.className = 'flex item-center gap-5'
        quantityItem.textContent = `${listedItem.dataset.quantity}`;
        quantityItem.id = 'item-quantity';
        addQuantity.textContent = '+';
        addQuantity.id = 'add-quantity';
        addQuantity.className = 'text-xl w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
        subQuantity.textContent = '-';
        subQuantity.id = 'sub-quantity';
        subQuantity.className = 'text-xl w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
        listedItem.innerText = `name: ${listedItem.dataset.name} price: $${listedItem.dataset.price} quantity: `;
        listedItem.append(addQuantity);
        listedItem.append(quantityItem);
        listedItem.append(subQuantity);
        shoppingList.append(listedItem);
    }
    totalPrice.innerText = `${calculateCart(itemList)}`
}

function addItem(item) {
    for (let i = 0; i < itemList.length; i++) {
        if (item.name == itemList[i].name) {
            return;
        }
    }
    itemList.push(item);
}

function calculateCart(list) {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        let itemsTotal = Number(list[i].price);
        if (list[i].quantity > 1) {
            itemsTotal = itemsTotal * Number(list[i].quantity)
        }
        total+=itemsTotal;
    }
    return total;
}

function searchItem(itemName) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemName == itemList[i].name) {
            return itemList[i];
        }
    }
}