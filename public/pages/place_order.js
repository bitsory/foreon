import order_confirm from "./oder_confirm.js";

export default class {
    constructor(param) {
        document.title = "Cafe FORE";
        console.log("place order page");
        this.count = param;
        
        document.addEventListener('click',function(e){    
            if(e.target && e.target.className == 'proceed_order_btn') {
                console.log("order confirm action")
                const orderConfirm = new order_confirm();
                document.querySelector(".online_order").innerHTML = orderConfirm.getHtml();
                
                
            } if(e.target && e.target.className == 'cancel_proceed_order_btn') {
                window.history.back();
                
                
            }
        });

    }

    test() {
        console.log("place order.js");
    }

    proceedSelector() {
        this.$proceed_order_btn = document.querySelector('.proceed_order_btn');    
        this.$cancel_proceed_order_btn = document.querySelector('.cancel_proceed_order_btn');
    }

    proceedEventListener () {
        this.$proceed_order_btn.addEventListener('click', (event)=> {
            const orderConfirm = new order_confirm(order);
            document.querySelector(".online_order").innerHTML = orderConfirm.getHtml();
        });
        
        this.$cancel_proceed_order_btn.addEventListener('click', (event)=> {
            window.history.back();
        });


    }





    orderConfirm() {
        console.log("orderConfirm");
        window.location.href = "http://localhost:8080/shop/order_confirm.html"
    }






    getOrder() {
        this.test();

        return `
        
        <h2>Your Order</h2>
        Total ${this.count} Ginger Bottles
        <h3>$ ${this.count * 18.00}</h3>
        3 days delivery 

        <h2>Would you like proceed your order?</h2>

        <button class='proceed_order_btn'>GO FOR IT</button>
        <button class='cancel_proceed_order_btn'>No Thanks</button>
        
        `

    };
            
    





}
