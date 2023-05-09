export function mekeChangePrifileTap() {
    return `
    <div id="change_profile_form_container" class="change_profile_form_container">

        <ul id="tabs" class="tabs">
            <li class="tab-link current" data-tab="tab-1">General Infomation</li>
            <li class="tab-link" data-tab="tab-2">Billing Infomation</li>
            <li class="tab-link" data-tab="tab-3">Shipping Infomation</li>
        </ul>
        <div id="change_profile_form" class="change_profile_form">

            <div id="tab-1" class="tab-content current change_profile_general_info">       
                <form id="change_profile_general_info_form" class="change_profile_general_info_form">
                    <div align="left" class="form-tag input_general_info_tag">Name</div>
                    <div class="form-row general_name">
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <div name="general_first_name" id="input_general_first_name" class="input_general_first_name input_general_info_name" ></div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <div name="general_last_name" id="input_general_last_name" class="input_general_last_name input_general_info_name"></div>
                            </div>
                        </div>
                    </div>

                    <div id="general_info_box" class="general_info_box">
                        <div class="form-tag input_general_info_tag">Mobile number</div>
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_phone">
                            <input type="text" name="general_phone" id="input_general_phone" class="input_general_phone input_general_info" placeholder="### ### ####">
                            </div>
                        </div>

                        <div class="form-tag input_general_info_tag">Email</div>
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_email">
                            <input type="text" name="general_email" id="input_general_email" class="input_general_email input_general_info" >
                            </div>
                        </div>

                        <div class="form-tag input_general_info_tag">Address</div>
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_address">
                            <input type="text" name="general_address_street_line1" id="input_general_address_street_line1" class="input_general_address_street_line1 input_general_info" placeholder="Address Street Line 1">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_address">
                            <input type="text" name="general_address_street_line2" id="input_general_address_street_line2" class="input_general_address_street_line2 input_general_info" placeholder="Address Street Line 2">
                            </div>
                        </div>

                        <div class="general_info_csz">
                            <div class="form-row">
                                <div id="change_profile_general" class="field change_profile_general_address">
                                <input type="text" name="general_address_city" id="input_general_address_city" class="input_general_address_city input_general_info_csz" placeholder="City">
                                </div>
                            </div>

                            <div class="form-row">
                                <div id="change_profile_general" class="field change_profile_general_address">
                                    <select name="general_address_state" id="change_profile_general_state" class="change_profile_general input_general_info_csz select_state_box">
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

                            <div class="form-row">
                                <div id="change_profile_general" class="field change_profile_general_address">
                                <input type="text" name="general_address_zip" id="input_general_address_zip" class="input_general_address_zip input_general_info_csz" placeholder="Zip Code">
                                </div>
                            </div>
                        </div>

                        <div class="change_profile_general_default_address input_general_info_tag">
                        <input type="checkbox" id="change_profile_general_default_address_checkbox" name="default_address" value="default" checked>
                        <label for="change_profile_general_default_address_checkbox">make default shipping address</label>
                        </div>
                    </div>


                    
                    
            
                    <div id="general_info_change_button_container" class="general_info_change_button_container">
                        
                        <button type="button" id="general_info_change_submit_btn" class="general_info_change_submit_btn general_info_change_btn">Submit Update</button>                        
                        <button type="button" id="change_password_btn" class="btn change_password_btn general_info_change_btn">Password Change</button>
                    </div> 



                </form>
            </div>


            <div id="tab-2" class="tab-content change_profile_billing_info_container">
                Billing Infomation
                <div id="change_profile_billing_info" class="change_profile_billing_info">
                    <div id="billing_info_container" class="billing_info_container">
                        <div id="billing_info_box" class="billing_info_box"></div>         
                    </div>
                    <div id="billing_info_add_btn_container" class="billing_info_add_btn_container info_add_btn_container" >
                        <button id="billing_info_add_btn" class="btn billing_info_add_btn">+ Add Billing Infomation</button>
                    </div>
                </div>
            </div>

            <div id="tab-3" class="tab-content change_profile_shipping_info_container">
                Shipping Infomation
                <div id="change_profile_shipping_info" class="change_profile_shipping_info">
                    <div id="shipping_info_container" class="shipping_info_container">
                        <div id="shipping_info_box" class="shipping_info_box"></div> 
                    </div>
                    <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container info_add_btn_container">
                        <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
    `;
}

/* <button type="button" id="general_info_change_submit_cancel_btn" class="general_info_change_submit_cancel_btn general_info_change_btn">Cancel</button> */

