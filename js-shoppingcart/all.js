(function() {
    let cartInfo = document.querySelector('#cart-info');
    let cart = document.querySelector('#cart');

    cartInfo.addEventListener('click', function() {
        cart.classList.toggle('show-cart');
    });
})();

(function() {
    let cartBtn = document.querySelector('.store-item-icon');

    cartBtn.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            if (event.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath = event.target.parentElement.previosElementSibling.src;
                let pos = fullPath.indexOf('img');
                let partPath = fullPath.slice(pos);

                const item = {};
                item.img = `img-cart${pathPath}`;

                let name =
                    event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;

                let price =
                    event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
                cartItem.innerHTML = `
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">
                            ${item.name}
                        </p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price mb-0">
                            ${item.price}
                        </span> 
                    </div>
                    <a href="#" id="cart-item-remove" class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </a>
                </div>
                `;
                const cart = document.querySelector('#cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                showTotals();
            }
        });
    });

    function showTotals() {
        const total = [];
        const items = document.querySelector('.cart-item-price');

        items.forEach(function(item) {
            total.push(parseFloat(item.textContent));
        });
        console.log(total);

        const totalMoney = total.reduce(function(total, item) {
            total += item;
            return total;
        }, 0);

        const finalMoney = totalMoney.toFixed(2);
        document.querySelector('#cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.querySelector('#item-count').textContent = total.length;
    }
})();