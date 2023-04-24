import * as AIF from "./acc_info_form.js";
import * as ItemCounter from "./item_counter.js";
import * as PurchaseHistory from "./purchase_history_form.js";

export default class Cart {
    
    // navbar = document.getElementById('navbar');
    // lorem = document.getElementById('lorem');
    

    constructor() {
        document.title = "Cafe FORE";
        console.log("cart.js");
        
        this.c_name = this.getCookie()[0];
        this.c_id = this.getCookie()[1];

        /*
        this.navbar.addEventListener('click',function(e){ 
            console.log("cart click double check navbar")
            if(e.target && e.target.className == 'user_profile_change_btn') {

                document.querySelector('.main_background__blink').style.display = "none";              
                changeProfile();       
                
            }
        
            if(e.target && e.target.className == 'user_purchase_history_btn') {        

                document.querySelector('.main_background__blink').style.display = "none";
                viewPurchaseHistory(u_id);               
        
            }
        });

        this.lorem.addEventListener('click',function(e){ 
            console.log("cart click double check lorem")
            if(e.target && e.target.className == 'btn billing_info_add_btn') {
                document.querySelector('.billing_info_box').innerHTML = addBillingInfoBox();
                addBillingMethodForm();
                document.querySelector('.billing_info_add_btn_container').style.display = "none";
            }
            if(e.target && e.target.className == 'btn shipping_info_add_btn') {
                document.querySelector('.shipping_info_box').innerHTML = addShippingInfoBox();
                document.querySelector('.shipping_info_add_btn_container').style.display = "none";
                addShippingInfo();
            }
        
        
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
        */

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
                document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
                this.c_id = 'GUEST'; 
                this.c_name = 'GUEST';
                ItemCounter.item_counter('GUEST');


                
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
            <div id='user_profile_greet' class='user_profile_greet'>Hello</div>
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

    changeProfile() {    
        document.getElementById('lorem').innerHTML = mekeChangePrifileTap();    
    }

    // viewPurchaseHistory2(u_id) {
    //     console.log("view purchase History")
    //     document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
    
    //     const data = {id : u_id}
    
    //     const option = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'                
    //             },
    //         body: JSON.stringify(data)
    //     };
    //     console.log(option);

    //     fetch('/check_purchase_history', option)
    //     .then((res) => res.json())
    //     .then(result => {
    //         console.log(result)
    //         setPurchaseHistory(result);

    //     });
    // }
    

}

let u_id = '';



document.addEventListener('click',function(e){ 

    console.log("cart click double check ")
    
        
    if(e.target && e.target.id == 'user_profile_change_btn') {

        history.pushState(null, null, `/account`); // url change
        (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
      
        changeProfile();


        // fetch('/change_profile')
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(err => console.error(err)); 
        
    }

    if(e.target && e.target.id == 'user_purchase_history_btn') {

        history.pushState(null, null, `/purchase-history`); // url change
        (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
        viewPurchaseHistory({user_id:u_id});
        

    }



    if(e.target && e.target.id == 'change_password_btn') {
        document.querySelector('.change_password_container').classList.toggle('pw_active');
        // document.querySelector('.change_password_container').innerHTML = changePassword();
    }

    if(e.target && e.target.id == 'billing_info_add_btn') {
        console.log("e.target && e.target.id == 'billing_info_add_btn'")
        document.querySelector('.billing_info_box').innerHTML = AIF.addBillingInfoBox();
        AIF.addBillingMethodForm();
        document.querySelector('.billing_info_add_btn_container').style.display = "none";
    }
    if(e.target && e.target.id == 'shipping_info_add_btn') {
        document.querySelector('.shipping_info_box').innerHTML = AIF.addShippingInfoBox();
        document.querySelector('.shipping_info_add_btn_container').style.display = "none";
        AIF.addShippingInfo();
    }


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
        
        document.querySelector('.shipping_info_box').innerHTML = AIF.addShippingInfoBox();        
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

    

    if(e.target && e.target.id == 'purchase_history_order_cancel_btn') {
        console.log(e.target.parentElement.getAttribute('head_orderid'));
        const user_id = u_id ? u_id : 'GUEST';
        const send_data = {
            user_id : user_id,
            order_number : e.target.parentElement.getAttribute('head_orderid')     
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

            const lorem = document.getElementById('lorem');
            while (lorem.hasChildNodes()) {	
                lorem.removeChild(lorem.firstChild);
            }

            document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
            setPurchaseHistory(result);
            // viewPurchaseHistory(send_data);

        });

    }

    if(e.target && e.target.id == 'purchase_history_item_track_btn') {
        console.log(e.target.getAttribute('track-itemid'));

    }
    
    if (e.target && e.target.id == 'purchase_history_item_order_cancel_btn') {
        console.log(e.target.getAttribute('cart-itemid'));
        // const cart_number = e.target.getAttribute('cart-itemid');
        // const user_id = u_id;
        const user_id = u_id ? u_id : 'GUEST';
        // const order_number = ;
        const send_data = {
            user_id : user_id,
            cart_number : e.target.getAttribute('cart-itemid'), 
            order_number : e.target.getAttribute('order-itemid'),
            prodnum : e.target.getAttribute('itemid')
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
          
            const lorem = document.getElementById('lorem');
            while (lorem.hasChildNodes()) {	
                lorem.removeChild(lorem.firstChild);
            }
            document.getElementById('lorem').innerHTML = makePurchaseHistoryContainer();
            setPurchaseHistory(result);
          
        });
    }
});




function changeProfile() {    
    document.querySelector('.lorem').innerHTML = mekeChangePrifileTap();    
}


function mekeChangePrifileTap() {
    return `
    <div id="change_profile_form_container" class="change_profile_form_container">

        <ul id="tabs" class="tabs">
            <li class="tab-link current" data-tab="tab-1">General Infomation</li>
            <li class="tab-link" data-tab="tab-2">Billing Infomation</li>
            <li class="tab-link" data-tab="tab-3">Shipping Infomation</li>
        </ul>
        <div id="change_profile_form" class="change_profile_form">

            <div id="tab-1" class="tab-content current change_profile_general_info">general_info            
                <form action="/change_profile_general" class="change_profile_general_info_form" method="post">
                    <div align="left" class="form-tag input_general_info_tag">Name</div>
                    <div class="form-row general_name">
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <input type="text" name="general_first_name" class="input_general_first_name input_general_info_name" placeholder="First">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_name">
                                <input type="text" name="general_last_name" class="input_general_last_name input_general_info_name" placeholder="Last">
                            </div>
                        </div>
                    </div>

                    <div class="form-tag input_general_info_tag">Mobile number</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_phone">
                        <input type="text" name="general_phone" class="input_general_phone input_general_info" placeholder="### ### ####">
                        </div>
                    </div>

                    <div class="form-tag input_general_info_tag">Email</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_email">
                        <input type="text" name="general_email" class="input_general_email input_general_info" >
                        </div>
                    </div>

                    <div class="form-tag input_general_info_tag">Address</div>
                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_address">
                        <input type="text" name="general_address_street_line1" class="input_general_address_street_line1 input_general_info" placeholder="Address Street Line 1">
                        </div>
                    </div>

                    <div class="form-row">
                        <div id="change_profile_general" class="field change_profile_general_address">
                        <input type="text" name="general_address_street_line2" class="input_general_address_street_line2 input_general_info" placeholder="Address Street Line 2">
                        </div>
                    </div>

                    <div class="general_info_csz">
                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_address">
                            <input type="text" name="general_address_city" class="input_general_address_city input_general_info_csz" placeholder="City">
                            </div>
                        </div>

                        <div class="form-row">
                            <div id="change_profile_general" class="field change_profile_general_address">
                                <select name="general_address_state" id="change_profile_general" class="change_profile_general input_general_info_csz select_state_box">
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
                            <input type="text" name="general_address_zip" class="input_general_address_zip input_general_info_csz" placeholder="Zip Code">
                            </div>
                        </div>
                    </div>

                    <div class="change_profile_general_default_address input_general_info_tag">
                    <input type="checkbox" id="change_profile_general_default_address_checkbox" name="default_address" value="default" checked>
                    <label for="change_profile_general_default_address_checkbox">make default shipping address</label>
                    </div>



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
                <div id="change_profile_billing_info" class="change_profile_billing_info">
                    <div id="billing_info_container" class="billing_info_container">
                        <div id="billing_info_box" class="billing_info_box"></div>         
                    </div>
                    <div id="billing_info_add_btn_container" class="billing_info_add_btn_container" >
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
                    <div id="shipping_info_add_btn_container" class="shipping_info_add_btn_container">
                        <button id="shipping_info_add_btn" class="btn shipping_info_add_btn">+ Add Shipping Infomation</button>
                    </div>
                </div>
            </div>
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

function viewPurchaseHistory(param) {

    console.log("view purchase History")
    document.querySelector('.lorem').innerHTML = makePurchaseHistoryContainer();

    const data = {
        id : param.user_id,
        order_number : param.order_number
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
            setPurchaseHistory(result);

            // const delete_node = document.getElementById(`billing_info BIN${delete_card_index}`);
            // document.querySelector('.billing_info_box').removeChild(delete_node);

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
    </div>
    `;
}

function setPurchaseHistory(result) {
    result.forEach(element => {
        const order_id = element.order_number;
        let cart_id = element.cartnum;
        let prodnum = element.prodnum;
        let image_src = element.image;
        let item_name = element.name;
        const price = element.price_sell;
        const quantity = element.quantity;
        let item_description = element.content;

        let total_amount = element.total_order_amount;
        let oddate = element.oddate;
        let track_number = element.track_number;
        let shipping_fee = element.shipping_fee;
        let shipping_rate = element.shipping_rate;
        let refund = element.refund;
        let full_refunded = element.full_refunded;
        // let $purchase_history = document.querySelector(`[orderid="${order_id}"]`);
        if (document.querySelector(`[orderid="${order_id}"]`)) {
            
            setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);

        } else {
            const purchase_history = document.createElement('div');
            purchase_history.setAttribute('id', `purchase_history`);
            purchase_history.setAttribute('class', `purchase_history`);
            purchase_history.setAttribute('orderid', `${order_id}`);
            document.getElementById('purchase_history_box').appendChild(purchase_history);
            setPurchaseHistoryHead(order_id, oddate, total_amount, full_refunded);
            setPurchaseHistoryMain(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);


        } 
    })

}

