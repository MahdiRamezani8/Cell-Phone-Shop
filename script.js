let $ = document

// MODAL :


let userBasket = $.getElementById('user-basket')
let openBasketBtn = $.getElementById('open-basket')

openBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "35px"
})

let closeBasketBtn = $.getElementById('close-basket');
closeBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "-1000px"
})


// ELEMENTS :
let productsInBasket = $.getElementById('products-in-basket')
let addButton = $.querySelectorAll('.fa-plus-square')
let removeButton = $.querySelectorAll('.fa-minus-square')
let productPrice = $.querySelectorAll('.product-price')
let productTitle = $.querySelectorAll('.product-title')
let productPic = $.querySelectorAll('.product-pic')
let name = null
let price = null


// ADD AND REMOVE :


// Add Products From Basket :
function addProduct(event) {
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

    newElemToBaketLi.append(newElemToBaketName, newElemToBaketPrice)
    productsInBasket.append(newElemToBaketLi)
}
 
// With Btn :
addButton.forEach((element) => {
    element.title = "add product"
    element.style.color = "green"
    element.addEventListener('click', (event) => {
        name = event.target.dataset.mobilename
        price = event.target.dataset.price
        addProduct()
    })
})

// By Drag And Drop
window.addEventListener('dragover', (event) => {
    event.preventDefault()
})

productPic.forEach(element => {
    element.addEventListener('dragstart', () => {
        name = event.target.dataset.mobilename
        price = event.target.dataset.price
    })
});

// Remove Products From Basket :
removeButton.forEach((element) => {
    element.title = "remove product"
    element.style.color = "red"
    element.addEventListener('click', () => {
        var removeProductArray = Array.from($.querySelectorAll('.product-item'))
        removeProductArray = removeProductArray.filter((element) => {
            return element.dataset.mobilename == event.target.dataset.mobilename
        })
        removeProductArray[removeProductArray.length - 1].remove()
    })
})