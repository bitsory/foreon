export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("about page");
        this.title = "about";
    }

    
    async getHtml() {
        
        return `
            <div id="online_title" class="online_title">
                <a href="/shop" id="online_title_label" class="online_title_label" data-link-T>Cafe FORE Online Shop</a>
                <form class="example" action="#">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <div id="shop_category_container" class="shop_category_container">
                    <div id="shop_cat_wellness" class="shop_cat_wellness shop_category">
                        <button id="shop_wellness_btn" class="shop_wellness_btn cate_btn">Wellness</button>
                    </div>
                    <div id="shop_cat_dessert" class="shop_cat_dessert shop_category">
                        <button id="shop_dessert_btn" class="shop_dessert_btn cate_btn">Dessert</button>
                    </div>
                    <div id="shop_cat_kids" class="shop_cat_kids shop_category">
                        <button id="shop_kids_btn" class="shop_kids_btn cate_btn">Kids</button>
                    </div>
                    <div id="shop_cat_gift" class="shop_cat_gift shop_category">
                        <button id="shop_gift_btn" class="shop_gift_btn cate_btn">Gift</button>
                    </div>                    
                </div>
            </div>
            
            <h3 class="about_article">
            <div class="about_us">About us<br><br></div>
            We are a snack & juice bar right inside the LA Fitness East Cobb.<br>
            You can just feel free open the door come inside.<br><br>
            Enjoy our sort of Coffee, Powerful Supplement Smoothie, Acai bowl, Wellness shot 
            and Korean style snack & food K-Bop.<br><br>
            We also have useful products in online mall.<br><br>
            Take a look around!!<br>            
            </h3>
            <div class="about_video">
                <video src="/images/about_video.mp4" playsinline autoplay muted loop class="aboutVideo" >
                    
                </video>
            </div>     

            <div class="q_btn_container">
                <button type="button" class="q_menu q_btn">
                <a href="/menu" data-link-T style="color: white";>MENU</a></button>
                <button type="button" class="q_order q_btn">
                <a href="#" data-link-T style="color: white";>ORDER</a></button>
                <button type="button" class="q_call q_btn">
                <a href='tel:470-263-6495' style="color: white";>CALL</a></button>
            </div>   
                          
        `;
    }
}

document.addEventListener('click', function(e) {

    console.log("about document.addEventListener('click', function(e)");

});
