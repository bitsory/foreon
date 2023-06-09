import * as AIF from "./form_acc_info.js";
import * as ItemCounter from "./item_counter.js";
import * as SPINNER from "./spinner.js";
import * as WEBS from "./form_webs.js";
import * as PurchaseHistory from "./form_purchase_history.js";



export default class Cart {
    
    // navbar = document.getElementById('navbar');
    // lorem = document.getElementById('lorem');
    

    constructor() {
        document.title = "Cafe FORE";
        console.log("cart.js");
        
        this.c_name = this.getCookie()[0];
        this.c_id = this.getCookie()[1];


    }

    
    c_id = '';
    c_name = '';
    c_item_no = 0;
    c_item_name = '';
    c_item_price = 0;
    c_item_quantity = 0;
    c_item_image = '';
    c_item_code = '';

    u_cart = [];

    initCart() {
        fetch("/login_check")
        .then((res) => res.json())
        .then(result => {              
            
            if (result.id == 'GUEST') {
                document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
                this.c_id = 'GUEST'; 
                this.c_name = 'GUEST';
                ItemCounter.item_counter('GUEST');
                u_id = 'GUEST';

                
            } else {
                const data = {u_id : result.id};
                const option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                    body: JSON.stringify(data)
                }        
                fetch('/check_user_cart', option)
                .then((res) => res.json())
                .then(response => {
                    console.log(response)
                    this.u_cart = response;
                    ItemCounter.item_counter(result.id);
                    u_id = result.id;
                });           
            } 
        });
    }
   

    getCookie() {
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
            }             
        })
        return result;        
    }
   

    getUserProfile() {
        return `
            <div id='user_profile_greet' class='user_profile_greet'>Hello,</div>
            <div id='user_profile_name' class='user_profile_name'>${this.getCookie()[0]}</div>
            <div id='user_account_box' class='user_account_box'>
                <div id='user_profile_change' class='user_profile_change user_account_box_el'>                
                    <button id="user_profile_change_btn" class="user_profile_change_btn account_btn">ACCOUNT</button>                               
                </div>
                <div id='user_purchase_history' class='user_purchase_history user_account_box_el'>
                    <button id='user_purchase_history_btn' class='user_purchase_history_btn account_btn'>PURCHASE HISTORY</button>
                </div>
                
                <div id='user_profile_log_out' class='user_profile_log_out user_account_box_el'>
                    <form action="/sign_out" method="post" class="user_logout">
                            
                        <button type="submit" id="user_logout_btn" class="user_logout_btn account_btn" name="sign_out" value="SIGN OUT">SIGN OUT</button>
                    </form>                
                </div>
            </div>
        `
    }


}

let u_id = '';

export function setUserProfileChangePage(u_id) {
    WEBS.toggleFunc();
       
        (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
        console.log(u_id)

        if (u_id == 'GUEST') {
            ddocument.getElementById('lorem').textContent = 'Login Please...';
        } else {
            changeProfile();

            const data = {id : u_id}

            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                
                    },
                body: JSON.stringify(data)
            };
            console.log(option);

            fetch('/get_user_info', option)
            .then((res) => res.json())
            .then(result => {
                console.log(result)

                document.getElementById('input_general_first_name').innerText = result.first_name;
                document.getElementById('input_general_last_name').innerText = result.last_name; 
                document.getElementById('input_general_phone').value = result.phone;
                document.getElementById('input_general_email').value = result.email;
                document.getElementById('input_general_address_street_line1').value = result.address1;
                document.getElementById('input_general_address_street_line2').value = result.address2;
                document.getElementById('input_general_address_city').value = result.city;
                document.getElementById('change_profile_general_state').value = result.state;
                document.getElementById('input_general_address_zip').value = result.zip;         
                
            });
        }


}

