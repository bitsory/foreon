import setItemBox from "./set_item_box.js";

export default class {


    online_main = document.getElementById('online_main');

    constructor(user_id, proceed_checkout_selected_order_cart) {
        document.title = "Cafe FORE";
        console.log("order_confirm page")
        // this.order_info2 = order_info;
        this.order_info = {order_info : "order_info"}
        console.log(this.order_info)
        this.user_id = user_id;

        // this.check_out_box_test = new setItemBox(this.user_id, 'check_out_item', proceed_checkout_selected_order_cart);

        this.check_out_box = new setItemBox(this.user_id, 'check_out_item', proceed_checkout_selected_order_cart);
        // console.log(this.check_out_box.user_checkout_ready_cart);

        this.online_main.addEventListener('click', (e) => {

            if(e.target && e.target.className == 'user_checkout_submit_button') {
                console.log('user_checkout_submit_button user_checkout_submit_button user_checkout_submit_button')

                let placed_order_cart = this.check_out_box.getReadyCart()
                console.log(placed_order_cart);

                
                let user_total_amount = 1900;
                const data = {
                    amount : user_total_amount,
                    cart : placed_order_cart
                
                };

                

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'               
                        },
                    body: JSON.stringify(data)
                };
                console.log(options);

                fetch('/user_checkout_submit', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err)); 

                



            }

