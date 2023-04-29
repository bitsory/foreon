


export function setOnlineContainerPage() {
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