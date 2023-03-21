export default class {

    
    // check_out_items_container = document.querySelector('.check_out_items_container');
    online_main = document.getElementById('online_main');
    // user_checkout_submit_button_container = document.querySelector('.user_checkout_submit_button_container');

    constructor (user_id, item_attribute, check_out_cart) {
      
        this.setReadyCart(check_out_cart)
        // user_checkout_ready_cart = check_out_cart;

       


        this.online_main.addEventListener('click', (e) => {
            console.log("set item box click_test");
            console.log(e.target)
            console.log(user_id)
            console.log(check_out_cart);

            let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));

            if(e.target && (e.target.className) == `${item_attribute}_plus_quantity_btn`) {
                console.log(`${item_attribute}_plus_quantity_btn ${item_attribute}_plus_quantity_btn ${item_attribute}_plus_quantity_btn`)

                /////////////// rendering item subtotal /////////////////////////
                let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
        
                item_quantity_id.innerText = item_quantity + 1;        
        
                const item_new_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 
        
                const item_subtotal = parseFloat(item_new_quantity * item_price);
                document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
                // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));

                let new_grandtotal = 0;
                
                //////user cart add up
                if (user_id === 'GUEST') {
                
                    /////////////guest cart add up
                    console.log(`check_out_cart : ${check_out_cart}`);
                    console.log(`${check_out_cart}`);
                    check_out_cart.forEach(element => {
                        console.log('element');
                        console.log(element);
        
                        if (element.c_item_no === item_number) {
                            console.log(item_number)
                            element.c_item_quantity++;

                            tmp_cart.forEach(ele => {
                                console.log('ele');
                                console.log(ele);
                                ele.c_item_no === element.c_item_no ? ele.c_item_quantity++ : false;
                            })
                        }
                    })
        
                    sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));
                    sessionStorage.setItem("cart", JSON.stringify(tmp_cart));
                    // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                    // tmp_cart.forEach(element => {
                    //     if (element.c_item_no == check_out_cart.c_item_no) {
                    //         element.c_item_quantity++;
                    //     }
                    // })

                    console.log("sessionStorage.getItem(cart)");
                    console.log(sessionStorage.getItem("cart"));

                    /// rerendering total
                    console.log(`g_total : ${g_total}`)
                    const guest_new_grandtotal = g_total + item_price;
                    g_total = guest_new_grandtotal;
                    document.querySelector(`.${item_attribute}_grand_total`).innerText = '$' + guest_new_grandtotal.toFixed(2);
                    
                    const amount = document.querySelector('.payment_amount');
                    amount.value = parseFloat(g_total).toFixed(2);
                    this.setReadyCart(check_out_cart);
                
                } else {  /////////////////// user add up
                    let selected_number = check_out_cart.map(element => {
                        return element.prodnum;
                    })
                    console.log("selected_number");
                    console.log(selected_number);

                    let data = {
                        u_id : user_id,
                        item_num : item_number,
                        selected_num : selected_number

                    };
        
                    const options = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/item_addup_v2`, options)
                    
                    .then((res) => res.json())
                    .then(result => { 
                        
                        console.log(result)

                        result.forEach(element => {
                            new_grandtotal = new_grandtotal + element.price_sell * element.quantity;
                        })

                        document.querySelector(`.user_checkout_submit_summary_items_value`).innerText = '$$$' + new_grandtotal.toFixed(2);
                        this.rerenderTotal(new_grandtotal);
                        this.setReadyCart(result); 
                                  
                    })        
                }
                
            }
        
            if(e.target && (e.target.className) == `${item_attribute}_minus_quantity_btn`) { // item quantity subtract
                console.log("online_place_order_item_minus_quantity_btn");
                let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
                console.log(item_number);
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);

                let new_grandtotal = 0;
        
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                if (item_quantity > 1) {
                    item_quantity_id.innerHTML = item_quantity - 1;
                    const item_new_quantity = parseInt(item_quantity_id.innerText);
                    const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 
        
                    const item_subtotal = parseFloat(item_new_quantity * item_price);
                    document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
                    // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
        
                    if (user_id === 'GUEST') {
                    
                        /////////////guest cart subtract
                        console.log(`tmp_order_cart : ${check_out_cart}`);
                        check_out_cart.forEach(element => {
                            console.log(element);
        
                            if (element.c_item_no === item_number) {
                                console.log(item_number)
                                element.c_item_quantity--;

                                tmp_cart.forEach(ele => {
                                    ele.c_item_no == element.c_item_no ? ele.c_item_quantity-- : false;
                                })
                            }    
                        })
            
                        sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));
                        sessionStorage.setItem("cart", JSON.stringify(tmp_cart));

                        console.log(`g_total : ${g_total}`)
                        const guest_new_grandtotal = g_total - item_price;
                        g_total = guest_new_grandtotal;
                        document.querySelector(`.${item_attribute}_grand_total`).innerText = '$' + guest_new_grandtotal.toFixed(2);
                    
                        const amount = document.querySelector('.payment_amount');
                        amount.value = parseFloat(g_total).toFixed(2);
                        this.setReadyCart(check_out_cart);

                    } else {
                        let selected_number = check_out_cart.map(element => {
                            return element.prodnum;
                        })
                        console.log("selected_number");
                        console.log(selected_number);
    
                        let data = {
                            u_id : user_id,
                            item_num : item_number,
                            selected_num : selected_number
    
                        };
            
                        const options = {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        };
                        console.log(data);
            
                        fetch(`/item_subtract_v2`, options)
                        
                        .then((res) => res.json())
                        .then(result => { 
                            
                            console.log(result)
    
                            result.forEach(element => {
                                new_grandtotal = new_grandtotal + element.price_sell * element.quantity;
                            })
    
                            document.querySelector(`.user_checkout_submit_summary_items_value`).innerText = '$$$' + new_grandtotal.toFixed(2);
                            this.rerenderTotal(new_grandtotal);    
                            this.setReadyCart(result);                     
                        })        
                    }
                    
                }
                
            }
        
            if(e.target && (e.target.className) == `${item_attribute}_delete_btn`) { // item delete
                // console.log("online_place_order_item_delete_btn");
                let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
                console.log(item_number);
                let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 
                // let item_number = (e.target.className).slice(-1);
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
                const delete_item_subtotal = parseFloat(item_quantity * item_price);
                const delete_item = document.querySelector(`[itemid="${item_number}"]`);
                console.log(delete_item);
                let test = document.getElementById(`${item_attribute}s_container`);
                console.log(test);
                
                document.getElementById(`${item_attribute}s_container`).removeChild(delete_item);

                let new_grandtotal = 0;
        
                if (user_id === 'GUEST') {            
                    /////////////item delete in guest cart 
                    console.log(`tmp_order_cart : ${tmp_order_cart}`);            
        
                    let filtered = check_out_cart.filter((element) => element.c_item_no !== item_number);
        
                    console.log(filtered);
                    console.log(check_out_cart)
                    check_out_cart = filtered;
        
                    sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));

                    let tmp_cart_filtered = tmp_cart.filter(element => {
                        console.log("delete element")
                        console.log(element)
                        return element.c_item_no !== item_number;
                    });

                    console.log(tmp_cart_filtered)

                    sessionStorage.setItem("cart", JSON.stringify(tmp_cart_filtered));

                    const guest_new_grandtotal = g_total - delete_item_subtotal;
                    g_total = guest_new_grandtotal;
                    document.querySelector(`.${item_attribute}_grand_total`).innerText = '$' + guest_new_grandtotal.toFixed(2);
                    
                    const amount = document.querySelector('.payment_amount');
                    amount.value = parseFloat(g_total).toFixed(2);
                    this.setReadyCart(check_out_cart);

                } else {
                    ///// item delete in user cart 
                    let selected_number = check_out_cart.map(element => {
                        return element.prodnum;
                    })
                    console.log("selected_number");
                    console.log(selected_number);

                    let data = {
                        u_id : user_id,
                        item_num : item_number,
                        selected_num : selected_number

                    };
        
                    const options = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/item_delete_v2`, options)
                    
                    .then((res) => res.json())
                    .then(result => {                         
                        console.log(result)
                        result.forEach(element => {
                            new_grandtotal = new_grandtotal + element.price_sell * element.quantity;
                        })
                        document.querySelector(`.user_checkout_submit_summary_items_value`).innerText = '$$$' + new_grandtotal.toFixed(2);
                        this.rerenderTotal(new_grandtotal);  
                        this.setReadyCart(result);               
                    })
                }
                
            }
        });
    }

    ////////////////////////end of constructor
    ///////////////////////////////////////////////////////////////////////////////////////////////


    setItemContainer(prodnum, price, name, quantity, image, parent_element_id, item_attribute) {
        const item_container = document.createElement('div');
        item_container.setAttribute('id', `${item_attribute}_container`);
        item_container.setAttribute('class', `${item_attribute}_container`);
        item_container.setAttribute('itemid', `${prodnum}`);

        document.getElementById(parent_element_id).appendChild(item_container);
            
        // this.setItemCheckBtn(prodnum);
        this.setItemImageContainer(prodnum, image, item_attribute);
        this.setItemContentContainer(prodnum, price, name, quantity, item_attribute);
        
    }


    setItemCheckBtn(prodnum) {
        const orderItemCheckBtn = document.createElement('input');
        orderItemCheckBtn.setAttribute('type', `checkbox`);
        orderItemCheckBtn.setAttribute('id', `online_place_order_item_check_btn`);     
        orderItemCheckBtn.setAttribute('class', `online_place_order_item_check_btn`);
        orderItemCheckBtn.setAttribute('name', `online_place_order_item_check_btn`);
        orderItemCheckBtn.setAttribute('checked_itemid', `${prodnum}`);     
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemCheckBtn);
        orderItemCheckBtn.checked = true;
    }

    setItemContentContainer(prodnum, price, name, quantity, item_attribute) {
        const item_Content_Container = document.createElement('div');
        item_Content_Container.setAttribute('class', `${item_attribute}_content`);
        item_Content_Container.setAttribute('contents-data-itemid',`${prodnum}`);
        document.querySelector(`[itemid="${prodnum}"]`).appendChild(item_Content_Container);
        this.setItemName(prodnum, name, item_attribute)
        this.setItemDelete(prodnum, item_attribute)
        this.setItemPrice(prodnum, price, item_attribute)
        this.setMinusQuantity(prodnum, item_attribute)
        this.setItemQuantity(prodnum, quantity, item_attribute)
        this.setPlusQuantity(prodnum, item_attribute)
        this.getSubTotal(prodnum, item_attribute)

        

    }



    setItemImageContainer(prodnum, image_src, item_attribute) {
        const $item_image_container = document.createElement('div');
        $item_image_container.setAttribute('class', `${item_attribute}_pic_container`);
        $item_image_container.setAttribute('image-itemid',`${prodnum}`);                    
        document.querySelector(`[itemid="${prodnum}"]`).appendChild($item_image_container);
        
        this.setItemLink(prodnum, image_src, item_attribute);
        
        // setItemName(prodnum, item_name);
        // setItemPrice(prodnum, item_price);
        
    }



    setItemLink(prodnum, image_src, item_attribute) {
        const $item_link = document.createElement('a');
        $item_link.setAttribute('class', `${item_attribute}_link`);  
        $item_link.setAttribute('link-data-itemid', `${prodnum}`);  
        // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
        document.querySelector(`[image-itemid="${prodnum}"]`).appendChild($item_link);
        
        this.setItemImage(prodnum, image_src, item_attribute);
        // setItemPrice(prodnum, item_price);
        // setItemName(prodnum, item_name);
        
        
    }

    setItemImage(prodnum, image_src, item_attribute) {
        const $item_image = document.createElement('img');
        $item_image.setAttribute('class', `${item_attribute}_pic`);
        $item_image.setAttribute('src', image_src);
        document.querySelector(`[link-data-itemid="${prodnum}"]`).appendChild($item_image);
    }

    // setOrderItemNumber(prodnum) {
    //     const orderItemNumber = document.createElement('div');
    //     orderItemNumber.setAttribute('class', `online_place_order_item_number`);
    //     document.querySelector(`.online_place_order_item_contatiner.o${prodnum}`).appendChild(orderItemNumber);
    //     document.querySelector(`.online_place_order_item_number.o${prodnum}`).innerText = prodnum;
    // }

    setItemName(prodnum, item_name, item_attribute) {
        const $item_name = document.createElement('div');
        $item_name.setAttribute('class', `${item_attribute}_name`);
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild($item_name);
        $item_name.innerText = item_name;
    }

    setItemPrice(prodnum, item_price, item_attribute) {
        const $item_price = document.createElement('div');
        $item_price.setAttribute('class', `${item_attribute}_price`);
        $item_price.setAttribute('price-itemid',`${prodnum}`);    
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild($item_price);
        $item_price.innerText = '$'+item_price;
    }

    setItemQuantity(prodnum, item_quantity, item_attribute) {
        const $item_quantity = document.createElement('div');
        $item_quantity.setAttribute('class', `${item_attribute}_quantity`);
        $item_quantity.setAttribute('quantity-itemid',`${prodnum}`);   
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild($item_quantity);    
        $item_quantity.innerText = item_quantity;
    
    }

    setPlusQuantity(prodnum, item_attribute) {
        const plus_quantity_btn = document.createElement('button');
        plus_quantity_btn.setAttribute('class', `${item_attribute}_plus_quantity_btn`);
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(plus_quantity_btn);
        plus_quantity_btn.innerText = '+'; 
    }

    setMinusQuantity(prodnum, item_attribute) {
        const minus_quantity_btn = document.createElement('button');
        minus_quantity_btn.setAttribute('class', `${item_attribute}_minus_quantity_btn`);
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(minus_quantity_btn);
        minus_quantity_btn.innerText = '-';
    }

    setItemDelete(prodnum, item_attribute) {
        const item_deleteb_tn = document.createElement('button');
        item_deleteb_tn.setAttribute('class', `${item_attribute}_delete_btn`);
        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(item_deleteb_tn);
        item_deleteb_tn.innerText = 'X';
    }

    getSubTotal(prodnum, item_attribute) {
        const $item_subtotal = document.createElement('div');
        $item_subtotal.setAttribute('class', `${item_attribute}_subtotal`);
        $item_subtotal.setAttribute('subtotal-itemid', `${prodnum}`);
        const item_quantity = parseInt(document.querySelector(`[quantity-itemid="${prodnum}"]`).innerText);
        const item_price = parseFloat(document.querySelector(`[price-itemid="${prodnum}"]`).innerText.slice(1)); 

        const item_subtotal = parseFloat(item_quantity * item_price); 
        // console.log(item_quantity);
        // console.log(item_price);
        // console.log(item_subtotal);

        document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild($item_subtotal);
        $item_subtotal.innerText = '$' +item_subtotal.toFixed(2);

    }

    getGrandTotal(amount, item_attribute) {
        const $item_grandtotal = document.createElement('div');
        $item_grandtotal.setAttribute('class', `${item_attribute}_grand_total`);

        // const item_orderGrandTotal = 1000;
        // const item_orderGrandTotal = parseFloat(document.querySelector(`.online_place_order_item_subtotal.o${}`).innerTextslice(1));
        document.getElementById(`check_out_item_grand_total`).appendChild($item_grandtotal);
        document.querySelector(`.check_out_item_grand_total`).innerText = 'Total $' + amount.toFixed(2);
        
    }

    setTotal(total) {

        g_total = total;

    } 

    rerenderTotal(user_total_amount) {

        let shipping_fee = 7.5;
        let total_before_tax = user_total_amount + shipping_fee;
        let estimated_tax = (total_before_tax)* 0.06;
        let order_total = total_before_tax + estimated_tax;
        
        document.querySelector('.user_checkout_submit_summary_items_value').innerText = user_total_amount.toFixed(2);
        document.querySelector('.user_checkout_submit_summary_shipping_value').innerText = shipping_fee.toFixed(2);  
        document.querySelector('.user_checkout_submit_summary_before_tax_value').innerText = total_before_tax.toFixed(2);                       
        document.querySelector('.user_checkout_submit_summary_Estimated_tax_value').innerText = estimated_tax.toFixed(2);
        document.querySelector('.user_checkout_submit_summary_order_total_value').innerText = order_total.toFixed(2);

    }

    setReadyCart(cart) {
        user_checkout_ready_cart = cart;
    }

    getReadyCart() {
        // let ready_cart_test = this.ready_cart;
        return user_checkout_ready_cart;

    }
}

let g_total = 0;
let tmp_order_cart = {};
let user_checkout_ready_cart = [];