            if(e.target && e.target.className == 'guest_test_submit') {
                console.log('guest_test_submit guest_test_submit guest_test_submitguest_test_submit')

                let placed_order_cart = this.check_out_box.getReadyCart()
                console.log(placed_order_cart);



            }


        })



    }



    
    getUserOrderConfirm() {
        return `
        <div class="order_confirm">
            <h1>Delivery Info</h1>
            <div id="check_out_items_container" class="check_out_items_container">
            </div>

            <div id="check_out_item_grand_total" class="check_out_item_grand_total">
            </div>

            <div class="user_checkout_container">
                <div class="user_checkout_info">
                    <div class="user_checkout_billing_info"></div>
                    <div class="user_checkout_shipping_info">
                    <div class="user_checkout_shipping_info"></div>
                    </div>
                </div>

            </div>

            <div class="user_checkout_submit_container">
                <div class="user_checkout_submit_button_container">
                    <button class="user_checkout_submit_button">Place My Order</button>
                    <div class="user_checkout_submit_term">By placing your order, you agree to Cafe Fore's privacy notice and conditions of use.</div>
                </div>
                <div class="user_checkout_submit_summary_container">
                    <div class="user_checkout_submit_summary_title">Order Summary</div>
                    <div class="user_checkout_submit_summary_detail">
                        <span class="user_checkout_submit_summary_items">items:</span>
                        <span class="user_checkout_submit_summary_value">
                        <span class="usd">$</span><span class="user_checkout_submit_summary_items_value">00.00</span>
                        </span>
                    </div>
                    <div class="user_checkout_submit_summary_detail">
                        <span class="user_checkout_submit_summary_shipping">Shipping & handling:</span>
                        <span class="user_checkout_submit_summary_value">
                        <span class="usd">$</span><span class="user_checkout_submit_summary_shipping_value">00.00</span>
                        </span>
                    </div>
                    <div class="user_checkout_submit_summary_detail">
                        <span class="user_checkout_submit_summary_before_tax">Total before tax:</span>
                        <span class="user_checkout_submit_summary_value">
                        <span class="usd">$</span><span class="user_checkout_submit_summary_before_tax_value">00.00</span>
                        </span>
                    </div>
                    <div class="user_checkout_submit_summary_detail">
                        <span class="user_checkout_submit_summary_Estimated_tax">Estimated tax:</span>
                        <span class="user_checkout_submit_summary_value">
                        <span class="usd">$</span><span class="user_checkout_submit_summary_Estimated_tax_value">00.00</span>
                        </span>
                    </div>
                    <div class="user_checkout_submit_summary_detail order_total">
                        <span class="user_checkout_submit_summary_order_total">Order total:</span>
                        <span class="user_checkout_submit_summary_value">
                        <span class="usd">$</span><span class="user_checkout_submit_summary_order_total_value">00.00</span>
                        </span>
                    </div>



            </div>

        </div>
        `    
    }


    getGuestOrderConfirm() {
        return `
        <div class="order_confirm">
            <h1>Delivery Info</h1>
            <div id="check_out_items_container" class="check_out_items_container">
            </div>

            <div id="check_out_item_grand_total" class="check_out_item_grand_total">
            </div>

            <div class="container">            
                <form action="/charge" method="post" id="payment-form">
                    <div class="billing_info">
                        <div class="order_info_title">Billing Infomation</div>
                        <div class="form-row top-row">
                            <div id="amount" class="payment_amount_container">
                            
                            <div class="order_total_amount_title">Total Amount $</div><input type="text" name="amount" class="payment_amount" readonly>
                            </div>
                        </div>

                        <div class="form-row top-row">
                            <div id="card-number" class="field card-number"></div>
                            <div class="input-errors" id="card-number-errors" role="alert"></div>
                        </div>

                        <div class="form-row">
                            <div id="card-name" class="field card-name">
                            <input type="text" name="card-name" class="input_card_name" placeholder="Cardholder Name">
                            </div>
                        </div>                    

                        <div class="form-row">
                            <div id="card-date" class="field third-width"></div>
                            <div class="input-errors" id="card-date-errors" role="alert"></div>
                        </div>
                        
                        <div class="form-row">
                            <div id="card-cvv" class="field third-width"></div>
                            <div class="input-errors" id="card-cvv-errors" role="alert"></div>
                        </div>

                        <div class="form-row">
                            <div id="card-postal-code" class="field third-width"></div>
                            <div class="input-errors" id="card-postal-code-errors" role="alert"></div>
                        </div>
                        <div id="card-response" role="alert"></div>

                    </div>

                    <div class="shipping_info">
                        
                        <div class="order_info_title">Shipping Infomation</div>

                        <div class="form-row">
                            <div id="recipient" class="field recipient">
                            <input type="text" name="shipping_recipient" class="input_recipient" placeholder="Recipient">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="shipping_address" class="field shipping_address">
                            <input type="text" name="shipping_address_street" class="input_shipping_address" placeholder="Shipping Address Street">
                            </div>
                        </div>

                        <div class="shipping_info_csz">
                            <div class="form-row csz">
                                <div id="shipping_address" class="field shipping_addres_city">
                                <input type="text" name="shipping_address_city" class="input_shipping_address" placeholder="City">
                                </div>
                            </div>

                            <div class="form-row csz">
                                <div id="shipping_address" class="field shipping_address_state">
                                <input type="text" name="shipping_address_state" class="input_shipping_address" placeholder="State">
                                </div>
                            </div>

                            <div class="form-row csz">
                                <div id="shipping_address" class="field shipping_address_zip">
                                <input type="text" name="shipping_address_zip" class="input_shipping_address" placeholder="Zip Code">
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="order_contact_phone" class="field order_contact_phone">
                            <input type="text" name="order_contact_phone" class="order_contact_phone" placeholder="Phone">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="order_contact_email" class="field order_contact_email">
                            <input type="text" name="order_contact_email" class="order_contact_email" placeholder="Email">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="shipping_option" class="field shipping_option">
                            <input type="text" name="shipping_option" class="input_shipping_option" placeholder="Shipping Option">
                            </div>
                        </div>                      
                        
                    </div>
                        <div class="button-container">
                            <input type="submit" value="Submit">
                        </div>
                    
            
                </form>
            </div>
            <br><br><br>
            <div class="button-container-test">
                <button class="submit_payment_test">Submit Payment Test</button>
                <button class="get_charges_test">get_charges test</button>
                <button class="submit_refund_test">Refund test</button>
                <button class="submit_create_order_test">create order test</button>
                <button class="submit_create_customer_test">create customer test</button><br>
                <button class="submit_create_card_token_test">create card token test</button>
                <button class="submit_create_get_customer_test">create get customer test</button>
                <button class="submit_create_item_test">create item test</button>
                <button class="submit_create_get_order_test">get_order_test</button>
                <button class="submit_get_an_order_test">get_an_order_test</button>
                <button class="pay_order_test">pay_order_test</button>
                <button class="create_customer">create_customer</button>
                <button class="get_single_customer">get_single_customer</button>
                <button class="delete_card">delete_card</button>
                <button class="save_card">save_card</button>
                <button class="guest_test_submit">guest_test_submit</button>

                
                
            </div>

        </div>
        `;
    }

    makeUserCheckOutForm(u_id, proceed_checkout_total, proceed_checkout_selected_order_cart) {

        ///////////////////////////  set item box     ///////////////////////
        console.log('makeUserCheckOutForm(u_id, proceed_checkout_total, proceed_checkout_selected_order_cart)')
        console.log(u_id)
        console.log(proceed_checkout_total)
        console.log(proceed_checkout_selected_order_cart)

        // const check_out_box = new setItemBox(this.user_id, 'check_out_item', proceed_checkout_selected_order_cart);
        // console.log(check_out_box);

        // console.log(check_out_box.user_checkout_ready_cart);
        // ready_for_place_order_cart = proceed_checkout_selected_order_cart;
        
        // check_out_box.getGrandTotal(proceed_checkout_total);
        
        /*
        // make grand total, rendering initiative grand total.
        let total_amount = 0;
        
        if(proceed_checkout_selected_order_cart.length) { 
            proceed_checkout_selected_order_cart.forEach(element => {
                let price = element.price_sell;
                let quantity = element.quantity;
                
                // setOrderItemContainer(element.prodnum, element.price_sell, element.name, quantity, element.image);
                
                total_amount = total_amount + (price * quantity);
                console.log(`total_amount : ${total_amount}`);
            });
            // g_total = total_amount;
            // tmp_order_cart = check_out_cart;

            
    
            if (total_amount !=0) check_out_box.getGrandTotal(total_amount);  // initial render grand total      
        
        }//////////////////////////////

        
        check_out_box.getTotal(total_amount);
        let check_out_amount = 0;
        */
        

        proceed_checkout_selected_order_cart.forEach(element => {
            this.check_out_box.setItemContainer(element.prodnum, element.price_sell, element.name, element.quantity, element.image, "check_out_items_container", "check_out_item")
            // check_out_amount = check_out_amount + (element.price_sell * element.quantity);
            console.log("check_out_amount");
            // console.log(check_out_amount);
        })
        


        ////////////////////////////////////////////////////////////

        let user_total_amount = 0;
        const send_data = {u_id : u_id};

        ////////////////////get user checked cart info

        

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
                },
            body: JSON.stringify(send_data)
        };
        console.log(data);

        fetch(`/get_user_default_billing_info`, data)
        .then((res) => res.json())
        .then(result => {
            console.log("makeUserCheckOutbilling info Form")
            console.log(result) 
            if (result.length > 0) {
                const cardholder = result[0].cardholder; 
                const cardtype = result[0].type;
                const last4 = result[0].last4;

                setUserCheckoutBillingInfo(cardholder, cardtype, last4);
            } else {
                document.querySelector('.user_checkout_billing_info').innerHTML = `
                <div class="user_checkout_billing_info_title">Payment Infomation</div>
                <h2>Nothing have for default payment method yet</h2>
                <h2>Would like to make default payment method?</h2>
                <button type="button" class="set_default_payment_method_btn">Set Up</button>     
                
                `;

            }
        });

        fetch(`/get_user_default_shipping_info`, data)
        .then((res) => res.json())
        .then(result => {
            console.log("makeUserCheckOut shipping info Form")
            console.log(result) 
            if (result.length > 0) {
                const recipient = result[0].recipient; 
                const address1 = result[0].address1;
                const address2 = result[0].address2;
                const city = result[0].city;
                const state = result[0].state;
                const zip = result[0].zip;
                const phone = result[0].phone;
                const email = result[0].email;
                const sh_option = result[0].shipping_option;                

                setUserCheckoutShippingInfo(recipient, address1, address2, city, state, zip, phone, email, sh_option);

            } else {
                document.querySelector('.user_checkout_shipping_info').innerHTML = `
                <div class="user_checkout_shipping_info_title">Shipping Infomation</div>
                <h2>Nothing have for default address yet</h2>
                <h2>Would like to make default address?</h2>
                <button type="button" class="set_default_address_btn">Set Up</button>     
                
                `;

            }
        });


        

            proceed_checkout_selected_order_cart.forEach(element => {
                user_total_amount = user_total_amount + element.quantity * element.price_sell;
                console.log(parseInt(user_total_amount))

            })


            // console.log(parseInt(total_amount))
            console.log(parseInt(user_total_amount))

        
            
            if (parseInt(proceed_checkout_total) === parseInt(user_total_amount)) {
            // if (parseInt(total_amount) === parseInt(user_total_amount)) {
                let shipping_fee = 7.5;
                let total_before_tax = user_total_amount + shipping_fee;
                let estimated_tax = (total_before_tax)* 0.06;
                let order_total = total_before_tax + estimated_tax;
                
                document.querySelector('.user_checkout_submit_summary_items_value').innerText = user_total_amount.toFixed(2);
                document.querySelector('.user_checkout_submit_summary_shipping_value').innerText = shipping_fee.toFixed(2);  
                document.querySelector('.user_checkout_submit_summary_before_tax_value').innerText = total_before_tax.toFixed(2);                       
                document.querySelector('.user_checkout_submit_summary_Estimated_tax_value').innerText = estimated_tax.toFixed(2);
                document.querySelector('.user_checkout_submit_summary_order_total_value').innerText = order_total.toFixed(2);
            } else {
                console.log("check total amount === user_total_amount")
            }



            /*
        fetch(`/shop/checkout/${u_id}`, data)
        // fetch('/shopview', data)
        .then((res) => res.json())
        .then(result => {
            console.log("makeUserCheckOutForm")
            console.log(result)  
            result.forEach(element => {
                user_total_amount = user_total_amount + element.quantity * element.price_sell;
                console.log(parseInt(user_total_amount))

            })

            console.log(parseInt(total_amount))
            console.log(parseInt(user_total_amount))

            if (parseInt(total_amount) === parseInt(user_total_amount)) {
                let shipping_fee = 7.5;
                let total_before_tax = user_total_amount + shipping_fee;
                let estimated_tax = (total_before_tax)* 0.06;
                let order_total = total_before_tax + estimated_tax;
                
                document.querySelector('.user_checkout_submit_summary_items_value').innerText = user_total_amount.toFixed(2);
                document.querySelector('.user_checkout_submit_summary_shipping_value').innerText = shipping_fee.toFixed(2);  
                document.querySelector('.user_checkout_submit_summary_before_tax_value').innerText = total_before_tax.toFixed(2);                       
                document.querySelector('.user_checkout_submit_summary_Estimated_tax_value').innerText = estimated_tax.toFixed(2);
                document.querySelector('.user_checkout_submit_summary_order_total_value').innerText = order_total.toFixed(2);
            } else {
                console.log("check total amount === user_total_amount")
            }

        

        });
        */
        ///////////////// url change


    }



    makeGuestCheckOutForm(check_out_cart, checked_order_list) {
        // const check_out_items_container = document.getElementById('check_out_items_container');

        // const check_out_items = document.createElement('div');
        // check_out_items.setAttribute('id', `check_out_items`);
        // check_out_items.setAttribute('id', `check_out_items`);
        
        // const check_out_box = new setItemBox(this.user_id, 'check_out_item', check_out_cart);
        console.log(this.check_out_box);


        // make grand total, rendering initiative grand total.
        let total_amount = 0;
        
        if(checked_order_list.length) { 
            checked_order_list.forEach(element => {

                let price = element.price_sell;
                let quantity = (this.user_id === "GUEST") ? 
                    (check_out_cart.filter(item => {
                    return item.c_item_name === element.name})[0].c_item_quantity) : element.quantity;
                
                // setOrderItemContainer(element.prodnum, element.price_sell, element.name, quantity, element.image);
                
                total_amount = total_amount + (price * quantity);
                console.log(`total_amount : ${total_amount}`);
            });
            // g_total = total_amount;
            // tmp_order_cart = check_out_cart;

            
    
            if (total_amount !=0) this.check_out_box.getGrandTotal(total_amount);  // initial render grand total      
        
        }//////////////////////////////

        
        this.check_out_box.setTotal(total_amount);
        let check_out_amount = 0;
        

        check_out_cart.forEach(element => {
            this.check_out_box.setItemContainer(element.c_item_no, element.c_item_price, element.c_item_name, element.c_item_quantity, element.c_item_image, "check_out_items_container", "check_out_item")
            // check_out_amount = check_out_amount + (element.c_item_price * element.c_item_price);
            // console.log(check_out_amount);
        })


   
        const order_info = this.order_info;        
        const clover = new Clover('3de85b3b5c3bbea456e24e24596245fd');
    
        const elements = clover.elements();
               

        const styles = {
            body: {
                fontfamily: 'Jost, sans-serif',
            //   fontFamily: 'Roboto, Open Sans, sans-serif',
              fontSize: '10px',
            },
            input: {
              fontSize: '16px',
            },
        };
        
        const cardNumber = elements.create('CARD_NUMBER', styles);
        // const cardName = elements.create('CARD_NAME', styles);
        const cardDate = elements.create('CARD_DATE', styles);
        const cardCvv = elements.create('CARD_CVV', styles);
        const cardPostalCode = elements.create('CARD_POSTAL_CODE', styles);
            
        cardNumber.mount('#card-number');
        // cardName.mount('#card-name');
        cardDate.mount('#card-date');
        cardCvv.mount('#card-cvv');
        cardPostalCode.mount('#card-postal-code');

        const cardResponse = document.getElementById('card-response');
        const displayCardNumberError = document.getElementById('card-number-errors');
        const displayCardDateError = document.getElementById('card-date-errors');
        const displayCardCvvError = document.getElementById('card-cvv-errors');
        const displayCardPostalCodeError = document.getElementById('card-postal-code-errors');
        const payment_form = document.getElementById('payment-form');
        const amount = document.querySelector('.payment_amount');
       

        amount.value = parseFloat(total_amount).toFixed(2);
      
        // Handle real-time validation errors from the card element
        cardNumber.addEventListener('change', function(event) {
        console.log(`cardNumber changed ${JSON.stringify(event)}`);
        });

        cardNumber.addEventListener('blur', function(event) {
        console.log(`cardNumber blur ${JSON.stringify(event)}`);
        });

        cardDate.addEventListener('change', function(event) {
        console.log(`cardDate changed ${JSON.stringify(event)}`);
        });

        cardDate.addEventListener('blur', function(event) {
            console.log(`cardDate blur ${JSON.stringify(event)}`);
        });

        cardCvv.addEventListener('change', function(event) {
            console.log(`cardCvv changed ${JSON.stringify(event)}`);
        });

        cardCvv.addEventListener('blur', function(event) {
            console.log(`cardCvv blur ${JSON.stringify(event)}`);
        });

        cardPostalCode.addEventListener('change', function(event) {
            console.log(`cardPostalCode changed ${JSON.stringify(event)}`);
        });

        cardPostalCode.addEventListener('blur', function(event) {
            console.log(`cardPostalCode blur ${JSON.stringify(event)}`);
        });

        payment_form.addEventListener('submit', function(event) {
            console.log("payment_form.addEventListener('submit', function(event)")
            event.preventDefault();
            // Use the iframe's tokenization method with the user-entered card details
            clover.createToken()
                .then(function(result) {
                if (result.errors) {
                Object.values(result.errors).forEach(function (value) {
                    displayError.textContent = value;
                });
                } else {
                cloverTokenHandler(result.token, order_info);
                }
            });
        });        
    }    
}

