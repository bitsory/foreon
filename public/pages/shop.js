import PlaceOrder from "./place_order.js";
import Main from "../index.js";
import ShopDetail from "./shop_detail.js"


export default class {
    // lorem = document.getElementById('lorem');

    constructor() {
        document.title = "Cafe FORE";
        console.log("shop page");
        // this.n_cart = Main;    
        /*
        this.lorem.addEventListener('click', function(e) {

            console.log( " shop page double up check shop page double up check shop page double up check ")

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
                    // console.log(this.n_cart);

                    const item_image = result.image;
                    const item_num = result.prodnum;
                    const item_name = result.name;
                    const item_price = result.price_sell;
                    const item_content = result.content;
                    const shop_detail = new ShopDetail(item_num, item_name, item_price, item_image, item_content);

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
        })
        */
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

    setItemContainer(prodnum, image_src, item_name, item_price) {
        const ItemContainer = document.createElement('div');
        ItemContainer.setAttribute('id', `online_main_item_contatiner`);
        ItemContainer.setAttribute('class', `online_main_item_container`);
        // ItemContainer.setAttribute('class', `online_main_item_contatiner c${prodnum}`);
        ItemContainer.setAttribute('itemid', `${prodnum}`);
        document.querySelector('.online_main_items').appendChild(ItemContainer);
    
        // setItemNumber(prodnum);
        this.setItemImageContainer(prodnum, image_src, item_name, item_price);
                         
    }
    
    setItemImageContainer(prodnum, image_src, item_name, item_price) {
        const ItemImageContainer = document.createElement('div');
        ItemImageContainer.setAttribute('id', `online_main_item_pic_container`);
        // ItemImageContainer.setAttribute('class', `online_main_item_pic_container c${prodnum}`);                    
        ItemImageContainer.setAttribute('class', `online_main_item_pic_container`);                    
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemImageContainer);
        
        this.setItemLink(prodnum, image_src, item_name, item_price);
        
        
    }
    
    setItemLink(prodnum, image_src, item_name, item_price) {
        const ItemLink = document.createElement('a');
        ItemLink.setAttribute('class', `online_main_item_link`);  
        ItemLink.setAttribute('link_data_itemid', `${prodnum}`);
        // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemLink);
        // document.querySelector(`.online_main_item_pic_container.c${prodnum}`).appendChild(ItemLink);
        
        this.setItemImage(prodnum, image_src);
        this.setItemPrice(prodnum, item_price);
        this.setItemName(prodnum, item_name);
        
         
    }
    
    setItemImage(prodnum, image_src) {
        const ItemImage = document.createElement('img');
        ItemImage.setAttribute('class', `online_main_item_pic`);
        ItemImage.setAttribute('src', image_src);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemImage);
    }
    
    setItemNumber(prodnum) {
        const ItemNumber = document.createElement('div');
        ItemNumber.setAttribute('class', `online_main_item_number`);
        document.querySelector(`.online_main_item_contatiner.c${prodnum}`).appendChild(ItemNumber);
        document.querySelector(`.online_main_item_number.c${prodnum}`).innerText = prodnum;
    }
    
    setItemName(prodnum, item_name) {
        const ItemName = document.createElement('div');
        ItemName.setAttribute('class', `online_main_item_name`);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemName);
        ItemName.innerText = item_name;
    }
    
    setItemPrice(prodnum, item_price) {
        const ItemPrice = document.createElement('div');
        ItemPrice.setAttribute('class', `online_main_item_price`);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemPrice);
        ItemPrice.textContent = '$'+ parseFloat(item_price).toFixed(2);
    }
    
}


document.addEventListener('click', function(e) {
    console.log( " shop page double up check shop page double up check shop page double up check ")

    if (e.target && (e.target.className =='online_main_item_name' || e.target.className == 'online_main_item_pic' || e.target.className == 'online_main_item_price')) {
                
        let item_num = e.target.parentElement.getAttribute('link_data_itemid');
        console.log('itemid');
        console.log(item_num);

        history.pushState(null, null, `/shop/view/item/${item_num}`);


        

       
        ///////////////////////////////////////////////////////////////

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
            // console.log(this.n_cart);

            const item_image = result.image;
            const item_num = result.prodnum;
            const item_name = result.name;
            const item_price = result.price_sell;
            const item_content = result.content;

            if (shop_detail_page_flag) {
                document.querySelector(".online_main").innerHTML = 
                shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
            } else {
                shop_detail_page = new ShopDetail(item_num, item_name, item_price, item_image, item_content);
                shop_detail_page_flag = true;
                document.querySelector(".online_main").innerHTML = 
                shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
            }            
            
        });
    }

    
    if (e.target && e.target.className == 'shop_wellness_btn') {
        console.log("shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn ");

        document.querySelector('.test_container').innerText = "test";
    }  

});

let shop_detail_page = {};
let shop_detail_page_flag = false;