export function chooseTabLink(target, param) {
    let tab_id = '';
    let tab_links = '';
    let tab_contents = '';
    
    
    if (param != 'go_back') {
        tab_id = target.getAttribute('data-tab');
        tab_links = document.querySelectorAll('li.tab-link');
        tab_contents = document.querySelectorAll('div.tab-content');

        for (const element of tab_links) {
            element.classList.remove('current');                
        }
        for (const element of tab_contents) {             
            element.classList.remove('current');
        }
        
        target.classList.add('current');
        document.getElementById(tab_id).classList.add('current');
    } else {
        tab_id = target;
        tab_links = document.querySelectorAll('li.tab-link');
        tab_contents = document.querySelectorAll('div.tab-content');

        for (const element of tab_links) {
            element.classList.remove('current');                
        }
        for (const element of tab_contents) {             
            element.classList.remove('current');
        }
        
        let li_target = document.querySelector(`[data-tab="${target}"]`)
        li_target.classList.add('current');
        document.getElementById(tab_id).classList.add('current');
        
    } 
        if (tab_id === 'tab-1') {
            (param == 'go_back') ? false : history.pushState(null, null, `/account/user-info`);
        } else if (tab_id === 'tab-2') {
            (param == 'go_back') ? false : history.pushState(null, null, `/account/billing-infomation`);
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
                }
            })


        } else if (tab_id === 'tab-3') { 
            console.log("(tab_id === 'tab-3')");

            (param == 'go_back') ? false : history.pushState(null, null, `/account/shipping-infomation`);
            
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


document.addEventListener('click',function(e){ 

    console.log("cart click double check ")
    
        
    if(e.target && e.target.id == 'user_profile_change_btn' || e.target && e.target.id == 'general_info_change_pswd_cancel_btn') {
        
        setUserProfileChangePage(u_id);
        history.pushState(null, null, `/account/user-info`);

        
    }

    if(e.target && e.target.id == 'user_purchase_history_btn') {

        history.pushState(null, null, `/purchase-history`); // url change
        (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
        viewPurchaseHistory({user_id:u_id});
        WEBS.toggleFunc();
    }

    if(e.target && e.target.id == 'general_info_change_submit_btn') {

        const first_name = document.getElementById('input_general_first_name').innerText;
        const last_name = document.getElementById('input_general_last_name').innerText;
        const phone = document.getElementById('input_general_phone').value;
        const email = document.getElementById('input_general_email').value;
        const address1 = document.getElementById('input_general_address_street_line1').value;
        const address2 = document.getElementById('input_general_address_street_line2').value;
        const city = document.getElementById('input_general_address_city').value;
        const state = document.getElementById('change_profile_general_state').value;
        const zip = document.getElementById('input_general_address_zip').value;
        const default_checkbox = document.getElementById('change_profile_general_default_address_checkbox');
        // let default_check = '';
        const default_check = default_checkbox.checked == true ? 'default' : '';
        
        const data = {
            id : u_id,
            first_name : first_name,
            last_name : last_name,
            phone : phone,
            email : email,
            address1 : address1,
            address2 : address2,
            city : city,
            state : state,
            zip : zip,
            default_check : default_check
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/update_general_profile', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            if (result.result == 'ok') {
                alert("general info have been updated.");
            } else alert("we are very sorry...server has something wrong. Can you try again?");

        });   

    }

    if(e.target && e.target.id == 'change_password_btn') {
        document.getElementById('general_info_box').innerHTML = AIF.changePasswordForm();
        document.getElementById('general_info_change_button_container').innerHTML = AIF.makeChangePasswordBtnContainer();

    }

    if(e.target && e.target.id == 'general_info_change_pswd_submit_btn') {
        const change_cur_pw = document.getElementById('input_general_current_password');
        const change_new_pw = document.getElementById('input_general_new_password'); 
        const change_new_pw_confirm = document.getElementById('input_general_new_password_cofirm');         

        const extra_box = document.getElementById('change_pswd_extra');
        if (!(change_cur_pw.value)) {
            extra_box.textContent = "Please Input your current password...";
            change_cur_pw.focus();
            
        } else if (!(change_new_pw.value)) {
            extra_box.textContent = "Please Input your new password...";
            change_new_pw.focus();
          
        } else if (!(change_new_pw_confirm).value) {
            extra_box.textContent = "Please Input your new password once again...";
            change_new_pw_confirm.focus();
             
        } else {
            WEBS.getPBKey().then(key => {

                if (change_new_pw.value === change_new_pw_confirm.value) {                
                  
                    const crypt = new JSEncrypt();
                    crypt.setPublicKey(key);         

                    const encrypted_cur = crypt.encrypt(change_cur_pw.value);
                    const encrypted_new = crypt.encrypt(change_new_pw.value);
                    const send_data = {
                    
                        id : u_id,                   
                        cur_pw : encrypted_cur,
                        new_pw : encrypted_new                   
                    }
                    
                    const data = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(send_data),                        
                    };
                    fetch('/change_password', data)
                    .then((res) => res.json())
                    .then(result => {
                        // SPINNER.turnOnDisplay();
                        
                        if (result.result == "ok") {
                            // alert("Password has changed!")
                            change_cur_pw.value = '';
                            change_new_pw.value = '';
                            change_new_pw_confirm.value = '';

                            Swal.fire({                       
                                // html: swal_html,                    
                                text: 'Password has changed!',
                                icon: 'success',
                                width:400,
                                confirmButtonColor: '#983131',               
                            
                            }).then(result => {
                                window.location.href = "https://gocafefore.com";                              
                            });
                                    
                        } else {                          
                            Swal.fire({   
                                text: result.result,
                                width:400,
                                confirmButtonColor: '#983131',               
                            })
                        }
                    });
                } else {
                    extra_box.innerText = "please make sure to confirm password"
                }
            })
        }
    }

    if(e.target && e.target.id == 'billing_info_add_btn') {

        document.querySelector('.billing_info_box').innerHTML = AIF.addBillingInfoBox();
        addBillingMethodForm();
        document.querySelector('.billing_info_add_btn_container').style.display = "none";
        document.change_profile_billing_info_form.billing_address_street_line1.focus();

        if (location.pathname.substring(0, 15) == '/shop/checkout/') {
            document.getElementById('user_checkout_billing_info_next_btn').style.display = "none";
        }
        
    }

    if(e.target && e.target.id == 'shipping_info_add_btn') {
        document.querySelector('.shipping_info_box').innerHTML = AIF.addShippingInfoBox();
        document.getElementById('change_shipping_info_btn_container').innerHTML = AIF.addShippingInfoBtnBox();
        document.querySelector('.shipping_info_add_btn_container').style.display = "none";
        
        AIF.addShippingInfo();
        document.change_profile_shipping_info_form.shipping_recipient.focus();
        if (location.pathname.substring(0, 15) == '/shop/checkout/') {
            document.getElementById('user_checkout_shipping_info_next_btn').style.display = "none";
        }
    }


    if(e.target && e.target.className == 'tab-link') {

        chooseTabLink(e.target);
    }

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
            document.getElementById('choose_defualt_btn_container').focus();

        });
    }

    if(e.target && e.target.value == 'delete_payment_method') {        
        let str = e.target.className;      
    
        let uid = u_id;
        let delete_card_index = str.substring(str.indexOf("BIN")+3);
        let default_payment_indicate = document.getElementById(`billing_info_default_btn BIN${delete_card_index}`) ? document.getElementById(`billing_info_default_btn BIN${delete_card_index}`).value: 'n';

        Swal.fire({
            title: 'Are you sure to delete this Payment Method?',            
           
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#983131', // confrim 버튼 색깔 지정 98, 31, 31 3085d6
            cancelButtonColor: '#254248241', // cancel 버튼 색깔 지정 d33
            confirmButtonText: 'Confirm', // confirm 버튼 텍스트 지정
            cancelButtonText: 'Cancel', // cancel 버튼 텍스트 지정
            width: 400,
            // height: 400,
            
            reverseButtons: true, // 버튼 순서 거꾸로
            
         }).then(result => {
            // if get promise return
            if (result.isConfirmed) { // button click confirm

                const data = {id : uid, card_index : delete_card_index, default_payment : default_payment_indicate}

                const option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                
                        },
                    body: JSON.stringify(data)
                };

                fetch('/delete_payment_method', option)
                .then((res) => res.json())
                .then(result => {

                    const billing_info_box = document.querySelector('.billing_info_box');
                    while (billing_info_box.hasChildNodes()) {	
                        billing_info_box.removeChild(billing_info_box.firstChild);
                    }
                    renderBillingInfo(result);  
                    if (location.pathname.substring(0, 15) == '/shop/checkout/') { // checkout page
                        document.getElementById('user_checkout_submit_button').setAttribute("disabled", "true");

                        if (result.length > 0) {
                        
                            document.getElementById('user_checkout_billing_info_contents').innerHTML = 
                            `
                            <div id="change_profile_billing_info" class="change_profile_billing_info">
                                <div id="billing_info_container" class="billing_info_container">
                                    <div id="billing_info_box" class="billing_info_box"></div> 
                                </div>
                                <div id="billing_info_add_btn_container" class="billing_info_add_btn_container info_add_btn_container">
                                    <button id="billing_info_add_btn" class="btn billing_info_add_btn">+ Add Billing Infomation</button>
                                </div>
                            </div>
                            
                            `;                    
                            
                            document.getElementById('billing_info_add_btn_container').style.display = "block";
                            const billing_info_box = document.getElementById('billing_info_box');
                            while (billing_info_box.hasChildNodes()) {	
                                billing_info_box.removeChild(billing_info_box.firstChild);
                            }
                            renderBillingInfo(result); 
                            document.getElementById('user_checkout_change_payment_method_btn').style.display = "block";
                            document.getElementById('user_checkout_billing_info_next_btn').style.display = "block";

                        } else { 
                            console.log("result.length == 0")
                            document.getElementById('user_checkout_billing_info_contents').innerHTML = AIF.setUpPaymentMethodForm();
                            document.getElementById('user_checkout_billing_info_detail_box_cover').innerText = '';                    
                            
                            document.getElementById('user_checkout_shipping_info_change_btn').style.display = "block";

                            document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off" ?
                                document.getElementById('user_checkout_shipping_method_container_change_btn').style.display = "block" : false;                      
                                                
                            document.getElementById('user_checkout_change_payment_method_btn').style.display = "none";                    
                            document.getElementById('user_checkout_billing_info_next_btn').style.display = "none";
                            document.getElementById('billing_info_add_btn_container') ? document.getElementById('billing_info_add_btn_container').style.display = "none" : false;
                            document.getElementById('user_checkout_billing_info_context').style.display = "none";
                            document.getElementById('user_checkout_billing_info_context').setAttribute('value', 'off');
                            
                        }                

                    } else { //account page
                        const billing_info_box = document.getElementById('billing_info_box');
                        while (billing_info_box.hasChildNodes()) {	
                            billing_info_box.removeChild(billing_info_box.firstChild);
                        }
                        renderBillingInfo(result); 
                        document.getElementById('billing_info_add_btn_container').style.display = "block";
                    }        
                });
            }
        });
    }

    if(e.target && e.target.id == 'add_shipping_info_submit_btn') {

        const form = document.getElementById('change_profile_shipping_info_form');            
        
        const formData = new FormData(form);
        const payload = new URLSearchParams(formData);                  
        
        fetch('/add_profile_shipping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload,
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if (response.result == 'ok') {                
                if (location.pathname.substring(0, 15) == '/shop/checkout/') {

                    console.log("if (location.pathname.substring(0, 15) == '/shop/checkout/') {")

                    document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off" ?
                        document.getElementById('user_continue_to_payment_btn').style.display = "none" : false;
                        
                    document.getElementById('user_checkout_shipping_info_detail_box').style.display = "none";
                    document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                    document.getElementById('user_checkout_shipping_method_container_change_btn').style.display = "none";
                    document.getElementById('user_checkout_shipping_method_container').style.display = "block";
                    document.getElementById('user_checkout_shipping_method_container_cover').style.display = "none";
                    // document.getElementById('user_checkout_billing_info_cover').style.display = "block";
                    
                    document.getElementById('user_checkout_submit_button').setAttribute("disabled", "true");
                    

                    document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = 
                    `
                    <div id="change_profile_shipping_info" class="change_profile_shipping_info">
                        <div id="shipping_info_container" class="shipping_info_container">
                            <div id="shipping_info_box" class="shipping_info_box"></div> 
                        </div>
                        <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container info_add_btn_container">
                            <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                        </div>
                    </div>
                    
                    `;                    
                    
                    document.getElementById('user_checkout_shipping_info_change_btn').style.display = "block";
                    document.getElementById('shipping_info_add_btn_container').style.display = "block";
                    fetch('/get_user_shipping_info') // get shipping info from DB
                    .then((res) => res.json())
                    .then(result => {
                        renderShippingInfo(result);
                        document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                    }); 

                } else {
                    
                    const shipping_info_box = document.querySelector('.shipping_info_box');
                    while (shipping_info_box.hasChildNodes()) {	
                        shipping_info_box.removeChild(shipping_info_box.firstChild);
                    }

                    // document.querySelector('.shipping_info_box').innerHTML.removeChild();
                    document.getElementById('shipping_info_add_btn_container').style.display = "block";
                    fetch('/get_user_shipping_info') // get shipping info from DB
                    .then((res) => res.json())
                    .then(result => {
                        renderShippingInfo(result)
                    });
                }
            } else alert(response);
            
        });    
    }

    if(e.target && e.target.id == 'cancel_add_billing_info_btn') {
        console.log("if(e.target && e.target.className == 'cancel_add_billing_info_btn') {")

        const billing_info_box = document.querySelector('.billing_info_box');
        while (billing_info_box.hasChildNodes()) {	
            billing_info_box.removeChild(billing_info_box.firstChild);
        }

        // document.querySelector('.billing_info_box').innerHTML = makeBillingInfoBox();
        
        fetch('/get_user_billing_info') // get billiing info from DB
        .then((res) => res.json())
        .then(result => {
            console.log(result);
            if (result.length > 0) {
                console.log("fetch('/get_user_billing_info')  if (result.length > 0) {")

                renderBillingInfo(result);

                if(location.pathname.substring(0, 15) == '/shop/checkout/') { //checkout page
                    document.querySelector('.billing_info_add_btn_container').style.display = "block";
                    
                    document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off" ?
                        document.getElementById('user_checkout_billing_info_next_btn').style.display = "block" : false;
                }

            } else {                

                if (location.pathname.substring(0, 15) == '/shop/checkout/') { // checkout page
                    document.getElementById('user_checkout_billing_info_contents').innerHTML = AIF.setUpPaymentMethodForm();
                } else {
                    document.querySelector('.billing_info_add_btn_container').style.display = "block";
                }
            }
        })

        
        // location.pathname.substring(0, 15) == '/shop/checkout/' ? document.getElementById('user_checkout_billing_info_select_btn').style.display = "block" : false;
    }


    if(e.target && e.target.className == 'shipping_info_cancel_btn') {
        
        
        const shipping_info_box = document.querySelector('.shipping_info_box');
        while (shipping_info_box.hasChildNodes()) {	
            shipping_info_box.removeChild(shipping_info_box.firstChild);
        }

        // document.querySelector('.shipping_info_box').innerHTML.removeChild();
        
        fetch('/get_user_shipping_info') // get shipping info from DB
        .then((res) => res.json())
        .then(result => {
            console.log(result);
            if (result.length > 0) {
                renderShippingInfo(result);
                document.querySelector('.shipping_info_add_btn_container').style.display = "block";

                location.pathname.substring(0, 15) == '/shop/checkout/' ?             
                    document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block" : false;
                
            } else {                

                if (location.pathname.substring(0, 15) == '/shop/checkout/') {
                    document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = AIF.setUpShippingAddressForm();
                } else {
                    document.querySelector('.shipping_info_add_btn_container').style.display = "block";
                }
            }
           
        });

    }
    

