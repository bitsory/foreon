import PlaceOrder from "./place_order.js";
import Main from "../index.js";

document.title = "Cafe FORE";
console.log("shop page");

// const n_cart = new cart();

// this.user_info = n_cart.getCookie(document.cookie);        

// console.log(`user_info : ${this.user_info}`);        

const n_cart = Main;
let guest_cart = [];
let user_name = n_cart.getCookie()[0];
let cart_time_remaining = 86400;
let tid;

function counter_init() {
    tid = setInterval(() => {
        document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
        cart_time_remaining--;
        if (cart_time_remaining < 0) { // delete guest cart after 24 hour without add item
            clearInterval(tid);
            console.log("time out");
            localStorage.removeItem("cart"); 
        }
    }, 1000);
}


console.log(`n_cart : ${n_cart}`);
console.log(n_cart);
document.addEventListener('click',function(e){ 
    if (e.target && e.target.className == 'buy_now_btn' || e.target && e.target.className == 'add_cart_btn') {   
        var order_quantity = parseInt(document.getElementById('order_quantity').value);
        var product_number = document.querySelector('.online_item_number').innerText.trim();
        var product_name = document.querySelector('.online_item_name').innerText;
        var product_price = parseFloat(document.querySelector('.online_item_price').innerText.substr(1));
    }

    if(e.target && e.target.className == 'buy_now_btn') {
                        
        console.log(`order count = ${order_quantity}`);
        const place_order = new PlaceOrder();
        // document.querySelector(".online_order").innerHTML = placeOrder.getOrder();
        
        
    } 

    if(e.target && e.target.className == 'add_cart_btn') {
        // let user = n_cart.getCookie(document.cookie);
        console.log(`username : ${user_name}`);
        
        
        document.querySelector(".check_go_cart_container").innerHTML =
            `<div class="check_go_cart">
                <h2>You added ${product_name} for ${order_quantity} items.</h2>
                
                <button class="check_out">GO Cart</button><br>
                <button class="check_out">Check Out</button><br>
            
                <button class="continue_shopping">Continue Shopping</button>
                <div class="shop_test"></div>
                <div class="cart_time_remaining"></div>
            </div>
            `
                n_cart.c_item_no = product_number;
                n_cart.c_item_name = product_name;
                n_cart.c_item_price = product_price;
                n_cart.c_item_quantity = order_quantity;

            
            console.log("n_cart");
            console.log(n_cart);

        if (user_name === "GUEST") { // GUEST added cart
            

            counter_init();
            
            let tmp_cart = JSON.parse(localStorage.getItem("cart"));
            console.log(`tmp_cart`);
            console.log(tmp_cart);
            if (tmp_cart) {                
                for (var i = 0 ; i < tmp_cart.length ;  i++) {
                    console.log(tmp_cart[i].c_item_no);
                    console.log(n_cart.c_item_no);

                    if (tmp_cart[i].c_item_no == n_cart.c_item_no) {
                        console.log("tmp_cart[i].c_item_no == n_cart.c_item_no")
                        n_cart.c_item_quantity = tmp_cart[i].c_item_quantity + n_cart.c_item_quantity;
                        console.log(tmp_cart[i].c_item_quantity);
                        
                    } else guest_cart.push(tmp_cart[i]);
                    
                    // console.log(`guest_cart`); 
                    // console.log(guest_cart);
                } guest_cart.push(n_cart);
            } else guest_cart.push(n_cart);
            // u_cart.push(tmp_cart);
            
            localStorage.setItem("cart", JSON.stringify(guest_cart));
            console.log(`final guest_cart`); 
            console.log(guest_cart);
            guest_cart = [];
        
        // console.log(u_cart);
        } else {  // user added cart
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

    if(e.target && e.target.className == 'check_out') {
        var order_cart = {};
        var test = {"name" : "test", "a" : {"aa" : "aa"}}
        if (user_name === "GUEST") {
            // delete time out 
            clearInterval(tid);
            order_cart = JSON.parse(localStorage.getItem("cart"));
            //order_cart = JSON.parse(localStorage.getItem("cart").replace(/\[|\]/g,""));
            // JSON.parse(order_cart);   
            // console.log(order_cart);                 
            
        } else {
            order_cart = [n_cart];
            
        }
        
        console.log(order_cart);
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            body: JSON.stringify(order_cart)
        };

        fetch('/shop/order', data)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            // this.location.href = "http://localhost:8080/shop/order"

            if (typeof (history.pushState) != "undefined") { 
                history.pushState(null, null, `/shop/order/${result.name}`); 
                console.log(result)
                const place_order = new PlaceOrder();
                // PlaceOrder.test();
                document.querySelector(".online_main").innerHTML = place_order.getOrder();
                document.querySelector(".shop_test").innerHTML = result.name;
                document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
            } else { 
                this.location.href = "http://localhost:8080/shop/order"
            }


            
        });



    }

});
