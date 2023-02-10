import Home from "./pages/home.js";
import About from "./pages/about.js";
import Menu from "./pages/menu.js";
import Contact from "./pages/contact.js";
import NotFound from "./pages/notfound.js";
import Shop from "./pages/shop.js";


const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_nav_list');
const icons = document.querySelector('.navbar_icons');

const main = document.querySelector('.main');
const main_background = document.querySelector('.main_background');
const lorem = document.querySelector('.lorem');
const mainback1 = document.querySelector('.mainback1');

const footer = document.querySelector('.footer');
const navbar_logo = document.querySelector('.navbar_logo');
const foot_logo = document.querySelector('.foot_logo');
const gotoTop = document.querySelector('.fa-angles-up');



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

const deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
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
        { path: "/shop", view1: Shop }
        
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

    if (!match) {
        match = {
            route: location.pathname,
            isMatch: true,
        };
        const page = new NotFound();
        document.querySelector(".lorem").innerHTML = await page.getHtml();
    } else {

        // if (!(match.route.path == "/shop/shop.html")){
            console.log(" !!! shop");
            const page = new match.route.view1();       
            
            
            document.querySelector(".lorem").innerHTML = await page.getHtml();
                    
            console.log(`page: ${JSON.stringify(page)}`);
        
        
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
            
            // if (menu.classList.length == 2) {

            //     console.log("length 2");
            //     console.log("toggle on");
                
            //     main.classList.toggle('on');
            //     menu.classList.toggle('on');
            //     icons.classList.toggle('on');
            //      footer.classList.toggle('on');
            //     toggleBtn.classList.toggle('on');
            //     console.log(`menu.classList.length: ${menu.classList.length}`);
            // }
    }

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





