export default class Cart{
    
    
    constructor(param) {
        document.title = "Cafe FORE";
        console.log("shop cart");
        
        this.c_name = this.getCookie(param)[0];
        this.c_id = this.getCookie(param)[1];
    }

    
    c_id = '';
    c_name = '';
    c_item_no = 0;
    c_item_name = '';
    c_item_price = 0;
    c_item_quantity = 0;
    c_item_image = '';

    u_cart = [];

    initCart(uid) {
        u_id = this.c_id;
        const data = {u_id : uid};
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            body: JSON.stringify(data)
        };

        fetch('/check_user_cart', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            this.u_cart = result;

        });
    }
   

    getCookie() {

        // console.log(`get cookie : ${document.cookie}`);
        let cook = decodeURIComponent(document.cookie).split(';');// get array
        
        var result=['GUEST', 'GUEST'];
        cook.forEach((item) => { 
            const obj = new Object();
            const elem = item.trim();
            const tmp = elem.split('=');
            const key = tmp[0];
            const val = tmp[1];
            obj.key = val;
            
            if (key === 'cafefore') {
                result = [];
                var start_name = val.indexOf('"name":"');
                var end_name = val.indexOf('","i');    
                var start_id = val.indexOf('"id":"');
                var end_id = val.indexOf('","c'); 
                
                var res_name = val.substring(start_name+8, end_name); 
                var res_id = val.substring(start_id+6, end_id); 

                result = [res_name, res_id];
                // result.push(res_name);
                // result.push(res_id);   
            } 
        })
        return result;
        
    }

    // viewCart() {
    //     console.log("view cart");
    //     console.log(this.c_name);

    // }

    

    getUserProfile() {
        return `
            <div class='user_profile_greet'>Hello</div>
            <div class='user_profile_name'>${this.getCookie(document.cookie)[0]}</div>
            <div class='user_profile_chage'>                
                <button class="user_profile_change_btn">Change Profile</button>                               
            </div>
            <div class='user_order_history'>
                <button class='user_order_history_btn'>Order History</button>
            </div>

            
            
            <div class='user_profile_log_out'>
                <form action="/sign_out" method="post" class="user_logout">
                        
                    <input type="submit" class="user_logout_btn" name="sign_out" value="Sign Out">
                </form>                
            </div>
        `
    }

    getGuestProfile() {
        return `
            <div class='user_profile_greet'>Hello</div>
            <div class='user_profile_name'>${this.getCookie(document.cookie)}</div>
            <div class='user_profile_cart'>
                
                <form action='/shop/cart/${this.getCookie(document.cookie)}' method="post" class="form_user_profile_cart">
                        
                    <input type="submit" class="user_profile_cart_btn" name="view_cart" value="GO Cart" onclick=${this.viewCart()}>
                </form>
                
            </div>
            
        `
    }

}

let u_id = '';

