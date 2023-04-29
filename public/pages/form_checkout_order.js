export function getUserOrderConfirm() {
    return `
    <div id="user_checkout_title" class="user_checkout_title">
    <h2>Check Out</h2>
    </div>
    <div id="user_checkout_page" class="user_checkout_page">
       
        <div id="user_checkout_container" class="user_checkout_container">
            <div id="user_checkout_info" class="user_checkout_info">
                
                <div id="user_checkout_shipping_info" class="user_checkout_shipping_info">
                </div>
                                    
                <div id="user_checkout_shipping_method_container_cover" class="user_checkout_shipping_method_container_cover user_checkout_cover">
                    <div id="user_checkout_shipping_method_container_cover_title" class="user_checkout_shipping_method_container_cover_title user_checkout_cover_title">
                        Shipping Method
                        <button id="user_checkout_shipping_method_container_change_btn" class="user_checkout_shipping_method_container_change_btn user_checkout_edit_btn">Edit Shipping Method</button>
                    </div>
                    
                    <div id="user_checkout_shipping_method_container_cover_contents" class="user_checkout_shipping_method_container_cover_contents"></div>
                    
                </div>

                <div id="user_checkout_shipping_method_container" class="user_checkout_shipping_method_container user_shipping_method_container">
                    <div id="shipping_method_page" class="shipping_method_page">
                        <div id="shipping_method_title" class="shipping_method_title">Shipping Method</div>
                        <div id="shipping_method_box_flat" class="shipping_method_box_flat shipping_method_box">
                            <input type="radio" name="rate_select" id="shipping_flat_rate" class="shipping_flat_rate" checked>
                            <label for="shipping_flat_rate">Standard Flat Rate Shipping $<span id="shipping_flat_rate_price">9.90</span>
                            <div id="flat_rate_desc"> - Arrives in 2-5 Business Days <br> Monday thru Friday Delivery</div>
                        </div>
                        <div id="shipping_method_box_ground" class="shipping_method_box_ground shipping_method_box">
                            <input type="radio" name="rate_select" id="shipping_ground_rate" class="shipping_ground_rate">
                            <label for="shipping_ground_rate">UPS Ground $<span id="shipping_ground_rate_price"></span>
                            <div id="ground_rate_desc"> - Arrives in 4 Business Days</div>
                        </div>
                        <div id="shipping_method_box_3days" class="shipping_method_box_3days shipping_method_box">
                            <input type="radio" name="rate_select" id="shipping_3days_rate" class="shipping_3days_rate">
                            <label for="shipping_3days_rate">UPS 3 Days Shipping $<span id="shipping_3days_rate_price"></span>
                            <div id="3days_rate_desc"> - Arrives in 2-3 Business Days</div>
                        </div>
                        <div id="shipping_method_box_nextday" class="shipping_method_box_nextday shipping_method_box">
                            <input type="radio" name="rate_select" id="shipping_nextday_rate" class="shipping_nextday_rate">
                            <label for="shipping_nextday_rate">UPS Next Day AIR Saver $<span id="shipping_nextday_rate_price"></span>
                            <div id="nextday_rate_desc"> - Arrives in 1 Business Days</div>
                        </div>
                    </div>
                    <div id="continue_to_payment_box" class="continue_to_payment_box">
                        <button type="button" id="user_continue_to_payment_btn" class="user_continue_to_payment_btn">Continue to Payment</button>
                    </div>
                    
                </div>


                <div id="user_checkout_billing_info_cover" class="user_checkout_billing_info_cover user_checkout_cover">
                    <div id="user_checkout_billing_info_container_cover_title" class="user_checkout_billing_info_container_cover_title user_checkout_cover_title">
                        Payment Infomation
                        <button id="user_checkout_billing_info_container_change_btn" class="user_checkout_billing_info_container_change_btn user_checkout_edit_btn">Change Payment Method</button>
                    </div>
                
                    <div id="user_checkout_billing_info_container_cover_contents" class="user_checkout_billing_info_container_cover_contents"></div>                    
                </div>

                <div id="user_checkout_billing_info" class="user_checkout_billing_info">
                </div>
            </div>

        </div>

        <div id="user_checkout_submit_container" class="user_checkout_submit_container">
            <div id="user_checkout_submit_button_container" class="user_checkout_submit_button_container">
                <button id="user_checkout_submit_button" class="user_checkout_submit_button" title="Place order" disabled="disabled">Place My Order</button>
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
       
            
            <div id="check_out_items_container" class="check_out_items_container">
                
            </div>

        <div id="check_out_item_grand_total" class="check_out_item_grand_total">
        </div>            

    </div>
    `    
}


