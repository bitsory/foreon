import Place_order from "./place_order.js";
import Main from "../index.js";


// import cart from "./cart.js";


    // constructor() {
        document.title = "Cafe FORE";
        console.log("shop page");

        // const n_cart = new cart();
       
        // this.user_info = n_cart.getCookie(document.cookie);        
      
        // console.log(`user_info : ${this.user_info}`);        

        const n_cart = Main;

        document.addEventListener('click',function(e){ 
            if (e.target && e.target.className == 'buy_now_btn' || e.target && e.target.className == 'add_cart_btn') {   
                var order_quantity = parseInt(document.getElementById('order_quantity').value);
                var product_number = document.querySelector('.online_item_number').innerText;
                var product_name = document.querySelector('.online_item_name').innerText;
                var product_price = parseInt(document.querySelector('.online_item_price').innerText.substr(1));
            }

            if(e.target && e.target.className == 'buy_now_btn') {
                                
                console.log(`order count = ${order_quantity}`);
                const placeOrder = new Place_order(order_quantity);
                document.querySelector(".online_order").innerHTML = placeOrder.getOrder();
                
                
            } 

            if(e.target && e.target.className == 'add_cart_btn') {
                document.querySelector(".check_go_cart_container").innerHTML =
                    `<div class="check_go_cart">
                        <h2>You added ${product_name} for ${order_quantity} items.</h2>
                        // <form action="/shop/cart/${n_cart.c_name}" method="post" class="go_cart_form">
                        // <input type="submit" class="go_cart_btn" value="Go Cart">
                        // </form>
                        
                        <button class="check_out">Check Out</button><br>
                        <button class="continue_shopping">Continue Shopping</button>
                    </div>
                    `
                console.log(n_cart);
                console.log(product_name);
                 console.log(product_price);

                n_cart.c_items[0].c_item_no = product_number;
                // n_cart.c_items[0].c_item_name = item_name;
                n_cart.c_items[0].c_item_price = product_price;
                n_cart.c_items[0].c_item_quantity = n_cart.c_items[0].c_item_quantity + order_quantity;
                console.log(n_cart);



                const obj = {hello: 'world'};

                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                    body: JSON.stringify(n_cart)
                };

                fetch('./new', data)
                .then((res) => res.json())
                .then(result => {
                    console.log(result)
                });
                



            }

            if(e.target && e.target.className == 'continue_shopping') {
                document.querySelector(".check_go_cart").remove();
            }
        });
    // }
    
    // async getHtml() {
        
    //     return `
            
    //     <h1>Cafe FORE Online Shop</h1>
    //     We focus on only one item for the best quality and satisfy.
    //     <div class="online_order">
    //         <div class="online_items">
    //             <div class="online_item_pic">
    //                 <img src="../images/g_bt.png">
    //             </div>
    //             <div class="online_item_name">
                    
                    
    //                     Ginger Bottle 16 oz.
                
    //             </div>
    //             <div class="online_item_price">
                    
    //                 $18.00
    //             </div>
    //             <div class="online_item_decription">
    //                 100% Handmade Squeezed Ginger Juice<br>
                    
    //             </div>
                
    //             <div class="online_item_quantity"> 
    //                 <select name="Choose Your Quantity" id="order_quantity" >
    //                     <option value="0">Choose Your Quantity</option>
    //                     <option value="1">1</option>
    //                     <option value="2">2</option>
    //                     <option value="3">3</option>
    //                     <option value="4">4</option>
    //                     <option value="5">5</option>
    //                     <option value="6">6</option>
    //                     <option value="7">7</option>
    //                     <option value="8">8</option>
    //                     <option value="9">9</option>
    //                     <option value="10">10</option>
    //                 </select>
    //             </div>

    //             <button class="add_cart_btn">Add Cart</button>
    //             <button class="buy_now_btn">BUY IT NOW</button>
    //             <div class="check_go_cart_container">
                   
    //             </div>
    //         </div>
    //     </div>
    // </div> 
                          
    //     `;
    // }

