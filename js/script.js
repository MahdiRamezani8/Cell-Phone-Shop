const $ = document;

// Database
const productsWarehouse = [{
        id: 1,
        name: 'Galaxy A10s',
        price: 4700000,
        imgAddress: 'Photos/a10s.svg',
        stock: 5,
        numberOfProduct: 0,
    },
    {
        id: 2,
        name: 'Galaxy A20s',
        price: 5300000,
        imgAddress: 'Photos/A50s.svg',
        stock: 3,
        numberOfProduct: 0,
    }, 
    {
        id: 3,
        name: 'Galaxy A50s',
        price: 11900000,
        imgAddress: 'Photos/A20s.png',
        stock: 6,
        numberOfProduct: 0,
    },
    {
        id: 4,
        name: 'Mate40 Pro',
        price: 26500000,
        imgAddress: 'Photos/HuaweiMate40Pro.png',
        stock: 4,
        numberOfProduct: 0,
    },
    {
        id: 5,
        name: 'iPhone 14',
        price: 142700000,
        imgAddress: 'Photos/iPhone14.png',
        stock: 1,
        numberOfProduct: 0,
    },
    {
        id: 6,
        name: 'x50 Pro',
        price: 19700000,
        imgAddress: 'Photos/K16UProplus.png',
        stock: 3,
        numberOfProduct: 0,
    },
    {
        id: 7,
        name: 'K16U Proplus',
        price: 34800000,
        imgAddress: 'Photos/Nokiax50Pro.png',
        stock: 5,
        numberOfProduct: 0,
    },
    {
        id: 8,
        name: 's21Ultra5G',
        price: 120000000,
        imgAddress: 'Photos/S21Ultra5G.avif',
        stock: 8,
        numberOfProduct: 0,
    },
    {
        id: 9,
        name: 'iPhone13',
        price: 78300000,
        imgAddress: 'Photos/iPhone13.png',
        stock: 9,
        numberOfProduct: 0,
    },
    {
        id: 10,
        name: 'iPhone6s',
        price: 34800000,
        imgAddress: 'Photos/iPhone6s.png',
        stock: 2,
        numberOfProduct: 0,
    },
];

const productsInUserBasket = [];

// Adding products from the warehouse to dom
const productsContainer = $.getElementById('main');
productsWarehouse.forEach(product => {
    const productMarkup = `
    <div class="product">
      <img class="product-pic" data-id="${product.id}" src="${product.imgAddress}">
      <h2 class="product-title">${product.name}</h2>
      <h1 class="product-price">${product.price.toLocaleString('en-US')}</h1>
      <hr class="hr" />
      <div class="product-icons">
        <i class="fa fa-plus-square" data-id="${product.id}"></i>
        <i class="fa fa-minus-square" data-id="${product.id}"></i>
      </div>
    </div>
  `;
    productsContainer.insertAdjacentHTML('beforeend', productMarkup);
});

// Elements
const addButton = $.querySelectorAll('.fa-plus-square');
const removeButton = $.querySelectorAll('.fa-minus-square');
const productPic = $.querySelectorAll('.product-pic');
const basket = $.getElementById('basket');
const productsInBasket = $.getElementById('products-in-basket');
const totalPriceElement = $.getElementById('total--price');
const productsCounter = $.getElementById('products-number');
const openBasketBtn = $.getElementById('open-basket');
const closeBasketBtn = $.getElementById('close-basket');
const notification = $.getElementById('notification');

// Event Listeners
openBasketBtn.addEventListener('click', () => openModal(basket));
closeBasketBtn.addEventListener('click', () => closeModal(basket));
productsContainer.addEventListener('click', event => {
    if (event.target.className == "fa fa-plus-square") {
        handleProductStock(event.target.dataset.id)
    }
    if (event.target.className == "fa fa-minus-square") {
        removeProductFromBasket()
    }
    if (event.target.className == "product-pic") {
        handleDragStart()
    }
})
openBasketBtn.addEventListener('drop', handleDrop);
window.addEventListener('dragover', event => event.preventDefault());
basket.addEventListener('click', event => {
    if (event.target.className == 'fa fa-minus-square') {
        removeProductFromBasketWithInnerBtn(event.target)
    }
})

