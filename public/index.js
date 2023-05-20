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
import OrderConfirm from "./pages/oder_confirm.js";
import setCartBox from "./pages/set_cart_modal_box.js";
import Admin from "./pages/admin.js";
import * as ItemCounter from "./pages/item_counter.js";
import * as ShopPageForm from "./pages/form_shop_page.js";
import * as CheckoutOrderForm from "./pages/form_checkout_order.js";
import * as WEBS from "./pages/form_webs.js";
import * as PurchaseHistoryInCart from "./pages/cart.js";

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

let shop_detail_page = {};
let shop_detail_page_flag = false;

let cart_modal_page = {};
let cart_modal_page_flag = false;

const user_cart = new Cart();
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
    window.location.href = "https://gocafefore.com";
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
    if (e.target.className === 'modal_overlay') {
        modal.style.display = 'none';
        modalClose('modal_body');
    }

})

function modalClose(param) {
    // document.body.style.overflow = 'auto';
    document.getElementById(param).remove();
    
}

document.addEventListener('click', function(e){    
   
    
    const user_info_btn_id =  document.getElementById('user_info_btn_id');   
    const user_profile_container =  document.querySelector('.user_profile_container');
    const account_modal_pop_btn_id = document.getElementById('account_modal_pop_btn_id');
    const account_modal_pop_btn = document.getElementById('account_modal_pop_btn');
    const sign_in_form_extra = document.getElementById('sign_in_form_extra');
    const cart_modal_container = document.getElementById('cart_modal_container');
    const cart_modal_items_back_btn = document.getElementById('cart_modal_items_back_btn');
    const cart_modal_items_next_btn = document.getElementById('cart_modal_items_next_btn');
    const view_cart_btn = document.getElementById('view_cart_btn');
    const cart_modal_items_slider_box = document.getElementById('cart_modal_items_slider_box');
    const user_info_btn_icon = document.getElementById('user_info_btn_icon');
    const login_id = document.getElementById('user_info_btn_id');

    
    if (e.target != toggleBtn && e.target != menu && e.target != login_id && e.target != user_info_btn_id && toggleBtn.classList.contains('on') == true) {
      
        WEBS.toggleFunc();
    }
    
    if(e.target == account_modal_pop_btn || e.target == account_modal_pop_btn_id) { // account modal pop
       
        modal.style.display = "block";
        if (loginpage_flag) { 
            console.log(loginpage)            
            modal_page.innerHTML = loginpage.makeSignInForm();
            const user_id = getCookie();
            console.log(user_id);
            document.getElementById('user_id').value = user_id;          


        } else {
            loginpage = new Login(); 
            // loginpage = loginpage_inst;
            loginpage_flag = true;
            modal_page.innerHTML = loginpage.makeSignInForm();
            const user_id = getCookie();
            console.log(user_id);
            document.getElementById('user_id').value = user_id;
           
        }
        
    }

    if((e.target == user_info_btn_id)) { // user info modal window show
        console.log("user info");        
        user_profile_container.style.display = "block";        
        document.querySelector(".user_profile").innerHTML = user_cart.getUserProfile();        
    }


    if((e.target == user_info_btn_icon)) { // user info modal window show
        console.log("user info");        
        user_profile_container.style.display = "block";        
        document.querySelector(".user_profile").innerHTML = user_cart.getUserProfile();        
    }

    if (user_profile_container && (e.target != user_info_btn_icon && e.target != user_info_btn_id)) // user info modal window off
        if(e.target!= user_profile_container && user_profile_container.style.display == "block") {
            // console.log(e.currentTarget);
            user_profile_container.style.display = "none";
            console.log("close pop up") 
    }

    
    if (sign_in_form_extra && sign_in_form_extra.textContent && e.target && e.target.id != "sign_in_btn") {
        console.log("document.getElementById('sign_in_form_extra').textContent = ''")
        document.getElementById('sign_in_form_extra').textContent = '';
    }

    if (e.target && e.target.className == 'user_logout_btn') { 
        console.log("user log out");
        document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        console.log("user log out user log out user log out user log out user log out ");
        ItemCounter.item_counter('GUEST');
    }

    if (e.target && e.target == view_cart_btn) {    
        if (document.location.href == 'https://gocafefore.com/') {
            console.log("if (document.location.href == 'http://localhost:8080/') {")
            // cart_modal_container.style.top = '0 rem';
            if (matchMedia("screen and (max-width: 600px)").matches) {
                // IMAGE_WIDTH = 300;
                // under 600px 
            } else if (matchMedia("screen and (max-width: 768px)").matches) {
                cart_modal_container.style.transform = `translateY(-40px)`;
              
            } else {
                // IMAGE_WIDTH = 400;
                // over 600px 
            }
           
        }

        cart_modal_container.style.display = "block";        
        cart_modal_container.innerHTML = setCartModalBox();
        setCartModalPageDetail();
        // WEBS.toggleFunc();
        if (toggleBtn.classList.contains('on') == true) {
            WEBS.toggleFunc();
        }
        
        // view_cart();
        console.log("view cart click page move")
    } 

    if (cart_modal_container && (e.target != view_cart_btn && e.target != cart_modal_items_slider_box && e.target.id != "cart_modal_item_minus_quantity_btn" && e.target.id != "cart_modal_item_plus_quantity_btn" && e.target.id != "cart_modal_item_delete_btn" && e.target != cart_modal_items_back_btn && e.target != cart_modal_items_next_btn && e.target.id != "go_cart_page_btn")) // user info modal window off
        if(e.target!= cart_modal_container && cart_modal_container.style.display == "block") {
            console.log(e.currentTarget);
            console.log(e.target);
            cart_modal_container.style.display = "none";
            cart_modal_container.style.transform = 'unset';
            console.log("cart modal close pop up")
    }

    if(e.target && e.target.id == 'purchase_history_item_reorder_btn') {
        const reorder_itemid = e.target.getAttribute('itemid');
        console.log(reorder_itemid);
        (user_cart.c_id == 'GUEST' || user_cart.c_id == '') ? history.pushState(null, null, `/shop/checkout/GUEST/item_num=${reorder_itemid}`) :
        history.pushState(null, null, `/shop/checkout/member/item_num=${reorder_itemid}`);
        setCheckoutIndivItemPage("reorder");
    }

    if(e.target && e.target.id == 'go_cart_page_btn') {
        view_cart();
        cart_modal_container.style.display = 'none';
        cart_modal_container.style.transform = 'unset';
    }

   
});


