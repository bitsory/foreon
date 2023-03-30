import Home from "./pages/home.js";
import About from "./pages/about.js";
import Menu from "./pages/menu.js";
import Contact from "./pages/contact.js";
import NotFound from "./pages/notfound.js";
import Login from "./pages/login.js";
import Cart from "./pages/cart.js";
import Shop from "./pages/shop.js";
import PlaceOrder from "./pages/place_order.js";
import ShopDetail from "./pages/shop_detail.js";
import OrderConfirm from "./pages/oder_confirm.js"


const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_nav_list');
const icons = document.querySelector('.navbar_icons');

const main = document.querySelector('.main');
const main_background = document.querySelector('.main_background__blink');
const lorem = document.querySelector('.lorem');
const mainback1 = document.querySelector('.mainback1');

const footer = document.querySelector('.footer');
const navbar_logo = document.querySelector('.navbar_logo');
const foot_logo = document.querySelector('.foot_logo');
const gotoTop = document.querySelector('.fa-angles-up');
const user_info = document.querySelector('.user_info');

const modal = document.getElementById('modal');
const modal_page = document.getElementById("modal_page");
let loginpage = {};
let loginpage_flag = false;

// let about_page = {};
// let about_page_flag = false;

// let shop_page = {};
// let shop_page_flag = false;

// let user_cart = {};
// let cart_page_flag = false;

let page = {};


let shop_detail_page = {};
let shop_detail_page_flag = false;


// if (cart_page_flag) {
//     user_cart.initCart(user_cart.c_id);
// } else {
//     user_cart = new Cart(document.cookie);
//     user_cart.initCart(user_cart.c_id);
// }

const user_cart = new Cart(document.cookie);
user_cart.initCart(user_cart.c_id);
export default user_cart;

console.log("user cart")
console.log(user_cart);


toggleBtn.addEventListener('click', (e) => {
    menu.classList.toggle('on');
    icons.classList.toggle('on');
    // navbar.classList.toggle('on');
    main.classList.toggle('on');
    lorem.classList.toggle('on');
    footer.classList.toggle('on');
    // footer.classList.toggle('on');
    // navbar_toggle.classList.toggle('on');
    toggleBtn.classList.toggle('on');
    // console.log("toggle");
    // console.log(toggleBtn.classList);
    // console.log(e);
});

console.log("index.js");

navbar_logo.addEventListener('click', () => {
    console.log("goto home");
    window.location.href = "http://127.0.0.1:5500/cafefore";
});

foot_logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'});
});

gotoTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'});
});

window.addEventListener('click', (e) => {   
    e.target.className === 'modal_overlay' ? modalClose() : false       
})

function modalClose() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('modal_body').remove();
}

document.addEventListener('click', function(e){    

    let user_info_btn =  document.querySelector('.user_info_btn');
    let user_profile_container =  document.querySelector('.user_profile_container');
    const account_modal_pop_btn = document.getElementById('account_modal_pop_btn');
    const sign_in_form_extra = document.getElementById('sign_in_form_extra');

    const account_modal_pop_container = document.getElementById("account_modal_pop_container");
    
    const sign_in_btn = document.getElementById("sign_in_btn");
    const account_modal = document.getElementById("account_modal");
    
    
    //var user_profile =  document.querySelector('.user_profile');
    // var modal_body = document.querySelector('.modal_body');

    if(e.target == account_modal_pop_btn) { // account modal pop
        console.log('account_modal_pop_btn')
        console.log(loginpage_flag);
        modal.style.display = "block";
        if (loginpage_flag) { 
            console.log(loginpage)            
            modal_page.innerHTML = loginpage.makeSignInForm();

        } else {
            loginpage = new Login(); 
            // loginpage = loginpage_inst;
            loginpage_flag = true;
            modal_page.innerHTML = loginpage.makeSignInForm();
            // account_modal_pop_container.style.display = "block";                     
            // account_modal_pop_container.innerHTML = loginpage.accountModalPop();
        }
        
    }


    if(e.target == user_info_btn) { // user info modal window show
        console.log("user info");        
        user_profile_container.style.display = "block";        
        document.querySelector(".user_profile").innerHTML = user_cart.getUserProfile();
        
    }

    if (user_profile_container && e.target != user_info_btn) // user info modal window off
        if(e.target!= user_profile_container && user_profile_container.style.display == "block") {
            user_profile_container.style.display = "none";
            console.log("close pop up")
        }

    
    if (sign_in_form_extra && sign_in_form_extra.textContent && e.target && e.target.id != "sign_in_btn") {
        console.log("document.getElementById('sign_in_form_extra').textContent = ''")
        document.getElementById('sign_in_form_extra').textContent = '';
    }

    if (e.target && e.target.className == 'user_logout_btn') { 
        console.log("user log out");
        document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
        console.log("user log out user log out user log out user log out user log out ");
    }


    // if (e.target && e.target.className == 'user_profile_cart_btn') {
    //     console.log("view cart view")        

    // }


    if (e.target && e.target.className == 'go_cart') {        
        go_cart();
    } 
    

});


