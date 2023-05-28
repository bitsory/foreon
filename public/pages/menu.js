export default class {
    constructor() {
        document.title = "Cafe FORE";    
    }

    menuIconClickEvent (event) {
        event.target.style.border = '5px solid var(--maincolor)';
        event.target.style.borderRadius = '30%';
        event.target.style.backgroundColor = 'var(--subcolor)';
    }

    menuIconClickEvent2 () {
        this.coffee_btn.style.border = 'none';
        this.coffee_btn.style.backgroundColor = 'rgba(0,0,0,0)';
        this.smoothie_btn.style.border = 'none';
        this.smoothie_btn.style.backgroundColor = 'rgba(0,0,0,0)';
        this.kbop_btn.style.border = 'none';
        this.kbop_btn.style.backgroundColor = 'rgba(0,0,0,0)';
        this.acai_btn.style.border = 'none';
        this.acai_btn.style.backgroundColor = 'rgba(0,0,0,0)';
        this.wellness_btn.style.border = 'none';
        this.wellness_btn.style.backgroundColor = 'rgba(0,0,0,0)';
    }

    menuSelector() {
        this.menu_article = document.querySelector('.menu_article');
    
        this.coffee_btn = document.querySelector('.coffee_button');
        this.smoothie_btn = document.querySelector('.smoothie_button');
        this.kbop_btn = document.querySelector('.kbop_button');
        this.acai_btn = document.querySelector('.acai_button');
        this.wellness_btn = document.querySelector('.wellness_button');
    }

    menuEventListener () {
        this.coffee_btn.addEventListener('click', (event)=> {
         
            this.menuIconClickEvent2 ();
            this.menuIconClickEvent (event);
            document.querySelector(".menu_article").innerHTML = 
            `<div class="menu_gl menu_coffee">
            <div class="menu_gl menu_category">
                COFFEE
            </div>
            <div class="menu_items">
                <div class="menu_item">
                    <div class="menu_item_title">Americano</div>
                    <div class="menu_item_price">$4.25</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Latte</div>
                    <div class="menu_item_price">$5.50</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Vanilla</div>
                    <div class="menu_item_price">$5.95</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Hazelnut</div>
                    <div class="menu_item_price">$5.95</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Caramel</div>
                    <div class="menu_item_price">$5.95</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Seasalt</div>
                    <div class="menu_item_price">$6.25</div>
                </div>
            </div>
        </div>            
            `;
        });

        this.smoothie_btn.addEventListener('click', (event)=> {
      
            this.menuIconClickEvent2 ();
            this.menuIconClickEvent (event);
            document.querySelector(".menu_article").innerHTML = 
        `<div class="menu_gl menu_smoothie">
            <div class="menu_gl menu_category">
            SMOOTHIE
            </div>
            <div class="menu_items">
                <div class="menu_item">
                    <div class="menu_item_title">Energy Strawberry</div>
                    <div class="menu_item_price">$7.95</div>
                    <div class="menu_item_description">Strawberry, Banana, Raw Honey</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Gain Up Banana</div>
                    <div class="menu_item_price">$7.95</div>
                    <div class="menu_item_description">Banana, Almonds, Milk, Peanut Butter</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Health Veggie</div>
                    <div class="menu_item_price">$8.25</div>
                    <div class="menu_item_description">Spinach, Mango, Banana, Almonds</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Nutty Very Berries</div>
                    <div class="menu_item_price">$7.95</div>
                    <div class="menu_item_description">Strawberry, Blueberry, Raspberry, Almond Milk</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Pineapple Hero</div>
                    <div class="menu_item_price">$7.95</div>
                    <div class="menu_item_description">Pineapple, Almond, Apple Juice</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Lean 1 Vanilla</div>
                    <div class="menu_item_price">$8.35</div>
                    <div class="menu_item_description">Banana, Almond, Milk, Lean 1 protein</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Berry PB & J</div>
                    <div class="menu_item_price">$8.25</div>
                    <div class="menu_item_description">Strawberry, Blueberry, Banana, Peanut Butter</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Dr. OZ Green</div>
                    <div class="menu_item_price">$8.25</div>
                    <div class="menu_item_description">Kale, Spinach, Banana, Mango, Pineapple</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Tropical Blends</div>
                    <div class="menu_item_price">$8.45</div>
                    <div class="menu_item_description">Mango, Pineapple, Strawberry, Banana</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Chocolate Fuel</div>
                    <div class="menu_item_price">$8.45</div>
                    <div class="menu_item_description">Strawberry, Banana, Peanut Butter, Choco Chip</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Mango Festival</div>
                    <div class="menu_item_price">$8.45</div>
                    <div class="menu_item_description">Mango, Raw Honey, Apple Juice, Coconut Juice</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Lemon Ginger Blend</div>
                    <div class="menu_item_price">$9.25</div>
                    <div class="menu_item_description">Lemon, Ginger, Spinach, Kale, Mango, pineapple, Coconut Juice</div>
                </div>

            </div>
        </div>
            `;});

        this.kbop_btn.addEventListener('click', (event)=> {
           
            this.menuIconClickEvent2();
            this.menuIconClickEvent(event);            
            document.querySelector(".menu_article").innerHTML = 
            `<div class="menu_gl menu_kbop">
                <div class="menu_gl menu_category">
                    K-BOP
                </div>
                <div class="menu_items">
                    <div class="menu_item">
                        <div class="menu_item_title">Ramen</div>
                        <div class="menu_item_price">$5.95</div>
                        <div class="menu_item_description">Instant Noodle /w Special Add on<br>(Dine-in only)</div>
                    </div>
                    <div class="menu_item">
                        <div class="menu_item_title">Cup Ramen Fried Rice</div>
                        <div class="menu_item_price">$6.75</div>
                        <div class="menu_item_description">Korean Style Street Food<br>Fried Rice in Cup Noodle</div>
                    </div>
                    <div class="menu_item">
                        <div class="menu_item_title">Bulgogi Cup-Bop</div>
                        <div class="menu_item_price">$9.25</div>
                        <div class="menu_item_description">Marinated Beef with White Rice & Glass Noodle in the Bowl<br>
                        choice Hot Spicy, Peanut-Soy, Mayo sauce</div>
                    </div>
                </div>
            </div>           
            
            
            `;
        });

        this.acai_btn.addEventListener('click', (event)=> {
            console.log("acai event listener");
            this.menuIconClickEvent2 ();
            this.menuIconClickEvent (event);            
            document.querySelector(".menu_article").innerHTML = 
            `<div class="menu_gl menu_acai">
            <div class="menu_gl menu_category">
                ACAI BOWL
            </div>
            <div class="menu_items">
                <div class="menu_item">
                    <div class="menu_item_title">ACAI BOWL</div>
                    <div class="menu_item_price">$10.95</div>
                    <div class="menu_item_description">
                    - Base : Acai, Three Berries, Apple Juice<br>
                    - Top : Banana, Strawberry, blueberry, 
                    Granola, Pumpkin seed, Flax seed, Chia seed,   
                    Honey, Almond
                    
                    </div>
                </div>
                
            </div>
            </div>
            
            
            `;
        });

        this.wellness_btn.addEventListener('click', (event)=> {
            console.log("wellness_btn event listener");
            this.menuIconClickEvent2 ();
            console.log(event.target);
            this.menuIconClickEvent (event);
            document.querySelector(".menu_article").innerHTML = 
            
        `<div class="menu_gl menu_wellness">
            <div class="menu_gl menu_category">
                WELLNESS
            </div>
            <div class="menu_items">
                <div class="menu_item">
                    <div class="menu_item_title">Dragon Shot</div>
                    <div class="menu_item_price">$3.25</div>
                    <div class="menu_item_description">Fresh Squeezed Ginger & Lemon 2.0 oz</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Detox Body</div>
                    <div class="menu_item_price">$3.25</div>
                    <div class="menu_item_description">Wheatgrass 2.0 oz</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Anti-Cancer Turmeric</div>
                    <div class="menu_item_price">$3.25</div>
                    <div class="menu_item_description">Turmeric 2.0 oz</div>
                </div>
                <div class="menu_item">
                    <div class="menu_item_title">Dragon Bottle</div>
                    <div class="menu_item_price">$18.00</div>
                    <div class="menu_item_description">100% Squeezed Ginger 16 oz</div>
                </div>
            </div>
        </div>
            `;
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
        
        <div id="page_main_part" class="page_main_part">
            <div class="menu_back">

                <img class="menu_back1" src="/images/menu_smoothie_under_final.gif" style="position: relative; left: 0%; top: 1rem;">
                <img class="menu_back2" src="/images/menu_3kbops_BOP.gif" style="position: relative; left:0%; top: 1rem;">
            </div>
            <div id="menu_box" class="menu_box">
                <div class="our_menu">OUR MENU</div>
                <div class="menu_button">
                    <div class="sqs" id="sqs_coffee">
                        <button class="coffee_button mn_btn"></button>
                    </div>
                    <div class="sqs" id="sqs_smoothie">
                        <button class="smoothie_button mn_btn"></button>
                    </div>
                    <div class="sqs" id="sqs_kbop">
                        <button class="kbop_button mn_btn"></button>
                    </div>  
                    <div class="sqs" id="sqs_acai">
                        <button class="acai_button mn_btn"></button>
                    </div>
                    <div class="sqs" id="sqs_wellness">
                        <button class="wellness_button mn_btn"></button>
                    </div>
                </div>    
                <div class="menu_article"></div>
                <div class="q_btn_container">
                    <button type="button" class="q_menu q_btn">
                    <a href="#" data-link-T style="color: white";>MENU</a></button>
                    <button type="button" class="q_order q_btn">
                    <a href="https://www.clover.com/online-ordering/cafe-fore-marietta"  target="_blank" style="color: white";>ORDER</a></button>
                    <button type="button" class="q_call q_btn">
                    <a href='tel:470-854-6449' style="color: white";>CALL</a></button>
                </div>  
            </div> 
        </div> 
    `           
                           
    }

}