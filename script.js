let $ = document

// Elements :
let productsInBasket = $.getElementById('products-in-basket')
let addButton = $.querySelectorAll('.fa-plus-square')
let removeButton = $.querySelectorAll('.fa-minus-square')
let productPrice = $.querySelectorAll('.product-price')
let productTitle = $.querySelectorAll('.product-title')

// Add And Remove Products From Basket : 
addButton.forEach((element, i) => {
    element.title = "add product"
    element.style.color = "green"
    element.addEventListener('click', () => {
        let newElemToBaketLi = $.createElement('li')
        newElemToBaketLi.classList.add('product-item')
        newElemToBaketLi.dataset.mobilename = element.dataset.mobilename

        let newElemToBaketName = $.createElement('div')
        newElemToBaketName.classList.add('item')
        newElemToBaketName.innerHTML = element.dataset.mobilename

        let newElemToBaketPrice = $.createElement('div')
        newElemToBaketPrice.classList.add('item')
        newElemToBaketPrice.innerHTML = element.dataset.price
        newElemToBaketPrice.style.marginLeft = '200px'

        newElemToBaketLi.append(newElemToBaketName, newElemToBaketPrice)
        productsInBasket.append(newElemToBaketLi)
    })
})

removeButton.forEach((element, i) => {
    element.title = "remove product"
    element.style.color = "red"

    element.addEventListener('click', () => {
        var removeProductArray = Array.from($.querySelectorAll('.product-item'))
        removeProductArray = removeProductArray.filter((element) => {
            return element.dataset.mobilename == event.target.dataset.mobilename
        })
        console.log($.querySelector('.product-item'));
        removeProductArray[0].remove()

    })
})

// Modal :
let userBasket = $.getElementById('user-basket')
let openBasketBtn = $.getElementById('open-basket')
openBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "35px"
})

let closeBasketBtn = $.getElementById('close-basket');
closeBasketBtn.addEventListener('click', () => {
    userBasket.style.top = "-1000px"
})