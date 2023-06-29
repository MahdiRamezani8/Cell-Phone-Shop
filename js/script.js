const $ = document;

// Database
const productsInventory = [{
        id: 1,
        name: 'Galaxy A10s',
        price: 4700000,
        imgAddress: 'Photos/a10s.svg',
    },
    {
        id: 2,
        name: 'Galaxy A20s',
        price: 5300000,
        imgAddress: 'Photos/a50s.svg',
    }, {
        id: 3,
        name: 'Galaxy A50s',
        price: 11900000,
        imgAddress: 'Photos/Galaxy-A20s.png',
    },
    {
        id: 4,
        name: 'Mate40 Pro',
        price: 26500000,
        imgAddress: 'Photos/HuaweiMate40Pro.png',
    },
    {
        id: 5,
        name: 'iPhone 14',
        price: 142700000,
        imgAddress: 'Photos/iPhone14.png',
    },
    {
        id: 6,
        name: 'x50 Pro',
        price: 19700000,
        imgAddress: 'Photos/K16UProplus.png',
    },
    {
        id: 7,
        name: 'K16U Proplus',
        price: 34800000,
        imgAddress: 'Photos/Nokiax50Pro.png',
    },
    {
        id: 8,
        name: 's21Ultra5G',
        price: 120000000,
        imgAddress: 'Photos/s21Ultra5G.avif',
    },
    {
        id: 9,
        name: 'iPhone13',
        price: 78300000,
        imgAddress: 'Photos/iPhone13.png',
    },
    {
        id:10,
        name: 'iPhone6s',
        price: 34800000,
        imgAddress: 'Photos/iPhone6s.png',
    },
];
const productsInUserBasket = [];

// Adding products from the inventory to dom
const productsContainer = $.getElementById('main');
productsInventory.forEach(product => {
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
const userBasket = $.getElementById('basket');
const productsInBasket = $.getElementById('products-in-basket');
const totalPriceElement = $.getElementById('total--price');
const productsCounter = $.getElementById('products-number');
const openBasketBtn = $.getElementById('open-basket');
const closeBasketBtn = $.getElementById('close-basket');
const notification = $.getElementById('notification');

// Event Listeners
openBasketBtn.addEventListener('click', () => userBasket.style.top = "35px");
closeBasketBtn.addEventListener('click', () => userBasket.style.top = "-1000px");
addButton.forEach(element => element.addEventListener('click', addProduct));
removeButton.forEach(element => element.addEventListener('click', removeProductFromBasket));
productPic.forEach(element => element.addEventListener('dragstart', handleDragStart));
openBasketBtn.addEventListener('drop', handleDrop);
window.addEventListener('dragover', event => event.preventDefault());

// Functions
function addProduct() {
    const chosenProduct = productsInventory.find(product => product.id == this.dataset.id);
    const productMarkup = `
    <li class="product-item-in-basket" data-id="${this.dataset.id}">
      <div class="item">${chosenProduct.name}</div>
      <div class="item">${chosenProduct.price.toLocaleString('en-US')}</div>
      <i class="fa fa-minus-square"${chosenProduct.id}></i>
    </li>`;
    productsInBasket.insertAdjacentHTML('beforeend', productMarkup);
    const productItemElemntInBasket = Array.from($.querySelectorAll('.product-item-in-basket'));
    productItemElemntInBasket.forEach(element => element.addEventListener('click', event => removeProductFromBasketWithInnerBtn(event)))
    productsInUserBasket.push(chosenProduct);
    productsCounter.innerHTML = productsInUserBasket.length;
    notify('You added product to the basket', 'green');
    calculateTotalPrice();
}

function removeProductFromBasketWithInnerBtn(event) {
    event.target.parentElement.remove();
    const theProductChosenToRemove = productsInUserBasket.find(product => product.id == event.target.dataset.id);
    const index = productsInUserBasket.indexOf(theProductChosenToRemove)
    productsInUserBasket.splice(index, 1)
    calculateTotalPrice()
}

function removeProductFromBasket(event) {
    if (productsInUserBasket.length === 0) {
        return;
    }
    const theProductChosenToRemove = productsInUserBasket.find(product => product.id == event.target.dataset.id);
    if (!theProductChosenToRemove) {
        return;
    }
    const productsAlreadyInBasket = productsInBasket.querySelector(`[data-id="${theProductChosenToRemove.id}"]`);
    productsCounter.innerHTML = productsInUserBasket.length - 1;
    const index = productsInUserBasket.indexOf(theProductChosenToRemove)
    productsInUserBasket.splice(index, 1)
    productsAlreadyInBasket.remove();
    notify('You removed product from the basket', 'red');
    calculateTotalPrice();
}

function calculateTotalPrice() {
    const totalPrice = productsInUserBasket.reduce((total, product) => total + product.price, 0);
    totalPriceElement.innerHTML = totalPrice.toLocaleString('en-US');
}

function notify(message, color) {
    notification.style.top = "35px";
    notification.innerHTML = message;
    notification.style.backgroundColor = color;
    setTimeout(() => notification.style.top = "-1000px", 1500);
}

function handleDragStart(event) {
    productsCounter.style.display = "none";
    openBasketBtn.classList.add('animate__animated', 'animate__tada');
    openBasketBtn.style.animationIterationCount = "infinite";
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDrop(event) {
    const draggedProductId = event.dataTransfer.getData('text/plain');
    addProduct.call({
        dataset: {
            id: draggedProductId
        }
    });
    productsCounter.style.display = "block";
    openBasketBtn.classList.remove('animate__animated', 'animate__tada');
}