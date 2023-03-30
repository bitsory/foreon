export default class {

    constructor() {

    }


    getHtml() {
        return `                
        <div id="order_confirm_container" class="order_confirm_container">
        <div id="order_confirm_thanks_box" class="order_confirm_thanks_box">
            <div id="order_confirm_thanks_contents" class="order_confirm_thanks_contents">
                THANK YOU FOR YOUR ORDER, <span id="order_confirm_thanks_name" class="order_confirm_thanks_name"></span>
            </div>
            <div id="order_confirm_thanks_detail" class="order_confirm_thanks_detail">
                Order Number : <span id="order_confirm_thanks_order_no" class="order_confirm_thanks_order_no"></span>
            </div>

        </div>

        <div id="order_confirm_info_box" class="order_confirm_info_box">
            <div id="order_confirm_info" class="order_confirm_info">
                Your Confirmation email will be sent to <span id="order_confirm_info_email" class="order_confirm_info_email"></span>
            </div>

            <div id="order_confirm_info_shipping_box" class="order_confirm_info_shipping_box">
                <div id="order_confirm_info_shipping_detail" class="order_confirm_info_shipping_detail">
                    <div id="order_confirm_info_shipping_detail_title" class="order_confirm_info_shipping_detail_title">Shipping Address & Method</div>
                    <div id="order_confirm_info_shipping_detail_address" class="order_confirm_info_shipping_detail_address"></div>
                    <div id="order_confirm_info_shipping_detail_recipient" class="order_confirm_info_shipping_detail_recipient"></div>
                    <div id="order_confirm_info_shipping_detail_email" class="order_confirm_info_shipping_detail_email"></div>
                    <div id="order_confirm_info_shipping_detail_phone" class="order_confirm_info_shipping_detail_phone"></div>



                </div>

            </div>

            <div id="order_confirm_info_billing_box" class="order_confirm_info_billing_box">
                <div id="order_confirm_info_billing_box_detail" class="order_confirm_info_billing_box_detail">
                    <div id="order_confirm_info_billing_box_detail_title" class="order_confirm_info_billing_box_detail_title">Payment Method</div>
                    <div id="order_confirm_info_billing_box_detail_type" class="order_confirm_info_billing_box_detail_type"></div>
                    ***************<span id="order_confirm_info_billing_box_detail_ending4" class="order_confirm_info_billing_box_detail_ending4"></span>
                    <div id="order_confirm_info_billing_box_detail_address_title" class="order_confirm_info_billing_box_detail_address_title">Billing Address</div>
                    <div id="order_confirm_info_billing_box_detail_address" class="order_confirm_info_billing_box_detail_address"></div>
                    <div id="order_confirm_info_billing_box_detail_cardholder" class="order_confirm_info_billing_box_detail_cardholder"></div>
                </div>
            </div>
        </div>

        <div id="order_confirm_summary_box" class="order_confirm_summary_box">
            <div id="order_confirm_summary_box_title" class="order_confirm_summary_box_title">Order Summary</div>
            <div id="order_confirm_summary_box_detail" class="order_confirm_summary_box_detail">
                <div id="order_confirm_summary_box_detail_subtotal" class="order_confirm_summary_box_detail_subtotal">$100</div>
                <div id="order_confirm_summary_box_detail_shippingfee" class="order_confirm_summary_box_detail_shippingfee"></div>
                <div id="order_confirm_summary_box_detail_tax" class="order_confirm_summary_box_detail_tax"></div>
                <div id="order_confirm_summary_box_detail_shipping_discount" class="order_confirm_summary_box_detail_shipping_discount"></div>
                <div id="order_confirm_summary_box_detail_coupon_discount" class="order_confirm_summary_box_detail_coupon_discount"></div>
                <div id="order_confirm_summary_box_detail_order_total" class="order_confirm_summary_box_detail_order_total"></div>

            </div>
        </div>
    </div>
    `;
    }

    setConfirmInfo(param) {
        document.getElementById('order_confirm_thanks_name').textContent = param.name;
        document.getElementById('order_confirm_thanks_order_no').textContent = param.order_number;
        document.getElementById('order_confirm_info_email').textContent = param.email;

        document.getElementById('order_confirm_info_shipping_detail_address').textContent = "order_confirm_info_shipping_detail_address";
        document.getElementById('order_confirm_info_shipping_detail_recipient').textContent = param.recipient;
        document.getElementById('order_confirm_info_shipping_detail_email').textContent = param.email;
        document.getElementById('order_confirm_info_shipping_detail_phone').textContent = param.phone;

        document.getElementById('order_confirm_info_billing_box_detail_type').textContent = param.type;
        document.getElementById('order_confirm_info_billing_box_detail_ending4').textContent = param.ending4;
        document.getElementById('order_confirm_info_billing_box_detail_address').textContent = param.billing_address;
        document.getElementById('order_confirm_info_billing_box_detail_cardholder').textContent = param.cardholder;

        document.getElementById('order_confirm_summary_box_detail_subtotal').textContent = param.subtotal;
        document.getElementById('order_confirm_summary_box_detail_tax').textContent = param.tax;
        document.getElementById('order_confirm_summary_box_detail_order_total').textContent = param.grandtotal;



    }


}
