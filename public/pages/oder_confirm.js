import setItemBox from "./set_item_box.js";
import orderComplete from "./order_complete.js";
import * as AIF from "./form_acc_info.js";
import * as ItemCounter from "./item_counter.js";
import * as CartRender from "./cart.js";


export default class {

    online_main = document.getElementById('online_main');
    // guest_check_out_info = {};
    payload = {};
    user_default_shipping_info = {};
    user_default_billing_info = {};
    

    constructor(user_id, proceed_checkout_selected_order_cart) {
        document.title = "Cafe FORE";
        console.log("order_confirm page")
        // this.order_info2 = order_info;
        this.order_info = {order_info : "order_info"}
        console.log(this.order_info)
        this.user_id = user_id;
        // this.guest_check_out_info = {};

        
        this.check_out_box = new setItemBox(this.user_id, 'check_out_item', proceed_checkout_selected_order_cart);
      
        
        this.online_main.addEventListener('click', (e) => {

            console.log("order confirm double check order confirm double check order confirm double check ")

            

            if(e.target && e.target.className == 'user_checkout_submit_button') {

                turnOffDisplay();
                console.log('user_checkout_submit_button user_checkout_submit_button user_checkout_submit_button')
                
                document.getElementById('user_checkout_submit_button').setAttribute('disabled', 'true');
                let placed_order_cart = this.check_out_box.getReadyCart()
                console.log(placed_order_cart);
                const shipping_rate = this.check_out_box.checkShippingRate();
                console.log(shipping_rate);
                
                const data = {
                    cart : placed_order_cart,
                    shipping_rate : shipping_rate                
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
                .then(response => {
                    console.log(response)
                    if (response.status == 'complete') {
                    ////////// order-confirmation page ///////////////////////
                    turnOnDisplay();
                    setOrderConfirmationPage(response);
                    ItemCounter.item_counter(this.user_id);

                    }
                    

                })
                .catch(err => console.error(err));

            }

            if(e.target && e.target.id == 'same_shipping_billing_address_checkbtn') {

                const address1 = document.getElementById("input_shipping_address_line1").value;
                const address2 = document.getElementById("input_shipping_address_line2").value;
                const city = document.getElementById("input_shipping_address_city").value;
                const state = document.getElementById("shipping_address_state").value;
                const zip = document.getElementById("input_shipping_address_zip").value;
                const phone = document.getElementById("input_shipping_contact_phone").value;
                const email = document.getElementById("input_shipping_contact_email").value;

                if (document.getElementById("same_shipping_billing_address_checkbtn").checked == true) {
                                       
                    document.getElementById("input_billing_address_line1").value = address1;
                    document.getElementById("input_billing_address_line2").value = address2;
                    document.getElementById("input_billing_address_city").value = city;
                    document.getElementById("input_billing_address_state").value = state;
                    document.getElementById("input_billing_address_zip").value = zip;
                    document.getElementById("input_billing_contact_phone").value = phone;
                    document.getElementById("input_billing_contact_email").value = email;

                    document.getElementById("same_billing_shipping_address_checkbtn").checked = true;
                
                } else {
                    document.getElementById("input_billing_address_line1").value = '';
                    document.getElementById("input_billing_address_line2").value = '';
                    document.getElementById("input_billing_address_city").value = '';
                    document.getElementById("input_billing_address_state").value = '';
                    document.getElementById("input_billing_address_zip").value = '';
                    document.getElementById("input_billing_contact_phone").value = '';
                    document.getElementById("input_billing_contact_email").value = '';

                    document.getElementById("same_billing_shipping_address_checkbtn").checked = false;
                }

            }

            if(e.target && e.target.id == 'same_billing_shipping_address_checkbtn') {

                const address1 = document.getElementById("input_shipping_address_line1").value;
                const address2 = document.getElementById("input_shipping_address_line2").value;
                const city = document.getElementById("input_shipping_address_city").value;
                const state = document.getElementById("shipping_address_state").value;
                const zip = document.getElementById("input_shipping_address_zip").value;
                const phone = document.getElementById("input_shipping_contact_phone").value;
                const email = document.getElementById("input_shipping_contact_email").value;

                if (document.getElementById("same_billing_shipping_address_checkbtn").checked == true) {
                                       
                    document.getElementById("input_billing_address_line1").value = address1;
                    document.getElementById("input_billing_address_line2").value = address2;
                    document.getElementById("input_billing_address_city").value = city;
                    document.getElementById("input_billing_address_state").value = state;
                    document.getElementById("input_billing_address_zip").value = zip;
                    document.getElementById("input_billing_contact_phone").value = phone;
                    document.getElementById("input_billing_contact_email").value = email;

                    document.getElementById("same_shipping_billing_address_checkbtn").checked = true;
                
                } else {
                    document.getElementById("input_billing_address_line1").value = '';
                    document.getElementById("input_billing_address_line2").value = '';
                    document.getElementById("input_billing_address_city").value = '';
                    document.getElementById("input_billing_address_state").value = '';
                    document.getElementById("input_billing_address_zip").value = '';
                    document.getElementById("input_billing_contact_phone").value = '';
                    document.getElementById("input_billing_contact_email").value = '';

                    document.getElementById("same_shipping_billing_address_checkbtn").checked = false;
                }

            }
            

            if(e.target && e.target.id == 'set_default_address_btn') {

                
                document.getElementById('lorem').innerHTML = AIF.addShippingInfoBox();
                AIF.addShippingInfo();
            }

            if(e.target && e.target.id == 'set_default_payment_method_btn') {
                document.getElementById('lorem').innerHTML = AIF.addBillingInfoBox();
                AIF.addBillingMethodForm();
                // exp.cloverTokenHandler(token);

            }

            if (e.target && e.target.id == 'user_checkout_shipping_info_change_btn') {
                
                document.getElementById('user_checkout_shipping_info_detail_box').style.display = "none";
                document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                document.getElementById('user_checkout_shipping_method_container_cover').style.display = "block";
                document.getElementById('user_checkout_shipping_method_container').style.display = "none";
                document.getElementById('user_checkout_billing_info_cover').style.display = "block";
                document.getElementById('user_checkout_billing_info').style.display = "none";
                document.getElementById('user_checkout_submit_button').setAttribute("disabled", "true");
                

                document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = 
                `
                <div id="change_profile_shipping_info" class="change_profile_shipping_info">
                    <div id="shipping_info_container" class="shipping_info_container">
                        <div id="shipping_info_box" class="shipping_info_box"></div> 
                    </div>
                    <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container">
                        <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                    </div>
                </div>
                
                `;
                
                // document.getElementById('lorem').innerHTML = AIF.mekeChangePrifileTap();
               
                // let tab_links = document.querySelectorAll('li.tab-link');
                // let tab_contents = document.querySelectorAll('div.tab-content');

                // for (const element of tab_links) {
                //     element.classList.remove('current');                
                // }
                // for (const element of tab_contents) {             
                //     element.classList.remove('current');
                // }
           
                // console.log(document.querySelector(".tab-link").getAttribute('data-tab'));
                // document.getElementById("tab-3").classList.add('current');
            

              
            
                // const shipping_info_box = document.querySelector('.shipping_info_box');
                // while (shipping_info_box.hasChildNodes()) {	
                //     shipping_info_box.removeChild(shipping_info_box.firstChild);
                // }
    
              
                document.querySelector('.shipping_info_add_btn_container').style.display = "block";
                fetch('/get_user_shipping_info') // get shipping info from DB
                .then((res) => res.json())
                .then(result => {
                    CartRender.renderShippingInfo(result);
                });


            }           

            if (e.target && e.target.id == 'user_checkout_change_method_btn') {
                document.getElementById('lorem').innerHTML = AIF.mekeChangePrifileTap();
                // let tab_id = document.querySelector("tab-link").getAttribute('data-tab');
                // let tab_id = "tab-3";
                let tab_links = document.querySelectorAll('li.tab-link');
                let tab_contents = document.querySelectorAll('div.tab-content');

                for (const element of tab_links) {
                    element.classList.remove('current');                
                }
                for (const element of tab_contents) {             
                    element.classList.remove('current');
                }                
                console.log(document.querySelector(".tab-link").getAttribute('data-tab'));
                document.getElementById("tab-2").classList.add('current');
                // document.querySelector(".tab-3").classList.add('current');
                

                history.pushState(null, null, `/account/billing-infomation`);
                const billing_info_box = document.querySelector('.billing_info_box');
                while (billing_info_box.hasChildNodes()) {	
                    billing_info_box.removeChild(billing_info_box.firstChild);
                }
    
                // document.querySelector('.billing_info_box').innerHTML = makeBillingInfoBox();
                document.querySelector('.billing_info_add_btn_container').style.display = "block";
                fetch('/get_user_billing_info') // get billiing info from DB
                .then((res) => res.json())
                .then(result => {
                    console.log(result);
                    if (result.length > 0) {
                        console.log(result)    
                        CartRender.renderBillingInfo(result); 
                    }
                })


            }           

            if (e.target && e.target.id == 'user_checkout_shipping_info_next_btn') {
                
                document.getElementById('user_checkout_shipping_method_container').style.display = "block";
                document.getElementById('user_checkout_shipping_info_detail_box').style.display = "none";
                document.getElementById('user_checkout_shipping_info_next_btn').style.display = "none";
                document.getElementById('user_checkout_shipping_method_container_cover').style.display = "none";
                this.getUserDefaultShippingInfomation(user_id).then(data => {
                    // console.log(data)
                    // const shipping_info = this.getUserDefaultShippingInfo();
                    // console.log(shipping_info);
                    document.getElementById('user_checkout_shipping_info_detail_box_cover').innerText = data.recipient + '\n' + data.address1 + '\n' + data.city + ', ' + data.state + ' ' + data.zip;
                
                    this.getShippingRate(this.check_out_box.user_shipping_info);
                    this.check_out_box.shipping_rate_flag = true;
                });
                
            }

            if(e.target && e.target.id == 'user_continue_to_payment_btn') {
                document.getElementById('user_checkout_shipping_method_container_cover').style.display = "block";
                document.getElementById('user_checkout_shipping_method_container').style.display = "none";
                document.getElementById('user_checkout_billing_info').style.display = "block";
                document.getElementById('user_checkout_billing_info_cover').style.display = "none";
                this.check_out_box.setShippingMethodCoverContents(user_id);


            }
            

            if(e.target && e.target.id == 'user_checkout_billing_info_next_btn') {

                document.getElementById('user_checkout_billing_info').style.display = "none";
                document.getElementById('user_checkout_billing_info_cover').style.display = "block";

                const billing_info = this.getUserDefaultBillingInfo();
                console.log(billing_info);

                document.getElementById('user_checkout_billing_info_container_cover_contents').innerText = 
                "**********" + billing_info.last4 + ' ' + billing_info.cardtype + ' ' + billing_info.exp.slice(0,2) + '/' + billing_info.exp.slice(-2);

                document.getElementById('user_checkout_submit_button').disabled = false;
                document.getElementById('user_checkout_submit_button').focus();

            }

            if(e.target && e.target.id == 'guest_checkout_shipping_info_next_btn') {
                
                document.getElementById('guest_checkout_shipping_info').style.display = "none";
                document.getElementById('guest_checkout_shipping_infomation_container_cover').style.display = "block";
                document.getElementById('guest_checkout_shipping_infomation_container_cover').style.height = "auto";
                document.getElementById('guest_checkout_shipping_method_container_cover').style.display = "none";
                document.getElementById('guest_shipping_method_container').style.display = "block";
                document.getElementById('guest_checkout_shipping_infomation_container_change_btn').style.display = "block";
                
                this.getShippingRate('GUEST');
                this.check_out_box.shipping_rate_flag = true;

                const data = {
                    recipient : document.getElementById('input_recipient_first_name').value + ' ' +document.getElementById('input_recipient_last_name').value,
                    address : document.getElementById('input_shipping_address_line1').value + ' ' + document.getElementById('input_shipping_address_line2').value,
                    city : document.getElementById('input_shipping_address_city').value,
                    state : document.getElementById('shipping_address_state').value,
                    zip : document.getElementById('input_shipping_address_zip').value,
                }

                document.getElementById('guest_checkout_shipping_infomation_container_cover_contents').innerText = data.recipient + '\n' + data.address + '\n' + data.city + ', ' + data.state + ' ' + data.zip;

            }
            if(e.target && e.target.id == 'continue_to_payment_btn') {
                document.getElementById('guest_shipping_method_container').style.display = "none";
                document.getElementById('guest_checkout_shipping_method_container_cover').style.display = "block";
                document.getElementById('guest_checkout_shipping_method_container_cover').style.height = "auto";
                document.getElementById('guest_checkout_billing_info_form_cover').style.display = "none";
                document.getElementById('guest_checkout_billing_info_form').style.display = "block";
                // document.getElementById('guest_checkout_shipping_method_container_cover_contents').innerText = "test shipping rate"
                document.getElementById('guest_checkout_shipping_method_container_change_btn').style.display = "block";

                this.check_out_box.setShippingMethodCoverContents("GUEST");
            }
            
            if (e.target && e.target.id == 'guest_checkout_submit_button') {
                console.log("this.check_out_box.guest_items_subtotal");
                console.log(this.check_out_box.guest_items_subtotal);
                (this.check_out_box.guest_items_subtotal > 0) ? guestCheckoutSubmit(guest_payload) : false;
            }

            if (e.target && e.target.id == 'guest_checkout_shipping_infomation_container_change_btn') {
                document.getElementById('guest_checkout_shipping_info').style.display = "block";
                document.getElementById('guest_checkout_shipping_infomation_container_cover').style.display = "none";
                // document.getElementById('guest_checkout_shipping_infomation_container_cover').style.height = "auto";
                // document.getElementById('guest_checkout_shipping_method_container_cover').style.display = "none";
                // document.getElementById('guest_shipping_method_container').style.display = "block";
                document.getElementById('guest_checkout_shipping_infomation_container_change_btn').style.display = "none";
                
                document.getElementById('input_recipient_first_name').focus();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'});
            }

            if (e.target && e.target.id == 'guest_checkout_shipping_method_container_change_btn') {
                document.getElementById('guest_shipping_method_container').style.display = "block";
                document.getElementById('guest_checkout_shipping_method_container_cover').style.display = "none";
                // document.getElementById('guest_checkout_shipping_method_container_cover').style.height = "auto";
                document.getElementById('guest_checkout_billing_info_form_cover').style.display = "block";
                document.getElementById('guest_checkout_billing_info_form').style.display = "none";
                // document.getElementById('guest_checkout_shipping_method_container_cover_contents').innerText = "test shipping rate"
                document.getElementById('guest_checkout_shipping_method_container_change_btn').style.display = "none";

                document.getElementById('guest_shipping_method_container').focus();
                
            }
            
            if (e.target && e.target.id == 'guest_checkout_billing_infomation_container_change_btn') {
                document.getElementById('guest_checkout_billing_info_form_cover').style.display = "none";
                // document.getElementById('guest_checkout_billing_info_form_cover').style.height = "auto";
                document.getElementById('guest_checkout_billing_infomation_container_change_btn').style.display = "none";
                // document.getElementById('guest_checkout_billing_info_form_cover_contents').innerText = 
                // '**********' + card_info.last4 + ' ' + card_info.brand + ' ' + card_info.exp;
                
                document.getElementById('guest_checkout_billing_info_form').style.display = "block";
                document.getElementById('guest_checkout_submit_button').setAttribute("disabled", "true");

                
                document.getElementById('input_billing_address_line1').focus();
                e.preventDefault();
                
            }
        })
    }

    setCheckoutPage(){
        return`
        <div id="online_checkout_container" class="online_checkout_container">
            <div id="online_checkout_info_box" class="online_checkout_info_box">
            </div>
            <div id="online_checkout_handle_box" class="online_checkout_handle_box">
                <div id="online_checkout_submit_box" class="online_checkout_submit_box">
                </div>
                <div id="online_checkout_item_box" class="online_checkout_item_box">
                </div>
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
        let user_total_amount = 0;
        let user_total_item_weight = 0;

        proceed_checkout_selected_order_cart.forEach(element => {
            this.check_out_box.setItemContainer(element.prodnum, element.price_sell, element.name, element.quantity, element.image, "check_out_items_container", "check_out_item")
            let item_weight = element.weight;
            user_total_item_weight = user_total_item_weight + (element.quantity * item_weight);
            user_total_amount = user_total_amount + element.quantity * element.price_sell;
            console.log(parseInt(user_total_amount))
            // check_out_amount = check_out_amount + (element.price_sell * element.quantity);
            console.log("user_total_amount");
            console.log(user_total_amount);
            console.log('user_total_item_weight');
            console.log(user_total_item_weight);
        });

        this.check_out_box.setItemTotalWeight(u_id, user_total_item_weight);
        
        this.check_out_box.setTotal(u_id, user_total_amount);
        
        const send_data = {u_id : u_id};

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
                this.user_default_billing_info = {
                    cardholder : result[0].cardholder,
                    cardtype : result[0].type,
                    last4 : result[0].last4,
                    exp : result[0].exp
                };

                const cardholder = result[0].cardholder; 
                const cardtype = result[0].type;
                const last4 = result[0].last4;

                setUserCheckoutBillingInfo(this.user_default_billing_info.cardholder, this.user_default_billing_info.cardtype, this.user_default_billing_info.last4);
            } else {
                document.querySelector('.user_checkout_billing_info').innerHTML = `
                <div class="user_checkout_billing_info_title">Payment Infomation</div>
                <h2>Nothing have for default payment method yet</h2>
                <h2>Would like to make default payment method?</h2>
                <button type="button" id="set_default_payment_method_btn" class="set_default_payment_method_btn" title="set payment method">Set Up</button>     
                
                `;

            }
        });

        fetch(`/get_user_default_shipping_info`, data)
        .then((res) => res.json())
        .then(result => {
            console.log("makeUserCheckOut shipping info Form")
            console.log(result) 
            if (result.length > 0) {
                this.user_default_shipping_info = {
                    recipient : result[0].recipient,
                    address1 : result[0].address1,
                    address2 : result[0].address2,
                    city : result[0].city,
                    state : result[0].state,
                    zip : result[0].zip,
                    phone : result[0].phone,
                    email : result[0].email,
                    sh_option : result[0].shipping_option
                }

                setUserCheckoutShippingInfo(this.user_default_shipping_info);
                
                this.check_out_box.setUserShippingInfo(this.user_default_shipping_info);

            } else {
                document.querySelector('.user_checkout_shipping_info').innerHTML = `
                <div class="user_checkout_shipping_info_title">Shipping Infomation</div>
                <h2>Nothing have for default address yet</h2>
                <h2>Would like to make default address?</h2>
                <button type="button" id="set_default_address_btn" class="set_default_address_btn" title="set shipping address">Set Up</button>     
                
                `;

            }
        });
        
        console.log(parseInt(user_total_amount))
        
        if (parseInt(proceed_checkout_total) === parseInt(user_total_amount)) {
        // if (parseInt(total_amount) === parseInt(user_total_amount)) {
            const item_count = proceed_checkout_selected_order_cart.length;
            const shipping_fee = 9.90;
            const total_before_tax = user_total_amount + shipping_fee;
            const estimated_tax = (total_before_tax)* 0.06;
            const order_total = total_before_tax + estimated_tax;
            document.getElementById('checkout_submit_summary_items_count').innerText = item_count;
            document.getElementById('checkout_submit_summary_items_value').innerText = user_total_amount.toFixed(2);
            document.getElementById('checkout_submit_summary_shipping_value').innerText = shipping_fee.toFixed(2);  
            document.getElementById('checkout_submit_summary_before_tax_value').innerText = total_before_tax.toFixed(2);                       
            document.getElementById('checkout_submit_summary_Estimated_tax_value').innerText = estimated_tax.toFixed(2);
            document.getElementById('checkout_submit_summary_order_total_value').innerText = order_total.toFixed(2);
            
        } else {
            console.log("check total amount === user_total_amount")
        }
    }



    makeGuestCheckOutForm(check_out_cart, checked_order_list) {
              
        console.log(this.check_out_box);
        console.log(check_out_cart)
        console.log(checked_order_list)

        // let key = {};
        const send_data = {u_id : 'getkey'};

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
                },
            body: JSON.stringify(send_data)
        };
        console.log(data);

        fetch(`/get_api_key`, data)
        .then((res) => res.json())
        .then(result => {
            const key = result;

            let guest_total_amount = 0;
            let guest_total_item_weight = 0;
            
            if(checked_order_list.length) { 
                checked_order_list.forEach(element => {
                    
                    let price = element.price_sell;
                    let quantity = (this.user_id == "GUEST") ? 
                        (check_out_cart.filter(item => {
                        return item.c_item_name == element.name})[0].c_item_quantity) : element.quantity;
                    let item_weight = element.weight;

                    // setOrderItemContainer(element.prodnum, element.price_sell, element.name, quantity, element.image);
                    
                    guest_total_amount = guest_total_amount + (price * quantity);
                    console.log(`total_amount : ${guest_total_amount}`);
                    guest_total_item_weight = guest_total_item_weight + (quantity * item_weight);
                    console.log('guest_total_item_weight');
                    console.log(guest_total_item_weight);
                });
                // g_total = total_amount;
                // tmp_order_cart = check_out_cart;
        
                // if (total_amount !=0) this.check_out_box.getGrandTotal(total_amount);  // initial render grand total      
            
            }//////////////////////////////

            this.check_out_box.setItemTotalWeight('GUEST', guest_total_item_weight);


            this.check_out_box.setTotal('GUEST', guest_total_amount);
                

            check_out_cart.forEach(element => {
                this.check_out_box.setItemContainer(element.c_item_no, element.c_item_price, element.c_item_name, element.c_item_quantity, element.c_item_image, "check_out_items_container", "check_out_item");
                // check_out_amount = check_out_amount + (element.c_item_price * element.c_item_price);
                // console.log(check_out_amount);
            })

            const item_count = check_out_cart.length;
            const shipping_fee = 9.90;
            // const total_before_tax = guest_total_amount + shipping_fee;
            const total_before_tax = this.check_out_box.getTotal() + shipping_fee;
            const estimated_tax = (total_before_tax)* 0.06;
            const order_total = total_before_tax + estimated_tax;
            document.getElementById('checkout_submit_summary_items_count').innerText = item_count;
            document.getElementById('checkout_submit_summary_items_value').innerText = guest_total_amount.toFixed(2);
            document.getElementById('checkout_submit_summary_shipping_value').innerText = shipping_fee.toFixed(2);  
            document.getElementById('checkout_submit_summary_before_tax_value').innerText = total_before_tax.toFixed(2);                       
            document.getElementById('checkout_submit_summary_Estimated_tax_value').innerText = estimated_tax.toFixed(2);
            document.getElementById('checkout_submit_summary_order_total_value').innerText = order_total.toFixed(2);


    
            // const order_info = this.order_info;   
            const order_items = sessionStorage.getItem("checkoutcart"); 
            console.log(order_items);  
            const clover = new Clover(key.key);
        
            const elements = clover.elements();
                

            const styles = {
                body: {
                    fontfamily: 'Jost, sans-serif', fontSize: '10px',
                },
                input: {
                    fontSize: '14px', border: '0.5px solid #DEE0E1', height: '2rem'
                },
            };
            
            const cardNumber = elements.create('CARD_NUMBER', styles);        
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
            // const guest_checkout_submit_btn = document.getElementById('guest_checkout_submit_button');
            const payment_form = document.getElementById('payment-form');
            // const amount = document.querySelector('.payment_amount');
        

            // amount.value = parseFloat(order_total).toFixed(2);
        
            // Handle real-time validation errors from the card element
            cardNumber.addEventListener('change', function(event) {
                console.log(`cardNumber changed ${JSON.stringify(event)}`);
                displayCardNumberError.textContent = '';
            });

            cardNumber.addEventListener('blur', function(event) {
                console.log(`cardNumber blur ${JSON.stringify(event)}`);
            });

            cardDate.addEventListener('change', function(event) {
                console.log(`cardDate changed ${JSON.stringify(event)}`);
                displayCardDateError.textContent = '';
            });

            cardDate.addEventListener('blur', function(event) {
                console.log(`cardDate blur ${JSON.stringify(event)}`);
            });

            cardCvv.addEventListener('change', function(event) {
                console.log(`cardCvv changed ${JSON.stringify(event)}`);
                displayCardCvvError.textContent = '';
            });

            cardCvv.addEventListener('blur', function(event) {
                console.log(`cardCvv blur ${JSON.stringify(event)}`);
            });

            cardPostalCode.addEventListener('change', function(event) {
                console.log(`cardPostalCode changed ${JSON.stringify(event)}`);
                displayCardPostalCodeError.textContent = '';
            });

            cardPostalCode.addEventListener('blur', function(event) {
                console.log(`cardPostalCode blur ${JSON.stringify(event)}`);
            });
        
            payment_form.addEventListener('submit', (event) => { 
                const shipping_rate = JSON.stringify(this.check_out_box.checkShippingRate());    
                console.log(shipping_rate);                
                event.preventDefault();
                // Use the iframe's tokenization method with the user-entered card details
                clover.createToken()
                    .then(function(result) {
                    if (result.errors) {                    
                        Object.entries(result.errors).forEach(element => {
                            console.log(element);
                            element[0] == 'CARD_NUMBER' ? displayCardNumberError.textContent = element[1] : false;
                            element[0] == 'CARD_DATE' ? displayCardDateError.textContent = element[1] : false;
                            element[0] == 'CARD_CVV' ? displayCardCvvError.textContent = element[1] : false;
                            element[0] == 'CARD_POSTAL_CODE' ? displayCardPostalCodeError.textContent = element[1] : false;
                        });
                        
                    } else {
                        console.log(result);

                        const card_info = {
                            last4 : result.card.last4,
                            brand : result.card.brand,
                            exp : result.card.exp_month + '/' + result.card.exp_year.slice(-2)                            
                        }
                        
                        console.log(result.token)
                        document.getElementById('guest_checkout_billing_info_form_cover').style.display = "block";
                        document.getElementById('guest_checkout_billing_info_form_cover').style.height = "auto";
                        document.getElementById('guest_checkout_billing_infomation_container_change_btn').style.display = "block";
                        document.getElementById('guest_checkout_billing_info_form_cover_contents').innerText = 
                        '**********' + card_info.last4 + ' ' + card_info.brand + ' ' + card_info.exp;
                        
                        document.getElementById('guest_checkout_billing_info_form').style.display = "none";
                        document.getElementById('guest_checkout_submit_button').disabled = false;
                        document.getElementById('guest_checkout_submit_button').focus();
                        
                        cloverTokenHandler(result.token, order_items, shipping_rate);
                    
                    }
                });
            });      
        });
    } 




    getShippingRate(param) {

        let data = {};    

        if (param == 'GUEST') {
            data = {
            recipient : document.getElementById('input_recipient_first_name').value + ' ' +document.getElementById('input_recipient_last_name').value,
            address : document.getElementById('input_shipping_address_line1').value + ' ' + document.getElementById('input_shipping_address_line2').value,
            city : document.getElementById('input_shipping_address_city').value,
            state : document.getElementById('shipping_address_state').value,
            zip : document.getElementById('input_shipping_address_zip').value,
            phone : document.getElementById('input_shipping_contact_phone').value,
            email : document.getElementById('input_shipping_contact_email').value,
            weight : this.check_out_box.guest_item_total_weight
            }
        
        } else {
            data = {
            recipient : param.recipient,
            address : param.address1 + ' ' + param.address2,
            city : param.city,
            state : param.state,        
            zip : param.zip,
            phone : param.phone,
            email : param.email,
            weight : this.check_out_box.user_item_total_weight
            }
            
        }
    
        console.log(data);
        const options = 
            {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                
                    },
                body: JSON.stringify(data)
            }        
       
        fetch('/get_shipping_rate', options)
        .then((res) => res.json())
        .then(result => {
            console.log(result);

            let ground = result.RateResponse.RatedShipment.filter(element => {                
                return element.Service.Code == '03'})[0].TotalCharges.MonetaryValue;
            console.log(ground);
            let threedays = result.RateResponse.RatedShipment.filter(element => {                
                return element.Service.Code == '12'})[0].TotalCharges.MonetaryValue;
                console.log(threedays);
            let nextday = result.RateResponse.RatedShipment.filter(element => {                
                return element.Service.Code == '13'})[0].TotalCharges.MonetaryValue;
                console.log(nextday);
            this.check_out_box.setShippingGroundRate(parseFloat(ground));
            document.getElementById('shipping_ground_rate_price').innerText = ground;
                
            this.check_out_box.setShippingThreeDaysRate(parseFloat(threedays));              
            document.getElementById('shipping_3days_rate_price').innerText = threedays;

            this.check_out_box.setShippingNextDayRate(parseFloat(nextday));
            document.getElementById('shipping_nextday_rate_price').innerText = nextday;

        });
    }

    getUserDefaultShippingInfomation(user_id) {
        return new Promise((resolve, reject) => {
            const send_data = {u_id : user_id};
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                
                    },
                body: JSON.stringify(send_data)
            };

            fetch(`/get_user_default_shipping_info`, data)
            .then((res) => res.json())
            .then(result => {
                console.log("makeUserCheckOut shipping info Form")
                console.log(result) 
                if (result.length > 0) {
                    this.user_default_shipping_info = {
                        recipient : result[0].recipient,
                        address1 : result[0].address1,
                        address2 : result[0].address2,
                        city : result[0].city,
                        state : result[0].state,
                        zip : result[0].zip,
                        phone : result[0].phone,
                        email : result[0].email,
                        sh_option : result[0].shipping_option
                    }
                    this.check_out_box.setUserShippingInfo(this.user_default_shipping_info);
                    resolve(this.user_default_shipping_info);
                }
            });
        });
            
    }

    getUserDefaultShippingInfo() {
        return this.user_default_shipping_info;
    }

    getUserDefaultBillingInfo() {
        return this.user_default_billing_info;
    }

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// end of class///////////////////////////////////////////////////////////////

let guest_payload = {};

function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        // el.textContent = '';
        el.parentNode.removeChild(el);
    }, speed);
}


function cloverTokenHandler(token, items, ship_rate) {   
    

    const order_items = items;
    // const order_items = sessionStorage.getItem("checkoutcart"); 
    console.log(order_items);
    console.log("ship_rate");
    console.log(ship_rate);
    const shipping_rate = ship_rate;
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
   
    if (document.getElementById("cloverToken")) {       
        form.removeChild(document.getElementById("cloverToken"));
    }
    if (document.getElementById("order_items")) {       
        form.removeChild(document.getElementById("order_items"));
    }
    if (document.getElementById("shipping_rate")) {       
        form.removeChild(document.getElementById("shipping_rate"));
    }

    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('id', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);

    var orderItems = document.createElement('input');
    orderItems.setAttribute('type', 'hidden');
    orderItems.setAttribute('name', 'order_items');
    orderItems.setAttribute('id', 'order_items');
    orderItems.setAttribute('value', order_items);
    form.appendChild(orderItems);

    var shippingRate = document.createElement('input');
    shippingRate.setAttribute('type', 'hidden');
    shippingRate.setAttribute('name', 'shipping_rate');
    shippingRate.setAttribute('id', 'shipping_rate');
    shippingRate.setAttribute('value', shipping_rate);
    form.appendChild(shippingRate);
    

    const formData = new FormData(form);
    const payload = new URLSearchParams(formData);
    guest_payload = payload;
   

    /*
    fetch('/guest_order_checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload,
      })
      .then(res => res.json())
      .then(response => {

        turnOnDisplay();

        console.log("/guest_order_checkout complete")
        console.log(response)
        
        const paid_item_no = response.paid_items_number;
        console.log(paid_item_no)
        let guest_cart = JSON.parse(sessionStorage.getItem("cart"));
       
        for (let i =0 ; i < paid_item_no.length ; i++) {
            for(let j = 0; j < guest_cart.length; j++) { 
                if(guest_cart[j].c_item_no == paid_item_no[i]) {                    
                    guest_cart.splice([j], 1);
                    j--;
                }
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(guest_cart)); // set left over cart
        sessionStorage.removeItem("checkoutcart");

        setOrderConfirmationPage(response);
        ItemCounter.item_counter('GUEST');

    });
    */
  
}

function guestCheckoutSubmit(payload) {
    document.getElementById('guest_checkout_submit_button').setAttribute('disabled', 'true');
    turnOffDisplay();

    fetch('/guest_order_checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload,
      })
      .then(res => res.json())
      .then(response => {

        turnOnDisplay();

        console.log("/guest_order_checkout complete")
        console.log(response)
        
        const paid_item_no = response.paid_items_number;
        console.log(paid_item_no)
        let guest_cart = JSON.parse(sessionStorage.getItem("cart"));
       
        for (let i =0 ; i < paid_item_no.length ; i++) {
            for(let j = 0; j < guest_cart.length; j++) { 
                if(guest_cart[j].c_item_no == paid_item_no[i]) {                    
                    guest_cart.splice([j], 1);
                    j--;
                }
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(guest_cart)); // set left over cart
        sessionStorage.removeItem("checkoutcart");

        setOrderConfirmationPage(response);
        ItemCounter.item_counter('GUEST');

    });
}


function turnOffDisplay() {
    const modal = document.getElementById('modal');
    modal.style.display = "block";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modal.style.pointerEvents = "none";   
    document.body.classList.add("no_action");
    Spinner.show();
}

function turnOnDisplay() {
    modal.style.display = "none";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
    modal.style.pointerEvents = "auto";
    document.body.classList.remove("no_action");        
    Spinner.hide();
}

function setOrderConfirmationPage(response) {
    const online_main_page = document.getElementById('online_main');
    const order_complete_page = new orderComplete();
    console.log(order_complete_page);
    online_main_page.innerHTML = order_complete_page.getHtml();
    order_complete_page.setConfirmInfo(response);
    history.pushState(null, null, `/order-confirmation`);
}

function setUserCheckoutBillingInfo(cardholder, type, last4) {
    const user_checkout_billing_info_detail = document.createElement('div');
    user_checkout_billing_info_detail.setAttribute('id', `user_checkout_billing_info_detail`);
    user_checkout_billing_info_detail.setAttribute('class', `user_checkout_billing_info_detail`);
    document.querySelector('.user_checkout_billing_info').appendChild(user_checkout_billing_info_detail);

    setUserCheckoutBillingInfoCard(cardholder, type, last4);    

}

function setUserCheckoutBillingInfoCard(cardholder, type, last4) {
    const user_checkout_billing_info_detail = document.getElementById('user_checkout_billing_info_detail');
    
    const user_checkout_billing_info_title_box = document.createElement('div');
    user_checkout_billing_info_title_box.setAttribute('id', `user_checkout_billing_info_title_box`);
    user_checkout_billing_info_title_box.setAttribute('class', `user_checkout_billing_info_title_box user_checkout_info_title`);

    const user_checkout_billing_info_title = document.createElement('div');
    user_checkout_billing_info_title.setAttribute('id', `user_checkout_billing_info_title`);
    user_checkout_billing_info_title.setAttribute('class', `user_checkout_billing_info_title user_checkout_info_title`);

    const user_checkout_billing_info_cardholder = document.createElement('div');
    user_checkout_billing_info_cardholder.setAttribute('id', `user_checkout_billing_info_cardholder`);
    user_checkout_billing_info_cardholder.setAttribute('class', `user_checkout_billing_info_cardholder`);

    const user_checkout_billing_info_card = document.createElement('div');
    user_checkout_billing_info_card.setAttribute('id', `user_checkout_billing_info_card`);
    user_checkout_billing_info_card.setAttribute('class', `user_checkout_billing_info_card`);

    const user_checkout_billing_info_cardtype = document.createElement('div');
    user_checkout_billing_info_cardtype.setAttribute('id', `user_checkout_billing_info_cardtype`);
    user_checkout_billing_info_cardtype.setAttribute('class', `user_checkout_billing_info_cardtype user_checkout_card`);

    const user_checkout_billing_info_text = document.createElement('div');
    user_checkout_billing_info_text.setAttribute('id', `user_checkout_billing_info_text`);
    user_checkout_billing_info_text.setAttribute('class', `user_checkout_billing_info_text user_checkout_card`);

    const user_checkout_billing_info_cardlast4 = document.createElement('div');
    user_checkout_billing_info_cardlast4.setAttribute('id', `user_checkout_billing_info_cardlast4`);
    user_checkout_billing_info_cardlast4.setAttribute('class', `user_checkout_billing_info_cardlast4 user_checkout_card`);
    
    const user_checkout_billing_info_context = document.createElement('div');
    user_checkout_billing_info_context.setAttribute('id', `user_checkout_billing_info_context`);
    user_checkout_billing_info_context.setAttribute('class', `user_checkout_billing_info_context`);

    const user_checkout_change_method_btn = document.createElement('button');
    user_checkout_change_method_btn.setAttribute('id', `user_checkout_change_method_btn`);
    user_checkout_change_method_btn.setAttribute('class', `user_checkout_change_method_btn`);

    const user_checkout_billing_info_next_btn = document.createElement('Button');
    user_checkout_billing_info_next_btn.setAttribute('id', `user_checkout_billing_info_next_btn`);
    user_checkout_billing_info_next_btn.setAttribute('class', `user_checkout_billing_info_next_btn`);    

    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_title_box);
    user_checkout_billing_info_title_box.appendChild(user_checkout_billing_info_title);
    user_checkout_billing_info_title_box.appendChild(user_checkout_change_method_btn);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_cardholder);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_card);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_cardtype);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_text);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_cardlast4);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_context);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_next_btn);

    user_checkout_billing_info_title.innerHTML = "Payment Infomation";
    user_checkout_change_method_btn.innerText = "Change Payment Method";
    user_checkout_billing_info_cardholder.innerHTML = cardholder;
    user_checkout_billing_info_cardtype.innerHTML = type;
    user_checkout_billing_info_text.innerHTML = "ending in";
    user_checkout_billing_info_cardlast4.innerHTML = last4;
    user_checkout_billing_info_context.innerHTML = setPromotionBox();  
    user_checkout_billing_info_next_btn.innerText = "Continue to Place Order";      
}

function setPromotionBox() {
    return `
    
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

// function setUserCheckoutShippingInfo(recipient, address1, address2, city, state, zip, phone, email, sh_option) {
function setUserCheckoutShippingInfo(user_checkout_shipping_info) {

    


    const user_checkout_shipping_info_detail = document.createElement('div');
    user_checkout_shipping_info_detail.setAttribute('id', `user_checkout_shipping_info_detail`);
    user_checkout_shipping_info_detail.setAttribute('class', `user_checkout_shipping_info_detail`);
    document.querySelector('.user_checkout_shipping_info').appendChild(user_checkout_shipping_info_detail); 
    
    const user_checkout_shipping_info_title_box = document.createElement('div');
    user_checkout_shipping_info_title_box.setAttribute('id', `user_checkout_shipping_info_title_box`);
    user_checkout_shipping_info_title_box.setAttribute('class', `user_checkout_shipping_info_title_box`);

    const user_checkout_shipping_info_title = document.createElement('div');
    user_checkout_shipping_info_title.setAttribute('id', `user_checkout_shipping_info_title`);
    user_checkout_shipping_info_title.setAttribute('class', `user_checkout_shipping_info_title user_checkout_info_title`);
    
    const user_checkout_shipping_info_detail_box_cover = document.createElement('div');
    user_checkout_shipping_info_detail_box_cover.setAttribute('id', `user_checkout_shipping_info_detail_box_cover`);
    user_checkout_shipping_info_detail_box_cover.setAttribute('class', `user_checkout_shipping_info_detail_box_cover`);

    const user_checkout_shipping_info_detail_box = document.createElement('div');
    user_checkout_shipping_info_detail_box.setAttribute('id', `user_checkout_shipping_info_detail_box`);
    user_checkout_shipping_info_detail_box.setAttribute('class', `user_checkout_shipping_info_detail_box`);

    const user_checkout_shipping_info_recipient = document.createElement('div');
    user_checkout_shipping_info_recipient.setAttribute('id', `user_checkout_shipping_info_recipient`);
    user_checkout_shipping_info_recipient.setAttribute('class', `user_checkout_shipping_info_recipient`);    

    const user_checkout_shipping_info_address1 = document.createElement('div');
    user_checkout_shipping_info_address1.setAttribute('id', `user_checkout_shipping_info_address1`);
    user_checkout_shipping_info_address1.setAttribute('class', `user_checkout_shipping_info_address1`);

    const user_checkout_shipping_info_address2 = document.createElement('div');
    user_checkout_shipping_info_address2.setAttribute('id', `user_checkout_shipping_info_address2`);
    user_checkout_shipping_info_address2.setAttribute('class', `user_checkout_shipping_info_address2`);

    const user_checkout_shipping_info_csz = document.createElement('div');
    user_checkout_shipping_info_csz.setAttribute('id', `user_checkout_shipping_info_csz`);
    user_checkout_shipping_info_csz.setAttribute('class', `user_checkout_shipping_info_csz`);

    const user_checkout_shipping_info_city = document.createElement('div');
    user_checkout_shipping_info_city.setAttribute('id', `user_checkout_shipping_info_city`);
    user_checkout_shipping_info_city.setAttribute('class', `user_checkout_shipping_info_city user_checkout_csz`);

    const user_checkout_shipping_info_state = document.createElement('div');
    user_checkout_shipping_info_state.setAttribute('id', `user_checkout_shipping_info_state`);
    user_checkout_shipping_info_state.setAttribute('class', `user_checkout_shipping_info_state user_checkout_csz`);

    const user_checkout_shipping_info_zip = document.createElement('div');
    user_checkout_shipping_info_zip.setAttribute('id', `user_checkout_shipping_info_zip`);
    user_checkout_shipping_info_zip.setAttribute('class', `user_checkout_shipping_info_zip user_checkout_csz`);

    const user_checkout_shipping_info_phone = document.createElement('div');
    user_checkout_shipping_info_phone.setAttribute('id', `user_checkout_shipping_info_phone`);
    user_checkout_shipping_info_phone.setAttribute('class', `user_checkout_shipping_info_phone`);

    const user_checkout_shipping_info_email = document.createElement('div');
    user_checkout_shipping_info_email.setAttribute('id', `user_checkout_shipping_info_email`);
    user_checkout_shipping_info_email.setAttribute('class', `user_checkout_shipping_info_email`);

    const user_checkout_shipping_info_sh_option = document.createElement('div');
    user_checkout_shipping_info_sh_option.setAttribute('id', `user_checkout_shipping_info_sh_option`);
    user_checkout_shipping_info_sh_option.setAttribute('class', `user_checkout_shipping_info_sh_option`);

    const user_checkout_shipping_info_change_btn = document.createElement('button');
    user_checkout_shipping_info_change_btn.setAttribute('id', `user_checkout_shipping_info_change_btn`);
    user_checkout_shipping_info_change_btn.setAttribute('class', `user_checkout_shipping_info_change_btn`);

    const user_checkout_shipping_info_next_btn = document.createElement('Button');
    user_checkout_shipping_info_next_btn.setAttribute('id', `user_checkout_shipping_info_next_btn`);
    user_checkout_shipping_info_next_btn.setAttribute('class', `user_checkout_shipping_info_next_btn`);

    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_title_box);
    user_checkout_shipping_info_title_box.appendChild(user_checkout_shipping_info_title);
    user_checkout_shipping_info_title_box.appendChild(user_checkout_shipping_info_change_btn);

    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_detail_box_cover);
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_detail_box);
    
    
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_recipient);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_address1);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_address2);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_csz);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_city);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_state);
    user_checkout_shipping_info_csz.appendChild(user_checkout_shipping_info_zip);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_phone);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_email);
    user_checkout_shipping_info_detail_box.appendChild(user_checkout_shipping_info_sh_option);
    
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_next_btn);
    // user_checkout_shipping_info_next_btn_container.appendChild(user_checkout_shipping_info_next_btn);

    user_checkout_shipping_info_title.innerHTML = "Shipping Infomation";
    user_checkout_shipping_info_recipient.innerHTML = user_checkout_shipping_info.recipient;
    user_checkout_shipping_info_address1.innerHTML = user_checkout_shipping_info.address1;
    user_checkout_shipping_info_address2.innerHTML = user_checkout_shipping_info.address2;
    user_checkout_shipping_info_city.innerHTML = user_checkout_shipping_info.city;
    user_checkout_shipping_info_state.innerHTML = user_checkout_shipping_info.state;
    user_checkout_shipping_info_zip.innerHTML = user_checkout_shipping_info.zip;
    user_checkout_shipping_info_phone.innerHTML = user_checkout_shipping_info.phone;
    user_checkout_shipping_info_email.innerHTML = user_checkout_shipping_info.email;
    user_checkout_shipping_info_sh_option.innerHTML = user_checkout_shipping_info.sh_option;
    user_checkout_shipping_info_change_btn.innerText = `Change Shipping Address`;
    user_checkout_shipping_info_next_btn.innerText = "Continue to Select Shipping Method";
}