function getCookie() {
    let cook = decodeURIComponent(document.cookie).split(';');// get array
    
    let result='';
    cook.forEach((item) => { 
        const obj = new Object();
        const elem = item.trim();
        const tmp = elem.split('=');
        const key = tmp[0];
        const val = tmp[1];
        obj.key = val;
        
        if (key === 'saveid') {
            document.getElementById('remember_me_check').checked = true;
            
            var start_id = val.indexOf('"id":"');
            var end_id = val.indexOf('"}');    
            var res_id = val.substring(start_id+6, end_id); 

            result = res_id;          
        }             
    })
    return result;        
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
            
    ];    
    let path_name = location.pathname; 

    console.log(routes);
      
   
    if (path_name.substring(0, 18) == '/account/user-info') {  
        const user_id = user_cart.c_id;
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);  
        history.pushState(null, null, `/account/user-info`);   

    } else if (path_name.substring(0, 16) == '/account/billing') {
        
        const user_id = user_cart.c_id;  
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);   
        PurchaseHistoryInCart.chooseTabLink(`tab-2`, 'go_back');

    } else if (path_name.substring(0, 17) == '/account/shipping') {
       
        const user_id = user_cart.c_id;  
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);   
        PurchaseHistoryInCart.chooseTabLink(`tab-3`, 'go_back');

    } else if (path_name.substring(0, 17) == '/purchase-history') {  
        const user_id = user_cart.c_id;  
        goPurchaseHistory(user_id);
    }
    else if ((path_name.substring(0, 10) == '/shop/cart') || (path_name.substring(0, 11) == '/shop/order')){ // back to cart page
        console.log("라우터 고 카트 or go order")
        view_cart();   
    } else if (path_name.substring(0, 22) == '/shop/checkout/GUEST/i' || path_name.substring(0, 23) == '/shop/checkout/member/i') { // back to place order page
        console.log("라우터 개별 아이템 바이 나우")
        setCheckoutIndivItemPage();  

    } else if (path_name.substring(0, 20) == '/shop/checkout/GUEST' || path_name.substring(0, 21)== '/shop/checkout/member') { // back to place order page
        console.log("라우터 체크아웃 카트 or 오더 체크아웃")
        setCheckoutPage();
                 
    } else if (path_name.substring(0, 15) == '/shop/view/item') { // back to item detail page
        console.log("라우터 뷰 아이템 샵 디테일 페이지")
        setShopDetailPage();

    } else {

        console.log("라우터 일반 페이지 로딩")

        const pageMatches = routes.map((route) => {
            return {
                route, // route: route
                isMatch: route.path == path_name,
                
            };
            
        });

        console.log("location.pathname", location.pathname);
        console.log(pageMatches);

        let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

        console.log("match :", match);

        let page = new match.route.view1();   
        document.getElementById("lorem").innerHTML = await page.getHtml(); 
        
        
        
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
            page.menuSelector();
            page.menuEventListener();
        
        }
        if(match.route.path == "/contact") {           
            page.getContactKey();        
        }

        if(match.route.path == "/shop") {
           
            let shop_data = { name : "shop/post"};        
            const data = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(shop_data)
            };
                        
            fetch('/shop', data)
            .then((res) => res.json())
            .then(result => {
                          
                for (var i = 0 ; i < result.length ; i++) {
                    page.setItemContainer(result[i].prodnum, result[i].image, result[i].name, result[i].price_sell, result[i].item_instock);                        
                }            
            });  
        }

        if (menu.classList.length == 2) { // menu button toggle back

            main.classList.toggle('on');
            menu.classList.toggle('on');
            icons.classList.toggle('on');
            footer.classList.toggle('on');
            toggleBtn.classList.toggle('on');
          
        }

    }  
    

}; 

