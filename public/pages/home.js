export default class {
    constructor() {
        document.title = "Cafe FORE";
    }

    testHome() {
        console.log("test Home");
    }

    quickButton () {
        console.log("quick button querySelector");
        this.q_menu = document.querySelector('.q_menu');
    
    }
    quickBtnEventListener () {
        this.q_menu.addEventListener('click', (e)=> {
            console.log("quick button addEventListener");
            console.log(e.target);
        });
    }


    async getHtml() {
        return `
            <div id="online_title" class="online_title">
                <a href="/shop" id="online_title_label" class="online_title_label" data-link-T>Cafe FORE Online Shop</a>
                <div id="item_search_form">
                    <input type="text" id="item_search_input" class="item_search_input" placeholder="Search..">
                    <button type="button" id="item_search_btn" class="item_search_btn"><i class="fa fa-search"></i></button>
                </div>
                <div id="shop_category_container" class="shop_category_container">
                    <div id="shop_cat_wellness" class="shop_cat_wellness shop_category">
                        <button id="shop_wellness_btn" class="category_btn" value='wellness'>Wellness</button>
                    </div>
                    <div id="shop_cat_dessert" class="shop_cat_dessert shop_category">
                        <button id="shop_dessert_btn" class="category_btn" value='dessert'>Dessert</button>
                    </div>
                    <div id="shop_cat_kids" class="shop_cat_kids shop_category">
                        <button id="shop_kids_btn" class="category_btn" value='kids'>Kids</button>
                    </div>
                    <div id="shop_cat_gift" class="shop_cat_gift shop_category">
                        <button id="shop_gift_btn" class="category_btn" value='gift'>Gift</button>
                    </div>
                </div>
            </div>

            <div class="home_description">
                <h1>
                We are the world.
                <br>
                PEACE
                <br>
                LOVE
                <br>
                ...&<br> 
                Cafe FORE</h1>
            </div>

            <div class="home_pic">
                <div class="home_pic pic1">
                    <div class="home_pic_div sm_cho">
                        
                    </div>
                </div>
                <div class="home_pic pic2__blink">
                    <div class="sm_neon"></div>
                </div>
                <div class="home_pic pic3">
                    <div class="home_video">
                    <video src="/images/home_v.mp4" playsinline autoplay muted loop class="myVideo">
                        
                    </video>
                    </div>
                </div>

            </div>

            <div class="q_btn_container">
                <button type="button" class="q_menu q_btn">
                <a href="/menu" data-link-T style="color: white";>MENU</a></button>
                <button type="button" class="q_order q_btn">
                <a href="#" data-link-T style="color: white";>ORDER</a></button>
                <button type="button" class="q_call q_btn">
                <a href='tel:470-854-6449' style="color: white";>CALL</a></button>
            </div>

        `;
    }
}
