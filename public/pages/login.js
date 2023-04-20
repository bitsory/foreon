// import cart from "./cart.js";
import Main from "../index.js"




export default class {
    account_modal_pop_container = document.querySelector('.account_modal_pop_container');
    modal = document.querySelector('.modal');
    modal_page = document.querySelector('.modal_page');
    lorem = document.getElementById('lorem');
    
    // encrkey = '';

    constructor() {
        console.log("log in.js") 

        this.modal.addEventListener('click', (e) => { 

            console.log("log in.js this.modal.addEventListener( this.modal.addEventListener(")

            if(e.target && e.target.id == 'sign_in_btn') {  
                document.getElementById('user_id').value ? this.signInSubmit() : 
                document.getElementById('sign_in_form_extra').innerText = "input your ID";
                document.user_login_form.sign_in_id.focus();

            }

            if(e.target && e.target.id == 'create_an_account_btn') {                 
                this.modalClose();
                document.getElementById('main_background main_background__blink') ? document.getElementById('main_background main_background__blink').style.display = "none" : false;
                document.getElementById('lorem').innerHTML = this.makeSignUpForm();
    
            }

            if(e.target && e.target.id== 'sign_up_cancel_btn') {
                
                document.querySelector('.sign_up_form').remove();        
                this.modal_page.innerHTML = makeSignInForm();                
            }

            if(e.target && e.target.id == 'modal_exit') {
                this.modalClose();
            }

            if(e.target && e.target.id == 'track_my_order_btn') {
                this.modalClose();
                document.getElementById('main_background main_background__blink') ? document.getElementById('main_background main_background__blink').style.display = "none" : false;
                document.getElementById('lorem').innerHTML = this.makeTrackMyOrderForm();
            }

            // if(e.target && e.target.id == 'google_login') {
            //     this.modalClose();
            //     document.getElementById('main_background main_background__blink').style.display = "none";
                
            // }

        }) 

        this.modal.addEventListener('keyup', (e)=> {
            if(e.target && e.target.id == 'user_pw' && (e.keyCode == 13)) {                
                document.getElementById('user_id').value ? this.signInSubmit() : 
                document.getElementById('sign_in_form_extra').innerText = "please input your email address.";
                document.user_login_form.sign_in_id.focus();
            }

        }) 

        this.lorem.addEventListener('click', (e)=> {
            if(e.target && e.target.className == 'sign_up_submit_btn') {                 

                // document.getElementById('user_login_form').remove();
                // this.modal_page.innerHTML = makeSignUpForm();  
                if (!(document.getElementById('sign_up_user_name').value)) {
                    document.getElementById('sign_up_form_extra').textContent = "Please Input your Name...";
                    document.sign_up_form.sign_up_user_name.focus();
                
                } else if (!(document.getElementById('sign_up_user_email').value)) {
                    document.getElementById('sign_up_form_extra').textContent = "Please Input your email address...";
                    document.sign_up_form.sign_up_user_id.focus();

                } else if (!(document.getElementById('sign_up_user_pw').value)) {
                    document.getElementById('sign_up_form_extra').textContent = "Please Input your password...";
                    document.sign_up_form.sign_up_user_pw.focus();
                 
                } else if (document.getElementById('sign_up_user_pw').value != document.getElementById('sign_up_user_pw_check').value) {
                    document.getElementById('sign_up_form_extra').textContent = "please make sure to confirm password";
                    document.sign_up_form.sign_up_user_pw_check.focus();
                
                } else this.signUpSubmit();        
            }
        });
    }

