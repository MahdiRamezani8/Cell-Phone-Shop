let $ = document

const productsInventory = [
    {id: 1, name: 'Galaxy A10s', price: 470000,imgAddress: 'Photos/a10s.svg',},
    {id: 2, name: 'Galaxy A20s', price: 5300000,imgAddress: 'Photos/a50s.svg',},
    {id: 3, name: 'Galaxy A50s', price: 11900000,imgAddress: 'Photos/Galaxy-A20s.png',},
    {id: 4, name: 'Mate40 Pro', price: 26500000,imgAddress: 'Photos/HuaweiMate40Pro.png',},
    {id: 5, name: 'iPhone 14', price: 142700000,imgAddress: 'Photos/iPhone14.png',},
    {id: 6, name: 'x50 Pro', price: 19700000,imgAddress: 'Photos/K16UProplus.png',},
    {id: 7, name: 'K16U Proplus', price: 34800000,imgAddress: 'Photos/Nokiax50Pro.png',},
]

const productsContainer = $.getElementById('main')
productsInventory.forEach(product => {
    productsContainer.insertAdjacentHTML('beforeend', '<div class="product"> <img class="product-pic" src="' + product.imgAddress + '"> <h2 class="product-title">' + product.name + '</h2> <h1 class="product-price">' + product.price + '</h1><hr class="hr" /> <div class="product-icons"> <i class="fa fa-plus-square"></i> <i class="fa fa-minus-square" ></i> </div> </div>')
})
// MODALS :

// Basket :
let userBasket = $.getElementById('basket')
let productsInBasket = $.getElementById('products-in-basket')
let openBasketBtn = $.getElementById('open-basket')
let productsNumber = $.getElementById('products-number')
let totalPrice = $.getElementById('total--price')
let sum = 0

const removeSpaces = str => str.replace(/\s/g, '')
openBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "35px"
})

let closeBasketBtn = $.getElementById('close-basket');
closeBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "-1000px"
})

function calculateTheTotalPriceFunc() {
    totalPrice.innerHTML = 0 
    let calculateTheTotalPrice = Array.from(productsInBasket.children)
    calculateTheTotalPrice.forEach(element => {
        sum = Number(removeSpaces(element.children[1].innerHTML))
        totalPrice.innerHTML = +totalPrice.innerHTML + sum
        sum = 0
    })
}

// Notification :
let notification = $.getElementById('notification')
function notificationFunc(event) {
    notification.style.top = "35px"
    if (event.target.style.color == "red") {
        notification.innerHTML = "you removed product from basket"
        notification.style.backgroundColor = "#9e0505"
    } else {
        notification.innerHTML = "you added product to basket"
        notification.style.backgroundColor = "#055f05"
    }

    setTimeout(() => {
        notification.style.top = "-1000px"
    }, 1500);
}


// ELEMENTS :
let addButton = $.querySelectorAll('.fa-plus-square')
let removeButton = $.querySelectorAll('.fa-minus-square')
let productPrice = $.querySelectorAll('.product-price')
let productTitle = $.querySelectorAll('.product-title')
let productPic = $.querySelectorAll('.product-pic')
let name = null
let price = null

// ADD AND REMOVE :

// Add Products To Basket :
function addProduct(event) {
    productsNumber.innerHTML = +productsNumber.innerHTML + 1

    let newElemToBaketLi = $.createElement('li')
    newElemToBaketLi.classList.add('product-item')
    newElemToBaketLi.dataset.mobilename = name

    let newElemToBaketName = $.createElement('div')
    newElemToBaketName.classList.add('item')
    newElemToBaketName.innerHTML = name

    let newElemToBaketPrice = $.createElement('div')
    newElemToBaketPrice.classList.add('item')
    newElemToBaketPrice.innerHTML = price
    newElemToBaketPrice.style.marginLeft = '200px'
    notificationFunc(event)
    newElemToBaketLi.append(newElemToBaketName, newElemToBaketPrice)
    productsInBasket.append(newElemToBaketLi)
    calculateTheTotalPriceFunc()
}

// With Btn :
addButton.forEach((element) => {
    element.title = "add product"
    element.style.color = "green"
    element.addEventListener('click', (event) => {
        name = event.target.dataset.mobilename
        price = event.target.dataset.price
        addProduct(event)
    })
})

// By Drag And Drop :
window.addEventListener('dragover', (event) => {
    event.preventDefault()
})

productPic.forEach(element => {
    element.addEventListener('dragstart', () => {
        productsNumber.style.display = "none"
        openBasketBtn.classList.add('animate__animated')
        openBasketBtn.classList.add('animate__tada')
        openBasketBtn.style.animationIterationCount = "infinite"

        name = event.target.dataset.mobilename
        price = event.target.dataset.price
    })
})

openBasketBtn.addEventListener('drop', (event) => {
    addProduct(event)
    productsNumber.style.display = "block"
    openBasketBtn.classList.remove('animate__animated')
    openBasketBtn.classList.remove('animate__tada')
})

// Remove Products From Basket :
removeButton.forEach((element) => {
    element.title = "remove product"
    element.style.color = "red"
    element.addEventListener('click', (event) => {
        if (+productsNumber.innerHTML == 0) {
            return
        } else {
            var removeProductArray = Array.from($.querySelectorAll('.product-item'))
            removeProductArray = removeProductArray.filter((element) => {
                return element.dataset.mobilename == event.target.dataset.mobilename
            })
            if (removeProductArray.length == 0) {
                return
            } else {
                productsNumber.innerHTML = +productsNumber.innerHTML - 1
                removeProductArray[removeProductArray.length - 1].remove()
                notificationFunc(event)
                calculateTheTotalPriceFunc()
            }
        }
    })
})