document.addEventListener('click',function(e){ 
    
        
    if(e.target && e.target.className == 'user_profile_change_btn') {

        document.querySelector('.main_background__blink').style.display = "none";
      
        changeProfile();


        // fetch('/change_profile')
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.className == 'user_order_history_btn') {

        document.querySelector('.main_background__blink').style.display = "none";
        viewOrderHistory();
        

    }



    // if(e.target && e.target.className == 'btn change_password_btn') {
    //     document.querySelector('.change_password_container').classList.toggle('pw_active');
    //     // document.querySelector('.change_password_container').innerHTML = changePassword();
    // }
    // if(e.target && e.target.className == 'btn billing_info_add_btn') {
    //     document.querySelector('.billing_info_box').innerHTML = addBillingInfoBox();
    //     addBillingMethodForm();
    //     document.querySelector('.billing_info_add_btn_container').style.display = "none";
    // }
    // if(e.target && e.target.className == 'btn shipping_info_add_btn') {
    //     document.querySelector('.shipping_info_box').innerHTML = addShippingInfoBox();
    //     document.querySelector('.shipping_info_add_btn_container').style.display = "none";
    //     addShippingInfo();
    // }


    if(e.target && e.target.className == 'tab-link') {
        let tab_id = e.target.getAttribute('data-tab');
        let tab_links = document.querySelectorAll('li.tab-link');
        let tab_contents = document.querySelectorAll('div.tab-content');

        for (const element of tab_links) {
            element.classList.remove('current');                
        }
        for (const element of tab_contents) {             
            element.classList.remove('current');
        }
        
        e.target.classList.add('current');
        document.getElementById(tab_id).classList.add('current');

        if (tab_id === 'tab-2') {
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

                    renderBillingInfo(result);

                    /*
                    console.log(result.sort(date_descending)) // 내림차순

                    function date_descending(a, b) {
                    var dateA = new Date(a['indate']).getTime();
                    var dateB = new Date(b['indate']).getTime();
                    return dateA < dateB ? 1 : -1;
                    }

                    let data = result.filter(element => {
                        return element.inuse === 'y';
                    })

                    if (data.length >0) {

                        let sorted_res = (data.sort(date_descending)).filter(element => {
                            return element.default_payment !== 'default';
                        });                    

                        const default_payment = data.filter(element => {             
                            return element.default_payment === 'default';
                        });
                        
                        console.log(default_payment)
                        setBillingInfo(default_payment[0].bi_number, default_payment[0].cardholder, default_payment[0].type, default_payment[0].last4, "default");

                        sorted_res.forEach(element => {
                            setBillingInfo(element.bi_number, element.cardholder, element.type, element.last4, "n");

                        }) 
                    }
                    */
                }
            })


        } else if (tab_id === 'tab-3') {            
            
            const shipping_info_box = document.querySelector('.shipping_info_box');
            while (shipping_info_box.hasChildNodes()) {	
                shipping_info_box.removeChild(shipping_info_box.firstChild);
            }

            // document.querySelector('.shipping_info_box').innerHTML.removeChild();
            document.querySelector('.shipping_info_add_btn_container').style.display = "block";
            fetch('/get_user_shipping_info') // get shipping info from DB
            .then((res) => res.json())
            .then(result => {
                renderShippingInfo(result)
            });
        }
    }

    // if(e.target && e.target == 'billing_info_delete_btn') {
    //     console.log("'billing_info_delete_btn' 'billing_info_delete_btn' 'billing_info_delete_btn'")
    //     let str = e.target.className;
    //     console.log(str.indexOf("BIN"));
    // }

    if(e.target && e.target.value == 'make_default_billing_info') {
        let str = e.target.className;
        
        let uid = u_id;
        let new_default_billing_index = str.substring(str.indexOf("BIN")+3);
        // let default_addr = document.getElementById(`shipping_info_default_btn SHN${delete_shipping_index}`).value;
        const data = {id : uid, billing_index : new_default_billing_index}

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/make_default_billing_info', option)
        .then((res) => res.json())
        .then(result => {
            const billing_info_box = document.querySelector('.billing_info_box');
            while (billing_info_box.hasChildNodes()) {	
                billing_info_box.removeChild(billing_info_box.firstChild);
              }
            renderBillingInfo(result);

        });
    }

    if(e.target && e.target.value == 'delete_payment_method') {
        console.log("Delete 'billing_info_delete_btn' 'billing_info_delete_btn' 'billing_info_delete_btn'")
        let str = e.target.className;
        console.log(str.indexOf("BIN"));
        console.log(str.substring(str.indexOf("BIN")+3))
        
    
        let uid = u_id;
        let delete_card_index = str.substring(str.indexOf("BIN")+3);
        let default_payment_indicate = document.getElementById(`billing_info_default_btn BIN${delete_card_index}`).value;

        const data = {id : uid, card_index : delete_card_index, default_payment : default_payment_indicate}

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/delete_payment_method', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            const billing_info_box = document.querySelector('.billing_info_box');
            while (billing_info_box.hasChildNodes()) {	
                billing_info_box.removeChild(billing_info_box.firstChild);
            }
            renderBillingInfo(result);
            // const delete_node = document.getElementById(`billing_info BIN${delete_card_index}`);
            // document.querySelector('.billing_info_box').removeChild(delete_node);

        });
    }