/////////////////////// edit shipping info //////////////////////////////////////////

    if(e.target && e.target.value == 'edit_shipping_info') {
        console.log("edit_shipping_info edit_shipping_info")        

        let str = e.target.className;
        let uid = u_id;
        let edit_shipping_index = str.substring(str.indexOf("SHN")+3);
        console.log(str)
        console.log(edit_shipping_index)

        let recipient = (document.querySelector(`.shipping_info_recipient.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_recipient.SHN${edit_shipping_index}`).innerText : '';
        let address1 = (document.querySelector(`.shipping_info_address1.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_address1.SHN${edit_shipping_index}`).innerText : '';
        let address2 = (document.querySelector(`.shipping_info_address2.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_address2.SHN${edit_shipping_index}`).innerText : '';
        let city = (document.querySelector(`.shipping_info_city.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_city.SHN${edit_shipping_index}`).innerText : '';
        let state = (document.querySelector(`.shipping_info_state.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_state.SHN${edit_shipping_index}`).innerText : '';
        let zip = (document.querySelector(`.shipping_info_zip.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_zip.SHN${edit_shipping_index}`).innerText : '';
        let phone = (document.querySelector(`.shipping_info_phone.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_phone.SHN${edit_shipping_index}`).innerText : '';
        let email = (document.querySelector(`.shipping_info_email.SHN${edit_shipping_index}`)) ? document.querySelector(`.shipping_info_email.SHN${edit_shipping_index}`).innerText : '';
               
        document.querySelector('.shipping_info_box').innerHTML = AIF.addShippingInfoBox();
        document.getElementById('change_shipping_info_btn_container').innerHTML = AIF.editShippingInfoBtnBox(edit_shipping_index);        
        document.querySelector('.shipping_info_add_btn_container').style.display = "none";
        
        document.querySelector('.input_recipient').value = recipient;
        document.querySelector('.input_shipping_address_line1').value = address1;
        document.querySelector('.input_shipping_address_line2').value = address2;
        document.querySelector('.input_shipping_address_city').value = city;

        document.change_profile_shipping_info_form.shipping_recipient.focus();
        let selected_state = document.getElementById('change_profile_state');        

        for (let i = 0 ; i < selected_state.options.length ; i++) {
            if (selected_state.options[i].value == state) {
                selected_state.options[i].selected = true;                
            }
        }

        document.querySelector('.input_shipping_address_zip').value = zip;
        document.querySelector('.input_shipping_address_phone').value = phone;
        document.querySelector('.input_shipping_address_email').value = email;
        // editShippingInfo();
        if (location.pathname.substring(0, 15) == '/shop/checkout/') {
            document.getElementById('user_checkout_shipping_info_next_btn').style.display = "none";
        }


    }

    if(e.target && e.target.id == 'edit_shipping_info_submit_btn') {
        // /edit_profile_shipping
        const edit_shipping_index = e.target.getAttribute('edit_no');
        console.log("edit_shipping_index");
        console.log(edit_shipping_index);
        const edit_form = document.getElementById('change_profile_shipping_info_form');  

        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'shipping_address_index');
        hiddenInput.setAttribute('value', edit_shipping_index);
        edit_form.appendChild(hiddenInput);        
        
        const formData = new FormData(edit_form);
        const payload = new URLSearchParams(formData);                  
        
        fetch('/edit_profile_shipping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload,
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if (response.result == 'ok') {                
                if (location.pathname.substring(0, 15) == '/shop/checkout/') {

                    console.log("if (location.pathname.substring(0, 15) == '/shop/checkout/') {")

                    document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off" ?
                        document.getElementById('user_continue_to_payment_btn').style.display = "none" : false;
                    
                    document.getElementById('user_checkout_shipping_info_detail_box').style.display = "none";
                    document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                    document.getElementById('user_checkout_shipping_method_container_change_btn').style.display = "none";
                    document.getElementById('user_checkout_shipping_method_container').style.display = "block";
                    document.getElementById('user_checkout_shipping_method_container_cover').style.display = "none";
                    // document.getElementById('user_checkout_billing_info_cover').style.display = "block";
                    
                    document.getElementById('user_checkout_submit_button').setAttribute("disabled", "true");
                    

                    document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = 
                    `
                    <div id="change_profile_shipping_info" class="change_profile_shipping_info">
                        <div id="shipping_info_container" class="shipping_info_container">
                            <div id="shipping_info_box" class="shipping_info_box"></div> 
                        </div>
                        <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container info_add_btn_container">
                            <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                        </div>
                    </div>
                    
                    `;                    
                    
                    document.getElementById('shipping_info_add_btn_container').style.display = "block";
                    fetch('/get_user_shipping_info') // get shipping info from DB
                    .then((res) => res.json())
                    .then(result => {
                        renderShippingInfo(result);
                        document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                    }); 

                } else {
                    const shipping_info_box = document.querySelector('.shipping_info_box');
                    while (shipping_info_box.hasChildNodes()) {	
                        shipping_info_box.removeChild(shipping_info_box.firstChild);
                    }

                    // document.querySelector('.shipping_info_box').innerHTML.removeChild();
                    document.getElementById('shipping_info_add_btn_container').style.display = "block";
                    fetch('/get_user_shipping_info') // get shipping info from DB
                    .then((res) => res.json())
                    .then(result => {
                        renderShippingInfo(result)
                    });
                }
            } else alert(response);
        });       

    }

    

    if(e.target && e.target.value == 'delete_shipping_info') {

        Swal.fire({
            title: 'Are you sure to delete this Shipping Address?',            
           
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#983131', // confrim 버튼 색깔 지정 98, 31, 31 3085d6
            cancelButtonColor: '#254248241', // cancel 버튼 색깔 지정 d33
            confirmButtonText: 'Confirm', // confirm 버튼 텍스트 지정
            cancelButtonText: 'Cancel', // cancel 버튼 텍스트 지정
            width: 400,
            // height: 400,
            
            reverseButtons: true, // 버튼 순서 거꾸로
            
         }).then(result => {
            // if get promise return
            if (result.isConfirmed) { // button click confirm


        // console.log("delete_shipping_info delete_shipping_info")
                let str = e.target.className;
                
                let uid = u_id;
                let delete_shipping_index = str.substring(str.indexOf("SHN")+3);
                let default_addr = document.getElementById(`shipping_info_default_btn SHN${delete_shipping_index}`)? document.getElementById(`shipping_info_default_btn SHN${delete_shipping_index}`).value: 'n';
            
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
                
                    if (location.pathname.substring(0, 15) == '/shop/checkout/') {
                        if (result.length) {
                            console.log("if (location.pathname.substring(0, 15) == '/shop/checkout/') {")

                            document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off" ?
                                document.getElementById('user_continue_to_payment_btn').style.display = "none" : false;
                            
                            document.getElementById('user_checkout_shipping_info_detail_box').style.display = "none";
                            document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                            document.getElementById('user_checkout_shipping_method_container_change_btn').style.display = "none";
                            document.getElementById('user_checkout_shipping_method_container').style.display = "block";
                            document.getElementById('user_checkout_shipping_method_container_cover').style.display = "none";
                            // document.getElementById('user_checkout_billing_info_cover').style.display = "block";
                            
                            document.getElementById('user_checkout_submit_button').setAttribute("disabled", "true");
                            document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = 
                            `
                            <div id="change_profile_shipping_info" class="change_profile_shipping_info">
                                <div id="shipping_info_container" class="shipping_info_container">
                                    <div id="shipping_info_box" class="shipping_info_box"></div> 
                                </div>
                                <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container info_add_btn_container">
                                    <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                                </div>
                            </div>
                            
                            `;                    
                            
                            document.getElementById('shipping_info_add_btn_container').style.display = "block";
                            const shipping_info_box = document.querySelector('.shipping_info_box');
                            while (shipping_info_box.hasChildNodes()) {	
                                shipping_info_box.removeChild(shipping_info_box.firstChild);
                            }
                            renderShippingInfo(result);
                            document.getElementById('user_checkout_shipping_info_next_btn').style.display = "block";
                        } else {
                            document.getElementById('user_checkout_shipping_info_detail_box_cover').innerHTML = AIF.setUpShippingAddressForm();
                            document.getElementById('user_checkout_shipping_info_change_btn').style.display = 'none';
                            document.getElementById('user_checkout_shipping_info_next_btn').style.display = 'none';
                        }
                        

                    } else {
                        const shipping_info_box = document.querySelector('.shipping_info_box');
                        while (shipping_info_box.hasChildNodes()) {	
                            shipping_info_box.removeChild(shipping_info_box.firstChild);
                        }
                        renderShippingInfo(result);
                        document.getElementById('shipping_info_add_btn_container').style.display = "block";
                    }               

                });
            }
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
            document.getElementById('choose_defualt_btn_container').focus();
            
            
            
            
        });
        
    }


    

    if(e.target && e.target.id == 'purchase_history_order_cancel_btn') {
        Swal.fire({
            title: 'Are you sure to cancel this order?',            
           
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#983131', // confrim 버튼 색깔 지정 98, 31, 31 3085d6
            cancelButtonColor: '#254248241', // cancel 버튼 색깔 지정 d33
            confirmButtonText: 'Confirm', // confirm 버튼 텍스트 지정
            cancelButtonText: 'Cancel', // cancel 버튼 텍스트 지정
            width: 400,
            // height: 400,
            
            reverseButtons: true, // 버튼 순서 거꾸로
            
        }).then(result => {
            // if get promise return
            if (result.isConfirmed) { // button click confirm

                SPINNER.turnOffDisplay(e);

                console.log(e.target.parentElement.getAttribute('head_orderid'));
                const user_id = u_id ? u_id : 'GUEST';
                const page_num = document.querySelector(`.purchase_page`)? parseInt(document.querySelector(`.purchase_page.page_el.active`).getAttribute('page_data_num')) : 0;
                const send_data = {
                    user_id : user_id,
                    order_number : e.target.parentElement.getAttribute('head_orderid'),
                    page_num : page_num     
                    }
                const option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                
                        },
                    body: JSON.stringify(send_data)
                };
                console.log(option);

                fetch('/cancel_order', option)
                .then((res) => res.json())
                .then(result => {
                    console.log(result);
                    SPINNER.turnOnDisplay();

                    const refund_images = result.result.filter(element => {
                        return element.order_number == send_data.order_number && element.refund == 'y'           
                        }).map(element => element.image);

                    console.log('refund_images')
                    console.log(refund_images)
                    
                    let swal_html_images = '';
                    for (let i in refund_images) {
                        swal_html_images = swal_html_images + `<img src="https://gocafefore.com${refund_images[i]}"  height="60" width="60">`
                    }
                    console.log(swal_html_images)
                    const swal_html = swal_html_images + '<br></br>'+'Your order items has been cancelled.'
                
                    Swal.fire({                       
                        html: swal_html,                    
                        imageAlt: 'Custom image',
                        width:400,
                        confirmButtonColor: '#983131',               
                    })
                    

                    const lorem = document.getElementById('lorem');
                    while (lorem.hasChildNodes()) {	
                        lorem.removeChild(lorem.firstChild);
                    }

                    document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
                    PurchaseHistory.setPurchaseHistory(result.result);
                    page_num != 0 ? renderPagination(result.total_purchase, page_num ? page_num : 1) : false;
                  

                });
            }
        });

    }
    
    if (e.target && e.target.id == 'purchase_history_item_order_cancel_btn') {

        Swal.fire({
            title: 'Are you sure to cancel this item order?',            
           
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#983131', // confrim 버튼 색깔 지정 98, 31, 31 3085d6
            cancelButtonColor: '#254248241', // cancel 버튼 색깔 지정 d33
            confirmButtonText: 'Confirm', // confirm 버튼 텍스트 지정
            cancelButtonText: 'Cancel', // cancel 버튼 텍스트 지정
            width: 400,
            // height: 400,
            
            reverseButtons: true, // 버튼 순서 거꾸로
            
         }).then(result => {
            // if get promise return
            if (result.isConfirmed) { // button click confirm

                SPINNER.turnOffDisplay(e);
                console.log(e.target.getAttribute('cart-itemid'));
                // const cart_number = e.target.getAttribute('cart-itemid');
                // const user_id = u_id;
                const user_id = u_id ? u_id : 'GUEST';
                const page_num = document.querySelector(`.purchase_page`)? parseInt(document.querySelector(`.purchase_page.page_el.active`).getAttribute('page_data_num')) : 0;
                console.log(page_num)
                // const order_number = ;
                const send_data = {
                    user_id : user_id,
                    cart_number : e.target.getAttribute('cart-itemid'), 
                    order_number : e.target.getAttribute('order-itemid'),
                    prodnum : e.target.getAttribute('itemid'),
                    page_num : page_num
                    }
                const option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                
                        },
                    body: JSON.stringify(send_data)
                };
                console.log(option);

                fetch('/cancel_order_item', option)
                .then((res) => res.json())
                .then(result => {
                    console.log(result);
                    SPINNER.turnOnDisplay();

                    const image_orderid = send_data.cart_number+send_data.prodnum;
                    const imaUrl = document.querySelector(`[image_orderid="${image_orderid}"]`).getAttribute('src');
                    // console.log(imaUrl)
                    Swal.fire({     
                        text: 'Your order item has been cancelled.',
                        imageUrl: imaUrl,
                        imageWidth: 70,
                        imageHeight: 70,
                        imageAlt: 'Custom image',          
                        width:400,
                        confirmButtonColor: '#983131',               
                    })

                    const lorem = document.getElementById('lorem');
                    while (lorem.hasChildNodes()) {	
                        lorem.removeChild(lorem.firstChild);
                    }
                    document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
                    PurchaseHistory.setPurchaseHistory(result.result);
                    page_num != 0 ? renderPagination(result.total_purchase, page_num ? page_num : 1) : false;
                
                });
            }
        });
    }


    
    if (e.target && e.target.id == 'purchase_history_item_return_btn') {
        console.log("item return page")
        document.getElementById('lorem').innerHTML = PurchaseHistory.makePurchaseHistoryReturnPageContainer();
        
        const order_num = e.target.getAttribute('order-itemid');
        const cart_num = e.target.getAttribute('cart-itemid');

        console.log(order_num)
        console.log(cart_num)
                
        const send_data = {
            order_number : order_num,
            cart_number : cart_num,                
            }
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(send_data)
        };
       
        fetch('/get_req_return_item_info', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result);   
            PurchaseHistory.setPurchaseHistory(result);
            document.getElementById('purchase_history_item_extrabox').style.display = 'none';
            document.getElementById('purchase_history_head_order_total').style.display = 'none';
            document.getElementById('purchase_history_order_has_shippment').style.display = 'none';
            
            document.getElementById('purchase_history_return_reason').addEventListener("change", (event) => {
                console.log(event.target.value)
                if (event.target.value == 'etc') {
                    document.getElementById('purchase_history_return_reason_etc_input').style.display = 'flex';

                } else {
                    document.getElementById('purchase_history_return_reason_etc_input').style.display = 'none';
                    document.getElementById('purchase_history_return_reason_etc_input').value = '';
                }
            });

            document.getElementById('purchase_history_return_submit_btn').addEventListener("click", (event) => {

                const return_reason = document.getElementById('purchase_history_return_reason');
                const purchase_history_return_extra_box = document.getElementById('purchase_history_return_extra_box');
                const purchase_history_return_reason_etc = document.getElementById('purchase_history_return_reason_etc_input').value;
                
                if ((return_reason.value && return_reason.value != 'etc') || (return_reason.value == 'etc' && purchase_history_return_reason_etc != '')) {
                    console.log("item return submit")

                    const send_data = {
                        order_number : order_num,
                        cart_number : cart_num,
                        return_reason : return_reason.value,
                        return_reason_etc : purchase_history_return_reason_etc
                        }
                    const option = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'                
                            },
                        body: JSON.stringify(send_data)
                    };
                   
                    fetch('/item_return', option)
                    .then((res) => res.json())
                    .then(result => {
                        console.log(result);   
                        if (result.result == 'ok') {
                        document.getElementById('purchase_history_return_box').innerHTML = `
                        <div id="purchase_history_return_submit" class="purchase_history_return_submit">
                            Your item return request has approved.<br>   
                        </div>                                  
                        `;
                        }
                    }); 
        
                } else if (return_reason.value == 'etc' && purchase_history_return_reason_etc == '') {           
                    showNotification(purchase_history_return_extra_box, 'please input return reason...');
                } else {
                    showNotification(purchase_history_return_extra_box, 'please select return reason...');
                }
            });

            document.getElementById('purchase_history_return_cancel_btn').addEventListener("click", (event) => {
                history.pushState(null, null, `/purchase-history`); // url change
                (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
                viewPurchaseHistory({user_id:u_id});
                WEBS.toggleFunc();
            });
        });

    }
    
    


    if(e.target && e.target.id == 'purchase_history_item_track_btn') {
        const track_number = e.target.getAttribute('track-itemid');              
        if (track_number.length > 0) {
            console.log("ups item track page open")

            const send_data = {
                user_id : u_id,
                cart_number : e.target.getAttribute('cart-itemid'),                
                }
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                
                    },
                body: JSON.stringify(send_data)
            };
           
            fetch('/get_track_number', option)
            .then((res) => res.json())
            .then(result => {
                console.log(result);            
                window.open(`https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=${result.track_number}`);
            });
            
        } else {  
            Swal.fire({     
                text: 'Your order item has not been shipped yet.',                   
                width:300,
                confirmButtonColor: '#983131',               
            })
        }       
    }

    if(e.target && e.target.id == 'js-pagination') {
        console.log(e.target);
        console.log(e.target.getAttribute('page_data_num'));
        const select_page_num = parseInt(e.target.getAttribute('page_data_num'));
       
        document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
       
        viewPurchaseHistory({user_id:u_id}, select_page_num);
        
    }
   

});


