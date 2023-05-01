export function makePurchaseHistoryContainer() {
    return `
    <div id="purchase_history_container" class="purchase_history_container">
        <div id="purchase_history_page" class="purchase_history_page">
            <div id="purchase_history_title" class="purchase_history_title">Purchase History</div>
            <div id="purchase_history_box" class="purchase_history_box">
            </div>
        </div>   
    </div>
    `;
}

export function setPurchaseHistory(result) {
    result.forEach(element => {
        const order_id = element.order_number;
        let cart_id = element.cartnum;
        let prodnum = element.prodnum;
        let image_src = element.image;
        let item_name = element.name;
        const price = element.price_sell;
        const quantity = element.quantity;
        let item_description = element.content;

        let total_amount = element.total_order_amount;
        let oddate = element.oddate;
        let track_number = element.track_number;
        let shipping_fee = element.shipping_fee;
        let shipping_rate = element.shipping_rate;
        let refund = element.refund;
        let full_refunded = element.full_refunded;
        // let $purchase_history = document.querySelector(`[orderid="${order_id}"]`);
        if (document.querySelector(`[orderid="${order_id}"]`)) {
            
            setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);

        } else {
            const purchase_history = document.createElement('div');
            purchase_history.setAttribute('id', `purchase_history`);
            purchase_history.setAttribute('class', `purchase_history`);
            purchase_history.setAttribute('orderid', `${order_id}`);
            document.getElementById('purchase_history_box').appendChild(purchase_history);
            setPurchaseHistoryHead(order_id, oddate, total_amount, full_refunded);
            setPurchaseHistoryMain(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);


        } 
    })

}

function setPurchaseHistoryHead(order_id, oddate, total_amount, full_refunded) {
    const purchase_history_head = document.createElement('div');
    purchase_history_head.setAttribute('id', `purchase_history_head`);
    purchase_history_head.setAttribute('class', `purchase_history_head`);
    purchase_history_head.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[orderid="${order_id}"]`).appendChild(purchase_history_head);
    // purchase_history_head.innerText = order_id;
    
    setPurchaseHistoryHeadOrderdate(order_id, oddate);
    setPurchaseHistoryHeadOrderTotal(order_id, total_amount);
    setCancelOrder(order_id, full_refunded);
}

function setPurchaseHistoryHeadOrderdate(order_id, oddate) {
    const purchase_history_head_orderdate = document.createElement('div');
    purchase_history_head_orderdate.setAttribute('id', `purchase_history_head_orderdate`);
    purchase_history_head_orderdate.setAttribute('class', `purchase_history_head_orderdate`);
    // purchase_history_head_orderdate.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_head_orderdate);
    purchase_history_head_orderdate.innerText = oddate;
}

function setPurchaseHistoryHeadOrderTotal(order_id, total_amount) {
    const purchase_history_head_order_total = document.createElement('div');
    purchase_history_head_order_total.setAttribute('id', `purchase_history_head_order_total`);
    purchase_history_head_order_total.setAttribute('class', `purchase_history_head_order_total`);
    // purchase_history_head_orderdate.setAttribute('head_orderid', `${order_id}`);
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_head_order_total);
    purchase_history_head_order_total.innerText = '$' + parseFloat(total_amount).toFixed(2);
}

function setCancelOrder(order_id, full_refunded) {
    const purchase_history_order_cancel_btn = document.createElement('button');
    purchase_history_order_cancel_btn.setAttribute('id', `purchase_history_order_cancel_btn`);
    purchase_history_order_cancel_btn.setAttribute('class', `purchase_history_order_cancel_btn purchase_page_btn`);
    purchase_history_order_cancel_btn.setAttribute('title', `cancel this order`);        
    document.querySelector(`[head_orderid="${order_id}"]`).appendChild(purchase_history_order_cancel_btn);
    purchase_history_order_cancel_btn.innerText = 'Cancel This Order';
    if (full_refunded == 'y') {
        purchase_history_order_cancel_btn.innerText = 'This Order has canceled';
        purchase_history_order_cancel_btn.setAttribute('disabled', 'true'); 
    }
}




function setPurchaseHistoryMain(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund) {
    const purchase_history_main = document.createElement('div');
    purchase_history_main.setAttribute('id', `purchase_history_main`);
    purchase_history_main.setAttribute('class', `purchase_history_main`);
    purchase_history_main.setAttribute('main_orderid', `${order_id}`);
    document.querySelector(`[orderid="${order_id}"]`).appendChild(purchase_history_main);

    setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund);

}

function setPurchaseHistoryItem(order_id, cart_id, prodnum, image_src, item_name, price, quantity, item_description, track_number, refund) {
    const purchase_history_item = document.createElement('div');
    purchase_history_item.setAttribute('id', `purchase_history_item`);
    purchase_history_item.setAttribute('class', `purchase_history_item`);
    purchase_history_item.setAttribute('item_orderid', `${cart_id}`);
    document.querySelector(`[main_orderid="${order_id}"]`).appendChild(purchase_history_item);
    //  purchase_history_item.innerText = cart_id;

    setPurchaseHistoryItemImagebox(cart_id, prodnum, image_src);
    setPurchaseHistoryItemContentbox(cart_id, prodnum, item_name, price, quantity, item_description);
    setPurchaseHistoryItemExtrabox(cart_id, prodnum, track_number, order_id, refund);
}

function setPurchaseHistoryItemImagebox(cart_id, prodnum, image_src) {
    const purchase_history_item_imagebox = document.createElement('div');
    purchase_history_item_imagebox.setAttribute('id', `purchase_history_item_imagebox`);
    purchase_history_item_imagebox.setAttribute('class', `purchase_history_item_imagebox`);
    purchase_history_item_imagebox.setAttribute('imagebox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_imagebox);
    setPurchaseHistoryItemImage(cart_id, prodnum, image_src)
}

function setPurchaseHistoryItemImage(cart_id, prodnum, image_src) {
    const purchase_history_item_image = document.createElement('img');
    purchase_history_item_image.setAttribute('id', `purchase_history_item_image`);
    purchase_history_item_image.setAttribute('class', `purchase_history_item_image`);
    purchase_history_item_image.setAttribute('src', `${image_src}`);
    document.querySelector(`[imagebox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_image);   

}