/////////////////////// edit shipping info //////////////////////////////////////////

    if(e.target && e.target.value == 'edit_shipping_info') {
        console.log("edit_shipping_info edit_shipping_info")

        let str = e.target.className;
        let uid = u_id;
        let edit_shipping_index = str.substring(str.indexOf("SHN")+3);

        let recipient = (document.querySelector(`.shipping_info_recipient.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_recipient.SHN${edit_shipping_index}`).innerText : '';
        let address1 = (document.querySelector(`.shipping_info_address1.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_address1.SHN${edit_shipping_index}`).innerText : '';
        let address2 = (document.querySelector(`.shipping_info_address2.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_address2.SHN${edit_shipping_index}`).innerText : '';
        let city = (document.querySelector(`.shipping_info_city.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_city.SHN${edit_shipping_index}`).innerText : '';
        let state = (document.querySelector(`.shipping_info_state.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_state.SHN${edit_shipping_index}`).innerText : '';
        let zip = (document.querySelector(`.shipping_info_zip.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_zip.SHN${edit_shipping_index}`).innerText : '';
        let phone = (document.querySelector(`.shipping_info_phone.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_phone.SHN${edit_shipping_index}`).innerText : '';
        let email = (document.querySelector(`.shipping_info_email.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_email.SHN${edit_shipping_index}`).innerText : '';
        
        document.querySelector('.shipping_info_box').innerHTML = addShippingInfoBox();        
        document.querySelector('.shipping_info_add_btn_container').style.display = "none";
        
        document.querySelector('.input_recipient').value = recipient;
        document.querySelector('.input_shipping_address_line1').value = address1;
        document.querySelector('.input_shipping_address_line2').value = address2;
        document.querySelector('.input_shipping_address_city').value = city;
        
        let selected_state = document.getElementById('change_profile_state');        

        for (let i = 0 ; i < selected_state.options.length ; i++) {
            if (selected_state.options[i].value == state) {
                selected_state.options[i].selected = true;                
            }
        }

        document.querySelector('.input_shipping_address_zip').value = zip;
        document.querySelector('.input_shipping_address_phone').value = phone;
        document.querySelector('.input_shipping_address_email').value = email;

        let edit_form = document.getElementById('change_profile_shipping_info_form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'shipping_index');
        hiddenInput.setAttribute('value', edit_shipping_index);
        edit_form.appendChild(hiddenInput);

        editShippingInfo();

    }
    

    if(e.target && e.target.value == 'delete_shipping_info') {


        // console.log("delete_shipping_info delete_shipping_info")
        let str = e.target.className;
        
        let uid = u_id;
        let delete_shipping_index = str.substring(str.indexOf("SHN")+3);
        let default_addr = document.getElementById(`shipping_info_default_btn SHN${delete_shipping_index}`).value;
       
        const data = {id : uid, shipping_index : delete_shipping_index, default_address : default_addr}

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/delete_shipping_info', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            const shipping_info_box = document.querySelector('.shipping_info_box');
            while (shipping_info_box.hasChildNodes()) {	
                shipping_info_box.removeChild(shipping_info_box.firstChild);
              }
            renderShippingInfo(result);

        });

    }

    if(e.target && e.target.value == 'make_default_shipping_info') {
        let str = e.target.className;
        
        let uid = u_id;
        let new_default_shipping_index = str.substring(str.indexOf("SHN")+3);
        // let default_addr = document.getElementById(`shipping_info_default_btn SHN${delete_shipping_index}`).value;
        const data = {id : uid, shipping_index : new_default_shipping_index}

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/make_default_shipping_info', option)
        .then((res) => res.json())
        .then(result => {
            const shipping_info_box = document.querySelector('.shipping_info_box');
            while (shipping_info_box.hasChildNodes()) {	
                shipping_info_box.removeChild(shipping_info_box.firstChild);
              }
            renderShippingInfo(result);

        });
    }
    

    
    

    

});

function changeProfile() {
    
    document.querySelector('.lorem').innerHTML = 
    `<div class="change_profile_form_container">

        <ul class="tabs">
            <li class="tab-link current" data-tab="tab-1">General Infomation</li>
            <li class="tab-link" data-tab="tab-2">Billing Infomation</li>
            <li class="tab-link" data-tab="tab-3">Shipping Infomation</li>
        </ul>
        <div class="change_profile_form">

            <div id="tab-1" class="tab-content current change_profile_general_info">general_info            
                <form action="/change_profile_general" class="change_profile_general_info_form" method="post">
                    <div class="form-tag">Name</div>
                    <div class="form-row general_name">
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <input type="text" name="general_first_name" class="input_general_first_name" placeholder="First">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <input type="text" name="general_last_name" class="input_general_last_name" placeholder="Last">
                            </div>
                        </div>
                    </div>

                    <div class="form-tag">Phone</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_phone">
                        <input type="text" name="general_phone" class="input_general_phone" placeholder="### ### ####">
                        </div>
                    </div>

                    <div class="form-tag">Email</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_email">
                        <input type="text" name="general_email" class="input_general_email" >
                        </div>
                    </div>

                    <div class="form-tag">Address</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_address">
                        <input type="text" name="general_address_street_line1" class="input_general_address_street_line1" placeholder="Address Street Line 1">
                        </div>
                    </div>

                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_address">
                        <input type="text" name="general_address_street_line2" class="input_general_address_street_line2" placeholder="Address Street Line 2">
                        </div>
                    </div>

                    <div class="general_info_csz">
                        <div class="form-row csz">
                            <div id="change_profile_general" class="field change_profile_general_address">
                            <input type="text" name="general_address_city" class="input_general_address_city" placeholder="City">
                            </div>
                        </div>

                        <div class="form-row csz">
                            <div id="change_profile_general" class="field change_profile_general_address">
                                <select name="general_address_state" id="change_profile_general" >
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

                        <div class="form-row csz">
                            <div id="change_profile_general" class="field change_profile_general_addressp">
                            <input type="text" name="general_address_zip" class="input_general_address_zip" placeholder="Zip Code">
                            </div>
                        </div>
                    </div>

                    <input type="checkbox" name="default_address" value="default" checked> make default shipping address <br>



                    <button type="button" class="btn change_password_btn">Change Password</button>
                    <div class="form-tag">Change Password</div>
                    <div class="change_password_container">
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_current_password">
                            <input type="password" name="general_current_password" class="input_general_current_password" placeholder="Current password">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_new_password">
                            <input type="password" name="general_new_password" class="input_general_new_password" placeholder="New password">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_new_password_confirm">
                            <input type="password" name="general_new_password_confirm" class="input_general_new_password_cofirm" placeholder="Confirm New password">
                            </div>
                        </div>
                    
                    
                    
                    </div>
            
                    <div class="button-container">
                        <input type="submit" value="Submit">
                    </div> 



                </form>
            </div>


            <div id="tab-2" class="tab-content change_profile_billing_info_container">
                Billing Infomation
                <div class="change_profile_billing_info">
                    <div class="billing_info_container">
                        <div class="billing_info_box"></div>         
                    </div>
                    <div class="billing_info_add_btn_container">
                        <button class="btn billing_info_add_btn">+ Add Billing Infomation</button>
                    </div>
                </div>
            </div>

            <div id="tab-3" class="tab-content change_profile_shipping_info_container">
                Shippinging Infomation
                <div class="change_profile_shipping_info">
                    <div class="shipping_info_container">
                        <div class="shipping_info_box"></div> 
                    </div>
                    <div class="shipping_info_add_btn_container">
                        <button class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>`;

}

// <button class="btn change_profile_general_info_btn">General Infomation</button>
// <button class="btn change_profile_billing_info_btn">Billing Infomation</button>
// <button class="btn change_profile_shipping_info_btn">Shipping Infomation</button>
// <div class="change_profile_form">
// </div>

function changeProfileGeneral() {

    return `    
    <div id="tab-1" class="tab-content current change_profile_general_info">
        general_info
        <form action="/change_profile_general" class="change_profile_general_info_form" method="post">
            <div class="form-tag">Name</div>
            <div class="form-row general_name">
                <div class="form-row">
                    <div id="change_profile_general" class="field change_profile_general_name">
                        <input type="text" name="general_first_name" class="input_general_first_name" placeholder="First">
                    </div>
                </div>

                <div class="form-row">
                    <div id="change_profile_general" class="field change_profile_general_name">
                        <input type="text" name="general_last_name" class="input_general_last_name" placeholder="Last">
                    </div>
                </div>
            </div>

            <div class="form-tag">Phone</div>
            <div class="form-row">
                <div id="change_profile_general" class="field change_profile_general_phone">
                <input type="text" name="general_phone" class="input_general_phone" placeholder="### ### ####">
                </div>
            </div>

            <div class="form-tag">Email</div>
            <div class="form-row">
                <div id="change_profile_general" class="field change_profile_general_email">
                <input type="text" name="general_email" class="input_general_email" >
                </div>
            </div>

            <div class="form-tag">Address</div>
            <div class="form-row">
                <div id="change_profile_general" class="field change_profile_general_address">
                <input type="text" name="general_address_street_line1" class="input_general_address_street_line1" placeholder="Address Street Line 1">
                </div>
            </div>

            <div class="form-row">
                <div id="change_profile_general" class="field change_profile_general_address">
                <input type="text" name="general_address_street_line2" class="input_general_address_street_line2" placeholder="Address Street Line 2">
                </div>
            </div>

            <div class="general_info_csz">
                <div class="form-row csz">
                    <div id="change_profile_general" class="field change_profile_general_address">
                    <input type="text" name="general_address_city" class="input_general_address_city" placeholder="City">
                    </div>
                </div>

                <div class="form-row csz">
                    <div id="change_profile_general" class="field change_profile_general_address">
                        <select name="general_address_state" id="change_profile_general" >
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

                <div class="form-row csz">
                    <div id="change_profile_general" class="field change_profile_general_addressp">
                    <input type="text" name="general_address_zip" class="input_general_address_zip" placeholder="Zip Code">
                    </div>
                </div>
            </div>

            <input type="checkbox" name="default_address" value="default" checked> make default shipping address <br>



            <button type="button" class="btn change_password_btn">Change Password</button>
            <div class="form-tag">Change Password</div>
            <div class="change_password_container">
                <div class="form-row">
                    <div id="change_profile_general" class="field change_profile_general_current_password">
                    <input type="password" name="general_current_password" class="input_general_current_password" placeholder="Current password">
                    </div>
                </div>

                <div class="form-row">
                    <div id="change_profile_general" class="field change_profile_general_new_password">
                    <input type="password" name="general_new_password" class="input_general_new_password" placeholder="New password">
                    </div>
                </div>

                <div class="form-row">
                    <div id="change_profile_general" class="field change_profile_general_new_password_confirm">
                    <input type="password" name="general_new_password_confirm" class="input_general_new_password_cofirm" placeholder="Confirm New password">
                    </div>
                </div>
            
            
            
            </div>
    
            <div class="button-container">
                <input type="submit" value="Submit">
            </div> 



        </form>

        
    
    
    
    `;

}

function changeProfileBilling() {

    return `    
    <div id="tab-2" class="tab-content change_profile_billing_info_container">
        Billing Infomation
        <div class="change_profile_billing_info">
            <div class="billing_info_container">
                <div class="billing_info_box"></div>         
            </div>
            <div class="billing_info_add_btn_container">
                <button class="btn billing_info_add_btn">+ Add Billing Infomation</button>
            </div>
        </div>
    </div>
    `;

}

function changeProfileShipping() {

    return `    
    <div id="tab-3" class="tab-content change_profile_shipping_info_container">
        Shippinging Infomation
        <div class="change_profile_shipping_info">
            <div class="shipping_info_container">
                <div class="shipping_info_box"></div> 
            </div>
            <div class="shipping_info_add_btn_container">
                <button class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
            </div>
        </div>
    </div>   
    
    `;

}

function makeBillingInfoBox() {
    return `
    <div class="billing_info">
        <div class="billing_info_detial">
            <div class="billing_info_name">Name</div>
            <div class="billing_info_card_company">VISA</div>
            <div class="billing_info_last4">4242</div>
        </div>
        <div class="choose_defualt_btn">
            <input type="radio" name="check_default_payment" value="default">Default Payment
        </div>


        
    </div>    
    `;
}

function addBillingInfoBox() {
    return `
        <div class="change_profile_billing_form_container">
            <form action="/add_payment_method" method="post" id="payment-form">
                <div class="billing_info">
                    <div class="order_info_title">Billing Infomation</div>
                    

                    <div class="form-row top-row">
                        <div id="card-number" class="field card-number"></div>
                        <div class="input-errors" id="card-number-errors" role="alert"></div>
                    </div>

                    <div class="form-row">
                        <div id="card-name" class="field card-name">
                        <input type="text" name="card_name" class="input_card_name" placeholder="Cardholder Name">
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

                    <div class="form-row">
                        <div id="card-email" class="field card-email">
                        <input type="text" name="card_email" class="input_card_email" placeholder="Email">
                        </div>
                    </div>     

                </div>

                <input type="checkbox" name="default_payment" value="default" checked> make default payment method <br>
            
                <div class="button-container">
                    <input type="submit" value="Submit">
                    <button type="button" class="cancel_add_billing_info_btn">Cancel</button>
                </div>


            </form>
        </div>
    `;

}

function makeShippingInfoBox() {
    return `
    <div class="shipping_info">
    
        <div class="shipping_info_detial">
            <div class="shipping_info_recipient">Name</div>
            <div class="shipping_info_address_line1">4400 Roswell Rd</div>
            <div class="shipping_info_address_line2"></div>
            <div class="shipping_info_address_csz">Marietta GA 30062</div>
            <div class="shipping_info_phone"></div>
            <div class="shipping_info_email"></div>

        </div>
        <div class="choose_defualt_btn">
            <input type="radio" name="check_default_shipping" value="default">Default Address</input>
        </div>
        
    </div>    
    `;
}


function addBillingMethodForm() {
   
    // const order_info = this.order_info;        
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
            cloverTokenHandler(result.token);
            }
        });
    });        
} 