window.addEventListener("popstate", (e) => {
    console.log("popstate");
   
    let path_name = location.pathname;    
    
    if (path_name.substring(0, 18) == '/account/user-info') {  
        const user_id = user_cart.c_id;
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);     

    } else if (path_name.substring(0, 16) == '/account/billing') {
        console.log("path_name.substring(0, 16) == '/account/billing")  
        const user_id = user_cart.c_id;  
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);   
        PurchaseHistoryInCart.chooseTabLink(`tab-2`, 'go_back');

    } else if (path_name.substring(0, 17) == '/account/shipping') {
        console.log("path_name.substring(0, 17) == '/account/shipping")  
        const user_id = user_cart.c_id;  
        PurchaseHistoryInCart.setUserProfileChangePage(user_id);   
        PurchaseHistoryInCart.chooseTabLink(`tab-3`, 'go_back');

    } else if (path_name.substring(0, 17) == '/purchase-history') {  
        const user_id = user_cart.c_id;  
        goPurchaseHistory(user_id, 'go_back');
    }
    else if ((path_name.substring(0, 10) == '/shop/cart') || (path_name.substring(0, 11) == '/shop/order')){ // back to cart page
        console.log("뒤로가기 카트")
        view_cart('go_back');      
    } else if (path_name.substring(0, 22) == '/shop/checkout/GUEST/i' || path_name.substring(0, 23) == '/shop/checkout/member/i') { // back to place order page
        console.log("뒤로가기 아이템 체크아웃")
        setCheckoutIndivItemPage('go_back');          
    } else if (path_name.substring(0, 20) == '/shop/checkout/GUEST' || path_name.substring(0, 21)== '/shop/checkout/member') { // back to place order page
        console.log("뒤로가기 체크아웃")
        setCheckoutPage('go_back');
              
    } else if (path_name.substring(0, 15) == '/shop/view/item') { // back to item detail page
        console.log("뒤로가기 뷰 아이템 디테일 페이지")
        setShopDetailPage();
    } else {
        console.log("뒤로가기 일반 페이지")
        router();
    }
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
           
        }
    });
   
    router();


});

function setCartModalBox() {
    return `
    <div id="cart_modal_items_slider_box" class="cart_modal_items_slider_box">
        <div id="cart_modal_items_slider" class="cart_modal_items_slider">
            <div id="cart_modal_items_container" class="cart_modal_items_container">
                
            </div>
        </div>
    
        <button id="cart_modal_items_back_btn" class="cart_modal_slider_back modal_slider_btn">❮</button>
        <button id="cart_modal_items_next_btn" class="cart_modal_slider_next modal_slider_btn">❯</button>
    </div>
    <div id="go_cart_page_btn_container" class="go_cart_page_btn_container">
        <button id="go_cart_page_btn" class="go_cart_page_btn">Go Cart Page</button>
    </div>
    
    `
}