export function changePasswordForm() {
    return `           
        <div class="change_password_container">
           
            <div id="change_profile_general_current_password_box" class="change_profile_general_current_password_box change_password_box">
                <div id="change_profile_general_current_password_title" id="change_profile_general_current_password_title change_password_title">
                Current Password *
                </div>
                <input type="password" name="general_current_password" id="input_general_current_password" class="input_general_current_password change_password_input" >
            </div>
        
            <div id="change_profile_general_new_password_box" class="change_profile_general_new_password_box change_password_box">
                <div id="change_profile_general_new_password_title" id="change_profile_general_new_password_title change_password_title">
                New Password *
                </div>
                <input type="password" name="general_new_password" id="input_general_new_password" class="input_general_new_password change_password_input" >
            </div>
        
            <div id="change_profile_general_new_password_confirm_box" class="change_profile_general_new_password_confirm_box change_password_box">
                <div id="change_profile_general_new_password_confirm_title" id="change_profile_general_new_password_confirm_title change_password_title">
                New Password Confirm *
                </div>
                <input type="password" name="general_new_password_confirm" id="input_general_new_password_cofirm" class="input_general_new_password_cofirm change_password_input" >
            </div>
         
        </div>
        `;
}

export function makeChangePasswordBtnContainer() {
    return `   
                    
        <button type="button" id="general_info_change_pswd_submit_btn" class="general_info_change_pswd_submit_btn general_info_change_btn">Submit</button>
        <button type="button" id="general_info_change_pswd_cancel_btn" class="general_info_change_pswd_cancel_btn general_info_change_btn">Cancel</button>     
        <div id="change_pswd_extra" class="change_pswd_extra"></div>   
    
        `;
}



export function addShippingInfoBox() {
    return `
        <div class="change_profile_shipping_form_container">
            <form id="change_profile_shipping_info_form" class="change_profile_shipping_info_form" name="change_profile_shipping_info_form" method="post">
                <div id="shipping_info_add_box" class="shipping_info_add_box">
                    <div class="form-row change_profile_shipping_info_row">
                        <div id="recipient" class="field recipient">
                        <input type="text" name="shipping_recipient" class="input_recipient input_change_profile_shipping_info" placeholder="Recipient" required>
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address">
                        <input type="text" name="shipping_address_street_line1" class="input_shipping_address_line1 input_change_profile_shipping_info" placeholder="Shipping Address Street Line 1" required>
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address">
                        <input type="text" name="shipping_address_street_line2" class="input_shipping_address_line2 input_change_profile_shipping_info" placeholder="Shipping Address Street Line 2">
                        </div>
                    </div>

                    <div class="shipping_info_csz">
                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_addres_city">
                            <input type="text" name="shipping_address_city" class="input_shipping_address_city input_change_profile_shipping_info_csz" placeholder="City" required>
                            </div>
                        </div>

                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_address_state">
                                <select name="shipping_address_state" id="change_profile_state" class="input_change_profile_shipping_info_csz select_state_box">
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

                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_address_zip">
                            <input type="text" name="shipping_address_zip" class="input_shipping_address_zip input_change_profile_shipping_info_csz" placeholder="Zip Code" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address_phone">
                        <input type="text" name="shipping_address_phone" class="input_shipping_address_phone input_change_profile_shipping_info" placeholder="Phone">
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address_email">
                        <input type="text" name="shipping_address_email" class="input_shipping_address_email input_change_profile_shipping_info" placeholder="Email">
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_option">
                        <input type="text" name="shipping_address_option" class="input_shipping_address_option input_change_profile_shipping_info" placeholder="Shipping Option">
                        </div>
                    </div>            
                                        
                    <div class="default_shipping_address_checkbox_container input_shipping_tag">
                        <input type="checkbox" id="default_shipping_address_checkbox" name="default_address" value="default" checked>
                        <label for="default_shipping_address_checkbox">make default shipping address</label>
                    </div>
                
                    <div id="change_shipping_info_btn_container" class="button-container">
                        
                    </div>
                </div>

            </form>
        </div>




    `;
}

export function addShippingInfoBtnBox () {
    return `
    <button type="button" id="add_shipping_info_submit_btn" class="add_shipping_info_submit_btn account_info_submit_btn">Add Submit</button>
    <button type="button" id="add_shipping_info_cancel_btn" class="shipping_info_cancel_btn" value="add_shipping_info_cancel">Cancel</button>
    `;
}  

export function editShippingInfoBtnBox (param) {
    return `
    <button type="button" id="edit_shipping_info_submit_btn" class="edit_shipping_info_submit_btn edit_submit_btn account_info_submit_btn" edit_no=${param}>Edit Submit</button>
    <button type="button" id="edit_shipping_info_cancel_btn" class="shipping_info_cancel_btn" value="edit_shipping_info_cancel">Cancel</button>
    `;
}  

