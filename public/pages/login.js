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
        this.gapi = "848599037536-2qfs9feovnsi0bf2fs6brch8jvqrcj44.apps.googleusercontent.com";

        this.modal.addEventListener('click', (e) => { 

            console.log("log in.js this.modal.addEventListener( this.modal.addEventListener(")

            if(e.target && e.target.className == 'sign_in_btn') {  
                document.getElementById('user_id').value ? this.signInSubmit() : 
                document.getElementById('sign_in_form_extra').innerText = "input your ID";
                document.user_login_form.sign_in_id.focus();

            }

            if(e.target && e.target.className == 'create_an_account_btn') {                 
                this.modalClose();
                document.getElementById('main_background main_background__blink').style.display = "none";
                document.getElementById('lorem').innerHTML = this.makeSignUpForm();
    
            }

            if(e.target && e.target.id== 'sign_up_cancel_btn') {
                
                document.querySelector('.sign_up_form').remove();        
                this.modal_page.innerHTML = makeSignInForm();                
            }

            if(e.target && e.target.className == 'modal_exit') {
                this.modalClose();
            }

            if(e.target && e.target.id == 'track_my_order_btn') {
                this.modalClose();
                document.getElementById('main_background main_background__blink').style.display = "none";
                document.getElementById('lorem').innerHTML = this.makeTrackMyOrderForm();
            }

            // if(e.target && e.target.id == 'google_login') {
            //     this.modalClose();
            //     document.getElementById('main_background main_background__blink').style.display = "none";
                
            // }

        }) 

        this.modal.addEventListener('keyup', (e)=> {
            if(e.target && e.target.className == 'user_pw' && (e.keyCode == 13)) {                
                document.getElementById('user_id').value ? this.signInSubmit() : 
                document.getElementById('sign_in_form_extra').innerText = "please input your email address.";
                document.user_login_form.sign_in_id.focus();
            }

        }) 

        this.lorem.addEventListener('click', (e)=> {
            if(e.target && e.target.className == 'sign_up_submit_btn') {                 

                // document.getElementById('user_login_form').remove();
                // this.modal_page.innerHTML = makeSignUpForm();  
                if (!(document.getElementById('sign_up_user_email').value)) {
                    document.getElementById('sign_up_form_extra').textContent = "Please Input your email address...";
                    document.sign_up_form.sign_up_user_id.focus();
                } else if (!(document.getElementById('sign_up_user_name').value)) {
                    document.getElementById('sign_up_form_extra').textContent = "Please Input your Name...";
                    document.sign_up_form.sign_up_user_name.focus();
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

    modalClose() {
        document.getElementById('modal_body').remove();
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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
                    document.getElementById('sign_in_form_extra').innerText = 
                    "ID and Password not matched...<br>please check your ID and Password";
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
                
                const encrypted2 = crypt.encrypt(sign_up_upw);
                const send_data = {
                    // aid : sign_up_uid, 
                    uname : tmp_uname,
                    uemail : sign_up_uemail,
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
        
        this.modal_script();

        return `
        <div id="modal_overlay" class="modal_overlay"></div>
            <div id="modal_body" class="modal_body">
                Login Page
                <button class="modal_exit">X</button>
                <br><br><br>
                <form id="user_login_form" class="user_login_form" name="user_login_form">
                    <label class="label_user_id">ID</label>
                    <input type="text" id="user_id" class="user_id" name="sign_in_id" placeholder="Email address for Sign In" required />
                    <br>
                    <label class="label_user_pw">Password</label>
                    <input type="password" id="user_pw" class="user_pw" name="sign_in_pw" required />
                    <br>
                    <div id="sign_in_form_button_container" class="sign_in_form_button_container">
                        <button type="button" id="sign_in_btn" class="sign_in_btn" title="sign in">SIGN IN</button>
                        <button type="button" id="find_password" class="find_password" title="Find password">Forget Password</button>
                        <button type="button" id="create_an_account_btn" class="create_an_account_btn" title="Sign Up">CREATE AN ACCOUNT</button>
                    </div>
                    
                </form>
                <div id="sign_in_form_extra" class="sign_in_form_extra"></div>
                <button id='track_my_order_btn' class='track_my_order_btn' title='track order'>TRACK MY ORDER</button>
                <div id="google_login_container" class="google_login_container">
                    <div id="g_id_onload"
                        data-client_id="848599037536-2qfs9feovnsi0bf2fs6brch8jvqrcj44.apps.googleusercontent.com"
                        data-context="use"
                        data-ux_mode="popup"
                        data-callback="handleCredentialResponse"
                        data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-locale="en"
                        data-logo_alignment="center">
                    </div>
                </div>                
                <button id='google_login' class='google_login' title='Google ID Login'>Google ID Login</button>


            </div>   
        `;
    }

    

    makeSignUpForm() {
        return `
       
            Sign Up
            
            <form id="sign_up_form" class="sign_up_form" name="sign_up_form">
                Your name *<input type='text' id='sign_up_user_name' name='sign_up_name' value='' placeholder="First and Last Name" required/><br />
                Email for your ID *<input type='text' id='sign_up_user_email' name='sign_up_email' placeholder="email address for Sign Up" required/ value='' /><br />                
                Password *<input type='password' id='sign_up_user_pw' name='sign_up_pw' value='' placeholder="At least 6 characters" required/><br />
                Re-enter password*<input type='password' id='sign_up_user_pw_check' name='sign_up_pw_check' value='' required/><br />
                Mobile number<input type='text' id='sign_up_user_phone' name='sign_up_phone' value='' /><br />             
            
                <button type="button" id="sign_up_submit_btn" class="sign_up_submit_btn" title="sign up submit">SIGN UP</button>
            </form>

            <button type="button" id="sign_up_cancel_btn" class="sign_up_cancel_btn" title="cancel">Cancel</button>
            <div id="sign_up_form_extra" class="sign_up_form_extra"></div>
       
        `;
    }

    makeTrackMyOrderForm() {
        return `
            <div id="track_my_order_form_container" class="track_my_order_form_container">
                <div id="track_my_order" class="track_my_order">
                    <div class="track_my_order_title">CHECK ORDER</div>
                    <div class="track_my_order_subtitle">See your order even if you are not a registered user. 
                    Enter the order number and the billing address ZIP code.</div>
                    <form id="track_my_order_form">
                        Order Number    
                        <input type="text">
                        Order Email
                        <input type="text">
                        Billing ZIP Code
                        <input type="text">
                        <button type="button" id="track_my_order_check_btn" class="track_my_order_check_btn" title="check order status">
                        CHECK STATUS
                        </button>
                    </form>
                </div>
            </div>
        `;
    }
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  function handleCredentialResponse(response) {
     // decodeJwtResponse() is a custom function defined by you
     // to decode the credential response.
     const responsePayload = decodeJwtResponse(response.credential);

     console.log("ID: " + responsePayload.sub);
     console.log('Full Name: ' + responsePayload.name);
     console.log('Given Name: ' + responsePayload.given_name);
     console.log('Family Name: ' + responsePayload.family_name);
     console.log("Image URL: " + responsePayload.picture);
     console.log("Email: " + responsePayload.email);
  }




//frog frog whopper whopper whopper whopper junior cheeseburger spicy chicken whopper. cause at bk have it your way, you rule frog frog frog frog frog frog frogfrog frog frog frog typewriter 12345678901000000 69 huh nani coca cola espuma lol whopper whopper whopper whopper junior cheeseburger spicy chicken whopper cause at b k have it your way you rule yay ayayayyayayayayayyy yay yay yay yay

