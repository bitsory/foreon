import PlaceOrder from "./place_order.js";
import Main from "../index.js";
import order_confirm from "./oder_confirm.js";
// import place_order from "./place_order.js";


export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("shop detail.page");


    }

    getHtml(item_image, item_num, item_name, item_price, item_content) {  
        
        return `
            <div class="online_item_detail_container">
                <div class="online_item_detail_pic_container">
                    <img class="online_item_detail_pic" src=${item_image}>
                </div>
                <div class="online_item_detail_number" style="display: none;">                    
                    ${item_num}                
                </div>
                <div class="online_item_detail_name">                    
                    ${item_name}               
                </div>
                <div class="online_item_detail_price">                    
                    $${item_price}
                </div>

                <div class="online_item_detail_description">                    
                    ${item_content}
                </div>

                <div class="online_item_detail_quantity"> 
                    <select name="Choose Your Quantity" id="order_quantity" >
                        <option value="0">Choose Your Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            
                <button class="add_cart_btn">Add Cart</button>
                <button class="buy_now_btn">BUY IT NOW</button>
                <br><br><br>

                            
                <div class="check_go_cart_container">                       
                </div>
            </div>                    

        `
    }

}


let guest_cart = [];

let cart_time_remaining = 86400;
let tid;

let result_cart = [];

function counter_init() {
    tid = setInterval(() => {
        // document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
        cart_time_remaining--;
        if (cart_time_remaining < 0) { // delete guest cart after 24 hour without add item
            clearInterval(tid);
            console.log("time out");
            sessionStorage.removeItem("cart"); 
        }
    }, 1000);
}

document.addEventListener('click',function(e){ 
    const n_cart = Main;
    let user_id = n_cart.getCookie()[1];

    if (e.target && e.target.className == 'buy_now_btn' || e.target && e.target.className == 'add_cart_btn') {   
        var order_quantity = parseInt(document.getElementById('order_quantity').value);
        var product_number = document.querySelector('.online_item_detail_number').innerText.trim();
        var product_name = document.querySelector('.online_item_detail_name').innerText;
        var product_price = parseFloat(document.querySelector('.online_item_detail_price').innerText.substr(1));
        var product_image = document.querySelector('.online_item_detail_pic').src;
    }

    if(e.target && e.target.className == 'buy_now_btn') {

        let buy_now_cart = {
            buy_now_cart_prodnum : product_number,
            buy_now_cart_quantity : order_quantity,
            buy_now_cart_name : product_name
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(buy_now_cart)
        };

        fetch('/get_item_info', options)
        .then((res) => res.json())
        .then(buy_now_checkout_cart => {
            console.log('buy_now_checkout_cart');
            console.log(buy_now_checkout_cart);

            if(user_id === 'GUEST') {

                let guest_buy_now_checkout_cart = [{
                    c_id : "GUEST",
                    c_item_image : "http://localhost:8080"+buy_now_checkout_cart[0].image,
                    c_item_name : buy_now_checkout_cart[0].name,
                    c_item_no : buy_now_checkout_cart[0].prodnum,
                    c_item_price : buy_now_checkout_cart[0].price_sell,
                    c_item_quantity : order_quantity,
                    c_name : "GUEST"
                }];

                console.log(guest_buy_now_checkout_cart)

                let tmp_guest_order_cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];  
                console.log(tmp_guest_order_cart)          
                
                let repetition_item_check = tmp_guest_order_cart.filter(element => {
                    return element.c_item_no == guest_buy_now_checkout_cart[0].c_item_no});
                console.log(repetition_item_check)
                    
                let check_item_number = repetition_item_check.length ? repetition_item_check[0].c_item_no : false;
                                
                console.log(check_item_number)

                check_item_number ? 
                tmp_guest_order_cart.forEach(element => {
                    element.c_item_no == check_item_number ? element.c_item_quantity = order_quantity : false;
                })
                : tmp_guest_order_cart.push(guest_buy_now_checkout_cart[0]);

                sessionStorage.setItem("cart", JSON.stringify(tmp_guest_order_cart));
                sessionStorage.setItem("checkoutcart", JSON.stringify(guest_buy_now_checkout_cart));
                const orderConfirm = new order_confirm(user_id, guest_buy_now_checkout_cart);
                document.getElementById("online_main").innerHTML = orderConfirm.getGuestOrderConfirm();
                orderConfirm.makeGuestCheckOutForm(guest_buy_now_checkout_cart, buy_now_checkout_cart); 
            
                
            } else {  ///////////////////// user buy now proceed

                n_cart.c_item_quantity = order_quantity;
                n_cart.c_item_no = product_number;
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

                    let proceed_checkout_total = 0;
                    let proceed_checkout_selected_order_cart = result;

                    result.forEach(element => {
                        proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                    })

                    const orderConfirm = new order_confirm(user_id, proceed_checkout_selected_order_cart);
                    document.getElementById("online_main").innerHTML = orderConfirm.getUserOrderConfirm();
                    orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);


                });

            }
        })
        
        
    } 

    if(e.target && e.target.className == 'add_cart_btn') {
        // console.log(n_cart)
        // console.log(n_cart.c_item_quantity);
        if (order_quantity !== 0) {
            // let user = n_cart.getCookie(document.cookie);
            console.log(`username : ${user_id}`);
            
            
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
            n_cart.c_item_image = product_image;
            
            console.log("n_cart");
            console.log(n_cart);

            if (user_id === "GUEST") { // GUEST added cart
                

                counter_init();
                
                let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
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
                
                sessionStorage.setItem("cart", JSON.stringify(guest_cart));
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
        } else {
            document.querySelector(".check_go_cart_container").innerHTML = "choose your item quantity"
        }
    }

    if(e.target && e.target.className == 'continue_shopping') {
        document.querySelector(".check_go_cart").remove();
    }

    if(e.target && e.target.className == 'check_out') {
        var order_name = '';
        var order_cart = {};
        
        if (user_id === "GUEST") {
            console.log("guest check out")
            // delete time out 
            clearInterval(tid);
            order_cart = JSON.parse(sessionStorage.getItem("cart"));
            
            
        } else { // user 
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
            .then(order_list => {
                console.log(order_list);
                

                if (typeof (history.pushState) != "undefined") { 
                    history.pushState(null, null, `/shop/order/${user_id}`); 
                    console.log(`order_cart : ${order_cart}`)
                    const place_order = new PlaceOrder(user_id, order_list);

                    // PlaceOrder.test();
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
                    place_order.getOrderDetail(order_list, order_cart);
                    // place_order.proceedSelector();
                    // place_order.proceedEventListener();
                    
                    console.log("setOrderItemContainer");
                    

                    // result.forEach(element => {
                    //     console.log(element)
                    //     setOrderItemContainer(element.prodnum, element.price_sell, element.name, 
                    //         (user_id === "GUEST") ? 
                    //         (order_cart.filter(item => {
                    //             return item.c_item_name === element.name})[0].c_item_quantity)  
                    //         : element.quantity                           
                    //         , element.image);
                    // });


                    console.log("setOrderItemContainer end");
                    // console.log(findQuantity("a"));
                    
                    
                    // document.querySelector(".shop_test").innerHTML = result.name;
                    // document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
                } else { 
                    this.location.href = "http://localhost:8080/shop/order"
                }

                
            });   
            
        
        console.log("fetch end")

    }

    
});

