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
        let guest_cart = [];

        console.log(`n_cart : ${n_cart}`);
        console.log(n_cart);
        document.addEventListener('click',function(e){ 
            if (e.target && e.target.className == 'buy_now_btn' || e.target && e.target.className == 'add_cart_btn') {   
                var order_quantity = parseInt(document.getElementById('order_quantity').value);
                var product_number = document.querySelector('.online_item_number').innerText.trim();
                var product_name = document.querySelector('.online_item_name').innerText;
                var product_price = parseInt(document.querySelector('.online_item_price').innerText.substr(1));
            }

            if(e.target && e.target.className == 'buy_now_btn') {
                                
                console.log(`order count = ${order_quantity}`);
                const placeOrder = new Place_order(order_quantity);
                document.querySelector(".online_order").innerHTML = placeOrder.getOrder();
                
                
            } 

            if(e.target && e.target.className == 'add_cart_btn') {
                let user = n_cart.getCookie(document.cookie);
                console.log(`user : ${user}`);
                
                
                document.querySelector(".check_go_cart_container").innerHTML =
                    `<div class="check_go_cart">
                        <h2>You added ${product_name} for ${order_quantity} items.</h2>
                        <form action="/shop/cart/temp_user" method="post" class="go_cart_form">
                        <input type="submit" class="go_cart_btn" value="Go Cart">
                        </form>
                        
                        <button class="check_out">Check Out</button><br>
                        <button class="continue_shopping">Continue Shopping</button>
                    </div>
                    `
                // console.log(tmp_cart);
                // console.log(n_cart);
                // console.log(product_name);
                // console.log(product_price);
                // console.log(n_cart.c_items.length);
                // if (tmp_cart) {                
                //     for (var i = 0 ; i < tmp_cart.length ;  i++) {
                //         u_cart.push(tmp_cart[i]);
                //     }
                // }
                // // u_cart.push(tmp_cart);
                // console.log(`tmp_cart : ${tmp_cart}`);
                

                    for (var i=0 ; i < n_cart.c_items.length  ; i++) {
                        n_cart.c_items[i].c_item_no = product_number;
                        // n_cart.c_items[0].c_item_name = item_name;
                        n_cart.c_items[i].c_item_price = product_price;
                        n_cart.c_items[i].c_item_quantity = n_cart.c_items[0].c_item_quantity + order_quantity;

                    }
                if (user === "GUEST") {
                    let tmp_cart = JSON.parse(localStorage.getItem("cart"));
                    console.log(`tmp_cart: ${tmp_cart}`);
                    if (tmp_cart) {                
                        for (var i = 0 ; i < tmp_cart.length ;  i++) {
                            guest_cart.push(tmp_cart[i]);
                        }
                    }
                    // u_cart.push(tmp_cart);
                    guest_cart.push(n_cart);
                    localStorage.setItem("cart", JSON.stringify(guest_cart));
                    console.log(`guest_cart: ${guest_cart}`); 
                    console.log(guest_cart);

                
                // console.log(u_cart);
                } else {               

                    const data = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            },
                        body: JSON.stringify(n_cart)
                    };

                    fetch('/add_cart', data)
                    .then((res) => res.json())
                    .then(result => {
                        console.log(result)
                    });
                }   



            }

            if(e.target && e.target.className == 'continue_shopping') {
                document.querySelector(".check_go_cart").remove();
            }
        });