export function getGuestOrderConfirm() {
    return `
    <div id="guest_checkout_page" class="guest_checkout_page">
    <div id="displayError" class="displayError"></div>
        <h2>Check Out</h2>
        <div id="guest_checkout_container" class="guest_checkout_container">
        
            <div id="guest_checkout_form_container" class="guest_checkout_form_container">            
                <form id="payment-form">
                    * All fields are required to GUEST mode checkout.                         

                    <div id="guest_checkout_shipping_infomation_container_cover" class="guest_checkout_shipping_infomation_container">
                        <div id="guest_checkout_shipping_infomation_container_cover_title" class="guest_checkout_shipping_infomation_container_cover_title guest_checkout_container_cover_title">
                            Shipping Infomation
                            <button id="guest_checkout_shipping_infomation_container_change_btn" class="guest_checkout_shipping_infomation_container_change_btn guest_checkout_edit_btn">Edit Shipping Address</button>
                        </div>

                        <div id="guest_checkout_shipping_infomation_container_cover_contents" class=id="guest_checkout_shipping_infomation_container_cover_contents"></div>
                    
                    </div>
                    <div id="guest_checkout_shipping_info" class="shipping_info">                            
                        
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
                            <button type="button" id="guest_checkout_shipping_info_next_btn" class="guest_checkout_shipping_info_next_btn" title="continue to shipping method">Continue to Select Shipping Method</button>
                        </div>

                        
                    </div> 

                    <div id="guest_checkout_shipping_method_container_cover" class="guest_checkout_shipping_method_container_cover">
                        <div id="guest_checkout_shipping_method_container_cover_title" class="guest_checkout_shipping_method_container_cover_title guest_checkout_container_cover_title">
                        Shipping Method
                            <button id="guest_checkout_shipping_method_container_change_btn" class="guest_checkout_shipping_method_container_change_btn guest_checkout_edit_btn">Edit Shipping Method</button>
                        </div>
                    
                        <div id="guest_checkout_shipping_method_container_cover_contents" class="guest_checkout_shipping_method_container_cover_contents"></div>
                    
                    </div>

                    <div id="guest_shipping_method_container" class="shipping_method_container">
                        <div id="shipping_method_page" class="shipping_method_page">
                            <div id="shipping_method_title" class="shipping_method_title">Shipping Method</div>
                            <div id="shipping_method_box_flat" class="shipping_method_box_flat shipping_method_box">
                                <input type="radio" name="rate_select" id="shipping_flat_rate" class="shipping_flat_rate" checked>
                                <label for="shipping_flat_rate">Standard Flat Rate Shipping $<span id="shipping_flat_rate_price">9.90</span>
                                <div id="flat_rate_desc"> - Arrives in 2-5 Business Days <br> Monday thru Friday Delivery</div>
                            </div>
                            <div id="shipping_method_box_ground" class="shipping_method_box_ground shipping_method_box">
                                <input type="radio" name="rate_select" id="shipping_ground_rate" class="shipping_ground_rate">
                                <label for="shipping_ground_rate">UPS Ground $<span id="shipping_ground_rate_price"></span>
                                <div id="ground_rate_desc"> - Arrives in 4 Business Days</div>
                            </div>
                            <div id="shipping_method_box_3days" class="shipping_method_box_3days shipping_method_box">
                                <input type="radio" name="rate_select" id="shipping_3days_rate" class="shipping_3days_rate">
                                <label for="shipping_3days_rate">UPS 3 Days Shipping $<span id="shipping_3days_rate_price"></span>
                                <div id="3days_rate_desc"> - Arrives in 2-3 Business Days</div>
                            </div>
                            <div id="shipping_method_box_nextday" class="shipping_method_box_nextday shipping_method_box">
                                <input type="radio" name="rate_select" id="shipping_nextday_rate" class="shipping_nextday_rate">
                                <label for="shipping_nextday_rate">UPS Next Day AIR Saver $<span id="shipping_nextday_rate_price"></span>
                                <div id="nextday_rate_desc"> - Arrives in 1 Business Days</div>
                            </div>
                        </div>
                        <div id="continue_to_payment_box" class="continue_to_payment_box">
                            <button type="button" id="continue_to_payment_btn" class="continue_to_payment_btn">Continue to Payment</button>
                        </div>
                        
                    </div>
                    
                    <div id="guest_checkout_billing_info_form_cover" class="billing_info">
                        <div id="guest_checkout_billing_infomation_container_cover_title" class="guest_checkout_billing_infomation_container_cover_title guest_checkout_container_cover_title">
                        Billing Infomation
                            <button id="guest_checkout_billing_infomation_container_change_btn" class="guest_checkout_billing_infomation_container_change_btn guest_checkout_edit_btn">Edit Payment Infomation</button>
                        </div>
                    
                        <div id="guest_checkout_billing_info_form_cover_contents" class="guest_checkout_billing_info_form_cover_contents"></div>
                    </div>
                    <div id="guest_checkout_billing_info_form" class="billing_info">

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
                        
                        <div class="guest_checkout_shipping_info_form_row" style="margin-bottom:1rem">
                            <div id="same_shipping_billing_address_checkbox" class="same_shipping_billing_address_checkbox">
                            <input type="checkbox" name="same_billing_shipping_address" id="same_billing_shipping_address_checkbtn" class="same_billing_shipping_address_checkbtn input_shipping_checkbox">
                            <label for="same_billing_shipping_address_checkbtn">Same with Shipping Address</label>
                            </div>
                        </div>


                        <div class="order_info_title">Payment Infomation</div>                            

                        <div class="form-row top-row">
                            <div id="card-number" class="field card-number"></div>
                            <div class="input-errors" id="card-number-errors" role="alert"></div>
                        </div>

                        <div class="form-row">
                            <div id="card-name" class="field card-name">
                            <input type="text" name='card_name' class="input_card_name" placeholder="Cardholder Name">
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

                        <div id="continue_to_place_order_btn_box" class="continue_to_place_order_btn_box">
                            <button type="submit" form="payment-form" id="continue_to_place_order_btn" class="continue_to_place_order_btn">Continue to Place Order</button>
                        </div>
                        
                    </div>
                    
            
                </form>
            </div>

            <div id="guest_checkout_submit_container" class="guest_checkout_submit_container">
            <div id="guest_checkout_submit_button_container" class="guest_checkout_submit_button_container">
                <button type="button" id="guest_checkout_submit_button" class="guest_checkout_submit_button" title="Place order" disabled="disabled">Place My Order</button>
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

            <div id="check_out_items_container" class="check_out_items_container">
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