function showNotification(param_target_box, param_innertext, param_id) {
    param_target_box.classList.add('show');
    param_target_box.innerText = param_innertext;
    param_id ? document.getElementById(param_id).focus() : false;
    setTimeout(() => {
        param_target_box.classList.remove('show');
    }, 3000)
}




function changeProfile() {    
    document.getElementById('lorem').innerHTML = AIF.mekeChangePrifileTap();    
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
    setBillingInfoCardDetail(bi_num, last4, type, exp);
    setBillingInfoDefaultBtn(bi_num, default_check)
    setBillingInfoEditBtn(bi_num)
}

function setBillingInfoCardholer(bi_num, cardholder) {
    const billingInfoCardholer = document.createElement('div');
    billingInfoCardholer.setAttribute('class', `billing_info_cardholder BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoCardholer);
    document.querySelector(`.billing_info_cardholder.BIN${bi_num}`).innerHTML = cardholder;
}

function setBillingInfoCardDetail(bi_num, last4, type, exp) {
    const billingInfoCardDetail = document.createElement('div');
    billingInfoCardDetail.setAttribute('id', `billing_info_card_detail BIN${bi_num}`);
    billingInfoCardDetail.setAttribute('class', `billing_info_card_detail BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billingInfoCardDetail);
    setBillingInfoLast4(bi_num, last4);
    setBillingInfoType(bi_num, type);    
    setBillingInfoExp(bi_num, exp)
}