function cloverTokenHandler(token) {
    console.log(token)
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);
    form.submit();
}

////////////////////////////set billing info functions /////////////////////////////


function setBillingInfo(bi_num, cardholder, type, last4, exp, default_check) {
    const billingInfo = document.createElement('div');
    billingInfo.setAttribute('id', `billing_info BIN${bi_num}`);
    billingInfo.setAttribute('class', `billing_info BIN${bi_num}`);
    document.querySelector('.billing_info_box').appendChild(billingInfo);
    setBillingInfoDetail(bi_num, cardholder, type, last4, exp, default_check);
}

function setBillingInfoDetail(bi_num, cardholder, type, last4, exp, default_check) {
    const billingInfoDetail = document.createElement('div');
    billingInfoDetail.setAttribute('id', `billing_info_detial BIN${bi_num}`);
    billingInfoDetail.setAttribute('class', `billing_info_detial BIN${bi_num}`);
    document.getElementById(`billing_info BIN${bi_num}`).appendChild(billingInfoDetail);
    setBillingInfoCardholer(bi_num, cardholder);
    setBillingInfoType(bi_num, type);
    setBillingInfoLast4(bi_num, last4);
    setBillingInfoExp(bi_num, exp)
    setBillingInfoDefaultBtn(bi_num, default_check)
    setBillingInfoEditBtn(bi_num)
}

