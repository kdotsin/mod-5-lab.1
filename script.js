const addBtn = document.getElementById('add-item');
const shoppingList = document.getElementById('shopping-list');
let inputName = document.getElementById('item-name');
let inputPrice = document.getElementById('item-price');
let totalPrice = document.getElementById('total-price');
let itemList = [];

addBtn.addEventListener('click', handleAddEvent)

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

function displayList() {
    shoppingList.innerHTML = '';
    for (let i = 0; i < itemList.length; i++) {
        let listedItem = document.createElement('li');
        listedItem.dataset.name = itemList[i].name;
        listedItem.dataset.price = itemList[i].price;
        listedItem.dataset.quantity = itemList[i].quantity;
        listedItem.innerText = `name: ${listedItem.dataset.name} price: ${listedItem.dataset.price} Quantity: ${listedItem.dataset.quantity}`
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