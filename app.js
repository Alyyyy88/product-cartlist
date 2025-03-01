const productCard = document.querySelector(".products_con");
async function getProducts() {
  const url = "./data.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    // CREATING ELEMENTS DYNAMICALLY
    data.forEach((product) => {
      const productHTML = `
      <div class="product"> 
        <div class="img-con">
          <img src="${product.image.desktop}"  class="product_img">
        </div>
        <div class="product_desc__con">
          <h3 class="product__title">${product.category}</h3>
          <p class="product__desc">${product.name}</p>
          <span class="price">$${product.price}</span>
        </div>
         <!-- NON ACTIVE -->

        <div class="cart__btn_con">
          <img src="./assets/images/icon-add-to-cart.svg" alt="addtocart" class="cart_icon">
          <p class="text_btn">Add to cart</p>
        </div>
                <!-- ACTIVE STATE -->

                <div class="cart_quantity">
                  <div class="dec_con">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="minus" class="decrement q_btn">
                  </div>
                 <span class="quantity">1</span>
  
                 <div class="inc_con">
                   <img src="./assets/images/icon-increment-quantity.svg" alt="plus" class="increment q_btn">
                 </div>
                </div>   
         </div>`;
      productCard.insertAdjacentHTML("beforeend", productHTML);
    });

    document.addEventListener("click", (event) => {
      const clickedBtn = event.target.closest(".cart__btn_con");
      const cartEmpty = document.querySelector(".items_empty");
      const cartFill = document.querySelector(".non_emptyCART");
      const cartCtr = document.querySelector(".cart_ctr");

      const updateTotalPrice = ()=>{
        let total = 0;
        document.querySelectorAll(".cart_list").forEach((item)=>{
          const price = parseFloat(item.querySelector(".price_per_quantity").textContent.replace("$",""));
          total+=price;
        })
        

        if(total == 0){
        cartEmpty.classList.remove("noncative");
        cartFill.classList.remove("active");
        }else{
          document.querySelector(".total_order_price").textContent = `${total.toFixed(2)}`;
        }
        
      }

      let ctrList = 1; 
      // CART CHANGING TO QUANTITY
      if (clickedBtn) {
        const product = clickedBtn.closest(".product");
        const quantityBtn = product.querySelector(".cart_quantity");
        const product_img = product.querySelector(".product_img");
        
        clickedBtn.classList.add("nonactive");
        quantityBtn.classList.add("active");
        product_img.classList.add("selected");

        let ctr = 1;
        // GET PRODUCT DETAILS

        const productName = product.querySelector(".product__desc").textContent;
        const productPrice = parseFloat(product.querySelector(".price").textContent.replace("$",""));


        //CHANGE CART DYNAMICALLY
        cartEmpty.classList.add("noncative");
        cartFill.classList.add("active");

        //CREATE ITEM HTML
        const productAddedCart = `<div class="cart_list"  data-name="${productName}">
           <div class="cart_item__list">
             <p class="product_name">${productName}</p>
             <div class="product_item__desc_con">
               <div class="product_item_desc">
                 <p class="quantity_cart">${ctr}x</p>
                 <p class="solo_price">@$${productPrice}</p>
                 <p class="price_per_quantity">$ ${(productPrice * ctr).toFixed(2)}</p>
               </div>
               <div class="remove-con">
                 <img src="./assets/images/icon-remove-item.svg" alt="">
               </div>
             </div>
           </div> 
           <hr>
         </div>`;

         



         //ADD CART TO IT
         const orderCart = document.querySelector(".non_emptyCART");
         orderCart.insertAdjacentHTML("afterbegin",productAddedCart);

  

         // GET CART ITEMS

        const cartItem = orderCart.querySelector(`.cart_list[data-name="${productName}"]`);
        const cartQuantity = cartItem.querySelector(".quantity_cart");
        const cartTotalPrice = cartItem.querySelector(".price_per_quantity");
        cartCtr.textContent = Number(ctrList);


        //INC AND DEC BTN

        const inc_btn = product.querySelector(".inc_con");
        const dec_btn = product.querySelector(".dec_con");
        const quantity = product.querySelector(".quantity");

         // Increase Quantity
         inc_btn.addEventListener("click", () => {
          ctr++;
          quantity.textContent = ctr;
          cartQuantity.textContent = `${ctr}x`;
          cartTotalPrice.textContent = `$${(productPrice * ctr).toFixed(2)}`;
          updateTotalPrice();
          ctrList++;
        });

        // Decrease Quantity
        dec_btn.addEventListener("click", () => {
          if (ctr > 1) {
            ctr--;
            quantity.textContent = ctr;
            cartQuantity.textContent = `${ctr}x`;
            cartTotalPrice.textContent = `$${(productPrice * ctr).toFixed(2)}`;
            updateTotalPrice();
            ctrList++;
          }
        });

        const removeBtn = cartItem.querySelector(".remove-con");

        removeBtn.addEventListener("click",()=>{
          cartItem.remove();
          clickedBtn.classList.remove("nonactive"); // Restore "Add to Cart" button
          quantityBtn.classList.remove("active"); // Hide quantity selector
          product_img.classList.remove("selected");
          ctr = 1;
          quantity.textContent = ctr;
          updateTotalPrice();
        })

        
        updateTotalPrice();
      }

    
    });


 


    
  }
  // ERROR HANDLING
   catch (error) {
    console.log(error);
  }
}

getProducts();








        // // INC QUANTITY BTN
        // const inc_btn = product.querySelector(".inc_con");
        // const quantity = product.querySelector(".quantity");
        // inc_btn.addEventListener("click", () => {
        //   ctr++;
        //   quantity.textContent = ctr;
        // });

        // // DEC QUANTITY BTN
        // const dec_btn = product.querySelector(".dec_con");
        // dec_btn.addEventListener("click", () => {
        //   if (ctr <= 1) {
        //     dec_btn.disabled = true;
        //   } else {
        //     ctr--;
        //     dec_btn.disabled = false;
        //     quantity.textContent = ctr;
        //   }
        // });