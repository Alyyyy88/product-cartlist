// we need to get data dynamically 
// get image src , category ,name , price

const productCard = document.querySelector(".products_con");
async function getProducts() {

  const url = "./data.json";

  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach( (product) =>{
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
         productCard.insertAdjacentHTML("beforeend",productHTML);


    });

    document.addEventListener("click", (event) => {
      const clickedBtn = event.target.closest(".cart__btn_con");
      if (clickedBtn) {
        const product = clickedBtn.closest(".product");
        const quantityBtn = product.querySelector(".cart_quantity"); 
        const product_img = product.querySelector(".product_img"); 
        clickedBtn.classList.add("nonactive");
        quantityBtn.classList.add("active"); 
        product_img.id = "selected";
      }
    });

  } catch (error) {
    console.log(error);
  }
}

getProducts();