function go_cart(param) {
    
    // let user_id = '';
    let order_cart = {c_id : '0'};
    console.log("/login_check") 

    fetch("/login_check")
    .then((res) => res.json())
    .then(result => { 
        console.log(`login-check result :${result.id}`)
        const user_id = result.id;     
        const user = user_id == 'GUEST' ? 'GUEST' : 'member';

        param != 'go_back' ? history.pushState(null, null, `/shop/cart/${user}`) : false;
        
        if (user_id === 'GUEST') {
            // const go_cart_data = {};
            document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
            JSON.parse(sessionStorage.getItem("cart")) ? order_cart = JSON.parse(sessionStorage.getItem("cart"))
            : false;
            console.log("order_cart");
            
            console.log(order_cart);

        } else {  //// user view cart
            console.log(`user_cart : ${user_cart}`);
            order_cart = user_cart;    
        } 
        
        if (order_cart.c_id !=='0') {

            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                    
                    },
                body: JSON.stringify(order_cart)
            };
            console.log(`user_name : ${user_id}`);
            console.log(data);
            // fetch(`/cart/${go_cart_data}`, data)
            fetch(`/shop/order`, data)
            
            .then((res) => res.json())
            .then(order_list => {
                if(main_background) main_background.style.display = "none";
                console.log("go_cart_data")
                console.log(order_list)
                console.log(`order_cart : ${order_cart}`)
                // if (shop_page_flag) {
                //     page = shop_page;
                // } else {
                //     page = new Shop();
                // }
                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();

    
                const place_order = new PlaceOrder(user_id, order_list);
               
                document.querySelector(".online_main").innerHTML = place_order.getOrder();
    
                place_order.getOrderDetail(order_list, order_cart);
                
            })
        } else {
            
            ///////////////////  cart is empty modal //////////////////
            const empty_cart_modal = document.createElement('div');
            empty_cart_modal.setAttribute('class', `empty_cart_modal`);
            document.querySelector('.navbar_icons').appendChild(empty_cart_modal);
            empty_cart_modal.innerText = 'cart is empty'; 
            
            console.log("cart is empty");

        }        
    })
}


//////////////////////////////////////////////////////  router /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

