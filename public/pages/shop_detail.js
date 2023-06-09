import PlaceOrder from "./place_order.js";
import Main from "../index.js";
import OrderConfirm from "./oder_confirm.js";
import * as ItemCounter from "./item_counter.js";
import * as CheckoutOrderForm from "./form_checkout_order.js";
// import place_order from "./place_order.js";



export default class {  

    
    // lorem = document.getElementById('lorem'); 
    
    constructor(item_num, item_name, item_price, item_image, item_content) {
        document.title = "Cafe FORE";
        console.log("shop detail.page");
        console.log("location.pathname : ")
        console.log(location.pathname)
    }


/*<div id="online_item_detail_shipment_info" class="online_item_detail_shipment_info online_item_detail_element">                    
                            shipment info
                        </div>
*/

    getHtml(item_image, item_num, item_name, item_price, item_content) {  
        
        return `
            <div id="online_item_detail_container" class="online_item_detail_container" itemid=${item_num}>
                <div id="online_item_detail_pic_container" class="online_item_detail_pic_container">
                    <img id="online_item_detail_pic" class="online_item_detail_pic" src=${item_image}>
                </div>
                <div id="online_item_detail_contents_container" class="online_item_detail_contents_container">
                    <div id="online_item_detail_contents" class="online_item_detail_contents">
                        <div id="online_item_detail_name" class="online_item_detail_name online_item_detail_element">                    
                            ${item_name}               
                        </div>                        

                        <div id="online_item_detail_description" class="online_item_detail_description online_item_detail_element">                    
                            ${item_content}
                        </div>
                        
                        <div id="online_item_detail_pq_container" class="online_item_detail_pq_container online_item_detail_element">
                            <div id="online_item_detail_price" class="online_item_detail_price online_item_detail_element">                    
                                $${parseFloat(item_price).toFixed(2)}
                            </div>

                            <div id="online_item_detail_quantity" class="online_item_detail_quantity online_item_detail_element"> 
                                Quantity
                                <select name="Choose Your Quantity" id="order_quantity">                        
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
                        </div>

                        <div id="online_item_detail_button_container" class="online_item_detail_button_container online_item_detail_element">
                            <button id="wishlist_btn" class="wishlist_btn shop_detail_btn" title="Wish list">Wish List</button>
                            <button id="add_cart_btn" class="add_cart_btn shop_detail_btn" title="Add item">Add Cart</button>
                            <button id="buy_now_btn" class="buy_now_btn shop_detail_btn" title="Buy It Now">BUY IT NOW</button>
                        </div>
                    </div>
                </div>
                
            </div>                    
            <div id="check_go_cart_container" class="check_go_cart_container">                       
            </div>
        `
    }

    

}
let guest_cart = [];



function setAddItemHtml(item_name, order_quantity) {
    return`
    <div id="check_go_cart" class="check_go_cart">
    <h2>You added '${item_name}' for ${order_quantity} items.</h2>
    
    <div id="check_go_cart_btn_container" class="check_go_cart_btn_container">
    <button id="go_to_cart" class="go_cart check_go_cart_btn">Go To Cart</button><br>
    <button id="check_out" class="check_out check_out_btn">Check Out</button><br>
       
    </div>
    `;
}