export function addShippingInfo() {
    document.getElementById('change_profile_shipping_info_form').action = '/add_profile_shipping';
    
}

// action="/add_payment_method"
export function addBillingInfoBox() {
    return `
        <div class="change_profile_billing_form_container">
            <form name="change_profile_billing_info_form" id="change_profile_billing_info_form" class="change_profile_billing_info_form">
                <div id="billing_info_add_box" class="billing_info_add_box">

                    <div class="order_info_title">Billing Address</div>  
                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address">
                        <input type="text" name="billing_address_street_line1" class="input_shipping_address_line1 input_change_profile_shipping_info" placeholder="Shipping Address Street Line 1" required>
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address">
                        <input type="text" name="billing_address_street_line2" class="input_shipping_address_line2 input_change_profile_shipping_info" placeholder="Shipping Address Street Line 2">
                        </div>
                    </div>

                    <div class="shipping_info_csz">
                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_addres_city">
                            <input type="text" name="billing_address_city" class="input_shipping_address_city input_change_profile_shipping_info_csz" placeholder="City" required>
                            </div>
                        </div>

                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_address_state">
                                <select name="billing_address_state" id="change_profile_state" class="input_change_profile_shipping_info_csz select_state_box">
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

                        <div class="form-row change_profile_shipping_info_row">
                            <div id="shipping_address" class="field shipping_address_zip">
                            <input type="text" name="billing_address_zip" class="input_shipping_address_zip input_change_profile_shipping_info_csz" placeholder="Zip Code" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address_phone">
                        <input type="text" name="billing_address_phone" class="input_shipping_address_phone input_change_profile_shipping_info" placeholder="Phone">
                        </div>
                    </div>

                    <div class="form-row change_profile_shipping_info_row">
                        <div id="shipping_address" class="field shipping_address_email">
                        <input type="text" name="billing_address_email" class="input_shipping_address_email input_change_profile_shipping_info" placeholder="Email">
                        </div>
                    </div>


                    <div class="order_info_title">Payment method</div>                    

                    <div class="form-row top-row change_profile_billing_info_row">
                        <div id="card-number" class="field card-number"></div>
                        <div class="input-errors" id="card-number-errors" role="alert"></div>
                    </div>

                    <div class="form-row change_profile_billing_info_row">
                        <div id="card-name" class="field card-name">
                        <input type="text" name="card_name" class="input_card_name input_change_profile_billing_info" placeholder="Cardholder Name">
                        </div>
                    </div>                    

                    <div class="form-row change_profile_billing_info_row">
                        <div id="card-date" class="field third-width"></div>
                        <div class="input-errors" id="card-date-errors" role="alert"></div>
                    </div>
                    
                    <div class="form-row change_profile_billing_info_row">
                        <div id="card-cvv" class="field third-width"></div>
                        <div class="input-errors" id="card-cvv-errors" role="alert"></div>
                    </div>

                    <div class="form-row change_profile_billing_info_row">
                        <div id="card-postal-code" class="field third-width"></div>
                        <div class="input-errors" id="card-postal-code-errors" role="alert"></div>
                    </div>
                    <div id="card-response" role="alert"></div>

                    

                </div>

                
                <div class="default_payment_method_checkbox_container">
                    <input type="checkbox" id="default_payment_method_checkbox" name="default_payment" value="default" checked>
                    <label for="default_payment_method_checkbox">make default payment method</label>
                </div>
            
                <div id="change_payment_method_btn_container" class="button-container">
                    <button type="submit" form="change_profile_billing_info_form" value="Submit" id="add_payment_method_btn" class="add_payment_method_btn account_info_submit_btn">Add Submit</button>
                    <button type="button" id="cancel_add_billing_info_btn" class="cancel_add_billing_info_btn shipping_info_cancel_btn">Cancel</button>
                </div>


            </form>
        </div>
    `;

}

export function setUpPaymentMethodForm() {
    return `
    <h2>Nothing have for default payment method yet</h2>
    <h2>Would like to make default payment method?</h2>
    <button type="button" id="set_default_payment_method_btn" class="set_default_payment_method_btn set_default_method_btn" title="set payment method" value="on">Set Up Payment Method</button>                            
    
    `;
}

export function setUpShippingAddressForm() {
    return `
    <h2>Nothing have for default shipping address yet</h2>
    <h2>Would like to make shipping address?</h2>
    <button type="button" id="set_default_address_btn" class="set_default_address_btn set_default_method_btn" title="set shipping address" value="on">Set Up</button>     
            
    
    `;
}


// export function addBillingMethodForm() {
   