function setInvisibleModalCtlBtn() {
    const cart_modal_container = document.getElementById('cart_modal_container');
        if (location.pathname.substring(0, 15) == '/shop/checkout/') {
            const cart_modal_ctl_btn = cart_modal_container.querySelectorAll('.cart_modal_ctl_btn');
            const cart_modal_item_quantity_flag = cart_modal_container.querySelectorAll('.cart_modal_item_quantity_flag');
            
            cart_modal_item_quantity_flag.forEach (element => {
                element.style.display = "block";
            })
            cart_modal_ctl_btn.forEach (element => {
                element.style.display = "none";
            })
            // cart_modal_ctl_btn.style.display = "none";
        }
}

function setCartModalPageDetail() {
    
    console.log("index.js setCartModalPageDetail");
    console.log(location.pathname);   

   
    let order_cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : []; //{c_id : '0'};
    console.log('order_cart');
    console.log(order_cart);

    fetch("/login_check")
    .then((res) => res.json())
    .then(result => { 
        console.log(`login-check result :${result.id}`) 
        let user_id = result.id;   
        console.log(user_cart.c_id); 
        console.log(result.id);  

        if (order_cart.length && result.id == 'GUEST') { // guest click cart

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
                console.log("go_cart_data")
                console.log(order_list)
                                   
                if (cart_modal_page_flag) {   
                    // cart_modal_page.setCheckoutCart(order_cart);
                    cart_modal_page.setCheckoutItemscount(order_cart.length);
                    cart_modal_page.setCartModalItems(order_cart);
                    console.log(`cart_modal_page`)
                    console.log(cart_modal_page)

                    order_cart.forEach(element => {                    
                        cart_modal_page.setItemContainer(element.c_item_no, element.c_item_price, element.c_item_name, element.c_item_quantity, element.c_item_image, "cart_modal_items_container", "cart_modal_item");
                    });
                    cart_modal_page.initPage();
                    setInvisibleModalCtlBtn();
                    order_list.length == 0 ? cart_modal_page.setCartModalGoShopBtn() : false;
                } else {        
                    cart_modal_page_flag = true;        
                    cart_modal_page = new setCartBox("GUEST", "cart_modal_item", order_cart);
                    
                    order_cart.forEach(element => {                    
                        cart_modal_page.setItemContainer(element.c_item_no, element.c_item_price, element.c_item_name, element.c_item_quantity, element.c_item_image, "cart_modal_items_container", "cart_modal_item");
                    });
                    setInvisibleModalCtlBtn();
                    order_list.length == 0 ? cart_modal_page.setCartModalGoShopBtn() : false;
                }

            });

        } else {
            console.log("user cart modal")

            const u_cart = [{u_id : user_id}];

                const data = [{
                    u_cart,
                    // overwrite_cart : order_cart                             
                    }];
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    };
                fetch(`/shop/order`, options)
                    
                .then((res) => res.json())
                .then(order_list => {

                    if (cart_modal_page_flag) {   
                        // cart_modal_page.setCheckoutCart(order_cart);
                        cart_modal_page.setCheckoutItemscount(order_list.length);
                        cart_modal_page.setCartModalItems(order_list);
                        console.log(`cart_modal_page`)
                        console.log(cart_modal_page)
    
                        order_list.forEach(element => {                    
                            cart_modal_page.setItemContainer(element.prodnum, element.price_sell, element.name, element.quantity, element.image, "cart_modal_items_container", "cart_modal_item");
                        });
                        cart_modal_page.initPage();
                        setInvisibleModalCtlBtn();
                        order_list.length == 0 ? cart_modal_page.setCartModalGoShopBtn() : false;
                    } else {        
                        cart_modal_page_flag = true;        
                        cart_modal_page = new setCartBox(user_id, "cart_modal_item", order_list);
                        
                        order_list.forEach(element => {                    
                            cart_modal_page.setItemContainer(element.prodnum, element.price_sell, element.name, element.quantity, element.image, "cart_modal_items_container", "cart_modal_item");
                        });
                        setInvisibleModalCtlBtn();
                        order_list.length == 0 ? cart_modal_page.setCartModalGoShopBtn() : false;
                    }

                }) 
        }
    });
}

