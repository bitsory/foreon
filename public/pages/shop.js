import place_order from "./place_order.js";
import cart from "./cart.js";

export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("shop page");

        const n_cart = new cart();
       
        this.user_info = n_cart.getCookie(document.cookie);        
      
        console.log(`user_info : ${this.user_info}`);        

        document.addEventListener('click',function(e){    
            if(e.target && e.target.className == 'place_order_btn') {
                console.log(" place_order_btn exit");
                var order = document.getElementById('order_quantity').value;
                console.log(`order count = ${order}`);
                const placeOrder = new place_order(order);
                document.querySelector(".online_order").innerHTML = placeOrder.getOrder();
                
                
            } 
        });

        
        
    }

    
    


    
    

    
    async getHtml() {
        
        return `
            
        <h1>Cafe FORE Online Shop</h1>
        We focus on only one item for the best quality and satisfy.
        <div class="online_order">
            <div class="online_items">
                <div class="online_item_pic">
                    <img src="../images/g_bt.png">
                </div>
                <div class="online_item_name">
                    Ginger Bottle 16 oz.
                </div>
                <div class="online_item_price">
                    $18.00
                </div>
                <div class="online_item_decription">
                    100% Handmade Squeezed Ginger Juice<br>
                    
                </div>
                <div class="online_item_quantity"> 
                    <select name="Choose Your Quantity" id="order_quantity">
                        <option value="0">Choose Your Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <button class="add_cart_btn">Add Cart</button>
                <button class="place_order_btn">Place Order</button>
            </div>
        </div>
    </div> 
                          
        `;
    }
}