let g_total = 0;
let tmp_order_cart = {};


function cloverTokenHandler(token, order_info) {
    console.log(token)
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);

    var orderInput = document.createElement('input');
    orderInput.setAttribute('type', 'hidden');
    orderInput.setAttribute('name', 'order_info');
    orderInput.setAttribute('value', order_info);
    form.appendChild(orderInput);

    form.submit();
}

// function setUserCheckoutInfo() {
//     setUserCheckoutBillingInfo();
//     setUserCheckoutShippingInfo();


// }

function setUserCheckoutBillingInfo(cardholder, type, last4) {
    const user_checkout_billing_info_detail = document.createElement('div');
    user_checkout_billing_info_detail.setAttribute('id', `user_checkout_billing_info_detail`);
    user_checkout_billing_info_detail.setAttribute('class', `user_checkout_billing_info_detail`);
    document.querySelector('.user_checkout_billing_info').appendChild(user_checkout_billing_info_detail);

    setUserCheckoutBillingInfoCard(cardholder, type, last4);
    

}

function setUserCheckoutBillingInfoCard(cardholder, type, last4) {
    const user_checkout_billing_info_detail = document.getElementById('user_checkout_billing_info_detail');
    
    const user_checkout_billing_info_title = document.createElement('div');
    user_checkout_billing_info_title.setAttribute('id', `user_checkout_billing_info_title`);

    const user_checkout_billing_info_cardholder = document.createElement('div');
    user_checkout_billing_info_cardholder.setAttribute('id', `user_checkout_billing_info_cardholder`);

    const user_checkout_billing_info_cardtype = document.createElement('div');
    user_checkout_billing_info_cardtype.setAttribute('id', `user_checkout_billing_info_cardtype`);

    const user_checkout_billing_info_text = document.createElement('div');
    user_checkout_billing_info_text.setAttribute('id', `user_checkout_billing_info_text`);

    const user_checkout_billing_info_cardlast4 = document.createElement('div');
    user_checkout_billing_info_cardlast4.setAttribute('id', `user_checkout_billing_info_cardlast4`);
    
    const user_checkout_billing_info_context = document.createElement('div');
    user_checkout_billing_info_context.setAttribute('id', `user_checkout_billing_info_context`);

    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_title);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_cardholder);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_cardtype);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_text);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_cardlast4);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_context);

    user_checkout_billing_info_title.innerHTML = "Payment Infomation";
    user_checkout_billing_info_cardholder.innerHTML = cardholder;
    user_checkout_billing_info_cardtype.innerHTML = type;
    user_checkout_billing_info_text.innerHTML = "ending in";
    user_checkout_billing_info_cardlast4.innerHTML = last4;
    user_checkout_billing_info_context.innerHTML = `
        <a href="#">Change method</a>
        <div class"user_checkout_billing_info_promotion_container">
            Add a gift card or promotion code or voucher
            <form action="/promotion" method="post" id="promotion_code_form">
                <input type="text" name="promotion_code" class="input_promotion_code" placeholder="Enter Code">
                <span class="promotion_code_button-container">
                <input type="submit" value="Apply">
                </span>
            </form>
        </div>
    `;
}

