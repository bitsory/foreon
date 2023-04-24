import setItemBox from "./set_item_box.js";
import orderComplete from "./order_complete.js";
import * as AIF from "./acc_info_form.js";
import * as ItemCounter from "./item_counter.js";


export default class {

    online_main = document.getElementById('online_main');
    

    constructor(user_id, proceed_checkout_selected_order_cart) {
        document.title = "Cafe FORE";
        console.log("order_confirm page")
        // this.order_info2 = order_info;
        this.order_info = {order_info : "order_info"}
        console.log(this.order_info)
        this.user_id = user_id;
        
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
                
                } else {
                    document.getElementById("input_billing_address_line1").value = '';
                    document.getElementById("input_billing_address_line2").value = '';
                    document.getElementById("input_billing_address_city").value = '';
                    document.getElementById("input_billing_address_state").value = '';
                    document.getElementById("input_billing_address_zip").value = '';
                    document.getElementById("input_billing_contact_phone").value = '';
                    document.getElementById("input_billing_contact_email").value = '';
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

            if(e.target && e.target.id == 'guest_checkout_shipping_info_next_btn') {
                document.getElementById('shipping_method_container').style.display = "block";
                this.getShippingRate('GUEST');
                this.check_out_box.shipping_rate_flag = true;

            }

            if (e.target && e.target.id == 'user_checkout_shipping_info_next_btn') {
                document.getElementById('shipping_method_container').style.display = "block";
                this.getShippingRate(this.check_out_box.user_shipping_info);
                this.check_out_box.shipping_rate_flag = true;
            }
            
        })
    }

    // setCheckoutItemscount(items) {
    //     this.checkout_items = items;
    // }

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

    
    getUserOrderConfirm() {
        return `
        <div id="user_checkout_title" class="user_checkout_title">
        <h2>Check Out</h2>
        </div>
        <div id="user_checkout_page" class="user_checkout_page">
           
            <div id="user_checkout_container" class="user_checkout_container">
                <div id="user_checkout_info" class="user_checkout_info">
                    <div id="user_checkout_shipping_info" class="user_checkout_shipping_info"></div>

                    <div id="shipping_method_container" class="shipping_method_container">
                        <div id="shipping_method_page" class="shipping_method_page">
                            <div id="shipping_method_box_flat" class="shipping_method_box_flat">
                                <input type="radio" name="rate_select" id="shipping_flat_rate" class="shipping_flat_rate" checked>Standard Flat Rate Shipping $9.90
                                <div id="flat_rate_desc">Arrives in 2-5 Business Days - Monday thru Friday Delivery</div>
                            </div>
                            <div id="shipping_method_box_ground" class="shipping_method_box_ground">
                                <input type="radio" name="rate_select" id="shipping_ground_rate" class="shipping_ground_rate">UPS Ground $<span id="shipping_ground_rate_price"></span>
                                <div id="ground_rate_desc">Arrives in 4 Business Days</div>
                            </div>
                            <div id="shipping_method_box_3days" class="shipping_method_box_3days">
                                <input type="radio" name="rate_select" id="shipping_3days_rate" class="shipping_3days_rate">UPS 3 Days Shipping $<span id="shipping_3days_rate_price"></span>
                                <div id="3days_rate_desc">Arrives in 2-3 Business Days</div>
                            </div>
                            <div id="shipping_method_box_nextday" class="shipping_method_box_nextday">
                                <input type="radio" name="rate_select" id="shipping_nextday_rate" class="shipping_nextday_rate">UPS Next Day AIR Saver $<span id="shipping_nextday_rate_price"></span>
                                <div id="nextday_rate_desc">Arrives in 1 Business Days</div>
                            </div>
                        </div>
                        <div id="continue_to_payment_box" class="continue_to_payment_box">
                            <button type="button" id="continue_to_payment_btn" class="continue_to_payment_btn">Continue to Payment</button>
                        </div>   
                    </div>

                    <div id="user_checkout_billing_info" class="user_checkout_billing_info"></div>
                </div>

            </div>

            <div id="user_checkout_submit_container" class="user_checkout_submit_container">
                <div id="user_checkout_submit_button_container" class="user_checkout_submit_button_container">
                    <button id="user_checkout_submit_button" class="user_checkout_submit_button" title="Place order">Place My Order</button>
                    <div id="checkout_submit_term" class="checkout_submit_term">By placing your order, you agree to Cafe Fore's privacy notice and conditions of use.</div>
                </div>
                <div id="checkout_submit_summary_container" class="checkout_submit_summary_container">
                    <div id="checkout_submit_summary_title" class="checkout_submit_summary_title">Order Summary</div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_items_box" class="checkout_submit_summary_items_box">
                            <span id="checkout_submit_summary_items_count" class="checkout_submit_summary_items_count"></span>
                            <span id="checkout_submit_summary_items" class="checkout_submit_summary_items">&nbsp;Items:</span>
                        </span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_items_value" class="checkout_submit_summary_items_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_shipping" class="checkout_submit_summary_shipping">Shipping & handling:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_shipping_value" class="checkout_submit_summary_shipping_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_before_tax" class="checkout_submit_summary_before_tax">Total before tax:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_before_tax_value" class="checkout_submit_summary_before_tax_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_Estimated_tax" class="checkout_submit_summary_Estimated_tax">Estimated tax:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_Estimated_tax_value" class="checkout_submit_summary_Estimated_tax_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail order_total" class="checkout_submit_summary_detail order_total">
                        <span id="checkout_submit_summary_order_total" class="checkout_submit_summary_order_total">Payment total:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_order_total_value" class="checkout_submit_summary_order_total_value">00.00</span>
                        </span>
                    </div>
                </div>
            <div id="check_out_items_slider_box" class="check_out_items_slider_box">
                <div id="check_out_items_slider" class="check_out_items_slider">
                    <div id="check_out_items_container" class="check_out_items_container">
                        
                    </div>
                </div>
            
                <button id="check_out_items_back_btn" class="back slider_btn">❮</button>
                <button id="check_out_items_next_btn" class="next slider_btn">❯</button>
            </div>
            <div id="check_out_item_grand_total" class="check_out_item_grand_total">
            </div>            

        </div>
        `    
    }