function setPurchaseHistoryHead(order_id, oddate, total_amount, full_refunded) {
    const purchase_history_head = document.createElement('div');
    purchase_history_head.setAttribute('id', `purchase_history_head`);
    purchase_history_head.setAttribute('class', `purchase_history_head`);
    purchase_history_head.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[orderid="${order_id}"]`).appendChild(purchase_history_head);
    // purchase_history_head.innerText = order_id;
    
    setPurchaseHistoryHeadOrderdate(order_id, oddate);
    setPurchaseHistoryHeadOrderTotal(order_id, total_amount);
    setCancelOrder(order_id, full_refunded);
}

function setPurchaseHistoryHeadOrderdate(order_id, oddate) {
    const purchase_history_head_orderdate = document.createElement('div');
    purchase_history_head_orderdate.setAttribute('id', `purchase_history_head_orderdate`);
    purchase_history_head_orderdate.setAttribute('class', `purchase_history_head_orderdate`);
    // purchase_history_head_orderdate.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_head_orderdate);
    purchase_history_head_orderdate.innerText = oddate;
}

function setPurchaseHistoryHeadOrderTotal(order_id, total_amount) {
    const purchase_history_head_order_total = document.createElement('div');
    purchase_history_head_order_total.setAttribute('id', `purchase_history_head_order_total`);
    purchase_history_head_order_total.setAttribute('class', `purchase_history_head_order_total`);
    // purchase_history_head_orderdate.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_head_order_total);
    purchase_history_head_order_total.innerText = '$' + parseFloat(total_amount).toFixed(2);
}

function setCancelOrder(order_id, full_refunded) {
    const purchase_history_order_cancel_btn = document.createElement('button');
    purchase_history_order_cancel_btn.setAttribute('id', `purchase_history_order_cancel_btn`);
    purchase_history_order_cancel_btn.setAttribute('class', `purchase_history_order_cancel_btn`);
    purchase_history_order_cancel_btn.setAttribute('title', `cancel this order`);        
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_order_cancel_btn);
    purchase_history_order_cancel_btn.innerText = 'Cancel This Order';
    if (full_refunded == 'y') {
        purchase_history_order_cancel_btn.innerText = 'This Order has canceled';
        purchase_history_order_cancel_btn.setAttribute('disabled', 'true'); 
    }
}




function setPurchaseHistoryMain(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund) {
    const purchase_history_main = document.createElement('div');
    purchase_history_main.setAttribute('id', `purchase_history_main`);
    purchase_history_main.setAttribute('class', `purchase_history_main`);
    purchase_history_main.setAttribute('main_orderid', `${order_id}`);
    document.querySelector(`[orderid="${order_id}"]`).appendChild(purchase_history_main);

    setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);

}

function setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund) {
    const purchase_history_item = document.createElement('div');
    purchase_history_item.setAttribute('id', `purchase_history_item`);
    purchase_history_item.setAttribute('class', `purchase_history_item`);
    purchase_history_item.setAttribute('item_orderid', `${cart_id}`);
    document.querySelector(`[main_orderid="${order_id}"]`).appendChild(purchase_history_item);
    //  purchase_history_item.innerText = cart_id;

    setPurchaseHistoryItemImagebox(cart_id, prodnum, image_src);
    setPurchaseHistoryItemContentbox(cart_id, prodnum, item_name, price, quantity, item_description);
    setPurchaseHistoryItemExtrabox(cart_id, prodnum, track_number, order_id, refund);
}

function setPurchaseHistoryItemImagebox(cart_id, prodnum, image_src) {
    const purchase_history_item_imagebox = document.createElement('div');
    purchase_history_item_imagebox.setAttribute('id', `purchase_history_item_imagebox`);
    purchase_history_item_imagebox.setAttribute('class', `purchase_history_item_imagebox`);
    purchase_history_item_imagebox.setAttribute('imagebox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_imagebox);
    setPurchaseHistoryItemImage(cart_id, prodnum, image_src)
}

function setPurchaseHistoryItemImage(cart_id, prodnum, image_src) {
    const purchase_history_item_image = document.createElement('img');
    purchase_history_item_image.setAttribute('id', `purchase_history_item_image`);
    purchase_history_item_image.setAttribute('class', `purchase_history_item_image`);
    purchase_history_item_image.setAttribute('src', `${image_src}`);
    document.querySelector(`[imagebox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_image);   

}


