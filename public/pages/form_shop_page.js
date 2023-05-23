


export function setOnlineContainerPage() {
    return `
        <div id="online_container" class="online_container">
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
                <div id="online_main" class="online_main">
                    <div id="online_main_label" class="online_main_label">
                    MD's Choice items
                    </div>
                    <div id="online_main_items" class="online_main_items">
                    </div>
                </div>
            </div>
        </div>
        
    `;
}