function setBillingInfoCardholer(bi_num, cardholder) {
    const billingInfoCardholer = document.createElement('div');
    billingInfoCardholer.setAttribute('class', `billing_info_cardholder BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoCardholer);
    document.querySelector(`.billing_info_cardholder.BIN${bi_num}`).innerHTML = cardholder;
}

function setBillingInfoType(bi_num, type) {
    const billingInfoType = document.createElement('div');
    billingInfoType.setAttribute('class', `billing_info_type BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoType);
    document.querySelector(`.billing_info_type.BIN${bi_num}`).innerHTML = type;
}

function setBillingInfoLast4(bi_num, last4) {
    const billingInfoLast4 = document.createElement('div');
    billingInfoLast4.setAttribute('class', `billing_info_last4 BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoLast4);
    document.querySelector(`.billing_info_last4.BIN${bi_num}`).innerHTML = last4;
}

function setBillingInfoExp(bi_num, exp) {
    const billingInfoExp = document.createElement('div');
    const text_exp = exp.replace(/(.{2})/g,"$1/");
    billingInfoExp.setAttribute('class', `billing_info_exp BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoExp);
    
    document.querySelector(`.billing_info_exp.BIN${bi_num}`).innerHTML = text_exp;
}

function setBillingInfoDefaultBtn(bi_num, default_check) {
    const choose_defualt_btn_container = document.createElement('div');
    choose_defualt_btn_container.setAttribute('class', `choose_defualt_btn_container BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(choose_defualt_btn_container);
    
    const billingInfoDefaultBtn = document.createElement('input');
    billingInfoDefaultBtn.setAttribute('id', `billing_info_default_btn BIN${bi_num}`);
    billingInfoDefaultBtn.setAttribute('class', `billing_info_default_btn BIN${bi_num}`);
    billingInfoDefaultBtn.setAttribute('type', `radio`);
    billingInfoDefaultBtn.setAttribute('name', `check_default_billing`);
    billingInfoDefaultBtn.setAttribute('value', ``);   
    
    document.querySelector(`.choose_defualt_btn_container.BIN${bi_num}`).appendChild(billingInfoDefaultBtn);
    
    const billingInfoDefaultBtnLabel = document.createElement('label');
    billingInfoDefaultBtnLabel.setAttribute('class', `billing_info_default_label BIN${bi_num}`);
    billingInfoDefaultBtnLabel.setAttribute('for', `billing_info_default_btn BIN${bi_num}`);
    
    document.querySelector(`.choose_defualt_btn_container.BIN${bi_num}`).appendChild(billingInfoDefaultBtnLabel);
    document.querySelector(`.billing_info_default_label.BIN${bi_num}`).innerHTML = "Default Payment";
    const default_check_radio = document.getElementById(`billing_info_default_btn BIN${bi_num}`);
    console.log(default_check_radio);
    console.log(default_check)
    if (default_check === "default") {
        default_check_radio.checked = true;
        billingInfoDefaultBtn.setAttribute('value', `default`);
    } 

}

function setBillingInfoEditBtn(bi_num) {
    const billing_info_edit_btn_container = document.createElement('div');
    billing_info_edit_btn_container.setAttribute('id', `billing_info_edit_btn_container BIN${bi_num}`);
    billing_info_edit_btn_container.setAttribute('class', `billing_info_edit_btn_container BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billing_info_edit_btn_container);

    // const billing_info_edit_btn = document.createElement('button');
    // billing_info_edit_btn.setAttribute('class', `billing_info_edit_btn BIN${bi_num}`);
    // billing_info_edit_btn.setAttribute('type', `button`);
    // billing_info_edit_btn.setAttribute('value', `Edit`);
    // billing_info_edit_btn.textContent = "Edit"
    // document.querySelector(`.billing_info_edit_btn_container.BIN${bi_num}`).appendChild(billing_info_edit_btn);

    const billing_info_make_default_btn = document.createElement('button');
    billing_info_make_default_btn.setAttribute('class', `billing_info_make_default_btn BIN${bi_num}`);
    billing_info_make_default_btn.setAttribute('type', `button`);
    billing_info_make_default_btn.setAttribute('value', `make_default_billing_info`);
    billing_info_make_default_btn.textContent = "Make Default Payment Method";
    document.getElementById(`billing_info_edit_btn_container BIN${bi_num}`).appendChild(billing_info_make_default_btn);

    const billing_info_delete_btn = document.createElement('button');
    billing_info_delete_btn.setAttribute('class', `billing_info_delete_btn BIN${bi_num}`);
    billing_info_delete_btn.setAttribute('type', `button`);
    billing_info_delete_btn.setAttribute('value', `delete_payment_method`);
    billing_info_delete_btn.textContent = "Delete";
    document.getElementById(`billing_info_edit_btn_container BIN${bi_num}`).appendChild(billing_info_delete_btn);


}

