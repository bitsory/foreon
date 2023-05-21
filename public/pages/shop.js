import PlaceOrder from "./place_order.js";
import Main from "../index.js";
import ShopDetail from "./shop_detail.js"
import * as ShopPageForm from "./form_shop_page.js";



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
        <div id="online_container" class="online_container">
            <div id="online_title" class="online_title">
                <a href="/shop" id="online_title_label" class="online_title_label" data-link-T>Cafe FORE Online Shop</a>
                <form class="example" action="#">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
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

            <div id="online_main" class="online_main">
                <div id="online_main_label" class="online_main_label">
                MD's Choice items
                </div>
                <div id="online_main_items" class="online_main_items">
                </div>
            </div>
        </div>
        
        `;
        
    }

    setItemContainer(prodnum, image_src, item_name, item_price, item_instock) {
        const ItemContainer = document.createElement('div');
        ItemContainer.setAttribute('id', `online_main_item_contatiner`);
        ItemContainer.setAttribute('class', `online_main_item_container`);
        // ItemContainer.setAttribute('class', `online_main_item_contatiner c${prodnum}`);
        ItemContainer.setAttribute('itemid', `${prodnum}`);
        document.querySelector('.online_main_items').appendChild(ItemContainer);    
        
        this.setItemImageContainer(prodnum, image_src, item_name, item_price, item_instock);
                         
    }
    
    setItemImageContainer(prodnum, image_src, item_name, item_price, item_instock) {
        const ItemImageContainer = document.createElement('div');
        ItemImageContainer.setAttribute('id', `online_main_item_pic_container`);                          
        ItemImageContainer.setAttribute('class', `online_main_item_pic_container`);                    
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemImageContainer);
        
        this.setItemLink(prodnum, image_src, item_name, item_price, item_instock);
        
        
    }
    
    setItemLink(prodnum, image_src, item_name, item_price, item_instock) {
        const ItemLink = document.createElement('a');
        ItemLink.setAttribute('id', `online_main_item_link`);
        ItemLink.setAttribute('class', `online_main_item_link`);  
        ItemLink.setAttribute('link_data_itemid', `${prodnum}`);
        // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(ItemLink);
        // document.querySelector(`.online_main_item_pic_container.c${prodnum}`).appendChild(ItemLink);
        
        this.setItemImage(prodnum, image_src);
        this.setItemPrice(prodnum, item_price, item_instock);
        this.setItemName(prodnum, item_name);
        // this.setAddItemButton(prodnum);
         
    }
    
    setItemImage(prodnum, image_src) {
        const ItemImage = document.createElement('img');
        ItemImage.setAttribute('id', `online_main_item_pic`);
        ItemImage.setAttribute('class', `online_main_item_pic`);
        ItemImage.setAttribute('src', image_src);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemImage);
    }
    
    
    setItemName(prodnum, item_name) {
        const ItemName = document.createElement('div');
        ItemName.setAttribute('id', `online_main_item_name`);
        ItemName.setAttribute('class', `online_main_item_name online_main_item_link`);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemName);
        ItemName.innerText = item_name;
    }
    
    setItemPrice(prodnum, item_price, item_instock) {
        console.log('item_instock');
        console.log(item_instock);
        
        const ItemPrice = document.createElement('div');
        ItemPrice.setAttribute('id', `online_main_item_price`);
        ItemPrice.setAttribute('class', `online_main_item_price online_main_item_link`);
        document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemPrice);
        ItemPrice.textContent = '$'+ parseFloat(item_price).toFixed(2);
        if (item_instock == 'n') {
            ItemPrice.style.textDecoration = 'line-through';
            const ItemPriceSoldout = document.createElement('span');
            ItemPriceSoldout.setAttribute('class', `online_main_item_price_soldout online_main_item_link`);
            document.querySelector(`[link_data_itemid="${prodnum}"]`).appendChild(ItemPriceSoldout);
            ItemPriceSoldout.textContent = ' ' + 'sold out';
        }
    }

    setAddItemButton(prodnum) {
        const add_item_btn = document.createElement('div');
        add_item_btn.setAttribute('id', `add_item_btn`);
        add_item_btn.setAttribute('class', `add_item_btn shop_add_btn`);
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(add_item_btn);
        add_item_btn.innerText = "ADD TO CART"
    }
    
}


document.addEventListener('click', function(e) {
    console.log( " shop page double up check shop page double up check shop page double up check ")

    if (e.target && (e.target.id =='online_main_item_name' || e.target.id == 'online_main_item_pic' || e.target.id == 'online_main_item_price')) {
        console.log('shop_detail_page_flag');        
        console.log(shop_detail_page_flag);
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
            const item_instock = result.instock;

            if (shop_detail_page_flag) {
                document.querySelector(".online_main").innerHTML = 
                shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
            } else {
                shop_detail_page = new ShopDetail(item_num, item_name, item_price, item_image, item_content);
                shop_detail_page_flag = true;
                document.querySelector(".online_main").innerHTML = 
                shop_detail_page.getHtml(item_image, item_num, item_name, item_price, item_content);
            }    
            
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
            
        });
    }
    
    if (e.target && e.target.className == 'shop_wellness_btn') {
        console.log("shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn shop_wellness_btn ");

        document.querySelector('.test_container').innerText = "test";
    }  

    if (e.target && e.target.id == 'shop_test_btn') {

       
        // console.log("sho[p teset sho[p teset sho[p tesetsho[p teset ")
        // const send_data = { post : "item detail view"};
        // const data = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
               
        //         },
        //     body: JSON.stringify(send_data)
        // };
        // console.log(data);

        // fetch(`/test_ups_ship`, data)
        // .then(response => response.json())
        // .then(response => {

        // console.log("response")
        // console.log(response)
        //  response.LassoRedirectURL + `?client_id=GcK5bzCltXeGLVAmNXg9GP8AV9s29ACg3VkSOnOvioYRln19&redirect_uri=http://localhost:8080&response_type=code&scope=read&type=ups_com_api`;
        // res.redirect(`https://www.ups.com/lasso/signin`+`?client_id=GcK5bzCltXeGLVAmNXg9GP8AV9s29ACg3VkSOnOvioYRln19&redirect_uri=http://localhost:8080&response_type=code&scope=read&type=ups_com_api`)
        // !req.query.code ? await res.redirect(url) : await requestAPIToken(res, req.query);
    }

});

let shop_detail_page = {};
let shop_detail_page_flag = false;