function goPurchaseHistory(user_id, param) {
    
    (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
    PurchaseHistoryInCart.viewPurchaseHistory({user_id:user_id});
    WEBS.toggleFunc();
    (param == 'go_back') ? false : history.pushState(null, null, `/purchase-history`);
}

function view_cart(param) {
    console.log("index.js go cart index.js go cart index.js go cart index.js go cart");
    console.log(location.pathname);
    

    // let user_id = '';
    let order_cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : []; //{c_id : '0'};
    console.log('order_cart');
    console.log(order_cart);


    console.log("/login_check") 

    fetch("/login_check")
    .then((res) => res.json())
    .then(result => { 
        console.log(`login-check result :${result.id}`) 
        let user_id = result.id;   
        console.log(user_cart.c_id); 
        console.log(result.id);  
        
        
            (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;
            
            if (order_cart.length && location.pathname == '/shop/cart/GUEST' && result.id != 'GUEST') {
                console.log("fetch('/overwrite_cart', options) fetch('/overwrite_cart', options)");
                const u_cart = [{u_id : user_id}];

                const data = [{
                    u_cart,
                    overwrite_cart : order_cart                             
                    }];
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    };

                console.log(options)

                fetch('/overwrite_cart', options)
                .then((res) => res.json())
                .then(order_list => {
                    console.log('go_cart_data');
                    console.log(order_list);
                    if(main_background) main_background.style.display = "none";
                    
                    console.log(`order_cart : ${order_cart}`)
                    
                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();
        
                    const place_order = new PlaceOrder(user_id, order_list);
                
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
        
                    place_order.getOrderDetail(order_list, order_cart);
                    (param == 'go_back') ? false : history.pushState(null, null, `/shop/cart/member`);
                    ItemCounter.item_counter(user_id);
                })

                       

            } else if (order_cart.length && user_cart.c_id == 'GUEST' && result.id == 'GUEST') {
                console.log("(order_cart.length && user_cart.c_id == 'GUEST' && result.id == 'GUEST')");
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
                    
                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();

                    const place_order = new PlaceOrder(user_id, order_list);
                
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
        
                    place_order.getOrderDetail(order_list, order_cart);
                    ItemCounter.item_counter('GUEST');
                    (param == 'go_back') ? false : history.pushState(null, null, `/shop/cart/GUEST`);
                    
                })
            } else if (user_cart.c_id == result.id && result.id != 'GUEST') {
                const u_cart = [{u_id : user_id}];

                const data = [{
                    u_cart,
                    // overwrite_cart : order_cart                             
                    }];
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    };
                fetch(`/shop/order`, options)
                    
                .then((res) => res.json())
                .then(order_list => {
                    if(main_background) main_background.style.display = "none";
                    console.log("go_cart_data")
                    console.log(order_list)
                    console.log(`order_cart : ${order_cart}`)
                    
                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();

                    const place_order = new PlaceOrder(user_id, order_list);
                
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
        
                    place_order.getOrderDetail(order_list, order_list);
                    
                    ItemCounter.item_counter(user_id);
                    (param == 'go_back') ? false : history.pushState(null, null, `/shop/cart/member`);
                })  
            } else if (order_cart.length == 0) {
                document.getElementById('lorem').innerHTML = 
                    `<br>Your Cart is empty<br><br>
                    Sign in to your account<br>
                    Sign up now
                    `;
            }                         
    })
}