function renderBillingInfo(result) {
    if (result.length > 0) {
        console.log(result)

        console.log(result.sort(date_descending)) // DESC lastest indate card

        function date_descending(a, b) {
        var dateA = new Date(a['indate']).getTime();
        var dateB = new Date(b['indate']).getTime();
        return dateA < dateB ? 1 : -1;
        }

        let data = result.filter(element => {
            return element.inuse === 'y';
        })

        console.log(data);

        if (data.length >0) {

            let sorted_res = (data.sort(date_descending)).filter(element => {
                return element.default_payment !== 'default';
            });                    

            const default_payment = data.filter(element => {             
                return element.default_payment === 'default';
            });
            
            console.log(default_payment)
            setBillingInfo(default_payment[0].bi_number, default_payment[0].cardholder, default_payment[0].type, default_payment[0].last4, default_payment[0].exp, "default");

            sorted_res.forEach(element => {
                setBillingInfo(element.bi_number, element.cardholder, element.type, element.last4, element.exp, "n");

            }) 
        }
    }


}



////////////////////////////////////////// set shipping info functions //////////////////////////

function setShippingInfo(sh_num, recipient, address1, address2, city, state, zip, phone, email, default_check) {
    const shippingInfo = document.createElement('div');
    shippingInfo.setAttribute('class', `shipping_info SHN${sh_num}`);
    document.querySelector('.shipping_info_box').appendChild(shippingInfo);
    setShippingInfoDetail(sh_num, recipient, address1, address2, city, state, zip, phone, email, default_check);
}

function setShippingInfoDetail(sh_num, recipient, address1, address2, city, state, zip, phone, email, default_check) {
    const shippingInfoDetail = document.createElement('div');
    shippingInfoDetail.setAttribute('class', `shipping_info_detial SHN${sh_num}`);
    document.querySelector(`.shipping_info.SHN${sh_num}`).appendChild(shippingInfoDetail);
    setShippingInfoRecipient(sh_num, recipient);
    setShippingInfoAddress1(sh_num, address1);
    setShippingInfoAddress2(sh_num, address2);
    setShippingInfoCSZ(sh_num, city, state, zip)
    setShippingInfoPhoneEmail(sh_num, phone, email)
    setShippingInfoDefaultBtn(sh_num, default_check);
    setShippingInfoEditBtn(sh_num)
}

function setShippingInfoRecipient(sh_num, recipient) {
    const shippingInfoRecipient = document.createElement('div');
    shippingInfoRecipient.setAttribute('class', `shipping_info_recipient SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoRecipient);
    document.querySelector(`.shipping_info_recipient.SHN${sh_num}`).innerText = recipient;

}

function setShippingInfoAddress1(sh_num, address1) {
    const shippingInfoAddress1 = document.createElement('div');
    shippingInfoAddress1.setAttribute('class', `shipping_info_address1 SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoAddress1);
    document.querySelector(`.shipping_info_address1.SHN${sh_num}`).innerText = address1;

}

function setShippingInfoAddress2(sh_num, address2) {
    const shippingInfoAddress2 = document.createElement('div');
    shippingInfoAddress2.setAttribute('class', `shipping_info_address2 SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoAddress2);
    document.querySelector(`.shipping_info_address2.SHN${sh_num}`).innerText = address2;

}

function setShippingInfoCSZ(sh_num, city, state, zip) {
    const shippingInfoCSZ = document.createElement('div');
    shippingInfoCSZ.setAttribute('class', `shipping_info_csz SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoCSZ);
    
    setShippingInfoCity(sh_num, city);
    setShippingInfoState(sh_num, state);
    setShippingInfoZip(sh_num, zip);
}



function setShippingInfoCity(sh_num, city) {
    const shippingInfoCity = document.createElement('div');
    shippingInfoCity.setAttribute('class', `shipping_info_city SHN${sh_num}`);
    document.querySelector(`.shipping_info_csz.SHN${sh_num}`).appendChild(shippingInfoCity);
    document.querySelector(`.shipping_info_city.SHN${sh_num}`).innerText = city;

}

