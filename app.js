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
      const container = document.querySelector(".container");
      const cartContainer = document.querySelector(".cart_con");
      const cartConfirmedCon = document.querySelector(".order_confirmed_con");
      const cartConfirmationList = document.querySelector(".cart__confirmed_list");
      const updateTotalPrice = () => {
        let total = 0;
        let totalQuantity = 0;
        document.querySelectorAll(".cart_list").forEach((item) => {
          const price = parseFloat(item.querySelector(".price_per_quantity").textContent.replace("$", ""));
          const quantity = parseInt(item.querySelector(".quantity_cart").textContent); 
          total += price;
          totalQuantity += quantity;
        });
      
        document.querySelector(".total_order_price").textContent = `$${total.toFixed(2)}`;
        document.querySelector(".cart_ctr").textContent = totalQuantity;
      
        // Hide cart if empty
        if (totalQuantity === 0) {
          document.querySelector(".items_empty").classList.remove("noncative");
          document.querySelector(".non_emptyCART").classList.remove("active");
        }
      };

      // CART CHANGING TO QUANTITY
      if (clickedBtn) {
        const product = clickedBtn.closest(".product");
        const quantityBtn = product.querySelector(".cart_quantity");
        const product_img = product.querySelector(".product_img");
        const orderBtn  = document.querySelector(".order_btn");

        orderBtn.addEventListener("click",()=>{
          container.classList.add("blur");
          cartContainer.classList.add("blur");
          cartConfirmedCon.classList.add("active");
          
        })
        
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
        });

        // Decrease Quantity
        dec_btn.addEventListener("click", () => {
          if (ctr > 1) {
            ctr--;
            quantity.textContent = ctr;
            cartQuantity.textContent = `${ctr}x`;
            cartTotalPrice.textContent = `$${(productPrice * ctr).toFixed(2)}`;
            updateTotalPrice();
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






// <div class="cart__confirmed_item">
//         <div class="item__content">
//           <img src="./assets/images/image-cake-desktop.jpg">
//           <div class="item__content_desc">
//             <div class="item__content_name">
//               <p>
//                 classic Tiramisu
//               </p>
//             </div>
//             <span class="q_confirm_order">
//               1x
//             </span>
//             <span class="q_price_confirm_order">
//               @5.50
//             </span>
//           </div>
//         </div>
//         <div class="cart__confirmed_price">
//           <p>$5.50</p>
//         </div>
//       </div>
//       <hr>   