function setBillingInfoLast4(bi_num, last4) {
    const billingInfoLast4 = document.createElement('div');
    billingInfoLast4.setAttribute('class', `billing_info_last4 BIN${bi_num}`);
    document.getElementById(`billing_info_card_detail BIN${bi_num}`).appendChild(billingInfoLast4);
    document.querySelector(`.billing_info_last4.BIN${bi_num}`).innerText = '*********' + last4;
}

function setBillingInfoType(bi_num, type) {
    const billingInfoType = document.createElement('div');
    billingInfoType.setAttribute('class', `billing_info_type BIN${bi_num}`);
    document.getElementById(`billing_info_card_detail BIN${bi_num}`).appendChild(billingInfoType);
    document.querySelector(`.billing_info_type.BIN${bi_num}`).innerHTML = type;
}

function setBillingInfoExp(bi_num, exp) {
    const billingInfoExp = document.createElement('div');
    const text_exp = exp.slice(0,2) + '/' + exp.slice(-2);
    billingInfoExp.setAttribute('class', `billing_info_exp BIN${bi_num}`);
    document.getElementById(`billing_info_card_detail BIN${bi_num}`).appendChild(billingInfoExp);    
    document.querySelector(`.billing_info_exp.BIN${bi_num}`).innerHTML = text_exp;
}