function setShippingInfoState(sh_num, state) {
    const shippingInfoState = document.createElement('div');
    shippingInfoState.setAttribute('class', `shipping_info_state SHN${sh_num}`);
    document.querySelector(`.shipping_info_csz.SHN${sh_num}`).appendChild(shippingInfoState);
    document.querySelector(`.shipping_info_state.SHN${sh_num}`).innerText = state;

}

function setShippingInfoZip(sh_num, zip) {
    const shippingInfoZip = document.createElement('div');
    shippingInfoZip.setAttribute('class', `shipping_info_zip SHN${sh_num}`);
    document.querySelector(`.shipping_info_csz.SHN${sh_num}`).appendChild(shippingInfoZip);
    document.querySelector(`.shipping_info_zip.SHN${sh_num}`).innerText = zip;

}

function setShippingInfoPhoneEmail(sh_num, phone, email) {
    const shippingInfoPhoneEmail = document.createElement('div');
    shippingInfoPhoneEmail.setAttribute('class', `shipping_info_phone_email SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoPhoneEmail);
    
    setShippingInfoPhone(sh_num, phone)
    setShippingInfoEmail(sh_num, email)
}

function setShippingInfoPhone(sh_num, phone) {
    const shippingInfoPhone = document.createElement('div');
    shippingInfoPhone.setAttribute('class', `shipping_info_phone SHN${sh_num}`);
    document.querySelector(`.shipping_info_phone_email.SHN${sh_num}`).appendChild(shippingInfoPhone);
    document.querySelector(`.shipping_info_phone.SHN${sh_num}`).innerText = phone;    
}

function setShippingInfoEmail(sh_num, email) {
    const ShippingInfoEmail = document.createElement('div');
    ShippingInfoEmail.setAttribute('class', `shipping_info_email SHN${sh_num}`);
    document.querySelector(`.shipping_info_phone_email.SHN${sh_num}`).appendChild(ShippingInfoEmail); 
    document.querySelector(`.shipping_info_email.SHN${sh_num}`).innerText = email;    
}




function setShippingInfoDefaultBtn(sh_num, default_check) {
    
    const choose_defualt_btn_container = document.createElement('div');
    choose_defualt_btn_container.setAttribute('class', `choose_defualt_btn_container SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(choose_defualt_btn_container);
    
    const shippingInfoDefaultBtn = document.createElement('input');
    shippingInfoDefaultBtn.setAttribute('id', `shipping_info_default_btn SHN${sh_num}`);
    shippingInfoDefaultBtn.setAttribute('class', `shipping_info_default_btn SHN${sh_num}`);
    shippingInfoDefaultBtn.setAttribute('type', `radio`);
    shippingInfoDefaultBtn.setAttribute('name', `check_default_shipping`);
    shippingInfoDefaultBtn.setAttribute('value', ``);   
    
    document.querySelector(`.choose_defualt_btn_container.SHN${sh_num}`).appendChild(shippingInfoDefaultBtn);
    
    
    // document.querySelector(`.shipping_info_default_btn.s${sh_num}`).innerHTML = "Default Address";
    const shippingInfoDefaultBtnLabel = document.createElement('label');
    shippingInfoDefaultBtnLabel.setAttribute('class', `shipping_info_default_label SHN${sh_num}`);
    shippingInfoDefaultBtnLabel.setAttribute('for', `shipping_info_default_btn SHN${sh_num}`);
    
    document.querySelector(`.choose_defualt_btn_container.SHN${sh_num}`).appendChild(shippingInfoDefaultBtnLabel);
    document.querySelector(`.shipping_info_default_label.SHN${sh_num}`).innerText = "Default Address";
    const default_check_radio = document.getElementById(`shipping_info_default_btn SHN${sh_num}`);

    if (default_check === "default") {
        default_check_radio.checked = true;
        shippingInfoDefaultBtn.setAttribute('value', `default`);
    } 

}

function setShippingInfoEditBtn(sh_num) {
    const shipping_info_edit_btn_container = document.createElement('div');
    shipping_info_edit_btn_container.setAttribute('id', `shipping_info_edit_btn_container SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shipping_info_edit_btn_container);

    const shipping_info_edit_btn = document.createElement('button');
    shipping_info_edit_btn.setAttribute('class', `shipping_info_edit_btn SHN${sh_num}`);
    shipping_info_edit_btn.setAttribute('type', `button`);
    shipping_info_edit_btn.setAttribute('value', `edit_shipping_info`);
    shipping_info_edit_btn.textContent = "Edit"

    document.getElementById(`shipping_info_edit_btn_container SHN${sh_num}`).appendChild(shipping_info_edit_btn);

    const shipping_info_delete_btn = document.createElement('button');
    shipping_info_delete_btn.setAttribute('class', `shipping_info_delete_btn SHN${sh_num}`);
    shipping_info_delete_btn.setAttribute('type', `button`);
    shipping_info_delete_btn.setAttribute('value', `delete_shipping_info`);
    shipping_info_delete_btn.textContent = "Delete"

    document.getElementById(`shipping_info_edit_btn_container SHN${sh_num}`).appendChild(shipping_info_delete_btn);

    const shipping_info_make_default_btn = document.createElement('button');
    shipping_info_make_default_btn.setAttribute('class', `shipping_info_make_default_btn SHN${sh_num}`);
    shipping_info_make_default_btn.setAttribute('type', `button`);
    shipping_info_make_default_btn.setAttribute('value', `make_default_shipping_info`);
    shipping_info_make_default_btn.textContent = "Make Default Address"

    document.getElementById(`shipping_info_edit_btn_container SHN${sh_num}`).appendChild(shipping_info_make_default_btn);

}

function renderShippingInfo(result) {
    if (result.length > 0) {
        console.log(result)

        console.log(result.sort(date_descending)) // DESC

        function date_descending(a, b) {
        var dateA = new Date(a['indate']).getTime();
        var dateB = new Date(b['indate']).getTime();
        return dateA < dateB ? 1 : -1;
        }

        let data = result.filter(element => {
            return element.inuse === 'y';
        })

        console.log(data);

        if (data.length > 0) {            

            let sorted_res = (data.sort(date_descending)).filter(element => {
                return element.default_address !== 'default';
            });
            

            const default_address = data.filter(element => {             
                return element.default_address === 'default';
            });

            // console.log(default_address)
            (default_address.length > 0) ? setShippingInfo(default_address[0].sh_number, default_address[0].recipient, default_address[0].address1, 
                default_address[0].address2, default_address[0].city, default_address[0].state, default_address[0].zip, default_address[0].phone, default_address[0].email, "default") : false;


            (sorted_res.length > 0) ? sorted_res.forEach(element => {
                setShippingInfo(element.sh_number, element.recipient, element.address1, element.address2, 
                    element.city, element.state, element.zip, element.phone, element.email, "n")}) : false;

             
        }
    }
}





function addShippingInfoBox() {
    return `
        <div class="change_profile_shipping_form_container">
            <form id= "change_profile_shipping_info_form" class="change_profile_shipping_info_form" method="post">
                <div class="form-row">
                    <div id="recipient" class="field recipient">
                    <input type="text" name="shipping_recipient" class="input_recipient" placeholder="Recipient" required>
                    </div>
                </div>

                <div class="form-row">
                    <div id="shipping_address" class="field shipping_address">
                    <input type="text" name="shipping_address_street_line1" class="input_shipping_address_line1" placeholder="Shipping Address Street Line 1" required>
                    </div>
                </div>

                <div class="form-row">
                    <div id="shipping_address" class="field shipping_address">
                    <input type="text" name="shipping_address_street_line2" class="input_shipping_address_line2" placeholder="Shipping Address Street Line 2">
                    </div>
                </div>

                <div class="shipping_info_csz">
                    <div class="form-row csz">
                        <div id="shipping_address" class="field shipping_addres_city">
                        <input type="text" name="shipping_address_city" class="input_shipping_address_city" placeholder="City" required>
                        </div>
                    </div>

                    <div class="form-row csz">
                        <div id="shipping_address" class="field shipping_address_state">
                            <select name="shipping_address_state" id="change_profile_state" >
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

                    <div class="form-row csz">
                        <div id="shipping_address" class="field shipping_address_zip">
                        <input type="text" name="shipping_address_zip" class="input_shipping_address_zip" placeholder="Zip Code" required>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div id="shipping_address" class="field shipping_address_phone">
                    <input type="text" name="shipping_address_phone" class="input_shipping_address_phone" placeholder="Phone">
                    </div>
                </div>

                <div class="form-row">
                    <div id="shipping_address" class="field shipping_address_email">
                    <input type="text" name="shipping_address_email" class="input_shipping_address_email" placeholder="Email">
                    </div>
                </div>

                <div class="form-row">
                    <div id="shipping_address" class="field shipping_option">
                    <input type="text" name="shipping_address_option" class="input_shipping_address_option" placeholder="Shipping Option">
                    </div>
                </div>            
                
                <input type="checkbox" name="default_address" value="default" checked> make default shipping address <br>
                
            
                <div id="change_shipping_info_btn_container" class="button-container">
                    <input type="submit" value="Submit" class="add_shipping_info_btn">
                    <button type="button" class="add_shipping_info_cancel_btn" value="add_shipping_info_cancel">Cancel</button>
                </div>
                

            </form>
        </div>




    `;
}

function addShippingInfo() {
    document.getElementById('change_profile_shipping_info_form').action = '/add_profile_shipping';
    
}

function editShippingInfo() {
    document.getElementById('change_shipping_info_btn_container').insertAdjacentHTML = `
        edit
        <input type="submit" value="Submit" onclick="editShippingInfo();"></input>
        <button type="button" class="edit_shipping_info_cancel_btn" value="edit_shipping_info_cancel">Cancel</button>
        `;  
    document.querySelector('.change_profile_shipping_info_form').action = '/edit_profile_shipping';
    
}

function setCancelBtn(param) {

    const cancel_btn = document.createElement('button');
    cancel_btn.setAttribute('class', `cancel_btn ${param}`);
    cancel_btn.setAttribute('type', `button`);
    cancel_btn.setAttribute('value', `cancel_${param}`);
    cancel_btn.textContent = param;

    document.querySelector(`.cancel_btn_contatiner`).appendChild(cancel_btn);

}

function changePassword() {
    return `
        <div class="form-row">
            <div id="change_profile_general" class="field change_profile_general_current_password">
            <input type="password" name="general_current_password" class="input_general_current_password" placeholder="Current password">
            </div>
        </div>

        <div class="form-row">
            <div id="change_profile_general" class="field change_profile_general_new_password">
            <input type="password" name="general_new_password" class="input_general_new_password" placeholder="New password">
            </div>
        </div>

        <div class="form-row">
            <div id="change_profile_general" class="field change_profile_general_new_password_confirm">
            <input type="password" name="general_new_password_confirm" class="input_general_new_password_cofirm" placeholder="Confirm New password">
            </div>
        </div>
    
    `;
}

function viewOrderHistory() {

    console.log("view Order History")



}




