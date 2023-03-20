import PlaceOrder from "./place_order.js";
import Main from "../index.js";
import ShopDetail from "./shop_detail.js"


export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("shop page");
    }

    

    getHtml() {  

        
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
        `
        
    }
}

document.addEventListener('click', function(e) {

    if (e.target && (e.target.className =='online_main_item_name' || e.target.className == 'online_main_item_pic' || e.target.className == 'online_main_item_price')) {
        
        let item_num = e.target.parentElement.getAttribute('link_data_itemid');
        console.log('itemid');
        console.log(item_num);

        const send_data = { post : "item detail view"};
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
                },
            body: JSON.stringify(send_data)
        };
        console.log(data);

        fetch(`/shop/view/item/${item_num}`, data)
        // fetch('/shopview', data)
        .then((res) => res.json())
        .then(result => {
            
            console.log(result)  
            const shop_detail = new ShopDetail();
            const item_image = result.image;
            const item_num = result.prodnum;
            const item_name = result.name;
            const item_price = result.price_sell;
            const item_content = result.content;

            // document.querySelector(".online_main").innerHTML = 
            //     shop_detail.getHtml(item_image, item_num, item_name, item_price, item_content);

            if (typeof (history.pushState) != "undefined") { 
                history.pushState(null, null, `/shop/view/item/${result.prodnum}`); 
                console.log(result)
                // const place_order = new PlaceOrder();
                // PlaceOrder.test();
                document.querySelector(".online_main").innerHTML = 
                shop_detail.getHtml(item_image, item_num, item_name, item_price, item_content);
                // `<div class="online_item_pic_container">ITEM
                // </div>`
                
                // document.querySelector(".shop_test").innerHTML = result.name;
                // document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
            } else { 
                this.location.href = `http://localhost:8080/shop/view/item/${result.prodnum}`
            }
        });
    }

    
    if (e.target && e.target.className == 'shop_wellness_btn') {
        console.log("shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn ");

        document.querySelector('.test_container').innerText = "test";
    }


    /*

    if (e.target && (e.target.className).substr(0, 17) == 'nline_main_item_' && e.target && (e.target.className).slice(-2, -1) == 'c') {
        
        var item_num = (e.target.className).slice(-1);
        console.log(item_num)
        // var send_data = { prodnum : item_num };
        

        const send_data = { post : "item detail view"};
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
               
                },
            body: JSON.stringify(send_data)
        };
        console.log(data);

        fetch(`/shop/view/item/${item_num}`, data)
        // fetch('/shopview', data)
        .then((res) => res.json())
        .then(result => {
            
            console.log(result)  
            const shop_detail = new ShopDetail();
            const item_image = result.image;
            const item_num = result.prodnum;
            const item_name = result.name;
            const item_price = result.price_sell;
            const item_content = result.content;

            // document.querySelector(".online_main").innerHTML = 
            //     shop_detail.getHtml(item_image, item_num, item_name, item_price, item_content);

            if (typeof (history.pushState) != "undefined") { 
                history.pushState(null, null, `/shop/view/item/${result.prodnum}`); 
                console.log(result)
                // const place_order = new PlaceOrder();
                // PlaceOrder.test();
                document.querySelector(".online_main").innerHTML = 
                shop_detail.getHtml(item_image, item_num, item_name, item_price, item_content);
                // `<div class="online_item_pic_container">ITEM
                // </div>`
                
                // document.querySelector(".shop_test").innerHTML = result.name;
                // document.querySelector('.cart_time_remaining').innerText = cart_time_remaining;
            } else { 
                this.location.href = `http://localhost:8080/shop/view/item/${result.prodnum}`
            }

            
        });
    
    
    
    }

    */
});