function setBillingInfoDefaultBtn(bi_num, default_check) {
    if (default_check == "default") {
        const choose_defualt_btn_container = document.createElement('div');
        choose_defualt_btn_container.setAttribute('id', `choose_defualt_btn_container`);
        choose_defualt_btn_container.setAttribute('class', `choose_defualt_btn_container BIN${bi_num}`);
        choose_defualt_btn_container.setAttribute('tabindex', `0`); 
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
    
        default_check_radio.checked = true;
        billingInfoDefaultBtn.setAttribute('value', `default`);
    } 

}

function setBillingInfoEditBtn(bi_num) {
    const billing_info_edit_btn_container = document.createElement('div');
    billing_info_edit_btn_container.setAttribute('id', `billing_info_edit_btn_container BIN${bi_num}`);
    billing_info_edit_btn_container.setAttribute('class', `billing_info_edit_btn_container BIN${bi_num}`);
    document.getElementById(`billing_info_detial BIN${bi_num}`).appendChild(billing_info_edit_btn_container);

    const billing_info_make_default_btn = document.createElement('button');
    billing_info_make_default_btn.setAttribute('class', `billing_info_make_default_btn BIN${bi_num}`);
    billing_info_make_default_btn.setAttribute('type', `button`);
    billing_info_make_default_btn.setAttribute('value', `make_default_billing_info`);
    billing_info_make_default_btn.textContent = "Set Default";
    document.getElementById(`billing_info_edit_btn_container BIN${bi_num}`).appendChild(billing_info_make_default_btn);

    const billing_info_delete_btn = document.createElement('button');
    billing_info_delete_btn.setAttribute('class', `billing_info_delete_btn BIN${bi_num}`);
    billing_info_delete_btn.setAttribute('type', `button`);
    billing_info_delete_btn.setAttribute('value', `delete_payment_method`);
    billing_info_delete_btn.textContent = "Delete Method";
    document.getElementById(`billing_info_edit_btn_container BIN${bi_num}`).appendChild(billing_info_delete_btn);


}

