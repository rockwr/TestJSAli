window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'),
    totalCost = document.querySelector('.cart__total > span'), //внутри этого блока я хочу найти спан
    titles = document.querySelectorAll('.goods__title');


function openCart(){   
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';    //открытие корзины
}

function closeCart(){
    cart.style.display = 'none';
    document.body.style.overflow = '';   //закрытие корзины
}

open.addEventListener('click', openCart);  //вешаем событие - на этот элемент навешивается событие, причем эта команла более мощная, чем 'onclick'
    //2 аргумента; 1ое - событие, 2ое - используемая функция
close.addEventListener('click', closeCart);

goodsBtn.forEach(function(btn, i){    //цикл для всех кнопок, что с ними сделать
    btn.addEventListener('click', () => {
        let item = products[i].cloneNode(true),//клонировать элемент()все, чт есть внутри карточки
            trigger = item.querySelector('button'),
            removeBtn = document.createElement('div'),
            empty = cartWrapper.querySelector('.empty');

            trigger.remove();

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';          //заменяет крестик (который для удаленя товара)
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if (empty) {
                empty.remove();
            }
    });
});
})