function setUserCheckoutShippingInfo(recipient, address1, address2, city, state, zip, phone, email, sh_option) {

    const user_checkout_shipping_info_detail = document.createElement('div');
    user_checkout_shipping_info_detail.setAttribute('id', `user_checkout_shipping_info_detail`);
    user_checkout_shipping_info_detail.setAttribute('class', `user_checkout_shipping_info_detail`);
    document.querySelector('.user_checkout_shipping_info').appendChild(user_checkout_shipping_info_detail); 
    
    const user_checkout_shipping_info_title = document.createElement('div');
    user_checkout_shipping_info_title.setAttribute('id', `user_checkout_shipping_info_title`);
    
    
    const user_checkout_shipping_info_recipient = document.createElement('div');
    user_checkout_shipping_info_recipient.setAttribute('id', `user_checkout_shipping_info_recipient`);
    user_checkout_shipping_info_recipient.setAttribute('type', `hidden`);

    const user_checkout_shipping_info_address1 = document.createElement('div');
    user_checkout_shipping_info_address1.setAttribute('id', `user_checkout_shipping_info_address1`);

    const user_checkout_shipping_info_address2 = document.createElement('div');
    user_checkout_shipping_info_address2.setAttribute('id', `user_checkout_shipping_info_address2`);

    const user_checkout_shipping_info_csz = document.createElement('div');
    user_checkout_shipping_info_csz.setAttribute('id', `user_checkout_shipping_info_csz`);

    const user_checkout_shipping_info_city = document.createElement('div');
    user_checkout_shipping_info_city.setAttribute('id', `user_checkout_shipping_info_city`);

    const user_checkout_shipping_info_state = document.createElement('div');
    user_checkout_shipping_info_state.setAttribute('id', `user_checkout_shipping_info_state`);

    const user_checkout_shipping_info_zip = document.createElement('div');
    user_checkout_shipping_info_zip.setAttribute('id', `user_checkout_shipping_info_zip`);

    const user_checkout_shipping_info_phone = document.createElement('div');
    user_checkout_shipping_info_phone.setAttribute('id', `user_checkout_shipping_info_phone`);

    const user_checkout_shipping_info_email = document.createElement('div');
    user_checkout_shipping_info_email.setAttribute('id', `user_checkout_shipping_info_email`);

    const user_checkout_shipping_info_sh_option = document.createElement('div');
    user_checkout_shipping_info_sh_option.setAttribute('id', `user_checkout_shipping_info_sh_option`);

    const user_checkout_shipping_info_context = document.createElement('div');
    user_checkout_shipping_info_context.setAttribute('id', `user_checkout_shipping_info_context`);

    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_title);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_recipient);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_address1);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_address2);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_csz);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_city);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_state);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_zip);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_phone);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_email);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_sh_option);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_context);

    user_checkout_shipping_info_title.innerHTML = "Shipping Infomation";
    user_checkout_shipping_info_recipient.innerHTML = recipient;
    user_checkout_shipping_info_address1.innerHTML = address1;
    user_checkout_shipping_info_address2.innerHTML = address2;
    user_checkout_shipping_info_city.innerHTML = city;
    user_checkout_shipping_info_state.innerHTML = state;
    user_checkout_shipping_info_zip.innerHTML = zip;
    user_checkout_shipping_info_phone.innerHTML = phone;
    user_checkout_shipping_info_email.innerHTML = email;
    user_checkout_shipping_info_sh_option.innerHTML = sh_option;
    user_checkout_shipping_info_context.innerHTML = `<a href="#">Change address</a>`;


}