document.addEventListener('click', (e) => {  
    let n_cart = Main;
    let user_id = n_cart.getCookie()[1];
    
    console.log("shop detail.page click click shop detail.page click click shop detail.page click click");
    console.log("n_cart")
    console.log(n_cart)

    if(e.target && e.target.id == 'buy_now_btn') {

        const item_number = document.getElementById('online_item_detail_container').getAttribute('itemid');
        const order_quantity = parseInt(document.getElementById('order_quantity').value);                
        const item_name = document.getElementById('online_item_detail_name').textContent;
        console.log(item_number);
        
        let buy_now_cart = 
        {
            prodnum : item_number,
            quantity : order_quantity,
            item_name : item_name
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

            if(user_id == 'GUEST') {
                history.pushState(null, null, `/shop/checkout/GUEST/item_num=${item_number}`); // url change
                let guest_buy_now_checkout_cart = [];

                n_cart.c_item_image = "https://gocafefore.com"+buy_now_checkout_cart[0].image;
                n_cart.c_item_name = buy_now_checkout_cart[0].name;
                n_cart.c_item_no = buy_now_checkout_cart[0].prodnum;
                n_cart.c_item_price = buy_now_checkout_cart[0].price_sell;
                n_cart.c_item_code = buy_now_checkout_cart[0].item_code;

                n_cart.c_item_quantity = order_quantity;
                

                guest_buy_now_checkout_cart.push(n_cart);

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
                const orderConfirm = new OrderConfirm(user_id, guest_buy_now_checkout_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getGuestOrderConfirm();
                orderConfirm.makeGuestCheckOutForm(guest_buy_now_checkout_cart, buy_now_checkout_cart); 
                ItemCounter.item_counter('GUEST');
            
                
            } else {  ///////////////////// user buy now proceed
                history.pushState(null, null, `/shop/checkout/member/item_num=${item_number}`); // url change

                
                n_cart.c_item_quantity = order_quantity;
                n_cart.c_item_no = item_number;
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
                    const selected_items_number_list = [item_number];
                    sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                    const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                    document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                    orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);       
                    ItemCounter.item_counter(user_id);
                });        
            }
        }); 
        
    }


    if(e.target && e.target.id == 'add_cart_btn') {

        const order_quantity = parseInt(document.getElementById('order_quantity').value);
        const item_number = document.getElementById('online_item_detail_container').getAttribute('itemid');
        const item_name = document.getElementById('online_item_detail_name').textContent;
        // console.log(n_cart)
        // console.log(n_cart.c_item_quantity);
        if (order_quantity !== 0) {
            // let user = n_cart.getCookie(document.cookie);

            n_cart.c_item_quantity = order_quantity;
            n_cart.c_item_no = item_number;
            

            console.log(`username : ${user_id}`);
            document.querySelector(".check_go_cart_container").innerHTML = setAddItemHtml(item_name, order_quantity);
                
            let added_cart = 
            {
                prodnum : item_number,
                quantity : order_quantity,
                item_name : item_name
            }

            if (user_id == "GUEST") { // GUEST added cart  

                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(added_cart)
                };
        
                fetch('/get_item_info', options)
                .then((res) => res.json())
                .then(added_cart => {
                    console.log('added_cart');
                    console.log(added_cart);

                    n_cart.c_item_no = item_number;
                    n_cart.c_item_name = added_cart[0].name;
                    n_cart.c_item_price = added_cart[0].price_sell;
                    n_cart.c_item_image = "https://gocafefore.com"+added_cart[0].image;
                    n_cart.c_item_quantity = order_quantity;
                    n_cart.c_item_code = added_cart[0].item_code;

                
                    console.log("n_cart");
                    console.log(n_cart);

                    let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                    console.log(`tmp_cart`);
                    console.log(tmp_cart);
                    if (tmp_cart) {                
                        for (var i = 0 ; i < tmp_cart.length ;  i++) {
                            console.log(tmp_cart[i].c_item_no);
                            console.log(n_cart.c_item_no);        
                            
                            if (tmp_cart[i].c_item_no == n_cart.c_item_no) {
                                console.log("tmp_cart[i].c_item_no == n_cart.c_item_no")
                                // this.n_cart.c_item_quantity = tmp_cart[i].c_item_quantity + this.n_cart.c_item_quantity;
                                tmp_cart[i].c_item_quantity = 0;
                                console.log(tmp_cart[i].c_item_quantity);                                    
                            
                            } else 
                            guest_cart.push(tmp_cart[i]);
                            
                            // console.log(`guest_cart`); 
                            // console.log(guest_cart);
                        } guest_cart.push(n_cart);
                    } else guest_cart.push(n_cart);
                    // u_cart.push(tmp_cart);
                    
                    sessionStorage.setItem("cart", JSON.stringify(guest_cart));
                    console.log(`final guest_cart`); 
                    console.log(guest_cart);
                    guest_cart = [];
                    ItemCounter.item_counter('GUEST');
                })

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
                    ItemCounter.item_counter(user_id);
                });
            }
        } else {
            document.querySelector(".check_go_cart_container").innerText = "choose your item quantity"
        }
    }

    if(e.target && e.target.id == 'go_to_cart') {
        
        var order_name = '';
        var order_cart = {};
        
        if (user_id == "GUEST") {
            console.log("guest check out")
            // delete time out 
            // clearInterval(tid);
            order_cart = JSON.parse(sessionStorage.getItem("cart"));                    
            
        } else { // user 
            order_cart = [n_cart];
            // order_cart.u_id = user_id;               
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
                    const user = user_id == 'GUEST' ? 'GUEST' : 'member';
                    history.pushState(null, null, `/shop/order/${user}`); 
                    

                    console.log(`order_cart : ${order_cart}`)
                    const place_order = new PlaceOrder(user_id, order_list);

                    // PlaceOrder.test();
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
                    place_order.getOrderDetail(order_list, order_cart);
                    // place_order.proceedSelector();
                    // place_order.proceedEventListener();
                    
                    console.log("setOrderItemContainer");
                    


                    console.log("setOrderItemContainer end");
                    // console.log(findQuantity("a"));
                    
                    
                    // document.querySelector(".shop_test").innerHTML = result.name;
                    // document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
                } else { 
                    this.location.href = "https://gocafefore.com/shop/order"
                }

                
            });   
            
        
        console.log("fetch end")

    }

    if(e.target && e.target.id == 'check_out') {
        const user = user_id == 'GUEST' ? 'GUEST' : 'member';
        history.pushState(null, null, `/shop/checkout/${user}`); // url change

        console.log("proceed_order_btn proceed_order_btn proceed_order_btn ");               
        let check_out_cart = [];                
        console.log(user_id)
        
    
        // let ckecked_item = 'input[name="online_place_order_item_check_btn"]:checked';

        // const selectedEls = document.querySelectorAll(ckecked_item);
        // const selected_items_number_list = [];
        // selectedEls.forEach((el) => {
        //     console.log(el)
        //     selected_items_number_list.push(el.getAttribute('checked_itemid'));
        // });
        // console.log(selected_items_number_list);


        if(user_id == 'GUEST') {
            check_out_cart = JSON.parse(sessionStorage.getItem("cart"));            
            
            // for (let i =0 ; i < selected_items_number_list.length ; i++) {
            //     tmp_cart.forEach(element => {
            //         element.c_item_no == selected_items_number_list[i] ? check_out_cart.push(element) : false;
            //     })
            // }
            console.log(check_out_cart);

            sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));

            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                body: JSON.stringify(check_out_cart)
            };

            fetch('/shop/order', data)
            .then((res) => res.json())
            .then(checked_order_list => {
                console.log('checked_order_list');
                console.log(checked_order_list);

                console.log('check_out_cart')
                console.log(check_out_cart)

                const orderConfirm = new OrderConfirm(user_id, check_out_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getGuestOrderConfirm();
                document.getElementById('input_recipient_first_name').focus();
                orderConfirm.makeGuestCheckOutForm(check_out_cart, checked_order_list); 
                })
        } else {  ///////////////////// user check out proceed
            
            let u_cart = [{u_id : user_id}];            
            let data = [{
                u_cart 
                // checked_items_number_list : selected_items_number_list                      
            }];

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                body: JSON.stringify(data)
            };

            fetch('/shop/order', options)
            .then((res) => res.json())
            .then(order_list => {
                console.log("order_list")
                console.log(order_list)

                let proceed_checkout_total = 0;
                let proceed_checkout_selected_order_cart = [...order_list];
                let selected_items_number_list = [];
                order_list.forEach(element => {
                    console.log(element);                           
                    selected_items_number_list.push(element.prodnum); 
                })
                

                sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                console.log("proceed_checkout_selected_order_cart");
                console.log(proceed_checkout_selected_order_cart);

                proceed_checkout_selected_order_cart.forEach(element => {
                    proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                })

                const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
            })
        }
    }
});