export function renderBillingInfo(result) {
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
    shippingInfo.setAttribute('id', `user_shipping_info`);
    shippingInfo.setAttribute('class', `shipping_info SHN${sh_num}`);
    document.querySelector('.shipping_info_box').appendChild(shippingInfo);
    setShippingInfoDetail(sh_num, recipient, address1, address2, city, state, zip, phone, email, default_check);
}

function setShippingInfoDetail(sh_num, recipient, address1, address2, city, state, zip, phone, email, default_check) {
    const shippingInfoDetail = document.createElement('div');
    shippingInfoDetail.setAttribute('class', `shipping_info_detial SHN${sh_num}`);
    document.querySelector(`.shipping_info.SHN${sh_num}`).appendChild(shippingInfoDetail);
    setShippingInfoRecipient(sh_num, recipient);
    setShippingInfoAddress(sh_num, address1, address2);
    
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

function setShippingInfoAddress(sh_num, address1, address2) {
    const shippingInfoAddress = document.createElement('div');
    shippingInfoAddress.setAttribute('class', `shipping_info_address SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shippingInfoAddress);   

    setShippingInfoAddress1(sh_num, address1);
    setShippingInfoAddress2(sh_num, address2);

}

function setShippingInfoAddress1(sh_num, address1) {
    const shippingInfoAddress1 = document.createElement('div');
    shippingInfoAddress1.setAttribute('class', `shipping_info_address1 SHN${sh_num}`);
    document.querySelector(`.shipping_info_address.SHN${sh_num}`).appendChild(shippingInfoAddress1);
    document.querySelector(`.shipping_info_address1.SHN${sh_num}`).innerText = address1;

}

function setShippingInfoAddress2(sh_num, address2) {
    const shippingInfoAddress2 = document.createElement('span');
    shippingInfoAddress2.setAttribute('class', `shipping_info_address2 SHN${sh_num}`);
    document.querySelector(`.shipping_info_address.SHN${sh_num}`).appendChild(shippingInfoAddress2);
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
    
    if (default_check == "default") {
        const choose_defualt_btn_container = document.createElement('div');
        choose_defualt_btn_container.setAttribute('id', `choose_defualt_btn_container`);
        choose_defualt_btn_container.setAttribute('class', `choose_defualt_btn_container SHN${sh_num}`);
        choose_defualt_btn_container.setAttribute('tabindex', `0`);
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

    
        default_check_radio.checked = true;
        shippingInfoDefaultBtn.setAttribute('value', `default`);
    } 

}

function setShippingInfoEditBtn(sh_num) {
    const shipping_info_edit_btn_container = document.createElement('div');
    shipping_info_edit_btn_container.setAttribute('id', `shipping_info_edit_btn_container SHN${sh_num}`);
    shipping_info_edit_btn_container.setAttribute('class', `shipping_info_edit_btn_container SHN${sh_num}`);
    document.querySelector(`.shipping_info_detial.SHN${sh_num}`).appendChild(shipping_info_edit_btn_container);

    const shipping_info_make_default_btn = document.createElement('button');
    shipping_info_make_default_btn.setAttribute('class', `shipping_info_make_default_btn SHN${sh_num}`);
    shipping_info_make_default_btn.setAttribute('type', `button`);
    shipping_info_make_default_btn.setAttribute('value', `make_default_shipping_info`);
    shipping_info_make_default_btn.textContent = "Set Default"

    document.getElementById(`shipping_info_edit_btn_container SHN${sh_num}`).appendChild(shipping_info_make_default_btn);

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

    

}

export function renderShippingInfo(result) {
  
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


export function viewPurchaseHistory(param, page_num) {

    console.log("view purchase History")
    document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();

    const data = {
        id : param.user_id,
        order_number : param.order_number,
        page_num : page_num ? page_num : 1
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
                },
            body: JSON.stringify(data)
        };
        console.log(option);

        fetch('/check_purchase_history', option)
        .then((res) => res.json())
        .then(result => {
            console.log(result)
            PurchaseHistory.setPurchaseHistory(result.result);
            // const page_info = pageAlgo(result.length, 5, 10, 1);
            // console.log(page_info)

            // paging(result.length, 1)
            renderPagination(result.total_purchase, page_num ? page_num : 1);


        });
}

function makePurchaseHistoryContainer() {
    return `
    <div id="purchase_history_container" class="purchase_history_container">
        <div id="purchase_history_page" class="purchase_history_page">
            <div id="purchase_history_title" class="purchase_history_title">Purchase History</div>
            <div id="purchase_history_box" class="purchase_history_box">
            </div>
        </div> 
        <div id="purchase_history_pagenation" id="purchase_history_pagenation">
           
        </div> 
    </div>
    `;
}


function renderPagination(_totalCount, currentPage) {
    const dataPerPage = 10;
    const pageCount = 5; // how namy count pages in page gruop 
    if (_totalCount <= 10) return; 
  
    let totalPage = Math.ceil(_totalCount / dataPerPage);
    let pageGroup = Math.ceil(currentPage / pageCount); // how many page numbers in pagination
    console.log("currentPage");
    console.log(currentPage);
    
    console.log("pageGroup");
    console.log(pageGroup);
  
    let last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호 // last number in current page group
    if (last > totalPage) last = totalPage;
    // let first = last - (pageCount - 1) <= 0 ? 1 : last - (pageCount - 1);    // 화면에 보여질 첫번째 페이지 번호
    // let first = pageGroup == 1 ? 1 : currentPage - currentPage % pageCount + 1;  //하단 최초 숫자
    let first = pageGroup == 1 ? 1 : last - (pageCount - 1);
    console.log("first");
    console.log(first);
    const next = last + 1;
    const prev = first - 1;

  
    const fragmentPage = document.createDocumentFragment();
    if (prev > 0) {
      var allpreli = document.createElement('button');
      allpreli.setAttribute('id', 'js-pagination');
      allpreli.setAttribute('class', 'page_el');
      allpreli.setAttribute('page_index', `allprev`);
      allpreli.setAttribute('page_data_num', `1`);
      allpreli.insertAdjacentHTML("beforeend", `&lt;&lt;`);

    //   allpreli.insertAdjacentHTML("beforeend", `<id='allprev' class='page_el'>&lt;&lt;`);
  
      var preli = document.createElement('button');
      preli.setAttribute('id', 'js-pagination')
      preli.setAttribute('class', 'page_el')
      preli.setAttribute('page_index', `prev`);
      preli.setAttribute('page_data_num', `${first - 1}`);
      preli.insertAdjacentHTML("beforeend", `&lt;`);
        // preli.insertAdjacentHTML("beforeend", `<id='prev' class='page_el'>&lt;`);
  
        fragmentPage.appendChild(allpreli);
        fragmentPage.appendChild(preli);
    }
      
    for (var i = first; i <= last; i++) {
      const li = document.createElement("button");
      li.setAttribute('id', 'js-pagination')
      li.setAttribute('class', `purchase_page page_el`);
      li.setAttribute('page_index', `${i}`);
      li.setAttribute('page_data_num', `${i}`);
      li.insertAdjacentHTML("beforeend", `${i}`);
    //   li.insertAdjacentHTML("beforeend", `<id='page-${i}' class='page_el' data-num='${i}'>${i}`);
      fragmentPage.appendChild(li);
    }
  
    if (last < totalPage) {
      var allendli = document.createElement('button');
      allendli.setAttribute('id', 'js-pagination');
      allendli.setAttribute('class', 'page_el');
      allendli.setAttribute('page_index', 'allnext');
      allendli.setAttribute('page_data_num', `${totalPage}`);
      allendli.insertAdjacentHTML("beforeend", `&gt;&gt;`);
    //   allendli.insertAdjacentHTML("beforeend", `<id='allnext' class='page_el'>&gt;&gt;`);
  
      var endli = document.createElement('button');
      endli.setAttribute('id', 'js-pagination');
      endli.setAttribute('class', 'page_el');
      endli.setAttribute('page_index', 'next');
      endli.setAttribute('page_data_num', `${last+1}`);
      endli.insertAdjacentHTML("beforeend", `&gt;`);
    //   endli.insertAdjacentHTML("beforeend", `<id='next' class='page_el'>&gt;`);
  
      fragmentPage.appendChild(endli);
      fragmentPage.appendChild(allendli);
    }

    document.getElementById('purchase_history_pagenation').appendChild(fragmentPage);
  // 페이지 목록 생성

  document.querySelector(`.page_el`).classList.remove("active");

  document.querySelector(`[page_data_num="${currentPage}"]`).classList.add("active");

};  

export function addBillingMethodForm() {
   
    const send_data = {u_id : 'getkey'};

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
            },
        body: JSON.stringify(send_data)
    };

    fetch(`/get_api_key`, data)
    .then((res) => res.json())
    .then(result => {
        const key = result;
        
        const clover = new Clover(key.key);

        const elements = clover.elements();            

        const styles = {
            body: {
                fontfamily: 'Jost, sans-serif',          
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
                    const spin_param = "add_payment_method";
                    
                    SPINNER.turnOffDisplay(spin_param);
                    

                    const form = document.getElementById('change_profile_billing_info_form');
                    const hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'cloverToken');
                    hiddenInput.setAttribute('value', result.token);
                    form.appendChild(hiddenInput);
                    // form.submit();

                    const formData = new FormData(form);
                    const payload = new URLSearchParams(formData);
                    fetch('/add_payment_method', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: payload,
                    })
                    .then(res => res.json())
                    .then(response => {
                        if (response.result == "ok") {
                            SPINNER.turnOnDisplay();

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
                                    
                                }
                            })
                            
                            if(location.pathname.substring(0, 15) == '/shop/checkout/') {
                                console.log("if(location.pathname.substring(0, 15) == '/shop/checkout/') {")
                                document.getElementById('user_checkout_billing_info_context').style.display = "block";
                                document.getElementById('user_checkout_billing_info_context').setAttribute('value', 'on');
                                
                                if (document.getElementById('user_checkout_shipping_method_container_change_btn').value == "off") {
                                    document.getElementById('user_checkout_change_payment_method_btn').style.display = "block";
                                    document.getElementById('user_checkout_billing_info_next_btn').style.display = "block";

                                }
                                     
                            }


                        } else {
                            alert("sorry... something wrong in DB SERVER.")

                        }
                    });               
                }
            });
        });        
    });
} 



