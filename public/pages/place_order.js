import OrderConfirm from "./oder_confirm.js";
import * as ItemCounter from "./item_counter.js";

export default class {


    getOrder() {
        return `
        <div id="online_place_order_page" class="online_place_order_page">
            <div id="online_place_order_container" class="online_place_order_container">
                
                <h2>Your Shopping Cart</h2>

                <div id="online_place_order_item_container" class="online_place_order_item_container">
                </div>
            </div>

            <div id="online_place_order_item_proceed" class="online_place_order_item_proceed">
                     
                <div id="grand_total_label" class="grand_total_label"></div>
                <div class='grand_total'></div>
                <div id="grand_total_est">
                ESTIMATED ORDER TOTAL</br>
                Shipping and taxes will be applied at checkout
                </div>

                <button id='proceed_order_btn' class='proceed_order_btn'>Take me to Checkout</button>
               
            </div>
        </div>
        
        `

    };
    

    online_main = document.getElementById('online_main');

    constructor(param_user_id, order_list) {
        document.title = "Cafe FORE";
        console.log("place order page");
      

        this.user_id = param_user_id;
        this.order_list = order_list;
        
        console.log(`user_id : ${this.user_id}`);
        console.log(this.order_list);
        // console.log(this.order_cart);
        

        this.online_main.addEventListener('click', (e) =>{
            console.log("click_test  place order.js click_test  place order.js click_test  place order.js");
            console.log(e.target)
            console.log(user_id)

            /////////////////////////////// check box hit //////////////////////////////////
            if(e.target && (e.target.className) == `online_place_order_item_check_btn`) {
                console.log('online_place_order_item_check_btn');
                
                ////////////////////////// get selected item number list ///////////////////
                // const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
                // const selected_items_list = [];
                // selectedEls.forEach((el) => {
                //     console.log(el)
                //     if (el.checked == true) {
                //         selected_items_list.push(el.getAttribute('checked_itemid'));
                //     }
                // });
                // console.log(selected_items_list);

                const selected_items_list = this.checkSelectedItems();

                //////////////////// grand total rerendering ////////////////////

                if (user_id == 'GUEST') {

                    let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                    let tmp_checked_cart = [];
                    console.log(tmp_cart);

                    for (let i =0 ; i < selected_items_list.length ; i++) {
                        tmp_cart.forEach(element => {
                            console.log(element)
                            if (element.c_item_no == selected_items_list[i]) {
                                tmp_checked_cart.push(element)
                            }

                        })
                    }
                    console.log('tmp_checked_cart');
                    console.log(tmp_checked_cart);


                    
                    let total_amount = 0;
            
                    if(this.order_list.length) { 
                        console.log(this.order_list);

                        for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                            this.order_list.forEach(element => {
                                if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                                    let price = element.price_sell;
                                    let quantity = (user_id == "GUEST") ? 
                                        tmp_checked_cart[i].c_item_quantity : element.quantity;
                                    total_amount = total_amount + (price * quantity); 
                                }
                            });
                        }

                    
                        getGrandTotal(total_amount);

                        g_total = total_amount;
                        console.log("g_total")
                        console.log(g_total)
                    }
                } else {  ///  user 

                    let data = {
                        u_id : user_id,                       
                    };
        
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            
                            },
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/check_user_cart`, options)
                    
                    .then((res) => res.json())
                    .then(result => { 
                        //////////////////////////  total rerendering with checking selected item ///////////////////////
                        let tmp_total = 0;
                        let tmp_checked_order_cart = [];
                        for (let i =0 ; i < selected_items_list.length ; i++) {
                            result.forEach(element => {
                                console.log(element)
                                if (element.prodnum == selected_items_list[i]) {
                                    tmp_checked_order_cart.push(element)
                                }
                
                            })
                        }

                        console.log("tmp_checked_order_cart");
                        console.log(tmp_checked_order_cart);

                        tmp_checked_order_cart.forEach(element => {
                            tmp_total = tmp_total + element.quantity * element.price_sell;
                        })

                        document.querySelector('.online_place_order_item_grandtotal').innerText = '$$' + tmp_total.toFixed(2);
                        
                        console.log(result)})
                }
                

            }

            if(e.target && (e.target.className) == `proceed_order_btn`) {

                //////////////////// if ( grand total > 0) //////////////////////////

                const user = user_id == 'GUEST' ? 'GUEST' : 'member';
                history.pushState(null, null, `/shop/checkout/${user}`); // url change

                console.log("proceed_order_btn proceed_order_btn proceed_order_btn ");
                let tmp_cart = '';
                let check_out_cart = [];
                // const orderConfirm = new order_confirm(user_id);
                console.log(user_id)
                
               
                let ckecked_item = 'input[name="online_place_order_item_check_btn"]:checked';

                const selectedEls = document.querySelectorAll(ckecked_item);
                const selected_items_number_list = [];
                selectedEls.forEach((el) => {
                    console.log(el)
                    selected_items_number_list.push(el.getAttribute('checked_itemid'));
                });
                console.log(selected_items_number_list);


                if(user_id == 'GUEST') {
                    tmp_cart = JSON.parse(sessionStorage.getItem("cart"));            
                    
                    for (let i =0 ; i < selected_items_number_list.length ; i++) {
                        tmp_cart.forEach(element => {
                            element.c_item_no == selected_items_number_list[i] ? check_out_cart.push(element) : false;
                        })
                    }
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
                        document.getElementById("online_main").innerHTML = orderConfirm.getGuestOrderConfirm();
                        orderConfirm.makeGuestCheckOutForm(check_out_cart, checked_order_list); 
                        ItemCounter.item_counter('GUEST');
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
                        let proceed_checkout_selected_order_cart = [];
                        for (let i =0 ; i < selected_items_number_list.length ; i++) {
                            order_list.forEach(element => {
                                console.log(element)
                                if (element.prodnum == selected_items_number_list[i]) {
                                    proceed_checkout_selected_order_cart.push(element)
                                }
                
                            })
                        }

                        sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                        console.log("proceed_checkout_selected_order_cart");
                        console.log(proceed_checkout_selected_order_cart);

                        proceed_checkout_selected_order_cart.forEach(element => {
                            proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                        })

                        const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                        document.getElementById("online_main").innerHTML = orderConfirm.getUserOrderConfirm();
                        orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
                        ItemCounter.item_counter(user_id);

                    })
                }
            }

            ///////////////////////////////////////////////  plus button hit ///////////////////////////
            if(e.target && (e.target.id) == 'online_place_order_item_plus_quantity_btn') {
                console.log('online_place_order_item_plus_quantity_btn online_place_order_item_plus_quantity_btn' )

                ////////////////////// rerendering item subtotal
                let item_number = e.target.parentElement.getAttribute('quantity-handler-itemid');
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
        
                item_quantity_id.innerText = item_quantity + 1;        
        
                const item_new_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).textContent); 
        
                const item_subtotal = parseFloat(item_new_quantity * item_price);
                document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = `Item Total : $${item_subtotal.toFixed(2)}`;
                /////////////////////////////////////////////////////

                ////////////////////////////selected item check///////////////////////////

                /*
                const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
                const selected_items_number_list = [];
                selectedEls.forEach((el) => {
                    console.log(el)
                    if (el.checked == true) {
                        selected_items_number_list.push(el.getAttribute('checked_itemid'));
                    }
                });
                console.log(selected_items_number_list);
                */

                const selected_items_number_list = this.checkSelectedItems();

               
                /////////////////////////////////////////cart add up
                if (user_id == 'GUEST') {
                
                    /////////////guest cart add up
                    console.log(`tmp_order_cart : ${tmp_order_cart}`);
                    tmp_order_cart.forEach(element => {
                        console.log(element);
        
                        if (element.c_item_no == item_number) {
                            console.log(item_number)
                            element.c_item_quantity++;
                        }
                    })
        
                    sessionStorage.setItem("cart", JSON.stringify(tmp_order_cart));

                    let tmp_checked_cart = [];
                   
                    for (let i =0 ; i < selected_items_number_list.length ; i++) {
                        tmp_order_cart.forEach(element => {
                            // console.log(element)
                            if (element.c_item_no == selected_items_number_list[i]) {
                                tmp_checked_cart.push(element)
                            }            
                        })
                    }

                    let total_amount = 0;
            
                    if(this.order_list.length) { 
                        console.log(this.order_list);
            
                        for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                            this.order_list.forEach(element => {
                                if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                                    let price = element.price_sell;
                                    let quantity = (user_id == "GUEST") ? 
                                        tmp_checked_cart[i].c_item_quantity : element.quantity;
                                    total_amount = total_amount + (price * quantity); 
                                }
                            });
                        }
                        getGrandTotal(total_amount);
                    }
                
                } else {  ///////////////////////// user cart add up
                    let data = {
                        u_id : user_id,
                        item_num : item_number,
                        selected_num : selected_items_number_list
                        
                    };
        
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            
                            },
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/item_addup_v2`, options)
                    
                    .then((res) => res.json())
                    .then(result => { 
                        //////////////////////////  total rerendering with checking selected item ///////////////////////
                        let tmp_total = 0;
               

                        result.forEach(element => {
                            tmp_total = tmp_total + element.quantity * element.price_sell;
                        })
                        document.querySelector('.online_place_order_item_grandtotal').innerText = `$${tmp_total.toFixed(2)}`;
                        
                        console.log(result)})

                }
        
               
            }


            ///////////////////////////////////// hit subtract button ////////////////////////////        
            if(e.target && (e.target.id) == 'online_place_order_item_minus_quantity_btn') { // item quantity subtract
                console.log("online_place_order_item_minus_quantity_btn");
                let item_number = e.target.parentElement.getAttribute('quantity-handler-itemid');
                console.log(item_number);
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
        
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                if (item_quantity > 1) {
                    item_quantity_id.innerHTML = item_quantity - 1;
                    const item_new_quantity = parseInt(item_quantity_id.innerText);
                    const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).textContent); 
        
                    const item_subtotal = parseFloat(item_new_quantity * item_price);
                    document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = `Item Total : $${item_subtotal.toFixed(2)}`;

                    /*
                    const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
                    const selected_items_number_list = [];
                    selectedEls.forEach((el) => {
                        console.log(el)
                        if (el.checked == true) {
                            selected_items_number_list.push(el.getAttribute('checked_itemid'));
                        }
                    });
                    console.log(selected_items_number_list);
                    */
        
                    const selected_items_number_list = this.checkSelectedItems();
        
                    if (user_id == 'GUEST') {
                    
                        /////////////guest cart subtract
                        console.log(`tmp_order_cart : ${tmp_order_cart}`);
                        tmp_order_cart.forEach(element => {
                            console.log(element);
        
                            if (element.c_item_no == item_number) {
                                console.log(item_number)
                                element.c_item_quantity--;
                            }
                        })
        
                        sessionStorage.setItem("cart", JSON.stringify(tmp_order_cart)); 

                        
                        // let tmp_order_cart = JSON.parse(sessionStorage.getItem("cart"));
                        let tmp_checked_cart = [];
                        console.log(tmp_order_cart);
                
                        for (let i =0 ; i < selected_items_number_list.length ; i++) {
                            tmp_order_cart.forEach(element => {
                                console.log(element)
                                if (element.c_item_no == selected_items_number_list[i]) {
                                    tmp_checked_cart.push(element)
                                }
                
                            })
                        }
                        console.log('tmp_checked_cart');
                        console.log(tmp_checked_cart);
                
                
                                
                        let total_amount = 0;
                
                        if(this.order_list.length) { 
                            console.log(this.order_list);
                
                            for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                                this.order_list.forEach(element => {
                                    if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                                        let price = element.price_sell;
                                        let quantity = (user_id == "GUEST") ? 
                                            tmp_checked_cart[i].c_item_quantity : element.quantity;
                                        total_amount = total_amount + (price * quantity); 
                                    }
                                });
                            }
                            getGrandTotal(total_amount);
                        } else console.log("nothing order list")
                    
                    } else {
                        let data = {
                            u_id : user_id,
                            item_num : item_number,
                            selected_num : selected_items_number_list
                        };
        
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                                
                                },
                            body: JSON.stringify(data)
                        };
                        console.log(data);
        
                        fetch(`/item_subtract_v2`, options)
                       
                        .then((res) => res.json())
                        .then(result => { 
                            //////////////////////////  total rerendering with checking selected item ///////////////////////
                            let tmp_total = 0;
                            /*
                            let tmp_checked_order_cart = [];
                            for (let i =0 ; i < selected_items_number_list.length ; i++) {
                                result.forEach(element => {
                                    console.log(element)
                                    if (element.prodnum == selected_items_number_list[i]) {
                                        tmp_checked_order_cart.push(element)
                                    }                    
                                })
                            }

                            console.log("tmp_checked_order_cart");
                            console.log(tmp_checked_order_cart);
                            */

                            result.forEach(element => {
                                tmp_total = tmp_total + element.quantity * element.price_sell;
                            })
                            document.querySelector('.online_place_order_item_grandtotal').innerText = '$$' + tmp_total.toFixed(2);
                        
                            console.log(result)
                        })
                    }
                            
                        
        
            
                }
            }
            
        
            if(e.target && (e.target.id) == 'online_place_order_item_delete_btn') { // item delete
                // console.log("online_place_order_item_delete_btn");
                let item_number = e.target.parentElement.getAttribute('namebox-itemid');
                console.log(item_number);
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).textContent); 
                // let item_number = (e.target.className).slice(-1);
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
                const delete_item_subtotal = parseFloat(item_quantity * item_price);
                const delete_item = document.querySelector(`[itemid="${item_number}"]`);
                console.log(delete_item);
                document.getElementById('online_place_order_item_container').removeChild(delete_item);

                const selected_items_number_list = this.checkSelectedItems();
        
                if (user_id == 'GUEST') {       
                    console.log('GUEST');     
                    /////////////item delete in guest cart 
                    console.log(`tmp_order_cart : ${tmp_order_cart}`);            
        
                    let filtered = tmp_order_cart.filter((element) => element.c_item_no != item_number);
        
                    console.log(filtered);
                    console.log(tmp_order_cart)
                    tmp_order_cart = filtered;
        
                    sessionStorage.setItem("cart", JSON.stringify(filtered));

                    // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                    // console.log(tmp_cart);
                    let tmp_checked_cart = [];                    
               
                    for (let i =0 ; i < selected_items_number_list.length ; i++) {
                        tmp_order_cart.forEach(element => {
                            console.log(element)
                            if (element.c_item_no == selected_items_number_list[i]) {
                                tmp_checked_cart.push(element)
                            }            
                        })
                    }
                    console.log('tmp_checked_cart');
                    console.log(tmp_checked_cart);
                            
                    let total_amount = 0;
            
                    if(this.order_list.length) { 
                        console.log(this.order_list);
            
                        for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                            this.order_list.forEach(element => {
                                if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                                    let price = element.price_sell;
                                    let quantity = (user_id == "GUEST") ? 
                                        tmp_checked_cart[i].c_item_quantity : element.quantity;
                                    total_amount = total_amount + (price * quantity); 
                                }
                            });
                        }
                        getGrandTotal(total_amount);
                    }
                    ItemCounter.item_counter('GUEST');

                } else {
                    ///// item delete in user cart 
                    let data = {
                        u_id : user_id,
                        item_num : item_number,
                        selected_num : selected_items_number_list
                    };
        
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            
                            },
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/item_delete_v2`, options)
                   
                    .then((res) => res.json())
                    .then(result => { 
                        let tmp_total = 0;
                        /*
                        let tmp_checked_order_cart = [];
                        for (let i =0 ; i < selected_items_number_list.length ; i++) {
                            result.forEach(element => {
                                console.log(element)
                                if (element.prodnum == selected_items_number_list[i]) {
                                    tmp_checked_order_cart.push(element)
                                }                    
                            })
                        }

                        console.log("tmp_checked_order_cart");
                        console.log(tmp_checked_order_cart);
                        */
                        
                        result.length > 0 ? 
                        result.forEach(element => {tmp_total = tmp_total + element.quantity * element.price_sell;}) : false;
                        
                        console.log("tmp_total")
                        console.log("tmp_total")
                        document.querySelector('.online_place_order_item_grandtotal').innerText = '$$' + tmp_total.toFixed(2);
                        ItemCounter.item_counter(user_id);
                    
                        console.log(result)
                    
                    })
                }
        
        
                // const new_grandtotal = g_total - delete_item_subtotal;
                // g_total = new_grandtotal;
                // document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);
        
                       //////////////////////////////////////////selected item rerender//////
                        /*
                       const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
                       const selected_items_list = [];
                       selectedEls.forEach((el) => {
                           console.log(el)
                           if (el.checked == true) {
                               selected_items_list.push(el.getAttribute('checked_itemid'));
                           }
                       });
                       console.log(selected_items_list);
                       */
               
                       //////////////////// grand total rerendering ////////////////////
                    
            }

        });       
   
    }


    checkSelectedItems() {
        const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
        const selected_items_number_list = [];
        selectedEls.forEach((element) => {
            
            if (element.checked == true) {
                selected_items_number_list.push(element.getAttribute('checked_itemid'));
            }
        });
        console.log(selected_items_number_list);
        return selected_items_number_list;
    }

    

    getOrderDetail(order_list, order_cart) {
        console.log("place_order.js get order detail");
        console.log(order_list);
        console.log(order_cart);
        user_id = this.user_id;
        // const orderItemContainer_test = document.createElement('div');
        // orderItemContainer_test.setAttribute('class', `orderItemContainer_test`);
        // document.querySelector('.online_place_order_item_container').appendChild(orderItemContainer_test);
        // document.querySelector(`.orderItemContainer_test`).innerText = 'test';
        let total_amount = 0;
        
        if(order_list.length) { 
            order_list.forEach(element => {

                let price = element.price_sell;
                let quantity = (user_id == "GUEST") ? 
                    (order_cart.filter(item => {
                    return item.c_item_name == element.name})[0].c_item_quantity) : element.quantity;
                
                setOrderItemContainer(element.prodnum, element.price_sell, element.name, quantity, element.image);
                
                // setOrderItemContainer(element.prodnum, element.price_sell, element.name, 
                //     (this.user_name === "GUEST") ? 
                //     (order_cart.filter(item => {
                //         return item.c_item_name === element.name})[0].c_item_quantity)  
                //     : element.quantity                           
                //     , element.image);
                total_amount = total_amount + (price * quantity);
                console.log(`total_amount : ${total_amount}`);
            });
            g_total = total_amount;
            tmp_order_cart = order_cart;
            setGrandTotalContainer();
            if (total_amount !=0) getGrandTotal(total_amount);
            
            console.log(`tmp_order_cart : `)
            console.log(`${tmp_order_cart}`)
        
        } else {
            
            // const empty_cart_modal = document.createElement('div');
            // empty_cart_modal.setAttribute('id', `empty_cart_modal`);
            // empty_cart_modal.setAttribute('class', `empty_cart_modal`);
            
            // // document.querySelector('.user_info').style.display = "block";
            // document.querySelector('.user_info').appendChild(empty_cart_modal);
            // empty_cart_modal.innerText = "cart is empty";

            document.querySelector('.online_main').innerHTML = 
            `Your Cart is empty<br><br>
            Sign in to your account<br>
            Sign up now
            `;
        }

    }
          
    
}

let user_id = '';
let g_total = 0;
let tmp_order_cart = [];
let tmp_total = 0;




function setOrderItemContainer(prodnum, price, name, quantity, image) {
    const orderItemContainer = document.createElement('div');
    orderItemContainer.setAttribute('id', `online_place_order_item`);
    orderItemContainer.setAttribute('class', `online_place_order_item`);
    orderItemContainer.setAttribute('itemid', `${prodnum}`);

    document.querySelector('.online_place_order_item_container').appendChild(orderItemContainer);
        
    setOrderItemCheckBtn(prodnum);
    setOrderItemImageContainer(prodnum, image);
    setOrderItemContentContainer(prodnum, price, name, quantity);
    
}


function setOrderItemCheckBtn(prodnum) {
    const orderItemCheckBtn = document.createElement('input');
    orderItemCheckBtn.setAttribute('type', `checkbox`);
    orderItemCheckBtn.setAttribute('id', `online_place_order_item_check_btn`);     
    orderItemCheckBtn.setAttribute('class', `online_place_order_item_check_btn`);
    orderItemCheckBtn.setAttribute('name', `online_place_order_item_check_btn`);
    orderItemCheckBtn.setAttribute('checked_itemid', `${prodnum}`);     
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemCheckBtn);
    orderItemCheckBtn.checked = true;
}

function setOrderItemContentContainer(prodnum, price, name, quantity) {
    const orderItemContentContainer = document.createElement('div');
    orderItemContentContainer.setAttribute('class', `online_place_order_item_content`);
    orderItemContentContainer.setAttribute('contents-data-itemid',`${prodnum}`);
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemContentContainer);
    setOrderItemNameBox(prodnum, name);
    setOrderItemOptions(prodnum);
    setShipmentInfo(prodnum);    
    setOrderItemPriceBox(prodnum, price);
    setOrderItemQuantityHandler(prodnum, quantity);    
    getSubTotal(prodnum);
}

function setOrderItemImageContainer(prodnum, image_src) {
    const orderItemImageContainer = document.createElement('div');
    orderItemImageContainer.setAttribute('id', `online_place_order_item_pic_container`);
    orderItemImageContainer.setAttribute('class', `online_place_order_item_pic_container`);
    orderItemImageContainer.setAttribute('image-itemid',`${prodnum}`);                    
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemImageContainer);
    
    setOrderItemLink(prodnum, image_src);
    
    // setItemName(prodnum, item_name);
    // setItemPrice(prodnum, item_price);
    
}



function setOrderItemLink(prodnum, image_src) {
    const orderItemLink = document.createElement('a');
    orderItemLink.setAttribute('class', `online_place_order_item_link`);  
    orderItemLink.setAttribute('link-data-itemid', `${prodnum}`);  
    // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
    document.querySelector(`[image-itemid="${prodnum}"]`).appendChild(orderItemLink);
    
    setOrderItemImage(prodnum, image_src);
    // setItemPrice(prodnum, item_price);
    // setItemName(prodnum, item_name);
    
     
}

function setOrderItemImage(prodnum, image_src) {
    const orderItemImage = document.createElement('img');
    orderItemImage.setAttribute('class', `online_place_order_item_pic`);
    orderItemImage.setAttribute('src', image_src);
    document.querySelector(`[link-data-itemid="${prodnum}"]`).appendChild(orderItemImage);
}

function setOrderItemNameBox(prodnum, item_name) {
    const orderItemNameBox = document.createElement('div');
    orderItemNameBox.setAttribute('id', `online_place_order_item_name_box`);
    orderItemNameBox.setAttribute('class', `online_place_order_item_name_box`);
    orderItemNameBox.setAttribute('namebox-itemid', `${prodnum}`);  
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemNameBox);
    setOrderItemName(prodnum, item_name);
    setOrderItemDelete(prodnum);
}

function setOrderItemName(prodnum, item_name) {
    const orderItemName = document.createElement('div');
    orderItemName.setAttribute('id', `online_place_order_item_name`);
    orderItemName.setAttribute('class', `online_place_order_item_name`);
    document.querySelector(`[namebox-itemid="${prodnum}"]`).appendChild(orderItemName);
    orderItemName.innerText = item_name;
}

function setOrderItemDelete(prodnum) {
    const orderItemDeleteBtn = document.createElement('button');
    orderItemDeleteBtn.setAttribute('id', `online_place_order_item_delete_btn`);
    orderItemDeleteBtn.setAttribute('class', `online_place_order_item_delete_btn cart_handle_btn`);
    document.querySelector(`[namebox-itemid="${prodnum}"]`).appendChild(orderItemDeleteBtn);
    orderItemDeleteBtn.innerText = '🗑 Remove';
}

function setOrderItemPriceBox(prodnum, item_price) {
    const orderItemPriceBox = document.createElement('div');
    orderItemPriceBox.setAttribute('id', `online_place_order_item_price_Box`);
    orderItemPriceBox.setAttribute('class', `online_place_order_item_price_Box`);
    orderItemPriceBox.setAttribute('pricebox-itemid',`${prodnum}`); 
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemPriceBox);
    setOrderItemPriceLabel(prodnum);
    setOrderItemPrice(prodnum, item_price);
}
function setOrderItemPriceLabel(prodnum) {
    const orderItemPriceLabel = document.createElement('div');
    orderItemPriceLabel.setAttribute('id', `online_place_order_item_price_label`);
    orderItemPriceLabel.setAttribute('class', `online_place_order_item_price_label`);
    document.querySelector(`[pricebox-itemid="${prodnum}"]`).appendChild(orderItemPriceLabel);
    orderItemPriceLabel.innerText = 'Item Price : $';        
}

function setOrderItemPrice(prodnum, item_price) {
    const orderItemPrice = document.createElement('div');
    orderItemPrice.setAttribute('id', `online_place_order_item_price`);
    orderItemPrice.setAttribute('class', `online_place_order_item_price`);
    orderItemPrice.setAttribute('price-itemid',`${prodnum}`);    
    document.querySelector(`[pricebox-itemid="${prodnum}"]`).appendChild(orderItemPrice);
    orderItemPrice.innerText = parseFloat(item_price).toFixed(2);
}

function setOrderItemQuantityHandler(prodnum, item_quantity) {
    const orderItemQuantityHandler = document.createElement('div');
    orderItemQuantityHandler.setAttribute('id', `online_place_order_item_quantity_handler`);
    orderItemQuantityHandler.setAttribute('class', `online_place_order_item_quantity_handler`);
    orderItemQuantityHandler.setAttribute('quantity-handler-itemid',`${prodnum}`);  
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemQuantityHandler); 
    orderItemQuantityHandler.innerText = 'Quantity';
    setMinusQuantity(prodnum);
    setOrderItemQuantity(prodnum, item_quantity);
    setPlusQuantity(prodnum);
}

function setOrderItemQuantity(prodnum, item_quantity) {
    const orderItemQuantity = document.createElement('div');
    orderItemQuantity.setAttribute('id', `online_place_order_item_quantity`);
    orderItemQuantity.setAttribute('class', `online_place_order_item_quantity`);
    orderItemQuantity.setAttribute('quantity-itemid',`${prodnum}`);   
    document.querySelector(`[quantity-handler-itemid="${prodnum}"]`).appendChild(orderItemQuantity);    
    orderItemQuantity.innerText = item_quantity;
   
}

function setPlusQuantity(prodnum) {
    const plusQuantityBtn = document.createElement('button');
    plusQuantityBtn.setAttribute('id', `online_place_order_item_plus_quantity_btn`);
    plusQuantityBtn.setAttribute('class', `online_place_order_item_plus_quantity_btn cart_handle_btn`);
    document.querySelector(`[quantity-handler-itemid="${prodnum}"]`).appendChild(plusQuantityBtn);
    plusQuantityBtn.innerText = '➕'; 
}

function setMinusQuantity(prodnum) {
    const minusQuantityBtn = document.createElement('button');
    minusQuantityBtn.setAttribute('id', `online_place_order_item_minus_quantity_btn`);
    minusQuantityBtn.setAttribute('class', `online_place_order_item_minus_quantity_btn cart_handle_btn`);
    document.querySelector(`[quantity-handler-itemid="${prodnum}"]`).appendChild(minusQuantityBtn);
    minusQuantityBtn.innerText = '➖';
}



function getSubTotal(prodnum) {
    const orderSubTotal = document.createElement('div');
    orderSubTotal.setAttribute('id', `online_place_order_item_subtotal`);
    orderSubTotal.setAttribute('class', `online_place_order_item_subtotal`);
    orderSubTotal.setAttribute('subtotal-itemid', `${prodnum}`);
    const item_quantity = parseInt(document.querySelector(`[quantity-itemid="${prodnum}"]`).textContent);
    const item_price = parseFloat(document.querySelector(`[price-itemid="${prodnum}"]`).textContent); 

    const item_subtotal = parseFloat(item_quantity * item_price); 
    console.log(item_quantity);
    console.log(item_price);
    console.log(item_subtotal);

    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderSubTotal);
    orderSubTotal.innerText = `Item Total : $${item_subtotal.toFixed(2)}`;

}

function setShipmentInfo(prodnum) {
    const shipmentInfo = document.createElement('div');
    shipmentInfo.setAttribute('id', `shipmentInfo`);
    shipmentInfo.setAttribute('class', `shipmentInfo`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(shipmentInfo);
    shipmentInfo.innerText = `shipment infomation`;

}

function setOrderItemOptions(prodnum) {
    const orderItemOptions = document.createElement('div');
    orderItemOptions.setAttribute('id', `orderItemOptions`);
    orderItemOptions.setAttribute('class', `orderItemOptions`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemOptions);
    orderItemOptions.innerText = `order item option & summary`;

}

function setGrandTotalContainer() {
    const orderGrandTotal = document.createElement('div');
    orderGrandTotal.setAttribute('id', `online_place_order_item_grandtotal`);
    orderGrandTotal.setAttribute('class', `online_place_order_item_grandtotal`);
    document.querySelector(`.grand_total`).appendChild(orderGrandTotal);
    console.log("set grand total container")

}

function getGrandTotal(amount) {
    console.log("get grand total")
    // const orderGrandTotal = document.createElement('div');
    // orderGrandTotal.setAttribute('class', `online_place_order_item_grandtotal`);

    // // const item_orderGrandTotal = 1000;
    // // const item_orderGrandTotal = parseFloat(document.querySelector(`.online_place_order_item_subtotal.o${}`).innerTextslice(1));
    // document.querySelector(`.grand_total`).appendChild(orderGrandTotal);
    document.querySelector(`.online_place_order_item_grandtotal`).innerText = 'Subtotal $' + amount.toFixed(2);
    


}


/*

document.addEventListener('click',function(e){  
    
    if(e.target && (e.target.className) == 'online_place_order_item_plus_quantity_btn') {
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);

        item_quantity_id.innerText = item_quantity + 1;        

        const item_new_quantity = parseInt(item_quantity_id.innerText);
        const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 

        const item_subtotal = parseFloat(item_new_quantity * item_price);
        document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
       
        //////user cart add up
        if (user_id === 'GUEST') {
        
            /////////////guest cart add up
            console.log(`tmp_order_cart : ${tmp_order_cart}`);
            tmp_order_cart.forEach(element => {
                console.log(element);

                if (element.c_item_no === item_number) {
                    console.log(item_number)
                    element.c_item_quantity++;
                }
            })

            sessionStorage.setItem("cart", JSON.stringify(tmp_order_cart));
        
        } else {
            let data = {
                u_id : user_id,
                item_num : item_number
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                    },
                body: JSON.stringify(data)
            };
            console.log(data);

            fetch(`/item_addup`, options)
            
            .then((res) => res.json())
            .then(result => { console.log(result)})

        }

       
       /// rerendering total
        console.log(`g_total : ${g_total}`)
        const new_grandtotal = g_total + item_price;
        g_total = new_grandtotal;
        document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);


        //////////////////////////////////////////selected item rerender//////

        const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
        const selected_items_list = [];
        selectedEls.forEach((el) => {
            console.log(el)
            if (el.checked == true) {
                selected_items_list.push(el.getAttribute('checked_itemid'));
            }
        });
        console.log(selected_items_list);

        //////////////////// grand total rerendering ////////////////////

        let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
        let tmp_checked_cart = [];
        console.log(tmp_cart);

        for (let i =0 ; i < selected_items_list.length ; i++) {
            tmp_cart.forEach(element => {
                console.log(element)
                if (element.c_item_no == selected_items_list[i]) {
                    tmp_checked_cart.push(element)
                }

            })
        }
        console.log('tmp_checked_cart');
        console.log(tmp_checked_cart);


                
        let total_amount = 0;

        if(this.order_list.length) { 
            console.log(this.order_list);

            for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                this.order_list.forEach(element => {
                    if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                        let price = element.price_sell;
                        let quantity = (user_id === "GUEST") ? 
                            tmp_checked_cart[i].c_item_quantity : element.quantity;
                        total_amount = total_amount + (price * quantity); 
                    }
                });
            }
            getGrandTotal(total_amount);
        }


    }

    if(e.target && (e.target.className) == 'online_place_order_item_minus_quantity_btn') { // item quantity subtract
        console.log("online_place_order_item_minus_quantity_btn");
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        console.log(item_number);
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);

        // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        if (item_quantity > 1) {
            item_quantity_id.innerHTML = item_quantity - 1;
            const item_new_quantity = parseInt(item_quantity_id.innerText);
            const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 

            const item_subtotal = parseFloat(item_new_quantity * item_price);
            document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);


            if (user_id === 'GUEST') {
            
                /////////////guest cart subtract
                console.log(`tmp_order_cart : ${tmp_order_cart}`);
                tmp_order_cart.forEach(element => {
                    console.log(element);

                    if (element.c_item_no === item_number) {
                        console.log(item_number)
                        element.c_item_quantity--;
                    }
                })

                sessionStorage.setItem("cart", JSON.stringify(tmp_order_cart));            
            
            } else {
                let data = {
                    u_id : tmp_order_cart.c_id,
                    item_num : item_number
                };

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        
                        },
                    body: JSON.stringify(data)
                };
                console.log(data);

                fetch(`/item_subtract`, options)
               
                .then((res) => res.json())
                .then(result => { console.log(result)})

            }

            console.log(`g_total : ${g_total}`)
            const new_grandtotal = g_total - item_price;
            g_total = new_grandtotal;
            document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);


                   //////////////////////////////////////////selected item rerender//////

        const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
        const selected_items_list = [];
        selectedEls.forEach((el) => {
            console.log(el)
            if (el.checked == true) {
                selected_items_list.push(el.getAttribute('checked_itemid'));
            }
        });
        console.log(selected_items_list);

        //////////////////// grand total rerendering ////////////////////

        let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
        let tmp_checked_cart = [];
        console.log(tmp_cart);

        for (let i =0 ; i < selected_items_list.length ; i++) {
            tmp_cart.forEach(element => {
                console.log(element)
                if (element.c_item_no == selected_items_list[i]) {
                    tmp_checked_cart.push(element)
                }

            })
        }
        console.log('tmp_checked_cart');
        console.log(tmp_checked_cart);


                
        let total_amount = 0;

        if(this.order_list.length) { 
            console.log(this.order_list);

            for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                this.order_list.forEach(element => {
                    if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                        let price = element.price_sell;
                        let quantity = (user_id === "GUEST") ? 
                            tmp_checked_cart[i].c_item_quantity : element.quantity;
                        total_amount = total_amount + (price * quantity); 
                    }
                });
            }
            getGrandTotal(total_amount);
        }

        }
    }
    

    if(e.target && (e.target.className) == 'online_place_order_item_delete_btn') { // item delete
        // console.log("online_place_order_item_delete_btn");
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        console.log(item_number);
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);
        const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 
        // let item_number = (e.target.className).slice(-1);
        // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
        const delete_item_subtotal = parseFloat(item_quantity * item_price);
        const delete_item = document.querySelector(`[itemid="${item_number}"]`);
        console.log(delete_item);
        document.getElementById('online_place_order_item_container').removeChild(delete_item);

        if (user_id === 'GUEST') {            
            /////////////item delete in guest cart 
            console.log(`tmp_order_cart : ${tmp_order_cart}`);            

            let filtered = tmp_order_cart.filter((element) => element.c_item_no !== item_number);

            console.log(filtered);
            console.log(tmp_order_cart)
            tmp_order_cart = filtered;

            sessionStorage.setItem("cart", JSON.stringify(filtered));
        } else {
            ///// item delete in user cart 
            let data = {
                u_id : tmp_order_cart.c_id,
                item_num : item_number
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                    },
                body: JSON.stringify(data)
            };
            console.log(data);

            fetch(`/item_delete`, options)
           
            .then((res) => res.json())
            .then(result => { console.log(result)})
        }


        const new_grandtotal = g_total - delete_item_subtotal;
        g_total = new_grandtotal;
        document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);

               //////////////////////////////////////////selected item rerender//////

               const selectedEls = document.querySelectorAll('.online_place_order_item_check_btn');
               const selected_items_list = [];
               selectedEls.forEach((el) => {
                   console.log(el)
                   if (el.checked == true) {
                       selected_items_list.push(el.getAttribute('checked_itemid'));
                   }
               });
               console.log(selected_items_list);
       
               //////////////////// grand total rerendering ////////////////////
       
               let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
               let tmp_checked_cart = [];
               console.log(tmp_cart);
       
               for (let i =0 ; i < selected_items_list.length ; i++) {
                   tmp_cart.forEach(element => {
                       console.log(element)
                       if (element.c_item_no == selected_items_list[i]) {
                           tmp_checked_cart.push(element)
                       }
       
                   })
               }
               console.log('tmp_checked_cart');
               console.log(tmp_checked_cart);
       
       
                       
               let total_amount = 0;
       
               if(this.order_list.length) { 
                   console.log(this.order_list);
       
                   for (let i=0 ; i < tmp_checked_cart.length ; i++) {
                       this.order_list.forEach(element => {
                           if (element.prodnum == tmp_checked_cart[i].c_item_no) {
                               let price = element.price_sell;
                               let quantity = (user_id === "GUEST") ? 
                                   tmp_checked_cart[i].c_item_quantity : element.quantity;
                               total_amount = total_amount + (price * quantity); 
                           }
                       });
                   }
                   getGrandTotal(total_amount);
               }
       
    }

});
*/