//     const send_data = {u_id : 'getkey'};

//     const data = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'            
//             },
//         body: JSON.stringify(send_data)
//     };
//     console.log(data);

//     fetch(`/get_api_key`, data)
//     .then((res) => res.json())
//     .then(result => {
//         const key = result;
        
//         const clover = new Clover(key.key);

//         const elements = clover.elements();
            

//         const styles = {
//             body: {
//                 fontfamily: 'Jost, sans-serif',
//             //   fontFamily: 'Roboto, Open Sans, sans-serif',
//             fontSize: '10px',
//             },
//             input: {
//             fontSize: '11px', padding: '5px', height: '1.65rem', width: '98%'
//             },
//         };
        
//         const cardNumber = elements.create('CARD_NUMBER', styles);
//         // const cardName = elements.create('CARD_NAME', styles);
//         const cardDate = elements.create('CARD_DATE', styles);
//         const cardCvv = elements.create('CARD_CVV', styles);
//         const cardPostalCode = elements.create('CARD_POSTAL_CODE', styles);
            
//         cardNumber.mount('#card-number');
//         // cardName.mount('#card-name');
//         cardDate.mount('#card-date');
//         cardCvv.mount('#card-cvv');
//         cardPostalCode.mount('#card-postal-code');

//         const cardResponse = document.getElementById('card-response');
//         const displayCardNumberError = document.getElementById('card-number-errors');
//         const displayCardDateError = document.getElementById('card-date-errors');
//         const displayCardCvvError = document.getElementById('card-cvv-errors');
//         const displayCardPostalCodeError = document.getElementById('card-postal-code-errors');
//         const payment_form = document.getElementById('change_profile_billing_info_form');
        
//         // Handle real-time validation errors from the card element
//         cardNumber.addEventListener('change', function(event) {
//         console.log(`cardNumber changed ${JSON.stringify(event)}`);
//         });

//         cardNumber.addEventListener('blur', function(event) {
//         console.log(`cardNumber blur ${JSON.stringify(event)}`);
//         });

//         cardDate.addEventListener('change', function(event) {
//         console.log(`cardDate changed ${JSON.stringify(event)}`);
//         });

//         cardDate.addEventListener('blur', function(event) {
//             console.log(`cardDate blur ${JSON.stringify(event)}`);
//         });

//         cardCvv.addEventListener('change', function(event) {
//             console.log(`cardCvv changed ${JSON.stringify(event)}`);
//         });

//         cardCvv.addEventListener('blur', function(event) {
//             console.log(`cardCvv blur ${JSON.stringify(event)}`);
//         });

//         cardPostalCode.addEventListener('change', function(event) {
//             console.log(`cardPostalCode changed ${JSON.stringify(event)}`);
//         });

//         cardPostalCode.addEventListener('blur', function(event) {
//             console.log(`cardPostalCode blur ${JSON.stringify(event)}`);
//         });

//         payment_form.addEventListener('submit', function(event) {
//             console.log("payment_form.addEventListener('submit', function(event)")
//             event.preventDefault();
//             // Use the iframe's tokenization method with the user-entered card details
//             clover.createToken()
//                 .then(function(result) {
//                 if (result.errors) {
//                 Object.values(result.errors).forEach(function (value) {
//                     displayError.textContent = value;
//                 });
//                 } else {
//                     const form = document.getElementById('change_profile_billing_info_form');
//                     const hiddenInput = document.createElement('input');
//                     hiddenInput.setAttribute('type', 'hidden');
//                     hiddenInput.setAttribute('name', 'cloverToken');
//                     hiddenInput.setAttribute('value', result.token);
//                     form.appendChild(hiddenInput);
//                     // form.submit();

//                     const formData = new FormData(form);
//                     const payload = new URLSearchParams(formData);
//                     fetch('/add_payment_method_test', {
//                         method: 'POST',
//                         headers: {
//                           'Content-Type': 'application/x-www-form-urlencoded'
//                         },
//                         body: payload,
//                     })
//                     .then(res => res.json())
//                     .then(response => {
//                         if (response.result == "ok") {



//                         } else {


//                         }
//                     });               
//                 }
//             });
//         });        
//     });
// } 

// export function cloverTokenHandler(token) {
//     console.log(token)
//     // Insert the token ID into the form so it gets submitted to the server
//     var form = document.getElementById('change_profile_billing_info_form');
//     var hiddenInput = document.createElement('input');
//     hiddenInput.setAttribute('type', 'hidden');
//     hiddenInput.setAttribute('name', 'cloverToken');
//     hiddenInput.setAttribute('value', token);
//     form.appendChild(hiddenInput);
//     form.submit();
// }