    modal_script() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://accounts.google.com/gsi/client';
        document.body.appendChild(script);
        console.log("script add");
        
    }

    glogin() {
        const glogin_script = document.getElementById('glogin_script');

        while (glogin_script.hasChildNodes()) {
            glogin_script.removeChild(glogin_script.firstChild);
        }
              
        console.log("glogin loaded");
        let script = document.createElement('script');
        script.setAttribute('class', 'glogin'); 
        script.setAttribute('id', 'glogin'); 
        script.type = 'text/javascript';
        script.src = "http://localhost:8080/pages/glogin.js";   
        
        glogin_script.appendChild(script);

        
    }

    modalClose() {
        document.getElementById('modal_body').remove();
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // if (document.getElementById('glogin')) {
        //     document.getElementById('glogin').remove();
        // }
    }



    signInSubmit() {
        this.getPBKey().then(key => {

            const uid = document.getElementById('user_id').value;
            const upw = document.getElementById('user_pw').value;
            const current_path = document.location.href;

            // const te = {key : test_text}
            const crypt = new JSEncrypt();
            crypt.setPublicKey(key);
        
            const encrypted1 = crypt.encrypt(uid);
            const encrypted2 = crypt.encrypt(upw);
            const send_data = {aid : encrypted1, bpw : encrypted2, c_path : current_path}

            
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                body: JSON.stringify(send_data),
                redirect: "follow"
            };

            fetch('/sign_in', data)
            .then((res) => res.json())
            .then(result => {
                console.log(result)
                if (result.check == "not match") {
                    document.getElementById('sign_in_form_extra').innerHTML = 
                    "ID and Password not matched...<br/>please check your ID and Password";
                } else if (result.check == "not exist") {
                    document.getElementById('sign_in_form_extra').innerText = 
                    "please check your ID";
                } else window.location.href = result.url;
            });
        })
    }

    signUpSubmit() {

        this.getPBKey().then(key => {
            console.log(key);

            // const sign_up_uid = document.getElementById('sign_up_user_id').value;
            const sign_up_uname = document.getElementById('sign_up_user_name').value;
            const sign_up_uemail = document.getElementById('sign_up_user_email').value;
            const sign_up_upw = document.getElementById('sign_up_user_pw').value;
            const sign_up_upw_confirm = document.getElementById('sign_up_user_pw_check').value; 
            const sign_up_uphone = document.getElementById('sign_up_user_phone').value;        
    
            const current_path = document.location.href;
    
            if (sign_up_upw === sign_up_upw_confirm) {                
                console.log("sign up progress")
                // const te = {key : test_text}
                const tmp_uname = sign_up_uname.split(" ");
                const crypt = new JSEncrypt();
                crypt.setPublicKey(key);         

                const encrypted1 = crypt.encrypt(sign_up_uemail);
                const encrypted2 = crypt.encrypt(sign_up_upw);
                const send_data = {
                    // aid : sign_up_uid, 
                    uname : tmp_uname,
                    uemail : encrypted1,
                    bpw : encrypted2, 
                    uphone : sign_up_uphone,                
                    c_path : current_path
                }
                
                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                    body: JSON.stringify(send_data),
                    redirect: "follow"
                };
                console.log(data);
    
                fetch('/sign_up', data)
                .then((res) => res.json())
                .then(result => {
                    console.log(result)
                    // if (result.key == 'complete') {
                    //     window.location.href = result.url;
                        
                    if (result.key == 'use_other_id') {
                        document.getElementById('sign_up_form_extra').innerText = "please use different ID";
                        document.sign_up_form.sign_up_user_email.focus();
                    } else window.location.href = result.url;
                    // if (result.result == 'use_other_id') {
                    //     document.getElementById('sign_up_form_extra').innerText = "please use different ID";
                    // } else window.location.href = result.url;
                });
            } else {
                document.getElementById('sign_up_form_extra').innerText = "please make sure to confirm password"     
            }
    

        })
        
        
       
    }

    getPBKey() {
        return new Promise((resolve, reject) => {
            fetch('/account_modal_pop')
            .then((res) => res.json())
            .then(result => {
                // console.log(result)
                // this.encrkey = result.key;
                resolve(result.key);
            });
        }) 
    }


    
    makeSignInForm() {  
                
        this.glogin();

        return `
        <div id="modal_overlay" class="modal_overlay"></div>
            <div id="modal_body" class="modal_body">
                <div id="login_title_box" class="login_title_box">
                    <div id="login_title" class="login_title">Log In</div>
                    <button id="modal_exit" class="modal_exit btn">X</button>
                </div>
                <form id="user_login_form" class="user_login_form" name="user_login_form">
                    <div id="login_input_box" class="login_input_box">                        
                            <input type="text" id="user_id" class="user_id login_input_box_el" name="sign_in_id" placeholder="Email address for Sign In" required />                        
                            <input type="password" id="user_pw" class="user_pw login_input_box_el" name="sign_in_pw" placeholder="Password" required />                       
                    </div>
                    
                    <div id="find_and_remember_container" class="find_and_remember_container">
                        <div id="remember_me_box" class="remember_me_box">  
                            <input type="checkbox" id="remember_me_check" class="remember_me_check"><label for="remember_me_check">Remember Me</label></input>
                        </div>
                        <button type="button" id="find_password" class="find_password btn" title="Find password">Forget Password</button>
                    </div>
                </form>

                <div id="sign_in_form_button_container" class="sign_in_form_button_container">
                        <button type="button" id="sign_in_btn" class="sign_in_btn sign_in_btn_group" title="sign in">SIGN IN</button>                        
                        <button type="button" id="create_an_account_btn" class="create_an_account_btn sign_in_btn_group" title="Sign Up">CREATE AN ACCOUNT</button>
                        <button type="button" id='track_my_order_btn' class='track_my_order_btn sign_in_btn_group' title='track my order'>TRACK MY ORDER</button>
                         <div id='google_login' class='google_login sign_in_btn_group' title='Google ID Login'>
                         </div>
                </div>

                <div id="sign_in_form_extra" class="sign_in_form_extra"></div> 
                    
            </div>   
        `;
        
    }

    

    makeSignUpForm() {
        return `
        <div id="create_account_container" class="create_account_container">
            <div id="create_account_box" class="create_account_box">
                <h2>Create Account</h2>
                
                <form id="sign_up_form" class="sign_up_form" name="sign_up_form">
                    <div id="sign_up_box" class="sign_up_box">
                        <div id="sign_up_form_label_name" class="sign_up_form_label_name sign_up_form_label">Your name *</div>
                        <input type='text' id='sign_up_user_name' class='sign_up_user_name sign_up_input_box' name='sign_up_name' value='' placeholder="First and Last Name" required/>
                        <div id="sign_up_form_label_email" class="sign_up_form_label_email sign_up_form_label">Email for your ID *</div>
                        <input type='text' id='sign_up_user_email' class='sign_up_user_email sign_up_input_box' name='sign_up_email' placeholder="email address for Sign Up" required/ value='' />
                        <div id="sign_up_form_label_pw" class="sign_up_form_label_pw sign_up_form_label">Password *</div>
                        <input type='password' id='sign_up_user_pw' class='sign_up_user_pw sign_up_input_box' name='sign_up_pw' value='' placeholder="At least 6 characters" required/>
                        <div id="sign_up_form_label_pw_check" class="sign_up_form_label_pw_check sign_up_form_label">Re-enter password *</div>
                        <input type='password' id='sign_up_user_pw_check' class='sign_up_user_pw_check sign_up_input_box' name='sign_up_pw_check' value='' required/>
                        <div id="sign_up_form_label_phone" class="sign_up_form_label_phone sign_up_form_label">Mobile number</div>
                        <input type='text' id='sign_up_user_phone' class='sign_up_user_phone sign_up_input_box' name='sign_up_phone' value='' />        
                        <div id="sign_up_form_btn_container" class="sign_up_form_btn_container">
                        <button type="button" id="sign_up_submit_btn" class="sign_up_submit_btn" title="sign up submit">SIGN UP</button>
                        </div>
                    </div>
                </form>

                
                <div id="sign_up_form_extra" class="sign_up_form_extra"></div>
            </div>
        </div>
        `;
    }

    makeTrackMyOrderForm() {
        return `
            <div id="track_my_order_form_container" class="track_my_order_form_container">
                <div id="track_my_order" class="track_my_order">
                    <div id="track_my_order_title" class="track_my_order_title">CHECK ORDER</div>
                    <div id="track_my_order_subtitle" class="track_my_order_subtitle">See your order even if you are not a registered user.<br> 
                    Enter the order number and the billing address ZIP code.</div>
                    <form id="track_my_order_form">
                        Order Number *    
                        <input type="text" id="track_my_order_number" class="track_my_order_number track_my_order_input" required>
                        Order Email *
                        <input type="text" id="track_my_order_email" class="track_my_order_email track_my_order_input" required>
                        Billing ZIP Code *
                        <input type="text" id="track_my_order_zip" class="track_my_order_zip track_my_order_input" required>
                        <button type="button" id="track_my_order_check_btn" class="track_my_order_check_btn" title="check order status">
                        CHECK STATUS
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
}

//frog frog whopper whopper whopper whopper junior cheeseburger spicy chicken whopper. cause at bk have it your way, you rule frog frog frog frog frog frog frogfrog frog frog frog typewriter 12345678901000000 69 huh nani coca cola espuma lol whopper whopper whopper whopper junior cheeseburger spicy chicken whopper cause at b k have it your way you rule yay ayayayyayayayayayyy yay yay yay yay

