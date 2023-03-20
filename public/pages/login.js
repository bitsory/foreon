// import cart from "./cart.js";
import Main from "../index.js"

export default class {
    

}

console.log("log in.js");


const login_modal_pop = document.querySelector('.login_modal_pop');

const modal = document.querySelector('.modal');
const modal_page = document.querySelector('.modal_page');

//const modal_exit = document.querySelector('.modal_exit');
const btn_login = document.querySelector('.btn_login');
const btn_signup = document.querySelector('.btn_signup');
const user_id = document.querySelector('.user_id');
const user_pw = document.querySelector('.user_pw');


// const user_login_form = document.querySelector('.user_login_form');



// login_modal_pop.addEventListener('click', () => {
//     console.log("login");
//     var link = document.location.href; 
//     modal.style.display = 'block';
//     // document.body.style.overflow = 'hidden';
//     modal_page.innerHTML = `
//         <div class="modal_body">
//         Login Page
//         <button class="modal_exit">X</button>
//         <br><br><br>
//         <form action="/sign_in?path=${document.location.href}" method="post" class="user_login_form">
//             <label class="label_user_id">ID</label>
//             <input type="text" class="user_id" name="sign_in_id" required />
//             <br>
//             <label class="label_user_pw">Password</label>
//             <input type="password" class="user_pw" name="sign_in_pw" required />
//             <br>
//             <input type="submit" class="btn_sign_in" value="Sign In">
//             <button class="btn_signup">Sign Up</button>
            
//         </form>
//         </div>`
// });


document.addEventListener('click',function(e){   
     
    if(e.target && e.target.className == 'login_modal_pop') {
        // const login_main = Main;
        //     login_main.push("test_login");
        //     console.log(login_main);
        //     console.log("login");

        // var link = document.location.href; 
        modal.style.display = 'block';
        // document.body.style.overflow = 'hidden';
        modal_page.innerHTML = `
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
            
            `
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
        modal_page.innerHTML = `
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
    
    
    if(e.target && e.target.id== 'sign_up_cancel_btn'){
        
        document.querySelector('.sign_up_form').remove();        
        modal_page.innerHTML = `
        <div class="modal_overlay"></div>
        <div class="modal_body">
        Login Page
        <button class="modal_exit">X</button>
        <br><br><br>
        <form action="/sign_in" method="post" class="user_login_form">
            <label class="label_user_id">ID</label>
            <input type="text" class="user_id" name="u_id" required />
            <br>
            <label class="label_user_pw">Password</label>
            <input type="password" class="user_pw" name="u_pw" required />
            <br>
            <input type="submit" class="btn_sign_in" value="Sign In">            
            <button type="button" class="btn_signup">Sign Up</button>
            
        </form>
        </div>
        `; 
        
    }
 });

