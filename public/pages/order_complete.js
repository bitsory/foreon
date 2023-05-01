export default class {

    constructor() {

    }


    getHtml() {
        return `                
        <div id="order_confirm_container" class="order_confirm_container">
            <div id="order_confirm_box" class="order_confirm_box">
                <div id="order_confirm_thanks_box" class="order_confirm_thanks_box">
                    <div id="order_confirm_thanks_contents" class="order_confirm_thanks_contents">
                        THANK YOU FOR YOUR ORDER, <span id="order_confirm_thanks_name" class="order_confirm_thanks_name"></span>
                    </div>
                    <div id="order_confirm_thanks_detail" class="order_confirm_thanks_detail">
                        Order Number : <span id="order_confirm_thanks_order_no" class="order_confirm_thanks_order_no"></span>
                    </div>

                </div>

                <div id="order_confirm_info_box" class="order_confirm_info_box">

                    <div id="order_confirm_info" class="order_confirm_info order_confirm_info_el">
                        Your Confirmation email will be sent to <span id="order_confirm_info_email" class="order_confirm_info_email"></span>
                    </div>

                    <div id="order_confirm_info_shipping_box" class="order_confirm_info_shipping_box order_confirm_info_el">
                        <div id="order_confirm_info_shipping_detail" class="order_confirm_info_shipping_detail">
                            <div id="order_confirm_info_shipping_detail_title" class="order_confirm_info_shipping_detail_title order_confirm_info_subtitle">Shipping Address & Method</div>
                            <div id="order_confirm_info_shipping_detail_address" class="order_confirm_info_shipping_detail_address"></div>
                            <div id="order_confirm_info_shipping_detail_recipient" class="order_confirm_info_shipping_detail_recipient"></div>
                            <div id="order_confirm_info_shipping_detail_email" class="order_confirm_info_shipping_detail_email"></div>
                            <div id="order_confirm_info_shipping_detail_phone" class="order_confirm_info_shipping_detail_phone"></div>



                        </div>

                    </div>

                    <div id="order_confirm_info_billing_box" class="order_confirm_info_billing_box order_confirm_info_el">
                        <div id="order_confirm_info_billing_box_detail" class="order_confirm_info_billing_box_detail">
                            <div id="order_confirm_info_billing_box_detail_title" class="order_confirm_info_billing_box_detail_title order_confirm_info_subtitle">Payment Method</div>
                            <div id="order_confirm_info_billing_box_detail_type" class="order_confirm_info_billing_box_detail_type"></div>
                            ************<span id="order_confirm_info_billing_box_detail_ending4" class="order_confirm_info_billing_box_detail_ending4"></span>
                            <div id="order_confirm_info_billing_box_detail_address_title" class="order_confirm_info_billing_box_detail_address_title">Billing Address</div>
                            <div id="order_confirm_info_billing_box_detail_address" class="order_confirm_info_billing_box_detail_address"></div>
                            <div id="order_confirm_info_billing_box_detail_cardholder" class="order_confirm_info_billing_box_detail_cardholder"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="order_confirm_summary_box" class="order_confirm_summary_box">
                <div id="order_confirm_summary_box_title" class="order_confirm_summary_box_title order_confirm_info_subtitle">Order Summary</div>
                <div id="order_confirm_summary_box_detail" class="order_confirm_summary_box_detail">
                    <div id="order_confirm_summary_box_detail_subtotal_container" class="order_confirm_summary_box_detail_subtotal_container">ITEMS Subtotal : 
                        <span id="order_confirm_summary_box_detail_subtotal" class="order_confirm_summary_box_detail_subtotal"></div>
                    </span>
                    <div id="order_confirm_summary_box_detail_shippingfee_container" class="order_confirm_summary_box_detail_shippingfee_container">Shipping & handling : 
                        <span id="order_confirm_summary_box_detail_shippingfee" class="order_confirm_summary_box_detail_shippingfee"></div>
                    </span>
                    <div id="order_confirm_summary_box_detail_tax_container" class="order_confirm_summary_box_detail_tax_container">Tax : 
                        <span id="order_confirm_summary_box_detail_tax" class="order_confirm_summary_box_detail_tax"></div>
                    </span>
                    <div id="order_confirm_summary_box_detail_shipping_discount" class="order_confirm_summary_box_detail_shipping_discount"></div>
                    <div id="order_confirm_summary_box_detail_coupon_discount" class="order_confirm_summary_box_detail_coupon_discount"></div>
                    <div id="order_confirm_summary_box_detail_order_total_container" class="order_confirm_summary_box_detail_order_total_container">Order Total : 
                        <span id="order_confirm_summary_box_detail_order_total" class="order_confirm_summary_box_detail_order_total"></div>
                    </span>

                </div>

                <div id="order_confirm_items_box" class="order_confirm_items_box">
                    <div id="order_confirm_items_page" class="order_confirm_items_page">
                    </div>
                </div>
            </div>

           
            
        </div>
    `;
    }

    setConfirmInfo(param) {
        

        document.getElementById('order_confirm_thanks_name').textContent = param.name;
        document.getElementById('order_confirm_thanks_order_no').textContent = param.order_number;
        document.getElementById('order_confirm_info_email').textContent = param.billing_email;

        document.getElementById('order_confirm_info_shipping_detail_address').textContent = param.shipping_address;
        document.getElementById('order_confirm_info_shipping_detail_recipient').textContent = param.recipient;
        document.getElementById('order_confirm_info_shipping_detail_email').textContent = param.email;
        document.getElementById('order_confirm_info_shipping_detail_phone').textContent = param.phone;

        document.getElementById('order_confirm_info_billing_box_detail_type').textContent = param.type;
        document.getElementById('order_confirm_info_billing_box_detail_ending4').textContent = param.ending4;
        document.getElementById('order_confirm_info_billing_box_detail_address').textContent = param.billing_address;
        document.getElementById('order_confirm_info_billing_box_detail_cardholder').textContent = param.cardholder;

        document.getElementById('order_confirm_summary_box_detail_subtotal').textContent = '$' + parseFloat(param.subtotal).toFixed(2);
        document.getElementById('order_confirm_summary_box_detail_shippingfee').textContent = '$' + parseFloat(param.shipping_fee).toFixed(2);
        
        document.getElementById('order_confirm_summary_box_detail_tax').textContent = '$' + parseFloat(param.tax).toFixed(2);
        document.getElementById('order_confirm_summary_box_detail_order_total').textContent = '$' + parseFloat(param.grandtotal).toFixed(2);
        console.log(param.paid_item);

        param.paid_item.forEach(element => {
            console.log(element);
            this.setItemImageContainer(element.prodnum, element.image, "order_confirm_summary_item");
        });

    }

    setItemImageContainer(prodnum, image_src, item_attribute) {
        const $item_image_container = document.createElement('div');
        $item_image_container.setAttribute('id', `${item_attribute}_pic_container`);
        $item_image_container.setAttribute('class', `${item_attribute}_pic_container order_confirm_summary_items`);
        $item_image_container.setAttribute('paid_image_itemid',`${prodnum}`);                    
        document.getElementById(`order_confirm_items_page`).appendChild($item_image_container);
        this.setItemImage(prodnum, image_src, item_attribute);

    }

    setItemImage(prodnum, image_src, item_attribute) {
        const $item_image = document.createElement('img');
        $item_image.setAttribute('class', `${item_attribute}_pic`);
        $item_image.setAttribute('src', image_src);        
        document.querySelector(`[paid_image_itemid="${prodnum}"]`).appendChild($item_image);
    }


}
