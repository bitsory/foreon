export function addShippingInfoBox() {
    return `
        <div class="change_profile_shipping_form_container">
            <form id= "change_profile_shipping_info_form" class="change_profile_shipping_info_form" method="post">
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
                        <input type="submit" value="Submit" class="add_shipping_info_btn add_submit_btn">
                        <button type="button" class="add_shipping_info_cancel_btn" value="add_shipping_info_cancel">Cancel</button>
                    </div>
                </div>

            </form>
        </div>




    `;
}

export function addShippingInfo() {
    document.getElementById('change_profile_shipping_info_form').action = '/add_profile_shipping';
    
}


export function addBillingInfoBox() {
    return `
        <div class="change_profile_billing_form_container">
            <form action="/add_payment_method" method="post" id="change_profile_billing_info_form" class="change_profile_billing_info_form">
                <div id="billing_info_add_box" class="billing_info_add_box">
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

                    <div class="form-row change_profile_billing_info_row">
                        <div id="card-email" class="field card-email">
                        <input type="text" name="card_email" class="input_card_email input_change_profile_billing_info" placeholder="Email">
                        </div>
                    </div>     

                </div>

                
                <div class="default_payment_method_checkbox_container">
                    <input type="checkbox" id="default_payment_method_checkbox" name="default_payment" value="default" checked>
                    <label for="default_payment_method_checkbox">make default payment method</label>
                </div>
            
                <div id="change_payment_method_btn_container" class="button-container">
                    <input type="submit" value="Submit" class="add_payment_method_btn add_submit_btn">
                    <button type="button" class="cancel_add_billing_info_btn">Cancel</button>
                </div>


            </form>
        </div>
    `;

}



export function addBillingMethodForm() {
   
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
        
        const clover = new Clover(key.key);

        const elements = clover.elements();
            

        const styles = {
            body: {
                fontfamily: 'Jost, sans-serif',
            //   fontFamily: 'Roboto, Open Sans, sans-serif',
            fontSize: '10px',
            },
            input: {
            fontSize: '11px', padding: '5px', height: '1.65rem', width: '98%'
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
        const payment_form = document.getElementById('change_profile_billing_info_form');
        
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
                    var form = document.getElementById('change_profile_billing_info_form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'cloverToken');
                    hiddenInput.setAttribute('value', result.token);
                    form.appendChild(hiddenInput);
                    form.submit();

                // cloverTokenHandler(result.token);
                }
            });
        });        
    });
} 

export function cloverTokenHandler(token) {
    console.log(token)
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('change_profile_billing_info_form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);
    form.submit();
}