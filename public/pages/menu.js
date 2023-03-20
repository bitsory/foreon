export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("menu");
      
        
    }

    menuIconClickEvent (event) {
        event.target.style.backgroundColor = 'cornflowerblue';
        event.target.style.borderRadius = '20% 20% 20% 20%';
    }

    menuIconClickEvent2 () {
        this.coffee_btn.style.backgroundColor = '';
        this.smoothie_btn.style.backgroundColor = '';
        this.kbop_btn.style.backgroundColor = '';
        this.acai_btn.style.backgroundColor = '';
        this.wellness_btn.style.backgroundColor = '';
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
            console.log("coffee event listener");
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
            console.log("smoothie event listener");
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
            console.log("kbop event listener");
            this.menuIconClickEvent2 ();
            this.menuIconClickEvent (event);            
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
        <div class="menu_back">

            <img class="menu_back1" src="http://localhost:8080/images/menu_smoothie_under_final.gif" style="position: relative; left: 0%; top: 1rem;">
            <img class="menu_back2" src="/images/menu_3kbops_BOP.gif" style="position: relative; left:0%; top: 1rem;">
        </div>
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
                    <a href="#" data-link-T style="color: white";>ORDER</a></button>
                    <button type="button" class="q_call q_btn">
                    <a href='tel:470-263-6495' style="color: white";>CALL</a></button>
                </div>    
                `           
                           
    }

}