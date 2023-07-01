const $ = document;

// Database
const productsWarehouse = [{
        id: 1,
        name: 'Galaxy A10s',
        price: 4700000,
        imgAddress: 'Photos/a10s.svg',
        stock: 5,
    },
    {
        id: 2,
        name: 'Galaxy A20s',
        price: 5300000,
        imgAddress: 'Photos/a50s.svg',
        stock: 3,
    }, {
        id: 3,
        name: 'Galaxy A50s',
        price: 11900000,
        imgAddress: 'Photos/Galaxy-A20s.png',
        stock: 6,
    },
    {
        id: 4,
        name: 'Mate40 Pro',
        price: 26500000,
        imgAddress: 'Photos/HuaweiMate40Pro.png',
        stock: 4,
    },
    {
        id: 5,
        name: 'iPhone 14',
        price: 142700000,
        imgAddress: 'Photos/iPhone14.png',
        stock: 1,
    },
    {
        id: 6,
        name: 'x50 Pro',
        price: 19700000,
        imgAddress: 'Photos/K16UProplus.png',
        stock: 3,
    },
    {
        id: 7,
        name: 'K16U Proplus',
        price: 34800000,
        imgAddress: 'Photos/Nokiax50Pro.png',
        stock: 5,
    },
    {
        id: 8,
        name: 's21Ultra5G',
        price: 120000000,
        imgAddress: 'Photos/s21Ultra5G.avif',
        stock: 8,
    },
    {
        id: 9,
        name: 'iPhone13',
        price: 78300000,
        imgAddress: 'Photos/iPhone13.png',
        stock: 9,
    },
    {
        id: 10,
        name: 'iPhone6s',
        price: 34800000,
        imgAddress: 'Photos/iPhone6s.png',
        stock: 2,
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
addButton.forEach(element => element.addEventListener('click', event => handleProductStock(event.target.dataset.id)));
removeButton.forEach(element => element.addEventListener('click', removeProductFromBasket));
productPic.forEach(element => element.addEventListener('dragstart', handleDragStart));
openBasketBtn.addEventListener('drop', handleDrop);
window.addEventListener('dragover', event => event.preventDefault());

// Functions
function handleProductStock(productID) {
    const chosenProduct = productsWarehouse.find(product => product.id == productID);
    const theProductChosenToAdd = productsInUserBasket.find(product => product.id == chosenProduct.id);
    const index = productsInUserBasket.indexOf(theProductChosenToAdd)

    if (index == -1) {
        chosenProduct.stock--
        productsInUserBasket.push(chosenProduct)
        addProduct(chosenProduct)
    } else {
        if (productsInUserBasket[index].stock - 1 < 0) {
            notify('we are out of stock', 'red')
        } else {
            productsInUserBasket[index].stock--
            addProduct(chosenProduct)
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

    const productItemElemntInBasket = Array.from(basket.querySelectorAll('.fa-minus-square'));
    productItemElemntInBasket.forEach(element => element.addEventListener('click', removeProductFromBasketWithInnerBtn));

    productsCounter.innerHTML = Number(productsCounter.innerHTML) + 1

    notify('You added product to the basket', 'green');
    calculateTotalPrice();
}

function removeProductFromBasketWithInnerBtn() {
    this.parentElement.remove();
    const theProductChosenToRemove = productsInUserBasket.find(product => product.id == this.dataset.id);
    const index = productsInUserBasket.indexOf(theProductChosenToRemove)
    productsInUserBasket[index].stock++
    if (productsInUserBasket.length === 0) {
        closeModal(basket)
    }
    productsCounter.innerHTML = Number(productsCounter.innerHTML) - 1
    calculateTotalPrice()
}

function removeProductFromBasket() {
    if (productsInUserBasket.length === 0) {
        return;
    }
    const theProductChosenToRemove = productsInUserBasket.find(product => product.id == this.dataset.id);
    console.log(theProductChosenToRemove);
    if (theProductChosenToRemove == undefined) {
        console.log('a');
    }
    const productsAlreadyInBasket = productsInBasket.querySelector(`[data-id="${theProductChosenToRemove.id}"]`);
    productsCounter.innerHTML = Number(productsCounter.innerHTML) - 1
    const index = productsInUserBasket.indexOf(theProductChosenToRemove)
    productsInUserBasket[index].stock++
    productsAlreadyInBasket.remove();
    notify('You removed product from the basket', 'red');
    calculateTotalPrice();
}

function calculateTotalPrice() {
    const totalPrice = productsInUserBasket.reduce((total, product) => total + product.price, 0);
    totalPriceElement.innerHTML = totalPrice.toLocaleString('en-US');
}

function notify(message, color) {
    openModal(notification)
    notification.innerHTML = message;
    notification.style.backgroundColor = color;
    setTimeout(() => closeModal(notification), 1500);
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

const openModal = element => element.style.top = "35px"
const closeModal = element => element.style.top = "-1000px"