function setPurchaseHistoryItemContentbox(cart_id, prodnum, item_name, price, quantity, item_description) {
    const purchase_history_item_contentbox = document.createElement('div');
    purchase_history_item_contentbox.setAttribute('id', `purchase_history_item_contentbox`);
    purchase_history_item_contentbox.setAttribute('class', `purchase_history_item_contentbox`);
    purchase_history_item_contentbox.setAttribute('contentbox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_contentbox);
    
    setPurchaseHistoryItemName(cart_id, prodnum, item_name);
    setPurchaseHistoryItemPQBox(cart_id, prodnum, price, quantity);
    setPurchaseHistoryItemDescription(cart_id, prodnum, item_description);
    

}

function setPurchaseHistoryItemName(cart_id, prodnum, item_name) {
    const purchase_history_item_name = document.createElement('div');
    purchase_history_item_name.setAttribute('id', `purchase_history_item_name`);
    purchase_history_item_name.setAttribute('class', `purchase_history_item_name`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_name);
    purchase_history_item_name.innerText = item_name;

}

function setPurchaseHistoryItemPQBox(cart_id, prodnum, price, quantity) {
    const purchase_history_item_pq_box = document.createElement('div');
    purchase_history_item_pq_box.setAttribute('id', `purchase_history_item_pq`);
    purchase_history_item_pq_box.setAttribute('class', `purchase_history_item_pq`);
    purchase_history_item_pq_box.setAttribute('item_pqbox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_pq_box);
    // setPurchaseHistoryItemPQBox.innerText = `$${price}`;
    setPurchaseHistoryItemPrice(cart_id, prodnum, price);
    setPurchaseHistoryItemQuantity(cart_id, prodnum, quantity);
    setPurchaseHistoryItemSubtotal(cart_id, prodnum, price, quantity);

}

function setPurchaseHistoryItemPrice(cart_id, prodnum, price) {
    const purchase_history_item_price = document.createElement('div');
    purchase_history_item_price.setAttribute('id', `purchase_history_item_price`);
    purchase_history_item_price.setAttribute('class', `purchase_history_item_price`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_price);
    purchase_history_item_price.innerText = `$${parseFloat(price).toFixed(2)}`;

}

function setPurchaseHistoryItemQuantity(cart_id, prodnum, quantity) {
    const purchase_history_item_quantity = document.createElement('div');
    purchase_history_item_quantity.setAttribute('id', `purchase_history_item_quantity`);
    purchase_history_item_quantity.setAttribute('class', `purchase_history_item_quantity`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_quantity);
    purchase_history_item_quantity.innerText = `\u00a0x ${quantity} EA`;

}

function setPurchaseHistoryItemSubtotal(cart_id, prodnum, price, quantity) {
    const item_subtotal = price * quantity;
    const purchase_history_item_subtotal = document.createElement('div');
    purchase_history_item_subtotal.setAttribute('id', `purchase_history_item_subtotal`);
    purchase_history_item_subtotal.setAttribute('class', `purchase_history_item_subtotal`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_subtotal);
    purchase_history_item_subtotal.innerText ='\u00a0\u00a0'+`Item Subtotal $${parseFloat(item_subtotal).toFixed(2)}`;

}

function setPurchaseHistoryItemDescription(cart_id, prodnum, item_description) {
    const purchase_history_item_description = document.createElement('div');
    purchase_history_item_description.setAttribute('id', `purchase_history_item_description`);
    purchase_history_item_description.setAttribute('class', `purchase_history_item_description`);
    // purchase_history_item_description.setAttribute('item_desc_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_description);
    purchase_history_item_description.innerText = item_description;

}

function setPurchaseHistoryItemExtrabox(cart_id, prodnum, track_number, order_id, refund) {
    const purchase_history_item_extrabox = document.createElement('div');
    purchase_history_item_extrabox.setAttribute('id', `purchase_history_item_extrabox`);
    purchase_history_item_extrabox.setAttribute('class', `purchase_history_item_extrabox`);
    purchase_history_item_extrabox.setAttribute('extrabox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_extrabox);
    
    setPurchaseHistoryItemReorder(cart_id, prodnum);
    setPurchaseHistoryItemTrack(cart_id, prodnum, track_number);
    setCancelOrderItem(cart_id, prodnum, order_id, refund);

}

function setPurchaseHistoryItemReorder(cart_id, prodnum) {
    const purchase_history_item_reorder_btn = document.createElement('button');
    purchase_history_item_reorder_btn.setAttribute('id', `purchase_history_item_reorder_btn`);
    purchase_history_item_reorder_btn.setAttribute('class', `purchase_history_item_reorder_btn`);
    purchase_history_item_reorder_btn.setAttribute('title', `item reorder`);    
    purchase_history_item_reorder_btn.setAttribute('itemid', `${prodnum}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_reorder_btn);
    purchase_history_item_reorder_btn.innerText = 'But It Again';
}

function setPurchaseHistoryItemTrack(cart_id, prodnum, track_number) {
    const purchase_history_item_track_btn = document.createElement('button');
    purchase_history_item_track_btn.setAttribute('id', `purchase_history_item_track_btn`);
    purchase_history_item_track_btn.setAttribute('class', `purchase_history_item_track_btn`);
    purchase_history_item_track_btn.setAttribute('title', `item track`);    
    purchase_history_item_track_btn.setAttribute('track-itemid', `${track_number}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_track_btn);
    purchase_history_item_track_btn.innerText = 'Item Track';
}

function setCancelOrderItem(cart_id, prodnum, order_id, refund) {
    const purchase_history_item_order_cancel_btn = document.createElement('button');
    purchase_history_item_order_cancel_btn.setAttribute('id', `purchase_history_item_order_cancel_btn`);
    purchase_history_item_order_cancel_btn.setAttribute('class', `purchase_history_item_order_cancel_btn`);
    purchase_history_item_order_cancel_btn.setAttribute('title', `cancel this order`);    
    purchase_history_item_order_cancel_btn.setAttribute('cart-itemid', `${cart_id}`);
    purchase_history_item_order_cancel_btn.setAttribute('order-itemid', `${order_id}`);
    purchase_history_item_order_cancel_btn.setAttribute('itemid', `${prodnum}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_order_cancel_btn);
    purchase_history_item_order_cancel_btn.innerText = 'Cancel Order This Item';
    if (refund == 'y') {
        purchase_history_item_order_cancel_btn.innerText = 'Item order Canceled';
        purchase_history_item_order_cancel_btn.setAttribute('disabled', 'true'); 
    }
}