function setPurchaseHistoryItemContentbox(cart_id, prodnum, item_name, price, quantity, item_description) {
    const purchase_history_item_contentbox = document.createElement('div');
    purchase_history_item_contentbox.setAttribute('id', `purchase_history_item_contentbox`);
    purchase_history_item_contentbox.setAttribute('class', `purchase_history_item_contentbox`);
    purchase_history_item_contentbox.setAttribute('contentbox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_contentbox);
    
    setPurchaseHistoryItemName(cart_id, prodnum, item_name);
    setPurchaseHistoryItemPQBox(cart_id, prodnum, price, quantity);
    setPurchaseHistoryItemDescription(cart_id, prodnum, item_description);
    

}

function setPurchaseHistoryItemName(cart_id, prodnum, item_name) {
    const purchase_history_item_name = document.createElement('div');
    purchase_history_item_name.setAttribute('id', `purchase_history_item_name`);
    purchase_history_item_name.setAttribute('class', `purchase_history_item_name`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_name);
    purchase_history_item_name.innerText = item_name;

}

function setPurchaseHistoryItemPQBox(cart_id, prodnum, price, quantity) {
    const purchase_history_item_pq_box = document.createElement('div');
    purchase_history_item_pq_box.setAttribute('id', `purchase_history_item_pq`);
    purchase_history_item_pq_box.setAttribute('class', `purchase_history_item_pq`);
    purchase_history_item_pq_box.setAttribute('item_pqbox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_pq_box);
    // setPurchaseHistoryItemPQBox.innerText = `$${price}`;
    setPurchaseHistoryItemPrice(cart_id, prodnum, price);
    setPurchaseHistoryItemQuantity(cart_id, prodnum, quantity);
    setPurchaseHistoryItemSubtotal(cart_id, prodnum, price, quantity);

}

function setPurchaseHistoryItemPrice(cart_id, prodnum, price) {
    const purchase_history_item_price = document.createElement('div');
    purchase_history_item_price.setAttribute('id', `purchase_history_item_price`);
    purchase_history_item_price.setAttribute('class', `purchase_history_item_price`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_price);
    purchase_history_item_price.innerText = `$${parseFloat(price).toFixed(2)}`;

}

function setPurchaseHistoryItemQuantity(cart_id, prodnum, quantity) {
    const purchase_history_item_quantity = document.createElement('div');
    purchase_history_item_quantity.setAttribute('id', `purchase_history_item_quantity`);
    purchase_history_item_quantity.setAttribute('class', `purchase_history_item_quantity`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_quantity);
    purchase_history_item_quantity.innerText = `\u00a0x ${quantity} EA`;

}

function setPurchaseHistoryItemSubtotal(cart_id, prodnum, price, quantity) {
    const item_subtotal = price * quantity;
    const purchase_history_item_subtotal = document.createElement('div');
    purchase_history_item_subtotal.setAttribute('id', `purchase_history_item_subtotal`);
    purchase_history_item_subtotal.setAttribute('class', `purchase_history_item_subtotal`);
    // purchase_history_item_name.setAttribute('item_name_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_pqbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_subtotal);
    purchase_history_item_subtotal.innerText ='\u00a0\u00a0'+`Item Subtotal $${parseFloat(item_subtotal).toFixed(2)}`;

}

function setPurchaseHistoryItemDescription(cart_id, prodnum, item_description) {
    const purchase_history_item_description = document.createElement('div');
    purchase_history_item_description.setAttribute('id', `purchase_history_item_description`);
    purchase_history_item_description.setAttribute('class', `purchase_history_item_description`);
    // purchase_history_item_description.setAttribute('item_desc_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[contentbox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_description);
    purchase_history_item_description.innerText = item_description;

}

function setPurchaseHistoryItemExtrabox(cart_id, prodnum, track_number, order_id, refund) {
    const purchase_history_item_extrabox = document.createElement('div');
    purchase_history_item_extrabox.setAttribute('id', `purchase_history_item_extrabox`);
    purchase_history_item_extrabox.setAttribute('class', `purchase_history_item_extrabox`);
    purchase_history_item_extrabox.setAttribute('extrabox_orderid', `${cart_id}${prodnum}`);
    document.querySelector(`[item_orderid="${cart_id}"]`).appendChild(purchase_history_item_extrabox);
    
    setPurchaseHistoryItemReorder(cart_id, prodnum);
    setPurchaseHistoryItemTrack(cart_id, prodnum, track_number);
    setCancelOrderItem(cart_id, prodnum, order_id, refund);

}

function setPurchaseHistoryItemReorder(cart_id, prodnum) {
    const purchase_history_item_reorder_btn = document.createElement('button');
    purchase_history_item_reorder_btn.setAttribute('id', `purchase_history_item_reorder_btn`);
    purchase_history_item_reorder_btn.setAttribute('class', `purchase_history_item_reorder_btn purchase_page_btn`);
    purchase_history_item_reorder_btn.setAttribute('title', `item reorder`);    
    purchase_history_item_reorder_btn.setAttribute('itemid', `${prodnum}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_reorder_btn);
    purchase_history_item_reorder_btn.innerText = 'But It Again';
}

function setPurchaseHistoryItemTrack(cart_id, prodnum, track_number) {
    const purchase_history_item_track_btn = document.createElement('button');
    purchase_history_item_track_btn.setAttribute('id', `purchase_history_item_track_btn`);
    purchase_history_item_track_btn.setAttribute('class', `purchase_history_item_track_btn purchase_page_btn`);
    purchase_history_item_track_btn.setAttribute('title', `item track`);    
    purchase_history_item_track_btn.setAttribute('track-itemid', `${track_number}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_track_btn);
    purchase_history_item_track_btn.innerText = 'Item Track';
}

function setCancelOrderItem(cart_id, prodnum, order_id, refund) {
    const purchase_history_item_order_cancel_btn = document.createElement('button');
    purchase_history_item_order_cancel_btn.setAttribute('id', `purchase_history_item_order_cancel_btn`);
    purchase_history_item_order_cancel_btn.setAttribute('class', `purchase_history_item_order_cancel_btn purchase_page_btn`);
    purchase_history_item_order_cancel_btn.setAttribute('title', `cancel this order`);    
    purchase_history_item_order_cancel_btn.setAttribute('cart-itemid', `${cart_id}`);
    purchase_history_item_order_cancel_btn.setAttribute('order-itemid', `${order_id}`);
    purchase_history_item_order_cancel_btn.setAttribute('itemid', `${prodnum}`);
    document.querySelector(`[extrabox_orderid="${cart_id}${prodnum}"]`).appendChild(purchase_history_item_order_cancel_btn);
    purchase_history_item_order_cancel_btn.innerText = 'Cancel Order This Item';
    if (refund == 'y') {
        purchase_history_item_order_cancel_btn.innerText = 'Item order Canceled';
        purchase_history_item_order_cancel_btn.setAttribute('disabled', 'true'); 
    }
}
