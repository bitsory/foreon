import Home from "./pages/home.js";
import About from "./pages/about.js";
import Menu from "./pages/menu.js";
import Contact from "./pages/contact.js";
import NotFound from "./pages/notfound.js";
// import Shop from "./pages/shop.js";
import Login from "./pages/login.js";
import Cart from "./pages/cart.js";


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


export default user_cart;

console.log(user_cart);

// function getCookie() {
//     console.log(`get cookie : ${document.cookie}`);
//     let cook = decodeURIComponent(document.cookie).split(';');// get array
   
//     var result='GUEST';
//     cook.forEach((item) => { 
//         const obj = new Object();
//         const elem = item.trim();
//         const tmp = elem.split('=');
//         const key = tmp[0];
//         const val = tmp[1];
//         obj.key = val;
        
//         if (key === 'cafefore') {
//             var start = val.indexOf('":"');
//             var end = val.indexOf('",');                
//             result = val.substring(start+3, end);                                
//         } 

//     });

//     return result;
    
// }


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

document.addEventListener('click', function(e){    

    var user_info =  document.querySelector('.user_info');
    var user_profile_container =  document.querySelector('.user_profile_container');
    //var user_profile =  document.querySelector('.user_profile');
    // var modal_body = document.querySelector('.modal_body');
    

    if(e.target == user_info) { // user info modal window show
        console.log("user info");        
        user_profile_container.style.display = "block";
        if (document.querySelector(".user_info").innerText !== "GUEST") {
            document.querySelector(".user_profile").innerHTML = user_cart.getUserProfile();
        } else {
            document.querySelector(".user_profile").innerHTML = user_cart.getGuestProfile();
        }
    }

    if (user_profile_container && e.target != user_info) // user info modal window off
        if(e.target!= user_profile_container && user_profile_container.style.display == "block") {
            user_profile_container.style.display = "none";
            console.log("close pop up")
        }

    if (e.target && e.target.className == 'user_logout_btn') { 
        console.log("user log out");
        document.cookie = 'cafefore' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT; domain=localhost;path=/;';
        console.log("user log out user log out user log out user log out user log out ");
    }

    // if (e.target != document.querySelector(".login_modal_pop"))
    //     if (modal_body && e.target != modal_body && modal.style.display == "block") {
    //         console.log("modal remove");
    //         // modal_body.remove();
    //         // modal.style.display = 'none';
    //         // document.body.style.overflow = 'auto';
    //     }

    if (e.target && e.target.className == 'user_profile_cart_btn') {
        console.log("view cart view")
        

    }

    


});

window.addEventListener('click', (e) => {
    e.target === modal ? modalClose() : false
})

function modalClose() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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
        // { path: "/shop", view1: "Shop" },
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

        // if (match.route.path == "/test") {
        //     console.log("test page test page")
        //     document.querySelector(".lorem").innerHTML = `<h1>TeST TEST TEST</h1>`;
        // }    

        // if(match.route.path == "/home" || match.route.path == "/" || match.route.path == "" || match.route.path == "/cafefore/" || match.route.path == "/cafeFORE/" || match.route.path == "/about" || match.route.path == "/menu" || match.route.path == "/contact"){
        if (match && match !== "/shop") {
        
            console.log(" !!! shop");

         
            const page = new match.route.view1();       
            
            
            document.querySelector(".lorem").innerHTML = await page.getHtml();
                    
            // console.log(`page: ${JSON.stringify(page)}`);
        
        
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

window.addEventListener("popstate", router);


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