// needs to operate
let chosenProductInWarehouse = null
let theProductChosenToOperate = null
let index = null

// Functions
function handleProductStock(productID) {
    needsToOperate(productID)
    if (index == -1) {
        productsInUserBasket.push({
            ...chosenProductInWarehouse
        })
        needsToOperate(productID)
        productsInUserBasket[index].stock--
        productsInUserBasket[index].numberOfProduct++
        addProduct(theProductChosenToOperate)
    } else {
        if (productsInUserBasket[index].stock - 1 < 0) {
            notify('we are out of stock', 'red')
        } else {
            productsInUserBasket[index].stock--
            productsInUserBasket[index].numberOfProduct++
            addProduct(theProductChosenToOperate)
        }
    }
}

function addProduct(chosenProduct) {
    const productMarkup = `
    <li class="product-item-in-basket" data-id="${chosenProduct.id}">
      <div class="item">${chosenProduct.name}</div>
      <div class="item">${chosenProduct.price.toLocaleString('en-US')}</div>
      <i class="fa fa-minus-square" data-id="${chosenProduct.id}"></i>
    </li>`;
    productsInBasket.insertAdjacentHTML('beforeend', productMarkup);
    increaseProductCounter()
    notify('You added product to the basket', 'green');
    calculateTotalPrice();
}

function removeProductFromBasketWithInnerBtn(target) {
    target.parentElement.remove();
    needsToOperate(target.dataset.id)
    if (productsInUserBasket[index].stock + 1 > chosenProductInWarehouse.stock) {
        productsInUserBasket.splice(index, 1)
    } else {
        productsInUserBasket[index].stock++
        productsInUserBasket[index].numberOfProduct--
    }
    decreaseProductCounter()
    calculateTotalPrice()
}

function removeProductFromBasket() {
    if (productsInUserBasket.length === 0) {
        return;
    }
    needsToOperate(this.dataset.id)
    if (!theProductChosenToOperate) {
        notify("you don't have this product in your basket")
        return
    }
    if (productsInUserBasket[index].stock + 1 > chosenProductInWarehouse.stock) {
        productsInUserBasket.splice(index, 1)
    } else {
        productsInUserBasket[index].stock++
        productsInUserBasket[index].numberOfProduct--
    }
    const productsAlreadyInBasket = productsInBasket.querySelector(`[data-id="${theProductChosenToOperate.id}"]`);
    productsAlreadyInBasket.remove();
    if (productsInUserBasket.length === 0) {
        closeModal(basket)
    }
    decreaseProductCounter();
    notify('You removed product from the basket', 'red');
    calculateTotalPrice();
}

function handleDragStart(event) {
    productsCounter.style.display = "none";
    openBasketBtn.classList.add('animate__animated', 'animate__tada');
    openBasketBtn.style.animationIterationCount = "infinite";
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDrop(event) {
    const draggedProductId = event.dataTransfer.getData('text/plain');
    handleProductStock(draggedProductId);
    productsCounter.style.display = "block";
    openBasketBtn.classList.remove('animate__animated', 'animate__tada');
}

function calculateTotalPrice() {
    let totalPrice = 0
    productsInUserBasket.forEach(product => totalPrice += product.numberOfProduct * product.price);
    console.log(totalPrice);
    totalPriceElement.innerHTML = totalPrice.toLocaleString('en-US');
}

function needsToOperate(productID) {
    chosenProductInWarehouse = productsWarehouse.find(product => product.id == productID);
    theProductChosenToOperate = productsInUserBasket.find(product => product.id == productID);
    index = productsInUserBasket.indexOf(theProductChosenToOperate)
}

const increaseProductCounter = () => productsCounter.innerHTML = Number(productsCounter.innerHTML) + 1
const decreaseProductCounter = () => productsCounter.innerHTML = Number(productsCounter.innerHTML) - 1

function notify(message, color) {
    openModal(notification)
    notification.innerHTML = message;
    notification.style.backgroundColor = color;
    setTimeout(() => closeModal(notification), 1500);
}

const openModal = element => element.style.top = "35px"
const closeModal = element => element.style.top = "-1000px"