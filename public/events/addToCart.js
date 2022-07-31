
window.addEventListener("load", ()=>{
    let addToShoppCartButtons = document.querySelectorAll("#addToCart")
    let cartProductsContainer = document.querySelector(".cart_products-c")
    console.log(cartProductsContainer)

    addToShoppCartButtons.forEach((addToCartButton)=> {
        addToCartButton.addEventListener("click", addToCartClicked)
    })

    function addToCartClicked(event){
        let button = event.target
        let productItem = button.closest(".product_item")
        let itemTitle = productItem.querySelector(".product_item-main_article-name").textContent;
        let itemPrice =productItem.querySelector(".price").textContent;
        let itemImg = productItem.querySelector(".product_item-img").src
    addItemToShoppingCart(itemTitle, itemPrice, itemImg)
    }

    function addItemToShoppingCart(itemTitle, itemPrice, itemImg){
        let shoppingCartItem = document.createElement("div");
        let shoppingCartContent = `
        <div class="cart_products-container">
            <div class="products-container_images-description_row">
                <div class="cart_row-image-container">
                    <img src="${itemImg}">
                </div>
                <div class="cart_row-description-container">
                    <span class="cart_row-description-description">
                        ${itemTitle}
                    </span>
                </div>
            </div>
            <div class="products-container_quantity-price_row">
                <div class="cart_unit-product-price">
                    <p>Precio</p>
                    <span class="span-cart_unit-product-price">
                        ${itemPrice}
                    </span>
                </div>
                <div class="cart-row_price-container">
                    <p>Unidades</p>
                    <input type="number" id="units-quantity" name="units-quantity" min="1" max="10">
                </div>
                <div class="cart_subtotal-product-price">
                    <p>Subtotal</p>
                    <span class="span-cart_subtotal-product-price">
                        $ 1.234
                    </span>
                </div>
                <div class="cart_product-trash" id="cart_prodduct-trash">
                    <button class="cart_product-delete" value="submit"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>`;
    
    shoppingCartItem.innerHTML = shoppingCartContent
    console.log(shoppingCartItem)
    cartProductsContainer.append(shoppingCartItem)
    }
     
    
       
    
    })

    