const router = async () => {
    console.log("router");
    console.log(document.location.href);
    const routes = [
        { path: "/cafefore/", view1: Home },
        { path: "/", view1: Home },
        { path: "/cafeFORE/", view1: Home },
        { path: "/home", view1: Home },
        { path: "/cafeFORE/index.html", view1: Home },
        { path: "/about", view1: About },
        { path: "/menu", view1: Menu },
        { path: "/contact", view1: Contact },
        { path: "/shop", view1: Shop },
        { path: `/shop/view/item/`, view1: ShopDetail },     
    ];    

    console.log(routes);

    if ((location.pathname.substring(0, 10) == '/shop/cart') || (location.pathname.substring(0, 11) == '/shop/order')) { // back to cart page
        go_cart();        
    }

    else if (location.pathname.substring(0, 16) == '/shop/view/item/') {
    
        setShopDetailPage();

    } else {

    const pageMatches = routes.map((route) => {
        return {
            route, // route: route
            isMatch: route.path === location.pathname,
            
        };
        
    });

    console.log("location.pathname", location.pathname);
    console.log(pageMatches);

    let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

    console.log("match :", match);

    let page = new match.route.view1();   
    document.querySelector(".lorem").innerHTML = await page.getHtml(); 
    
    
    
    if(match.route.path == "/home" || match.route.path == "/" || match.route.path == "" || match.route.path == "/cafefore/" || match.route.path == "/cafeFORE/") {
        console.log(match.route.path);
        main_background.style.display = "flex";
        page.quickButton();
        page.quickBtnEventListener();
    
    }

    if(match.route.path == "/about" || match.route.path == "/menu" || match.route.path == "/shop" || match.route.path == "/contact") {
        console.log(match.route.path);
        if(main_background) main_background.style.display = "none";
    }

    if(match.route.path == "/menu") {
        console.log("menu selector");
        page.menuSelector();
        page.menuEventListener();
    
    }

    if(match.route.path == "/shop") {
        // shop_page = page;
        // shop_page_flag = true;

        
        let shop_data = { name : "shop/post"};
        
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
                },
            body: JSON.stringify(shop_data)
        };
                    
        fetch('/shop', data)
        .then((res) => res.json())
        .then(result => {
            console.log(result)                   
            for (var i = 0 ; i < result.length ; i++) {
                page.setItemContainer(result[i].prodnum, result[i].image, result[i].name, result[i].price_sell);                        
            }
            
        });  
    }          

        
        if (menu.classList.length == 2) { // menu button toggle back

            console.log("length 2");
            console.log("toggle on");
            
            main.classList.toggle('on');
            menu.classList.toggle('on');
            icons.classList.toggle('on');
            footer.classList.toggle('on');
            toggleBtn.classList.toggle('on');
            console.log(`menu.classList.length: ${menu.classList.length}`);
        }

    }  
    

}; 

window.addEventListener("popstate", (e) => {
    console.log("popstate");
   
    let path_name = location.pathname;    
    if (path_name.substring(0, 8) == '/account') {  
        user_cart.changeProfile();
    }
    else if (path_name.substring(0, 17) == '/purchase-history') {  
        const user_id = user_cart.c_id;  
        user_cart.viewPurchaseHistory(user_id);
    }
    else if (path_name.substring(0, 10) == '/shop/cart') { // back to cart page
        go_cart('go_back');        
    } else if (path_name.substring(0, 11) == '/shop/order') { // back to order page
        go_cart('go_back');
    } else if (path_name.substring(0, 14) == '/shop/checkout') { // back to place order page
        const user_id = user_cart.c_id;    

        if(user_id == 'GUEST') {
            const tmp_checkout_cart = JSON.parse(sessionStorage.getItem("checkoutcart"));

            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                body: JSON.stringify(tmp_checkout_cart)
            };

            fetch('/shop/order', data)
            .then((res) => res.json())
            .then(checked_order_list => {

                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();

                const orderConfirm = new OrderConfirm(user_id, tmp_checkout_cart);
                document.getElementById("online_main").innerHTML = orderConfirm.getGuestOrderConfirm();
                orderConfirm.makeGuestCheckOutForm(tmp_checkout_cart, checked_order_list); 
                })

        } else {  ///////////////////// user check out proceed
            const selected_items_number_list = JSON.parse(sessionStorage.getItem("usercheckoutcart"));

            let data = {
                u_id : user_id                              
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                   
                    },
                body: JSON.stringify(data)
            };

            fetch('/shop/order', options)
            .then((res) => res.json())
            .then(order_list => {
                console.log("order_list")
                console.log(order_list)

                let proceed_checkout_total = 0;
                let proceed_checkout_selected_order_cart = [];
                for (let i =0 ; i < selected_items_number_list.length ; i++) {
                    order_list.forEach(element => {
                        console.log(element)
                        if (element.prodnum == selected_items_number_list[i]) {
                            proceed_checkout_selected_order_cart.push(element)
                        }
        
                    })
                }

                proceed_checkout_selected_order_cart.forEach(element => {
                    proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                })

                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();

                const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                document.getElementById("online_main").innerHTML = orderConfirm.getUserOrderConfirm();
                orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
            })
        }

    
    } else if (path_name.substring(0, 16) == '/shop/view/item/') { // back to item detail page
        setShopDetailPage();
    } else router();
});