// function findQuantity(item_name) {
//     const res_quantity = order_cart.forEach(element => {
//         if(element.c_item_name === item_name) {
//             console.log()
//             return element.c_item_quantity;
//         }
//     })
//     console.log(res_quantity)

// }

// function setOrderItemContainer(prodnum, price, name, quantity, image) {
//     const orderItemContainer = document.createElement('div');
//     orderItemContainer.setAttribute('class', `online_place_order_item o${prodnum}`);
//     document.querySelector('.online_place_order_item_container').appendChild(orderItemContainer);
//     // setItemNumber(prodnum);
//     //setOrderItemImageContainer(prodnum, image_src, item_name, item_price);
    
//     setOrderItemImageContainer(prodnum, image)
//     setOrderItemContentContainer(prodnum, price, name, quantity);


    
                     
// }

// function setOrderItemContentContainer(prodnum, price, name, quantity) {
//     const orderItemContentContainer = document.createElement('div');
//     orderItemContentContainer.setAttribute('class', `online_place_order_item_content o${prodnum}`);
//     document.querySelector(`.online_place_order_item.o${prodnum}`).appendChild(orderItemContentContainer);
//     setOrderItemName(prodnum, name)
//     setOrderItemPrice(prodnum, price)
//     minusQuantity(prodnum)
//     setOrderItemQuantity(prodnum, quantity)
//     plusQuantity(prodnum)
//     getSubTotal(prodnum)

// }


// function setOrderItemImageContainer(prodnum, image_src) {
//     const orderItemImageContainer = document.createElement('div');
//     orderItemImageContainer.setAttribute('class', `online_place_order_item_pic_container o${prodnum}`);                    
//     document.querySelector(`.online_place_order_item.o${prodnum}`).appendChild(orderItemImageContainer);
    
//     setOrderItemLink(prodnum, image_src);
    
//     // setItemName(prodnum, item_name);
//     // setItemPrice(prodnum, item_price);
    
