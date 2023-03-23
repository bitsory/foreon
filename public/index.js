import Home from "./pages/home.js";
import About from "./pages/about.js";
import Menu from "./pages/menu.js";
import Contact from "./pages/contact.js";
import NotFound from "./pages/notfound.js";
import Login from "./pages/login.js";
import Cart from "./pages/cart.js";
import Shop from "./pages/shop.js";
import PlaceOrder from "./pages/place_order.js"


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

const modal = document.querySelector('.modal');



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
    console.log("toggle");
    console.log(toggleBtn.classList);
    console.log(e);
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
}

document.addEventListener('click', function(e){    

    let user_info_btn =  document.querySelector('.user_info_btn');
    let user_profile_container =  document.querySelector('.user_profile_container');
    const account_modal_pop_btn = document.getElementById('account_modal_pop_btn');
    const account_modal_pop_container = document.getElementById("account_modal_pop_container");
    const sign_in_btn = document.getElementById("sign_in_btn");
    const account_modal = document.getElementById("account_modal");
    //var user_profile =  document.querySelector('.user_profile');
    // var modal_body = document.querySelector('.modal_body');

    if(e.target == account_modal_pop_btn) { // account modal pop
        console.log('account_modal_pop_btn')
        account_modal_pop_container.style.display = "block";
       
        account_modal_pop_container.innerHTML = accountModalPop();
        
    }

    if (account_modal && e.target != sign_in_btn) // account modal window off
        if(e.target!= account_modal_pop_container && account_modal_pop_container.style.display == "block") {
            account_modal_pop_container.style.display = "none";
            account_modal_pop_container.removeChild(document.getElementById('account_modal'));
            console.log("close pop up")
        }
   

    if(e.target == user_info_btn) { // user info modal window show
        console.log("user info");        
        user_profile_container.style.display = "block";
        if (document.querySelector(".user_info").innerText === "GUEST") {
            document.querySelector(".user_profile").innerHTML = user_cart.getGuestProfile();            
        } else {
            document.querySelector(".user_profile").innerHTML = user_cart.getUserProfile();
        }
    }

    if (user_profile_container && e.target != user_info_btn) // user info modal window off
        if(e.target!= user_profile_container && user_profile_container.style.display == "block") {
            user_profile_container.style.display = "none";
            console.log("close pop up")
        }

    if (e.target && e.target.className == 'user_logout_btn') { 
        console.log("user log out");
        document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
        console.log("user log out user log out user log out user log out user log out ");
    }


    if (e.target && e.target.className == 'user_profile_cart_btn') {
        console.log("view cart view")        

    }

    if (e.target && e.target.className == 'go_cart') {
        
        let user_id = '';
        let order_cart = {c_id : '0'};
        console.log("/login_check")     
        
        
        fetch("/login_check")
        .then((res) => res.json())
        .then(result => { 
            console.log(`login-check result :${result.id}`)
            user_id = result.id;            
            
            if (user_id === 'GUEST') {
                // const go_cart_data = {};
                document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
                JSON.parse(sessionStorage.getItem("cart")) ? order_cart = JSON.parse(sessionStorage.getItem("cart"))
                : false;
                console.log("order_cart");
                
                console.log(order_cart);
    
            } else {
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
                    const page = new Shop();
                    // console.log(page);
                    document.querySelector(".lorem").innerHTML = page.getHtml();
        
                    const place_order = new PlaceOrder(user_id, order_list);
                    // document.querySelector(".online_main").innerHTML = "place_order.getOrder(result)";
                    document.querySelector(".online_main").innerHTML = place_order.getOrder();
        
                    place_order.getOrderDetail(order_list, order_cart);
                    // place_order.proceedSelector();
                    // place_order.proceedEventListener();
        
                    if (typeof (history.pushState) != "undefined") { 
                        history.pushState(null, null, `/shop/cart/${user_id}`); 
                        console.log(order_list)
                        
                    } else { 
                        this.location.href = `http://localhost:8080/shop/cart/${user_id}`
                    }
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

        // const user_name = user_cart.getCookie()[0];
        

    } 
    

});


function accountModalPop() {
    return `
        <div id="account_modal" class="account_modal">
            <div class='greet'>Hello</div>
            
            <div class='sign_in'>                
                <button id="sign_in_btn" class="sign_in_btn">SIGN IN</button>                               
            </div>
            <div class='create_an_account'>
                <button class='create_an_account_btn'>CREATE AN ACCOUNT</button>
            </div>
            
            <div class='track_my_order'>
                <button id='track_my_order_btn' class='track_my_order_btn'>TRACK MY ORDER</button>
            </div>
        </div>
    `
}








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
        // { path: "/shop/*", view1: "Test" }

        
    ];

    
    console.log(routes);

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

    // if (!match) {
    //     match = {
    //         route: location.pathname,
    //         isMatch: true,
    //     };
    //     const page = new NotFound();
    //     document.querySelector(".lorem").innerHTML = await page.getHtml();
    // } else {

      
            const page = new match.route.view1();       
            
            
            document.querySelector(".lorem").innerHTML = await page.getHtml(); 
            
                    
            // console.log(`page: ${JSON.stringify(page)}`);
        
        
            if(match.route.path == "/home" || match.route.path == "/" || match.route.path == "" || match.route.path == "/cafefore/" || match.route.path == "/cafeFORE/") {
                console.log(match.route.path);
                main_background.style.display = "flex";
                page.quickButton();
                page.quickBtnEventListener();
            
            }

            if(match.route.path == "/about" || match.route.path == "/menu" || match.route.path == "/shop" || match.route.path == "/contact" || match.route.path == "/test") {
                console.log(match.route.path);
                if(main_background) main_background.style.display = "none";
            }

            if(match.route.path == "/menu") {
                console.log("menu selector");
                page.menuSelector();
                page.menuEventListener();
            
            }

            if(match.route.path == "/shop") {

                function setItemContainer(prodnum, image_src, item_name, item_price) {
                    const ItemContainer = document.createElement('div');
                    ItemContainer.setAttribute('id', `online_main_item_contatiner`);
                    ItemContainer.setAttribute('class', `online_main_item_container`);
                    // ItemContainer.setAttribute('class', `online_main_item_contatiner c${prodnum}`);
                    ItemContainer.setAttribute('itemid', `${prodnum}`);
                    document.querySelector('.online_main_items').appendChild(ItemContainer);

                    // setItemNumber(prodnum);
                    setItemImageContainer(prodnum, image_src, item_name, item_price);
                                     
                }

                function setItemImageContainer(prodnum, image_src, item_name, item_price) {
                    const ItemImageContainer = document.createElement('div');
                    ItemImageContainer.setAttribute('id', `online_main_item_pic_container`);
                    // ItemImageContainer.setAttribute('class', `online_main_item_pic_container c${prodnum}`);                    
                    ItemImageContainer.setAttribute('class', `online_main_item_pic_container`);                    
                    document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemImageContainer);
                    
                    setItemLink(prodnum, image_src, item_name, item_price);
                    
                    
                }

                function setItemLink(prodnum, image_src, item_name, item_price) {
                    const ItemLink = document.createElement('a');
                    ItemLink.setAttribute('class', `online_main_item_link`);  
                    ItemLink.setAttribute('link_data_itemid', `${prodnum}`);
                    // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
                    document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemLink);
                    // document.querySelector(`.online_main_item_pic_container.c${prodnum}`).appendChild(ItemLink);
                    
                    setItemImage(prodnum, image_src);
                    setItemPrice(prodnum, item_price);
                    setItemName(prodnum, item_name);
                    
                     
                }

                function setItemImage(prodnum, image_src) {
                    const ItemImage = document.createElement('img');
                    ItemImage.setAttribute('class', `online_main_item_pic`);
                    ItemImage.setAttribute('src', image_src);
                    document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemImage);
                }

                function setItemNumber(prodnum) {
                    const ItemNumber = document.createElement('div');
                    ItemNumber.setAttribute('class', `online_main_item_number`);
                    document.querySelector(`.online_main_item_contatiner.c${prodnum}`).appendChild(ItemNumber);
                    document.querySelector(`.online_main_item_number.c${prodnum}`).innerText = prodnum;
                }

                function setItemName(prodnum, item_name) {
                    const ItemName = document.createElement('div');
                    ItemName.setAttribute('class', `online_main_item_name`);
                    document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemName);
                    ItemName.innerText = item_name;
                }

                function setItemPrice(prodnum, item_price) {
                    const ItemPrice = document.createElement('div');
                    ItemPrice.setAttribute('class', `online_main_item_price`);
                    document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemPrice);
                    ItemPrice.innerText = '$'+item_price;
                }
                
                let shop_data = { name : "shop/post"};
                
                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                       
                        },
                    body: JSON.stringify(shop_data)
                };
                console.log(data);
                
                fetch('/shop', data)
                .then((res) => res.json())
                .then(result => {
                    console.log(result)                   
                    for (var i = 0 ; i < result.length ; i++) {
                        setItemContainer(result[i].prodnum, result[i].image, result[i].name, result[i].price_sell);                      
                    }
                    
                }); 
            
             

            

            
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
    // }

}; 

window.addEventListener("popstate", () => {
    console.log("popstate");
    router();
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
            e.preventDefault();
            history.pushState(null, null, e.target.href);
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