document.addEventListener("DOMContentLoaded", () => { // run first
    // var link = document.location.href; 
    // console.log(`link : ${link}`);
    
    document.body.addEventListener("click", (e) => { // menu link click
        // var link = document.location.href; 
        // console.log(`link : ${link}`);
        
        // console.log(`index.js document.body.addEventListener(click, (e): ${JSON.stringify(e)}`);
        // console.log(`index.js document.body.addEventListener(click, (e): ${e}`);
        if (e.target.matches("[data-link-T]")) {
            console.log("data - link router before");
            console.log(e.target);
            console.log(e.target.href);
            e.preventDefault();
            history.pushState(null, null, e.target.href); // change url address
            // history.pushState(null, null, "http://localhost:8080/about");
            router();
            console.log("data - link router after");
           
        }
    });
    console.log("data - link router router");
    router();

    // if (!(link == "http://localhost:8080/shop/shop.html")) {// this is not a shop page
    //     console.log("beginning main home page");
    //     router(); 
    //     console.log("after main home page");
    // } 

    // if (!(link == "http://localhost:8080/home")) {// this is not a shop page
    //     console.log("beginning main home page");
    //     router(); 
    //     console.log("after main home page");
    // } 
    

});

function setShopDetailPage() {

    const path_item_number = location.pathname.substring(16);
    console.log("shop shop popstate");
    console.log(path_item_number)
    const send_data = { post : "item detail view"};
    const data = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'        
        },
    body: JSON.stringify(send_data)
    };
    console.log(data);

    fetch(`/shop/view/item/${path_item_number}`, data)
    // fetch('/shopview', data)
    .then((res) => res.json())
    .then(result => {
        
        console.log(result)  
        // console.log(this.n_cart);

        const item_image = result.image;
        const item_num = result.prodnum;
        const item_name = result.name;
        const item_price = result.price_sell;
        const item_content = result.content;

        document.getElementById('lorem').innerHTML = setOnlineContainerPage();                       
            
        if (shop_detail_page_flag) {
            document.getElementById("online_main").innerHTML = 
            shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
        } else {
            shop_detail_page = new ShopDetail(item_num, item_name, item_price, item_image, item_content);
            shop_detail_page_flag = true;
            document.getElementById("online_main").innerHTML = 
            shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
        }        
    });
}

function setOnlineContainerPage() {
    return `
        <div class="online_container">
            <div class="online_title">
                Cafe FORE Online Shop
                <form class="example" action="#">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <div class="shop_category">
                    <div class="shop_cat_wellness">
                        <button class="shop_wellness_btn">Wellness</button>
                    </div>
                    <div class="shop_cat_dessert">
                        <button class="shop_dessert_btn">Dessert</button>
                    </div>
                    <div class="shop_cat_kids">
                        <button class="shop_kids_btn">Kids</button>
                    </div>
                    <div class="shop_cat_test">
                        <button class="shop_test_btn">Test</button>
                    </div>
                </div>
            </div>
    
            <div id="online_main" class="online_main">
                MD's Choice items
                
                <div class="online_main_items">
                </div>
            </div>

            <div id="test_container" class="test_container">test test
            </div>
        </div>   
    
    `;
}

function init() {
	gapi.load('auth2', function() {
		gapi.auth2.init();
		options = new gapi.auth2.SigninOptionsBuilder();
		options.setPrompt('select_account');
        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
		options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
		gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
	})
}

function onSignIn(googleUser) {
	var access_token = googleUser.getAuthResponse().access_token
	$.ajax({
    	// people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
		url: 'https://people.googleapis.com/v1/people/me'
        // key에 자신의 API 키를 넣습니다.
		, data: {personFields:'birthdays', key:'AIzaSyDz6LqNUaUFgcc1JCaVioD5Du6zFrq-mGM', 'access_token': access_token}
		, method:'GET'
	})
	.done(function(e){
        //프로필을 가져온다.
		var profile = googleUser.getBasicProfile();
		console.log(profile)
	})
	.fail(function(e){
		console.log(e);
	})
}
function onSignInFailure(t){		
	console.log(t);
}