// }

// function setOrderItemLink(prodnum, image_src) {
//     const orderItemLink = document.createElement('a');
//     orderItemLink.setAttribute('class', `online_place_order_item_link o${prodnum}`);  
//     // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
//     document.querySelector(`.online_place_order_item_pic_container.o${prodnum}`).appendChild(orderItemLink);
    
//     setOrderItemImage(prodnum, image_src);
//     // setItemPrice(prodnum, item_price);
//     // setItemName(prodnum, item_name);
    
     
// }

// function setOrderItemImage(prodnum, image_src) {
//     const orderItemImage = document.createElement('img');
//     orderItemImage.setAttribute('class', `online_place_order_item_pic o${prodnum}`);
//     orderItemImage.setAttribute('src', image_src);
//     document.querySelector(`.online_place_order_item_link.o${prodnum}`).appendChild(orderItemImage);
// }

// function setOrderItemNumber(prodnum) {
//     const orderItemNumber = document.createElement('div');
//     orderItemNumber.setAttribute('class', `online_place_order_item_number o${prodnum}`);
//     document.querySelector(`.online_place_order_item_contatiner.o${prodnum}`).appendChild(orderItemNumber);
//     document.querySelector(`.online_place_order_item_number.o${prodnum}`).innerText = prodnum;
// }

// function setOrderItemName(prodnum, item_name) {
//     const orderItemName = document.createElement('div');
//     orderItemName.setAttribute('class', `online_place_order_item_name o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(orderItemName);
//     document.querySelector(`.online_place_order_item_name.o${prodnum}`).innerText = item_name;
// }

// function setOrderItemPrice(prodnum, item_price) {
//     const orderItemPrice = document.createElement('div');
//     orderItemPrice.setAttribute('class', `online_place_order_item_price o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(orderItemPrice);
//     document.querySelector(`.online_place_order_item_price.o${prodnum}`).innerText = '$'+item_price;
// }

// function setOrderItemQuantity(prodnum, item_quantity) {
//     const orderItemQuantity = document.createElement('div');
//     orderItemQuantity.setAttribute('class', `online_place_order_item_quantity o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(orderItemQuantity);
    
//     document.querySelector(`.online_place_order_item_quantity.o${prodnum}`).innerText = item_quantity;
   
// }

// function plusQuantity(prodnum) {
//     const plusQuantityBtn = document.createElement('button');
//     plusQuantityBtn.setAttribute('class', `online_place_order_item_plus_quantity_btn o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(plusQuantityBtn);
//     document.querySelector(`.online_place_order_item_plus_quantity_btn.o${prodnum}`).innerText = '+';
    


// }

// function minusQuantity(prodnum) {
//     const minusQuantityBtn = document.createElement('button');
//     minusQuantityBtn.setAttribute('class', `online_place_order_item_minus_quantity_btn o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(minusQuantityBtn);
//     document.querySelector(`.online_place_order_item_minus_quantity_btn.o${prodnum}`).innerText = '-';

    

// }

// function orderItemDelete(prodnum) {
//     const orderItemDeleteBtn = document.createElement('button');
//     orderItemDeleteBtn.setAttribute('class', `online_place_order_item_minus_quantity_btn o${prodnum}`);
//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(orderItemDeleteBtn);
//     document.querySelector(`.online_place_order_item_minus_quantity_btn.o${prodnum}`).innerText = 'x';

// }

// function getSubTotal(prodnum) {
//     const orderSubTotal = document.createElement('div');
//     orderSubTotal.setAttribute('class', `online_place_order_item_subtotal o${prodnum}`);
//     const item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${prodnum}`).innerText);
//     const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${prodnum}`).innerText.slice(1)); 

//     const item_subtotal = parseFloat(item_quantity * item_price); 
//     console.log(item_quantity);
//     console.log(item_price);
//     console.log(item_subtotal);

//     document.querySelector(`.online_place_order_item_content.o${prodnum}`).appendChild(orderSubTotal);
//     document.querySelector(`.online_place_order_item_subtotal.o${prodnum}`).innerText = '$' +item_subtotal.toFixed(2);

// }

// function getGrandTotal() {
//     const orderGrandTotal = document.createElement('div');
//     orderGrandTotal.setAttribute('class', `online_place_order_item_grandtotal`);

//     // const item_orderGrandTotal = parseFloat(document.querySelector(`.online_place_order_item_subtotal.o${}`).innerTextslice(1));
//     document.querySelector(`.online_place_order_item_container`).appendChild(orderGrandTotal);
//     document.querySelector(`.online_place_order_item_grandtotal`).innerText = 'Total $' + item_orderGrandTotal.toFixed(2);


// }
