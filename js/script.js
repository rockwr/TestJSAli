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

                trigger.remove();  //убираем надпись "добавить в корзину"

                showConfirm();
                calcGoods(1);

                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times';          //заменяет крестик (который для удаленя товара)
                item.appendChild(removeBtn);

                cartWrapper.appendChild(item);
                if (empty) {
                    empty.style.display = 'none';
                }
                //когда карточки товара поместились в корзину, вызываем калкТотал
                calcTotal();
                removeFromCart();
        });
    });


    function sliceTitle() {
        titles.forEach(function(item){
            if (item.textContent.length < 70){
                return;
            } else{
                const str = item.textContent.slice(0, 71) + '...';
                //const str = `${item.textContent.slice(0, 71)}...`;
                item.textContent = str;
            }
        });
    }
    sliceTitle();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;    
        const id = setInterval(frame, 10);
        function frame() {     //ф-ия задающая аимацию
            if ( counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;    //аналогично counter-=1
                confirm.style.transform = `translateY(-${counter}px)`;  //наш блок будет сдвигаться вверх(ставим - перед$), px пиксели
                confirm.style.opacity = '.' + counter;               //анимация исчезания (прозрачность)
            }
            
        }
    }

    function calcGoods(i) {      //посчитать кол-во товаров в корзине
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length + i;   //помещать кол-во товаров 
    }

    function calcTotal() {    //общая сумма в корзине
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach(function(item) {
            total += +item.textContent;     // +item.textContent    "+" превращает в int строку
        });
        totalCost.textContent = total;
        empty = cartWrapper.querySelector('.empty');
        if (total == 0) {
            empty.style.display = 'block'
        }
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); //при клике будет удаляться весь родительский блок
                calcGoods(0);
                calcTotal();
            });
        });
    }
});