function Spinner(){
	Spinner.element=document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	let c=document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	Spinner.element.setAttribute('width','50');
	Spinner.element.setAttribute('height','50');	
	c.setAttribute('viewBox','0 0 50 50');
	c.setAttribute('cx','25');
	c.setAttribute('cy','25');
	c.setAttribute('r','21');
	c.setAttribute('stroke-width','8');
	c.setAttribute('stroke','#983131');
    // c.setAttribute('stroke','#2196f3');
	c.setAttribute('fill','transparent');
	Spinner.element.appendChild(c);
	Spinner.element.style.cssText='position:absolute;left:calc(50% - 25px);top:calc(50% - 25px)';
	Spinner.element.style.zIndex = 999999;
	document.body.appendChild(Spinner.element);
}
Spinner.id=null;
Spinner.element=null;
Spinner.show=function(){
	if(Spinner.element == null) Spinner();
 
	const c=264,m=15;
	Spinner.element.style.display='block';
	move1();
	function move1(){
		let i=0,o=0;
		move();
		function move(){
			if(i==c)move2();
			else{
				i+=4;o+=8;
				Spinner.element.setAttribute('stroke-dasharray',i+' '+(c-i));
				Spinner.element.setAttribute('stroke-dashoffset',o)
				Spinner.id=setTimeout(move,m)
			}
		}
	}
	function move2(){
		let i=c,o=c*2;
		move();
		function move(){
			if(i==0)move1();
			else{
				i-=4;o+=4;
				Spinner.element.setAttribute('stroke-dasharray',i+' '+(c-i));
				Spinner.element.setAttribute('stroke-dashoffset',o)
				Spinner.id=setTimeout(move,m)
			}
		}
	}
};
Spinner.hide=function(){
	Spinner.element.style.display='none';
	if(Spinner.id){
		clearTimeout(Spinner.id);
		Spinner.id=null
	}
	Spinner.element.setAttribute('stroke-dasharray','0 264');
	Spinner.element.setAttribute('stroke-dashoffset','0')
};




 

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

    if(e.target && e.target.className == 'check_guest_cart') {
        modal.style.display = "none";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
        modal.style.pointerEvents = "auto";
        document.body.classList.remove("hidden");
        
        Spinner.hide();
        // let data = [];
        // let order_items = [
        //     {
        //       quantity: 10,
        //       amount: 1800,
        //       description: '1,Ginger Bottle 16 oz.',
              
        //     },
        //     {
        //       quantity: 10,
        //       amount: 2199,
        //       description: '3,Toy Storage Baskets and Play Mats',
              
        //     },
        //     {
        //       quantity: 10,
        //       amount: 1000,
        //       description: '2,Fish-shaped Bun',
             
        //     }
        // ];

        // const u_id = 'GUEST';


        // let insert_cart_value = [];

        // let insert_cart_value_element = [];       
        // for(let i in order_items) {
        //     insert_cart_value_element.push('cart_num');
        //     insert_cart_value_element.push(u_id);
        //     insert_cart_value_element.push(order_items[i].description.substring(0, order_items[i].description.indexOf(',')));
        //     insert_cart_value_element.push(order_items[i].quantity);
        //     insert_cart_value_element.push('y');
        //     insert_cart_value_element.push('date');
        //     insert_cart_value_element.push('date');
        //     insert_cart_value_element.push('order_num');
        //     insert_cart_value_element.push('date');
        //     insert_cart_value.push(insert_cart_value_element);
        //     insert_cart_value_element = [];
        // }

        // console.log(insert_cart_value)

    /*

          let order_items_number = data.forEach(element => {
            console.log(element.description)                            
            element.description.substring(0, element.description.indexOf(','));
        })
        console.log(order_items_number);
        let test = [];
        let str = ['1,Ginger Bottle 16 oz.' , '3,Toy Storage Baskets and Play Mats', '2,Fish-shaped Bun'];
        test = str.map(element => {
            console.log(element) 
            return element.substring(0, element.indexOf(','));

        })
        
        console.log(test)
        /*
        let data = [3,1];
        let guest_cart = JSON.parse(sessionStorage.getItem("cart"));
       
        for (let i =0 ; i < data.length ; i++) {
            for(let j = 0; j < guest_cart.length; j++) { 
                if(guest_cart[j].c_item_no == data[i]) {                    
                    guest_cart.splice([j], 1);
                    j--;
                }
            }
        }

        sessionStorage.setItem("cart", JSON.stringify(guest_cart)); // set left over cart

        */
        
        

        
        
    }

    if(e.target && e.target.className == 'crypto_test') {

        const payload = {test : "test"}
        fetch('/test_ups_ship', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload,
          })
          .then(res => res.json())
          .then(response => {
    
    
            console.log("/test_order_checkout complete")
            console.log(response)
            
            // const paid_item_no = response.paid_items_number;
            // console.log(paid_item_no)
            // let guest_cart = JSON.parse(sessionStorage.getItem("cart"));
           
            // for (let i =0 ; i < paid_item_no.length ; i++) {
            //     for(let j = 0; j < guest_cart.length; j++) { 
            //         if(guest_cart[j].c_item_no == paid_item_no[i]) {                    
            //             guest_cart.splice([j], 1);
            //             j--;
            //         }
            //     }
            // }
            // sessionStorage.setItem("cart", JSON.stringify(guest_cart)); // set left over cart
            // sessionStorage.removeItem("checkoutcart");
    
            // setOrderConfirmationPage(response);
            // ItemCounter.item_counter('GUEST');
    
        });
        
    }


    if(e.target && e.target.className == 'make_item_test') {

        const payload = {test : "test"}
        fetch('/make_item_test', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload,
          })
          .then(res => res.json())
          .then(response => {
    
    
            console.log("/test_order_checkout complete")
            console.log(response)
            
         
        });
    }

    
});
