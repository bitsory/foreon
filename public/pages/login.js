// import cart from "./cart.js";
import Main from "../index.js"

export default class {
    

}

console.log("log in.js");
const modal = document.querySelector('.modal');
const modal_page = document.querySelector('.modal_page');
const account_modal_pop_container = document.getElementById('account_modal_pop_container');
// const main_background = document.getElementById('main_background__blink');


const login_modal_pop = document.querySelector('.login_modal_pop');
//const modal_exit = document.querySelector('.modal_exit');
const btn_login = document.querySelector('.btn_login');
const btn_signup = document.querySelector('.btn_signup');
const user_id = document.querySelector('.user_id');
const user_pw = document.querySelector('.user_pw');



document.addEventListener('click',function(e){       
     
    if(e.target && e.target.className == 'sign_in_btn') {

        account_modal_pop_container.style.display = "none";
        account_modal_pop_container.removeChild(document.getElementById('account_modal'));
      
        modal.style.display = 'block';
        // document.body.style.overflow = 'hidden';
        modal_page.innerHTML = makeSignInForm();
     
    }

    if(e.target && e.target.className == 'create_an_account_btn') {
        account_modal_pop_container.style.display = "none";
        account_modal_pop_container.removeChild(document.getElementById('account_modal'));
        modal.style.display = 'block';
        // document.body.style.overflow = 'hidden';
        modal_page.innerHTML = makeSignUpForm();
    
    }
    
    if(e.target && e.target.className == 'modal_exit') {
        console.log(" modal exit");
        document.querySelector('.modal_body').remove();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } 
    
    if(e.target && e.target.className == 'btn_signup') {

        console.log("SIGN UP");
        // const n_cart = new cart();
        document.querySelector('.user_login_form').remove();
        modal_page.innerHTML = makeSignUpForm();  

    }
    
    
    if(e.target && e.target.id== 'sign_up_cancel_btn') {
        
        document.querySelector('.sign_up_form').remove();        
        modal_page.innerHTML = makeSignInForm();                
    }


    if(e.target && e.target.id == 'track_my_order_btn') {
        document.querySelector('.main_background__blink').style.display = "none";
        document.getElementById('lorem').innerHTML = makeTrackMyOrderForm();
    }
    
});


function makeSignInForm() {
    return `
    <div class="modal_overlay"></div>
        <div class="modal_body">
            Login Page
            <button class="modal_exit">X</button>
            <br><br><br>
            <form action="/sign_in?path=${document.location.href}" method="post" class="user_login_form">
                <label class="label_user_id">ID</label>
                <input type="text" class="user_id" name="sign_in_id" required />
                <br>
                <label class="label_user_pw">Password</label>
                <input type="password" class="user_pw" name="sign_in_pw" required />
                <br>
                <input type="submit" class="btn_sign_in" value="Sign In">
                <button type="button" class="btn_signup">Sign Up</button>
                
            </form>
        </div>
    
    
    
    `;
}

function makeSignUpForm() {
    return `
    <div class="modal_overlay"></div>
    <div class="modal_body">
    Sign Up<button class="modal_exit">X</button>
    <form action="/sign_up" class="sign_up_form" method="post">
    ID *<input type='text' id='sign_up_user_id' name='sign_up_id' value='' required/><br />
    PASSWORD *<input type='password' id='sign_up_user_pw' name='sign_up_pw' value='' required/><br />
    PASSWORD Confirm*<input type='password' id='sign_up_user_pw_check' name='sign_up_pw_check' value='' required/><br />
    NAME *<input type='text' id='sign_up_user_name' name='sign_up_name' value='' required/><br />
    EMAIL<input type='text' id='sign_up_user_email' name='sign_up_email' value='' /><br />
    PHONE<input type='text' id='sign_up_user_phone' name='sign_up_phone' value='' /><br />
    <input type='submit' id='button2' name='sign_up_submit' value='SIGN UP'/>
    </form>
    <button type="button" id="sign_up_cancel_btn">Cancel</button>
    </div>

    `;
}

function makeTrackMyOrderForm() {
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

