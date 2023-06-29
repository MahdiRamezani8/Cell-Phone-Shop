// const $ = document;

// // Database
// const productsInventory = [{
//         id: 1,
//         name: 'Galaxy A10s',
//         price: 4700000,
//         imgAddress: 'Photos/a10s.svg',
//     },
//     {
//         id: 2,
//         name: 'Galaxy A20s',
//         price: 5300000,
//         imgAddress: 'Photos/a50s.svg',
//     }, {
//         id: 3,
//         name: 'Galaxy A50s',
//         price: 11900000,
//         imgAddress: 'Photos/Galaxy-A20s.png',
//     },
//     {
//         id: 4,
//         name: 'Mate40 Pro',
//         price: 26500000,
//         imgAddress: 'Photos/HuaweiMate40Pro.png',
//     },
//     {
//         id: 5,
//         name: 'iPhone 14',
//         price: 142700000,
//         imgAddress: 'Photos/iPhone14.png',
//     },
//     {
//         id: 6,
//         name: 'x50 Pro',
//         price: 19700000,
//         imgAddress: 'Photos/K16UProplus.png',
//     },
//     {
//         id: 7,
//         name: 'K16U Proplus',
//         price: 34800000,
//         imgAddress: 'Photos/Nokiax50Pro.png',
//     },
// ];
// const productsInUserBasket = [];

// // Adding products from the inventory to dom
// const productsContainer = $.getElementById('main');
// productsInventory.forEach(product => {
//     const productMarkup = `
//     <div class="product">
//       <img class="product-pic" data-id="${product.id}" src="${product.imgAddress}">
//       <h2 class="product-title">${product.name}</h2>
//       <h1 class="product-price">${product.price}</h1>
//       <hr class="hr" />
//       <div class="product-icons">
//         <i class="fa fa-plus-square" data-id="${product.id}"></i>
//         <i class="fa fa-minus-square" data-id="${product.id}"></i>
//       </div>
//     </div>
//   `;
//     productsContainer.insertAdjacentHTML('beforeend', productMarkup);
// });

// // Elements
// const addButton = $.querySelectorAll('.fa-plus-square');
// const removeButton = $.querySelectorAll('.fa-minus-square');
// const productPic = $.querySelectorAll('.product-pic');
// const userBasket = $.getElementById('basket');
// const productsInBasket = $.getElementById('products-in-basket');
// const totalPriceElement = $.getElementById('total--price');
// const productsCounter = $.getElementById('products-number');
// const openBasketBtn = $.getElementById('open-basket');
// const closeBasketBtn = $.getElementById('close-basket');
// const notification = $.getElementById('notification');

// // Event Listeners
// openBasketBtn.addEventListener('click', () => userBasket.style.top = "35px");
// closeBasketBtn.addEventListener('click', () => userBasket.style.top = "-1000px");
// addButton.forEach(element => element.addEventListener('click', addProduct));
// removeButton.forEach(element => element.addEventListener('click', removeProductFromBasket));
// productPic.forEach(element => element.addEventListener('dragstart', handleDragStart));
// openBasketBtn.addEventListener('drop', handleDrop);
// window.addEventListener('dragover', event => event.preventDefault());

// // Functions
// function addProduct() {
//     const chosenProduct = productsInventory.find(product => product.id == this.dataset.id);
//     const productMarkup = `
//     <li class="product-item" data-id="${this.dataset.id}">
//       <div class="item">${chosenProduct.name}</div>
//       <div class="item" style="margin-left: 200px;">${chosenProduct.price}</div>
//     </li>`;
//     productsInBasket.insertAdjacentHTML('beforeend', productMarkup);
//     productsInUserBasket.push(chosenProduct);
//     productsCounter.innerHTML = productsInUserBasket.length;
//     notify('You added product to the basket', '#055f05');
//     calculateTotalPrice();
// }

// function removeProductFromBasket(event) {
//     if (productsInUserBasket.length === 0) {
//         return;
//     }
//     const theProductChosenToRemove = productsInUserBasket.find(product => product.id == event.target.dataset.id);
//     if (!theProductChosenToRemove) {
//         return;
//     }
//     const productsAlreadyInBasket = productsInBasket.querySelector(`[data-id="${theProductChosenToRemove.id}"]`);
//     productsCounter.innerHTML = --productsInUserBasket.length;
//     productsAlreadyInBasket.remove();
//     notify('You removed product from the basket', '#9e0505');
//     calculateTotalPrice();
// }

// function calculateTotalPrice() {
//     const totalPrice = productsInUserBasket.reduce((total, product) => total + product.price, 0);
//     totalPriceElement.innerHTML = totalPrice;
// }

// function notify(message, color) {
//     notification.style.top = "35px";
//     notification.innerHTML = message;
//     notification.style.backgroundColor = color;
//     setTimeout(() => notification.style.top = "-1000px", 1500);
// }

// function handleDragStart(event) {
//     productsCounter.style.display = "none";
//     openBasketBtn.classList.add('animate__animated', 'animate__tada');
//     openBasketBtn.style.animationIterationCount = "infinite";
//     event.dataTransfer.setData('text/plain', event.target.dataset.id);
// }

// function handleDrop(event) {
//     const draggedProductId = event.dataTransfer.getData('text/plain');
//     addProduct.call({
//         dataset: {
//             id: draggedProductId
//         }
//     });
//     productsCounter.style.display = "block";
//     openBasketBtn.classList.remove('animate__animated', 'animate__tada');
// }