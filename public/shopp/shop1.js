import place_order from "./place_order.js";

console.log("shop.js");

const $place_order_btn = document.querySelector('.place_order_btn');

const $order_quantity = document.getElementById('order_quantity')




$place_order_btn.addEventListener('click', ()=> {
    
    var order = $order_quantity.value;
    console.log(`order count = ${order}`);
    const placeOrder = new place_order(order);
    
    document.querySelector(".online_order").innerHTML = placeOrder.getHtml();
    placeOrder.proceedSelector();
    placeOrder.proceedEventListener();

});

// $q_plus.addEventListener('click', ()=> {
    
    
//     let number = $resultElement.innerText;
//     number = parseInt(number) + 1;
//     $resultElement.innerText = number;
// });

// $q_minus.addEventListener('click', ()=> {
    
    
    
   
//     let number = $resultElement.innerText;
//     if (parseInt(number)>0) number = parseInt(number) - 1;
//     $resultElement.innerText = number;
// });