function setCheckoutPage(param) {
     console.log('setCheckoutPage setCheckoutPage setCheckoutPage setCheckoutPage setCheckoutPage');
    console.log(location.pathname);
    (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;

    // let user_id = '';
    let checkout_cart = JSON.parse(sessionStorage.getItem("checkoutcart")); 
    
    console.log("/login_check") 

    fetch("/login_check")
    .then((res) => res.json())
    .then(result => { 
        console.log(`login-check result :${result.id}`) 
        let user_id = result.id;   
        console.log(user_cart.c_id) 
        console.log(result.id)  

       
        if (location.pathname == '/shop/checkout/GUEST' && result.id != 'GUEST') {
            console.log("fetch('/overwrite_cart', options) fetch('/overwrite_cart', options)")
            
            const u_cart = [{u_id : user_id}];

            const data = [{
                u_cart,
                overwrite_cart : checkout_cart                             
                }];
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                };

            console.log(options)

            fetch('/overwrite_cart', options)
            .then((res) => res.json())
            .then(order_list => {
                console.log('go_cart_data');
                console.log(order_list);
                (main_background) ? main_background.style.display = "none" : false;
                let proceed_checkout_total = 0;
                let proceed_checkout_selected_order_cart = order_list;
                let selected_items_number_list = [];

                console.log("proceed_checkout_selected_order_cart")
                console.log(proceed_checkout_selected_order_cart)
                proceed_checkout_selected_order_cart.forEach(element => {
                    proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                    selected_items_number_list.push(element.prodnum);
                })

                sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();

                const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
                ItemCounter.item_counter(user_id);
                (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/member`);

            })
        } else if (user_cart.c_id == result.id && result.id != 'GUEST') {
            const u_cart = [{u_id : user_id}];

            const data = [{
                u_cart,
                                          
                }];
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                };
            fetch(`/shop/order`, options)
                
            .then((res) => res.json())
            .then(order_list => {
                (main_background) ? main_background.style.display = "none" : false;
                console.log("go_cart_data")
                console.log(order_list)
                let proceed_checkout_total = 0;
                let proceed_checkout_selected_order_cart = order_list;
                let selected_items_number_list = [];

                console.log("proceed_checkout_selected_order_cart")
                console.log(proceed_checkout_selected_order_cart)
                proceed_checkout_selected_order_cart.forEach(element => {
                    proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                    selected_items_number_list.push(element.prodnum);
                })

                sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();

                const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
                (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/member`);
            })

        } else if (user_cart.c_id == 'GUEST' && result.id == 'GUEST') {
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                body: JSON.stringify(checkout_cart)
            };
    
            fetch('/shop/order', data)
            .then((res) => res.json())
            .then(checked_order_list => {
    
                const page = new Shop();
                console.log(page);
                document.getElementById("lorem").innerHTML = page.getHtml();
    
                const orderConfirm = new OrderConfirm(user_id, checkout_cart);
                document.getElementById("online_main").innerHTML = CheckoutOrderForm.getGuestOrderConfirm();
                orderConfirm.makeGuestCheckOutForm(checkout_cart, checked_order_list);
                (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/GUEST`);

            })
        }
    })
}

function setCheckoutIndivItemPage(param) {

    (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;

    // let user_id = '';
    const checkout_cart = JSON.parse(sessionStorage.getItem("checkoutcart")); 
    console.log("location.pathname.substring(0, 20)")
    console.log(location.pathname.substring(0, 20))
    
    const path_item_number = location.pathname.substring(0, 20) == '/shop/checkout/GUEST' ? location.pathname.substring(30) : location.pathname.substring(31);
    console.log('path_item_number')
    console.log(path_item_number)
    console.log("/login_check") 
    const item_number = path_item_number;
    const tmp_order_quantity = checkout_cart ? checkout_cart.map(element => {
        return element.c_item_quantity; }) : [];

    fetch("/login_check")
    .then((res) => res.json())
    .then(result => { 
        console.log(`login-check result :${result.id}`) 
        let user_id = result.id;   
        console.log(user_cart.c_id) 
        console.log(result.id)  
        if (param == 'reorder') {
            console.log("reorder")
            if (user_id == 'GUEST') {
                const order_quantity = 1;
                let buy_now_cart = 
                {
                    prodnum : item_number,
                    quantity : order_quantity,
                    // item_name : item_name
                }
        
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(buy_now_cart)
                };
        
                fetch('/get_item_info', options)
                .then((res) => res.json())
                .then(buy_now_checkout_cart => {
                    console.log('buy_now_checkout_cart');
                    console.log(buy_now_checkout_cart);
                        
                    let guest_buy_now_checkout_cart = [{
                        c_id : "GUEST",
                        c_item_image : "https://gocafefore.com"+buy_now_checkout_cart[0].image,
                        c_item_name : buy_now_checkout_cart[0].name,
                        c_item_no : buy_now_checkout_cart[0].prodnum,
                        c_item_price : buy_now_checkout_cart[0].price_sell,
                        c_item_quantity : order_quantity,
                        c_item_code : buy_now_checkout_cart[0].item_code,
                        c_name : "GUEST",
                        u_cart : []

                    }];
    
                    console.log(guest_buy_now_checkout_cart)
    
                    let tmp_guest_order_cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];  
                    console.log(tmp_guest_order_cart)          
                    
                    let repetition_item_check = tmp_guest_order_cart.filter(element => {
                        return element.c_item_no == guest_buy_now_checkout_cart[0].c_item_no});
                    console.log(repetition_item_check)
                        
                    let check_item_number = repetition_item_check.length ? repetition_item_check[0].c_item_no : false;
                                    
                    console.log(check_item_number)
    
                    check_item_number ? 
                    tmp_guest_order_cart.forEach(element => {
                        element.c_item_no == check_item_number ? element.c_item_quantity = order_quantity : false;
                    })
                    : tmp_guest_order_cart.push(guest_buy_now_checkout_cart[0]);
    
                    sessionStorage.setItem("cart", JSON.stringify(tmp_guest_order_cart));
                    sessionStorage.setItem("checkoutcart", JSON.stringify(guest_buy_now_checkout_cart));
                    
                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();
    
                    const order_confirm = new OrderConfirm(user_id, guest_buy_now_checkout_cart);
                    document.getElementById("online_main").innerHTML = CheckoutOrderForm.getGuestOrderConfirm();
                    order_confirm.makeGuestCheckOutForm(guest_buy_now_checkout_cart, buy_now_checkout_cart);
                    ItemCounter.item_counter('GUEST');
                });

            } else {
                const order_quantity = 1;
                
                user_cart.c_item_quantity = order_quantity;
                user_cart.c_item_no = item_number;
                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                        
                        },
                    body: JSON.stringify(user_cart)
                };

                fetch('/add_cart', data)
                .then((res) => res.json())
                .then(result => {
                    console.log(result)

                    let proceed_checkout_total = 0;
                    let proceed_checkout_selected_order_cart = result;

                    result.forEach(element => {
                        proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                    })
                    const selected_items_number_list = [item_number];
                    sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();

                    const order_confirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                    document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                    order_confirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);  
                    ItemCounter.item_counter(user_id);  
                });                
            }
        } else {        
            if (location.pathname.substring(0, 20) == '/shop/checkout/GUEST' && result.id != 'GUEST') { // guest -> user login
                console.log("fetch('/overwrite_cart', options) fetch('/overwrite_cart', options)");
                // const tmp_order_quantity = checkout_cart.map(element => {
                //     return element.c_item_quantity;        
                // })
                const order_quantity = tmp_order_quantity[0]
                console.log('tmp_item_num')
                console.log(order_quantity)

                user_cart.c_item_quantity = order_quantity;
                user_cart.c_item_no = item_number;
                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                        
                        },
                    body: JSON.stringify(user_cart)
                };

                fetch('/add_cart', data)
                .then((res) => res.json())
                .then(result => {
                    console.log(result)

                    let proceed_checkout_total = 0;
                    let proceed_checkout_selected_order_cart = result;

                    result.forEach(element => {
                        proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                    })
                    const selected_items_number_list = [item_number];
                    sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();

                    const order_confirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                    document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                    order_confirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);       
                    (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/member/item_num=${path_item_number}`);

                });
            
            } else if (location.pathname.substring(0, 21) == '/shop/checkout/member' && result.id != 'GUEST') {
                console.log("(location.pathname.substring(0, 21) == '/shop/checkout/member' && result.id != 'GUEST')");
                
                const u_cart = [{u_id : user_id}];

                const data = [{
                    u_cart,
                    // overwrite_cart : order_cart                             
                    }];
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    };
                fetch(`/shop/order`, options)
                .then((res) => res.json())
                .then(order_list => {
                    (main_background) ? main_background.style.display = "none" : false;
                    console.log("go_cart_data")
                    console.log(order_list)
                    let proceed_checkout_total = 0;
                    let proceed_checkout_selected_order_cart = order_list.filter(element => {
                        return element.prodnum == item_number;
                    });
                    let selected_items_number_list = [item_number];

                    console.log("proceed_checkout_selected_order_cart")
                    console.log(proceed_checkout_selected_order_cart)
                    proceed_checkout_selected_order_cart.forEach(element => {
                        proceed_checkout_total = proceed_checkout_total + element.quantity * element.price_sell;
                        // selected_items_number_list.push(element.prodnum);
                    })

                    sessionStorage.setItem("usercheckoutcart", JSON.stringify(selected_items_number_list));

                    const page = new Shop();
                    console.log(page);
                    document.getElementById("lorem").innerHTML = page.getHtml();

                    const orderConfirm = new OrderConfirm(user_id, proceed_checkout_selected_order_cart);
                    document.getElementById("online_main").innerHTML = CheckoutOrderForm.getUserOrderConfirm();
                    orderConfirm.makeUserCheckOutForm(user_id, proceed_checkout_total, proceed_checkout_selected_order_cart);
                    
                    (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/member/item_num=${path_item_number}`);
                })

            } else if (location.pathname.substring(0, 20) == '/shop/checkout/GUEST' && result.id == 'GUEST') {
                console.log("(location.pathname.substring(0, 20) == '/shop/checkout/GUEST' && result.id == 'GUEST')  ")
                const order_quantity = tmp_order_quantity[0];
                let buy_now_cart = 
                {
                    prodnum : item_number,
                    quantity : order_quantity,
                    // item_name : item_name
                }
        
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(buy_now_cart)
                };
        
                fetch('/get_item_info', options)
                .then((res) => res.json())
                .then(buy_now_checkout_cart => {
                    console.log('buy_now_checkout_cart');
                    console.log(buy_now_checkout_cart);
        
                    // if(user_id == 'GUEST') {
                        
                        
                        let guest_buy_now_checkout_cart = [{
                            c_id : "GUEST",
                            c_item_image : "https://gocafefore.com"+buy_now_checkout_cart[0].image,
                            c_item_name : buy_now_checkout_cart[0].name,
                            c_item_no : buy_now_checkout_cart[0].prodnum,
                            c_item_price : buy_now_checkout_cart[0].price_sell,
                            c_item_quantity : order_quantity,
                            c_item_code : buy_now_checkout_cart[0].item_code,
                            c_name : "GUEST",
                            u_cart : []
                        }];
        
                        console.log(guest_buy_now_checkout_cart)
        
                        let tmp_guest_order_cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];  
                        console.log(tmp_guest_order_cart)          
                        
                        let repetition_item_check = tmp_guest_order_cart.filter(element => {
                            return element.c_item_no == guest_buy_now_checkout_cart[0].c_item_no});
                        console.log(repetition_item_check)
                            
                        let check_item_number = repetition_item_check.length ? repetition_item_check[0].c_item_no : false;
                                        
                        console.log(check_item_number)
        
                        check_item_number ? 
                        tmp_guest_order_cart.forEach(element => {
                            element.c_item_no == check_item_number ? element.c_item_quantity = order_quantity : false;
                        })
                        : tmp_guest_order_cart.push(guest_buy_now_checkout_cart[0]);
        
                        sessionStorage.setItem("cart", JSON.stringify(tmp_guest_order_cart));
                        sessionStorage.setItem("checkoutcart", JSON.stringify(guest_buy_now_checkout_cart));
                        
                        const page = new Shop();
                        console.log(page);
                        document.getElementById("lorem").innerHTML = page.getHtml();
        
                        const order_confirm = new OrderConfirm(user_id, guest_buy_now_checkout_cart);
                        document.getElementById("online_main").innerHTML = CheckoutOrderForm.getGuestOrderConfirm();
                        order_confirm.makeGuestCheckOutForm(guest_buy_now_checkout_cart, buy_now_checkout_cart); 
                        (param == 'go_back') ? false : history.pushState(null, null, `/shop/checkout/GUEST/item_num=${path_item_number}`);
                    // }
                });
            }
        }
    })
}

function setShopDetailPage() {
    console.log('shop_detail_page_flag');
    console.log(shop_detail_page_flag);

    (document.querySelector('.main_background__blink')) ? document.querySelector('.main_background__blink').style.display = "none" : false;

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
        const item_instock = result.instock;

        document.getElementById('lorem').innerHTML = ShopPageForm.setOnlineContainerPage();                       
            
        if (shop_detail_page_flag) {
            document.getElementById("online_main").innerHTML = 
            shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content, item_instock);
            soldOutItemMarker(item_instock)
        } else {
            shop_detail_page = new ShopDetail(item_num, item_name, item_price, item_image, item_content, item_instock);
            shop_detail_page_flag = true;
            document.getElementById("online_main").innerHTML = 
            shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content, item_instock);
            soldOutItemMarker(item_instock)
        }        
    });
}

function soldOutItemMarker(item_instock) {
    if (item_instock == 'n') {
        document.getElementById('online_item_detail_price').style.textDecoration = 'line-through';
        const but_now_btn = document.getElementById('buy_now_btn')
        but_now_btn.setAttribute('disabled','true');
        but_now_btn.innerText = 'Sold Out';
        but_now_btn.style.backgroundColor = 'grey';
        const add_cart_btn = document.getElementById('add_cart_btn');
        add_cart_btn.setAttribute('disabled','true');
        add_cart_btn.style.backgroundColor = 'grey';
        add_cart_btn.style.color = 'white';
    }
}