// <div class="form-row top-row style="display:none">
//                                 <div id="amount" class="payment_amount_container">
                                
//                                 <div class="order_total_amount_title">Total Amount $</div><input type="text" name="amount" class="payment_amount" readonly>
//                                 </div>
//                             </div>

    getGuestOrderConfirm() {
        return `
        <div id="guest_checkout_page" class="guest_checkout_page">
        <div id="displayError" class="displayError"></div>
            <h2>Check Out</h2>
            <div id="guest_checkout_container" class="guest_checkout_container">
            
                <div id="guest_checkout_form_container" class="guest_checkout_form_container">            
                    <form id="payment-form">
                        * All fields are required to GUEST mode checkout.                         

                        <div class="shipping_info">
                            
                            <div class="order_info_title">Shipping Infomation</div>

                            <div class="shipping_info_recipient">
                                <div class="guest_checkout_shipping_info_form_row">
                                    <div id="recipient_first_name" class="field recipient_first_name">
                                    <input type="text" name="recipient_first_name" id="input_recipient_first_name" class="input_recipient_first_name guest_checkout_input_shipping guest_checkout_input_shipping_recipient" placeholder="First Name" required>
                                    </div>
                                </div>

                                <div class="guest_checkout_shipping_info_form_row">
                                    <div id="recipient_last_name" class="field recipient_last_name">
                                    <input type="text" name="recipient_last_name" id="input_recipient_last_name" class="input_recipient_last_name guest_checkout_input_shipping guest_checkout_input_shipping_recipient" placeholder="Last Name" required>
                                    </div>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="shipping_address" class="field shipping_address_line1">
                                <input type="text" name="shipping_address_street_line1" id="input_shipping_address_line1" class="input_shipping_address_line1 guest_checkout_input_shipping" placeholder="Shipping Address Street Line 1" required>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="shipping_address" class="field shipping_address_line2">
                                <input type="text" name="shipping_address_street_line2" id="input_shipping_address_line2" class="input_shipping_address_line2 guest_checkout_input_shipping" placeholder="Shipping Address Street Line 2">
                                </div>
                            </div>

                            <div class="shipping_info_csz">
                                <div class="guest_checkout_shipping_info_form_row csz">
                                    <div id="shipping_address" class="field shipping_addres_city">
                                    <input type="text" name="shipping_address_city" id="input_shipping_address_city" class="input_shipping_address_city guest_checkout_input_shipping guest_checkout_input_shipping_csz" placeholder="City" required>
                                    </div>
                                </div>

                                <div class="guest_checkout_shipping_info_form_row csz">
                                    
                                    <div id="shipping_address" class="field shipping_address_state">
                                        <select name="shipping_address_state" id="shipping_address_state" class="input_shipping_address guest_checkout_input_shipping guest_checkout_input_shipping_csz" >
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                        </select>
                                    
                                    </div>
                                </div>

                                <div class="guest_checkout_shipping_info_form_row csz">
                                    <div id="shipping_address" class="field shipping_address_zip">
                                    <input type="text" name="shipping_address_zip" id="input_shipping_address_zip" class="input_shipping_address_zip guest_checkout_input_shipping guest_checkout_input_shipping_csz" placeholder="Zip Code" required>
                                    </div>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="order_contact_phone" class="field order_contact_phone">
                                <input type="text" name="order_contact_phone" id="input_shipping_contact_phone" class="order_contact_phone guest_checkout_input_shipping" placeholder="Phone" required>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row" style="margin-bottom:1rem">
                                <div id="order_contact_email" class="field order_contact_email">
                                <input type="text" name="order_contact_email" id="input_shipping_contact_email" class="order_contact_email guest_checkout_input_shipping" placeholder="Email" required>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row" style="margin-bottom:1rem">
                                <div id="same_shipping_billing_address_checkbox" class="same_shipping_billing_address_checkbox">
                                <input type="checkbox" name="same_shipping_billing_address" id="same_shipping_billing_address_checkbtn" class="same_shipping_billing_address_checkbtn input_shipping_checkbox">
                                <label for="same_shipping_billing_address_checkbtn">Same with Billing Address</label>
                                </div>
                            </div>

                            <div id="guest_checkout_shipping_info_next_box" class="guest_checkout_shipping_info_next_box">
                                <button type="button" id="guest_checkout_shipping_info_next_btn" class="guest_checkout_shipping_info_next_btn" title="next">NEXT</button>
                            </div>

                            
                        </div> 

                        <div id="shipping_method_container" class="shipping_method_container">
                            <div id="shipping_method_page" class="shipping_method_page">
                                <div id="shipping_method_box_flat" class="shipping_method_box_flat">
                                    <input type="radio" name="rate_select" id="shipping_flat_rate" class="shipping_flat_rate" checked>Standard Flat Rate Shipping $9.90
                                    <div id="flat_rate_desc">Arrives in 2-5 Business Days - Monday thru Friday Delivery</div>
                                </div>
                                <div id="shipping_method_box_ground" class="shipping_method_box_ground">
                                    <input type="radio" name="rate_select" id="shipping_ground_rate" class="shipping_ground_rate">UPS Ground $<span id="shipping_ground_rate_price"></span>
                                    <div id="ground_rate_desc">Arrives in 4 Business Days</div>
                                </div>
                                <div id="shipping_method_box_3days" class="shipping_method_box_3days">
                                    <input type="radio" name="rate_select" id="shipping_3days_rate" class="shipping_3days_rate">UPS 3 Days Shipping $<span id="shipping_3days_rate_price"></span>
                                    <div id="3days_rate_desc">Arrives in 2-3 Business Days</div>
                                </div>
                                <div id="shipping_method_box_nextday" class="shipping_method_box_nextday">
                                    <input type="radio" name="rate_select" id="shipping_nextday_rate" class="shipping_nextday_rate">UPS Next Day AIR Saver $<span id="shipping_nextday_rate_price"></span>
                                    <div id="nextday_rate_desc">Arrives in 1 Business Days</div>
                                </div>
                            </div>
                            <div id="continue_to_payment_box" class="continue_to_payment_box">
                                <button type="button" id="continue_to_payment_btn" class="continue_to_payment_btn">Continue to Payment</button>
                            </div>
                            
                        </div>
                        
                        <div class="billing_info">

                        <div class="order_info_title">Billing Address</div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="shipping_address" class="field shipping_address_line1">
                                <input type="text" name="billing_address_street_line1" id="input_billing_address_line1" class="input_shipping_address_line1 guest_checkout_input_shipping" placeholder="Billing Address Street Line 1" required>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="shipping_address" class="field shipping_address_line2">
                                <input type="text" name="billing_address_street_line2" id="input_billing_address_line2" class="input_shipping_address_line2 guest_checkout_input_shipping" placeholder="Billing Address Street Line 2">
                                </div>
                            </div>

                            <div class="shipping_info_csz">
                                <div class="guest_checkout_shipping_info_form_row csz">
                                    <div id="shipping_address" class="field shipping_addres_city">
                                    <input type="text" name="billing_address_city" id="input_billing_address_city" class="input_shipping_address_city guest_checkout_input_shipping guest_checkout_input_shipping_csz" placeholder="City" required>
                                    </div>
                                </div>

                                <div class="guest_checkout_shipping_info_form_row csz">
                                    
                                    <div id="shipping_address" class="field shipping_address_state">
                                        <select name="billing_address_state" id="input_billing_address_state" class="input_shipping_address guest_checkout_input_shipping guest_checkout_input_shipping_csz" >
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                        </select>
                                    
                                    </div>
                                </div>

                                <div class="guest_checkout_shipping_info_form_row csz">
                                    <div id="shipping_address" class="field shipping_address_zip">
                                    <input type="text" name="billing_address_zip" id="input_billing_address_zip" class="input_shipping_address_zip guest_checkout_input_shipping guest_checkout_input_shipping_csz" placeholder="Zip Code" required>
                                    </div>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row">
                                <div id="order_contact_phone" class="field order_contact_phone">
                                <input type="text" name="billing_address_contact_phone" id="input_billing_contact_phone" class="order_contact_phone guest_checkout_input_shipping" placeholder="Phone" required>
                                </div>
                            </div>

                            <div class="guest_checkout_shipping_info_form_row" style="margin-bottom:1rem">
                                <div id="order_contact_email" class="field order_contact_email">
                                <input type="text" name="billing_address_contact_email" id="input_billing_contact_email" class="order_contact_email guest_checkout_input_shipping" placeholder="Email" required>
                                </div>
                            </div>                         


                            <div class="order_info_title">Payment Infomation</div>                            

                            <div class="form-row top-row">
                                <div id="card-number" class="field card-number"></div>
                                <div class="input-errors" id="card-number-errors" role="alert"></div>
                            </div>

                            <div class="form-row">
                                <div id="card-name" class="field card-name">
                                <input type="text" name='card_name' class="input_card_name" placeholder="Cardholder Name" required>
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

                            <div class="form-row style="margin-bottom:1rem">
                                <div id="card-postal-code" class="field third-width"></div>
                                <div class="input-errors" id="card-postal-code-errors" role="alert"></div>
                            </div>
                            <div id="card-response" role="alert"></div>

                            
                        </div>
                
                    </form>
                </div>

                <div id="guest_checkout_submit_container" class="guest_checkout_submit_container">
                <div id="guest_checkout_submit_button_container" class="guest_checkout_submit_button_container">
                    <button type="submit" form="payment-form" id="guest_checkout_submit_button" class="guest_checkout_submit_button" title="Place order">Place My Order</button>
                    <div id="checkout_submit_term" class="checkout_submit_term">By placing your order, you agree to Cafe Fore's privacy notice and conditions of use.</div>
                </div>
                <div id="checkout_submit_summary_container" class="checkout_submit_summary_container">
                    <div id="checkout_submit_summary_title" class="checkout_submit_summary_title">Order Summary</div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_items_box" class="checkout_submit_summary_items_box">
                            <span id="checkout_submit_summary_items_count" class="checkout_submit_summary_items_count"></span>
                            <span id="checkout_submit_summary_items" class="checkout_submit_summary_items">&nbsp;Items:</span>
                        </span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_items_value" class="checkout_submit_summary_items_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_shipping" class="checkout_submit_summary_shipping">Shipping & handling:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_shipping_value" class="checkout_submit_summary_shipping_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_before_tax" class="checkout_submit_summary_before_tax">Total before tax:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_before_tax_value" class="checkout_submit_summary_before_tax_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail" class="checkout_submit_summary_detail">
                        <span id="checkout_submit_summary_Estimated_tax" class="checkout_submit_summary_Estimated_tax">Estimated tax:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_Estimated_tax_value" class="checkout_submit_summary_Estimated_tax_value">00.00</span>
                        </span>
                    </div>
                    <div id="checkout_submit_summary_detail order_total" class="checkout_submit_summary_detail order_total">
                        <span id="checkout_submit_summary_order_total" class="checkout_submit_summary_order_total">Payment total:</span>
                        <span id="checkout_submit_summary_value" class="checkout_submit_summary_value">
                        <span class="usd">$</span><span id="checkout_submit_summary_order_total_value" class="checkout_submit_summary_order_total_value">00.00</span>
                        </span>
                    </div>
                </div>
                
                    <div id="check_out_items_slider_box" class="check_out_items_slider_box">
                    <div id="check_out_items_slider" class="check_out_items_slider">
                        <div id="check_out_items_container" class="check_out_items_container">
                            
                        </div>
                    </div>
                
                    <button id="check_out_items_back_btn" class="back slider_btn">❮</button>
                    <button id="check_out_items_next_btn" class="next slider_btn">❯</button>
                    </div>

                <div id="check_out_item_grand_total" class="check_out_item_grand_total" style="display:none">
                </div>
                
            </div>

        </div>

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
            <button class="check_guest_cart">check_guest_cart</button>
            <button class="crypto_test">crypto_test</button>
            <button class="make_item_test">make_item_test</button>
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
                const cardholder = result[0].cardholder; 
                const cardtype = result[0].type;
                const last4 = result[0].last4;

                setUserCheckoutBillingInfo(cardholder, cardtype, last4);
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
                let user_checkout_info = {
                    recipient : result[0].recipient,
                    address1 : result[0].address1,
                    address2 : result[0].address2,
                    city : result[0].city,
                    state : result[0].state,
                    zip : result[0].zip,
                    phone : result[0].phone,
                    email : result[0].email,
                    sh_option : result[0].shipping_option
                };             

                setUserCheckoutShippingInfo(user_checkout_info);
                
                this.check_out_box.setUserShippingInfo(user_checkout_info);

            } else {
                document.querySelector('.user_checkout_shipping_info').innerHTML = `
                <div class="user_checkout_shipping_info_title">Shipping Infomation</div>
                <h2>Nothing have for default address yet</h2>
                <h2>Would like to make default address?</h2>
                <button type="button" id="set_default_address_btn" class="set_default_address_btn" title="set shipping address">Set Up</button>     
                
                `;

            }
        });
        // proceed_checkout_selected_order_cart.forEach(element => {
        //     user_total_amount = user_total_amount + element.quantity * element.price_sell;
        //     console.log(parseInt(user_total_amount))
        // })
        // console.log(parseInt(total_amount))
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
                this.check_out_box.setItemContainer(element.c_item_no, element.c_item_price, element.c_item_name, element.c_item_quantity, element.c_item_image, "check_out_items_container", "check_out_item")
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


    
            const order_info = this.order_info;   
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
                    document.getElementById('guest_checkout_submit_button').setAttribute('disabled', 'true');
                    turnOffDisplay();
                    const order_items = sessionStorage.getItem("checkoutcart");                               
                    
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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// end of class///////////////////////////////////////////////////////////////



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
    const shipping_rate = ship_rate;
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);

    var orderItems = document.createElement('input');
    orderItems.setAttribute('type', 'hidden');
    orderItems.setAttribute('name', 'order_items');
    orderItems.setAttribute('value', order_items);
    form.appendChild(orderItems);

    var shippingRate = document.createElement('input');
    shippingRate.setAttribute('type', 'hidden');
    shippingRate.setAttribute('name', 'shipping_rate');
    shippingRate.setAttribute('value', shipping_rate);
    form.appendChild(shippingRate);

    const formData = new FormData(form);
    const payload = new URLSearchParams(formData);
        
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

    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_title);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_cardholder);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_card);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_cardtype);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_text);
    user_checkout_billing_info_card.appendChild(user_checkout_billing_info_cardlast4);
    user_checkout_billing_info_detail.appendChild(user_checkout_billing_info_context);

    user_checkout_billing_info_title.innerHTML = "Payment Infomation";
    user_checkout_billing_info_cardholder.innerHTML = cardholder;
    user_checkout_billing_info_cardtype.innerHTML = type;
    user_checkout_billing_info_text.innerHTML = "ending in";
    user_checkout_billing_info_cardlast4.innerHTML = last4;
    user_checkout_billing_info_context.innerHTML = setPromotionBox();        
}

function setPromotionBox() {
    return `
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

// function setUserCheckoutShippingInfo(recipient, address1, address2, city, state, zip, phone, email, sh_option) {
function setUserCheckoutShippingInfo(user_checkout_shipping_info) {
    const user_checkout_shipping_info_detail = document.createElement('div');
    user_checkout_shipping_info_detail.setAttribute('id', `user_checkout_shipping_info_detail`);
    user_checkout_shipping_info_detail.setAttribute('class', `user_checkout_shipping_info_detail`);
    document.querySelector('.user_checkout_shipping_info').appendChild(user_checkout_shipping_info_detail); 
    
    const user_checkout_shipping_info_title = document.createElement('div');
    user_checkout_shipping_info_title.setAttribute('id', `user_checkout_shipping_info_title`);
    user_checkout_shipping_info_title.setAttribute('class', `user_checkout_shipping_info_title user_checkout_info_title`);
    
    
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

    const user_checkout_shipping_info_context = document.createElement('div');
    user_checkout_shipping_info_context.setAttribute('id', `user_checkout_shipping_info_context`);
    user_checkout_shipping_info_context.setAttribute('class', `user_checkout_shipping_info_context`);

    const user_checkout_shipping_info_next_btn = document.createElement('Button');
    user_checkout_shipping_info_next_btn.setAttribute('id', `user_checkout_shipping_info_next_btn`);
    user_checkout_shipping_info_next_btn.setAttribute('class', `user_checkout_shipping_info_next_btn`);

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
    user_checkout_shipping_info_detail.appendChild(user_checkout_shipping_info_next_btn);

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
    user_checkout_shipping_info_context.innerHTML = `<a href="#">Change address</a>`;
    user_checkout_shipping_info_next_btn.innerText = "Next";
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