/*
document.addEventListener('click',function(e){  

    console.log(e.target);

    if(e.target && e.target.className == 'user_checkout_submit_button') {
        
        console.log("user_checkout_submit_button hit");
        
        const ready_for_place_order_item = document.querySelectorAll('.check_out_item_container');
        const selected_items_number_list = [];
        ready_for_place_order_item.forEach((el) => {
                        console.log(el)
                        
                            selected_items_number_list.push(el.getAttribute('itemid'));
                        
                    });
                    console.log(selected_items_number_list);



        // let test = ready_for_place_order_cart;
        // console.log('ready_for_place_order_cart');
        // console.log(test);
        
        
        let user_total_amount = 1900;
        const data = {
            amount : user_total_amount
        
        };

        

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'               
                },
            body: JSON.stringify(data)
        };
        console.log(options);

        fetch('/user_checkout_submit', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
        


    }
});
*/








//////////////////////////////////  API TEST/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click',function(e){  
    
    
    
    if(e.target && e.target.className == 'submit_payment_test') {

        console.log('submit_payment_test')
        

        fetch('/submit_payment_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'get_charges_test') {

        console.log('get_charges_test')
                  
        fetch('/get_charges')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_refund_test') {

        console.log('submit_payment_test')
                  
        fetch('/refund_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_create_order_test') {

        console.log('submit_payment_test')
                  
        fetch('/create_order_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_create_customer_test') {

        console.log('submit_payment_test')
                  
        fetch('/create_customer_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_create_card_token_test') {

        console.log('submit_payment_test')
                  
        fetch('/create_card_token')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }
    
    if(e.target && e.target.className == 'submit_create_get_customer_test') {

        console.log('submit_create_get_customer_test')
                  
        fetch('/get_customer')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_create_item_test') {

        console.log('submit_create_item_test')
                  
        fetch('/create_item')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_create_get_order_test') {

        console.log('submit_create_get_order_test')
                  
        fetch('/get_order_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'submit_get_an_order_test') {

        console.log('submit_get_an_order_test')
                  
        fetch('/get_an_order_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'pay_order_test') {

        console.log('pay_order_test')
                  
        fetch('/pay_order_test')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
    }

    if(e.target && e.target.className == 'create_customer') {

        console.log('create_customer')
                  
        fetch('/create_customer')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
    }

    
    if(e.target && e.target.className == 'get_single_customer') {

        console.log('get_single_customer')
                  
        fetch('/get_single_customer')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
    }
 
    if(e.target && e.target.className == 'delete_card') {

        console.log('delete_card')
                  
        fetch('/delete_card')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
    }

    if(e.target && e.target.className == 'save_card') {

        console.log('save_card')
                  
        fetch('/save_card')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
    }

    
});
