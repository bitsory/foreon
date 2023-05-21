import * as ItemCounter from "./item_counter.js";

export default class {
    
    cart_modal_container = document.getElementById('cart_modal_container');

    guest_items_subtotal = 0;
    user_items_subtotal = 0;
    pages = 0;
    positionValue = 0;
    checkout_items = 0;
    guest_item_total_weight = 0;
    user_item_total_weight = 0;
    user_shipping_info = {};

 
    shipping_rate_flag = false;

    cart_modal_items = {};
    
    
    constructor (user_id, item_attribute, check_out_cart) {
        
        this.cart_modal_items = check_out_cart;
        this.setReadyCart(check_out_cart);
        this.setCheckoutItemscount(check_out_cart.length);
   
        this.cart_modal_container.addEventListener('click', (e) => {
            console.log("set item box click_test");
            console.log(e.target)
            console.log(user_id)
            console.log(check_out_cart);
            
            let IMAGE_WIDTH = 0;//한번 이동 시 IMAGE_WIDTH만큼 이동한다. // once move size

            if (matchMedia("screen and (max-width: 600px)").matches) {
                IMAGE_WIDTH = 300;
                // under 600px 
            } else if (matchMedia("screen and (max-width: 768px)").matches) {
                IMAGE_WIDTH = 350;
              
            } else {
                IMAGE_WIDTH = 400;
                // over 600px 
            }

            
                        
            const backBtn = document.getElementById("cart_modal_items_back_btn");
            const nextBtn = document.getElementById("cart_modal_items_next_btn");
            const images = document.getElementById("cart_modal_items_container");
            const go_cart_page_btn = document.getElementById("go_cart_page_btn");
            let path_name = location.pathname; 

            if (e.target && e.target.id == 'cart_modal_items_back_btn') {
                console.log('this.positionValue before')
                console.log(this.positionValue)
                console.log(this.pages)
                console.log(this.checkout_items)
                
                if (this.pages > 0) {
                    
                    nextBtn.removeAttribute('disabled')
                    this.positionValue += IMAGE_WIDTH;
                    images.style.transform = `translateX(${this.positionValue}px)`;
                    this.pages -= 1; //이전 페이지로 이동해서 pages를 1감소 시킨다. // decrease page count 1 that moving back page
                    console.log('this.positionValue after')
                    console.log(this.positionValue)
                }
                if (this.pages === 0) {
                backBtn.setAttribute('disabled', 'true');
                
                }
            }

            if (e.target && e.target.id == 'cart_modal_items_next_btn') {
                console.log('this.positionValue before')
                console.log(this.positionValue)
                console.log(this.pages)
                console.log(this.checkout_items)
                
                if (this.pages < this.checkout_items -1) {
                    
                    backBtn.removeAttribute('disabled');
                    this.positionValue -= IMAGE_WIDTH;
                    images.style.transform = `translateX(${this.positionValue}px)`;
                      
                    this.pages += 1; 
                    console.log('this.positionValue after')
                    console.log(this.positionValue)
                }
                if (this.pages == this.checkout_items -1) { //
                nextBtn.setAttribute('disabled', 'true');
                // go_cart_page_btn.setAttribute('disabled', 'false');
                }
            }

            
            // check_out_items_container _plus_quantity_btn
            if(e.target && (e.target.id) == `${item_attribute}_plus_quantity_btn`) {
                console.log(`${item_attribute}_plus_quantity_btn ${item_attribute}_plus_quantity_btn ${item_attribute}_plus_quantity_btn`)
                let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                console.log('tmp_cart')
                console.log(tmp_cart)
                /////////////// rendering item subtotal /////////////////////////
                let item_number = e.target.parentElement.getAttribute('cart_modal_quantity_box_itemid');
                let item_quantity_id = document.querySelector(`[cart_modal_quantity_itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
                
                item_quantity_id.innerText = item_quantity + 1;        
        
                const item_new_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[cart_modal_price_itemid="${item_number}"]`).innerText.slice(1)); 
        
                const item_subtotal = parseFloat(item_new_quantity * item_price);
                document.querySelector(`[cart_modal_subtotal_itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
                // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                let item_weight = 0;
                let new_grandtotal = 0;

                // let path_name = location.pathname; 

                // cart or order page reflect
                if ((path_name.substring(0, 10) == '/shop/cart') || (path_name.substring(0, 11) == '/shop/order')) {
                    let cart_page_item_number = item_number;
                    let item_quantity_id = document.querySelector(`[quantity-itemid="${cart_page_item_number}"]`);
                    let item_quantity = parseInt(item_quantity_id.innerText);
            
                    item_quantity_id.innerText = item_quantity + 1;        
            
                    const item_new_quantity = parseInt(item_quantity_id.innerText);
                    const item_price = parseFloat(document.querySelector(`[price-itemid="${cart_page_item_number}"]`).textContent); 
            
                    const item_subtotal = parseFloat(item_new_quantity * item_price);
                    document.querySelector(`[subtotal-itemid="${cart_page_item_number}"]`).innerText = `Item Total : $${item_subtotal.toFixed(2)}`;
                }

                
                const data = {                    
                    prodnum : item_number                    
                };
    
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                };
                console.log(data);
    
                fetch(`/get_item_info`, options)
                
                .then((res) => res.json())
                .then(result => { 
                    console.log(result);
                    item_weight = result[0].weight;
                
                //////user cart add up
                    if (user_id == 'GUEST') {                    
                        /////////////guest cart add up
                        console.log(`this.cart_modal_items`);
                        console.log(this.cart_modal_items);
                        this.cart_modal_items.forEach(element => {                     
            
                            if (element.c_item_no == item_number) {
                                // console.log(item_number)
                                element.c_item_quantity++;
                                tmp_cart.forEach(ele => {                               
                                    ele.c_item_no == element.c_item_no ? ele.c_item_quantity++ : false;
                                })
                            }
                        })
            
                        // sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));
                        sessionStorage.setItem("cart", JSON.stringify(tmp_cart));
                                             
                    
                    } else {  /////////////////// user add up
                        let selected_number = check_out_cart.map(element => {
                            return element.prodnum;
                        })
                        const new_item_total_weight = this.user_item_total_weight + item_weight;
                        this.setItemTotalWeight(user_id, new_item_total_weight);

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

                        })        
                    }
                })
                    
            }
        
            if(e.target && (e.target.id) == `${item_attribute}_minus_quantity_btn`) { // item quantity subtract
                console.log("online_place_order_item_minus_quantity_btn");
                let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                let item_number = e.target.parentElement.getAttribute('cart_modal_quantity_box_itemid');
                console.log(item_number);
                let item_quantity_id = document.querySelector(`[cart_modal_quantity_itemid="${item_number}"]`);
                let item_quantity = parseInt(item_quantity_id.innerText);
                let item_weight = 0;

                let new_grandtotal = 0;

                
        
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                if (item_quantity > 1) {
                    item_quantity_id.innerHTML = item_quantity - 1;
                    const item_new_quantity = parseInt(item_quantity_id.innerText);
                    const item_price = parseFloat(document.querySelector(`[cart_modal_price_itemid="${item_number}"]`).innerText.slice(1)); 
        
                    const item_subtotal = parseFloat(item_new_quantity * item_price);
                    document.querySelector(`[cart_modal_subtotal_itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
                    
                    if ((path_name.substring(0, 10) == '/shop/cart') || (path_name.substring(0, 11) == '/shop/order')) {
                        let cart_page_item_number = item_number;
                        let item_quantity_id = document.querySelector(`[quantity-itemid="${cart_page_item_number}"]`);
                        let item_quantity = parseInt(item_quantity_id.innerText);
                
                        item_quantity_id.innerText = item_quantity - 1;        
                
                        const item_new_quantity = parseInt(item_quantity_id.innerText);
                        const item_price = parseFloat(document.querySelector(`[price-itemid="${cart_page_item_number}"]`).textContent); 
                
                        const item_subtotal = parseFloat(item_new_quantity * item_price);
                        document.querySelector(`[subtotal-itemid="${cart_page_item_number}"]`).innerText = `Item Total : $${item_subtotal.toFixed(2)}`;
                    }

                    if (path_name.substring(0, 20) == '/shop/checkout/GUEST' || path_name.substring(0, 21)== '/shop/checkout/member') {
                        let checkout_page_item_number = item_number;
                        let item_quantity_id = document.querySelector(`[quantity-itemid="${checkout_page_item_number}"]`);
                        let item_quantity = parseInt(item_quantity_id.innerText);
                        
                        item_quantity_id.innerText = item_quantity - 1;        
                
                        const item_new_quantity = parseInt(item_quantity_id.innerText);
                        const item_price = parseFloat(document.querySelector(`[price-itemid="${checkout_page_item_number}"]`).innerText.slice(1)); 
                
                        const item_subtotal = parseFloat(item_new_quantity * item_price);
                        document.querySelector(`[subtotal-itemid="${checkout_page_item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
    
    
                    }

                    const data = {
                        // u_id : user_id,
                        prodnum : item_number,
                        // selected_num : selected_number
                    };
        
                    const options = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    };
                    console.log(data);
        
                    fetch(`/get_item_info`, options)
                    
                    .then((res) => res.json())
                    .then(result => { 
                        console.log(result);
                        item_weight = result[0].weight;
                        // let tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
        
                        if (user_id == 'GUEST') {
                        
                            /////////////guest cart subtract
                            // console.log(`tmp_order_cart : ${check_out_cart}`);
                            this.cart_modal_items.forEach(element => {
                                console.log(element);
            
                                if (element.c_item_no == item_number) {
                                    console.log(item_number)
                                    element.c_item_quantity--;

                                    tmp_cart.forEach(ele => {
                                        ele.c_item_no == element.c_item_no ? ele.c_item_quantity-- : false;
                                    })
                                }    
                            })
                
                            
                            sessionStorage.setItem("cart", JSON.stringify(tmp_cart));                       

                        } else {  ///////////////////  user 
                            let selected_number = check_out_cart.map(element => {
                                return element.prodnum;
                            })
                            const new_item_total_weight = this.user_item_total_weight - item_weight;
                            this.setItemTotalWeight(user_id, new_item_total_weight);

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
                            })        
                        }
                    });
                    
                }
                
            }
        
            if(e.target && (e.target.id) == `${item_attribute}_delete_btn`) { // item delete
                // console.log("online_place_order_item_delete_btn");
                const tmp_cart = JSON.parse(sessionStorage.getItem("cart"));
                const item_number = e.target.parentElement.getAttribute('cart_modal_name_box_itemid');
                console.log(item_number);
                const item_quantity_id = document.querySelector(`[cart_modal_quantity_itemid="${item_number}"]`);
                const item_quantity = parseInt(item_quantity_id.innerText);
                const item_price = parseFloat(document.querySelector(`[cart_modal_price_itemid="${item_number}"]`).innerText.slice(1)); 
                // let item_number = (e.target.className).slice(-1);
                // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
                const delete_item_subtotal = parseFloat(item_quantity * item_price);
                const delete_item = document.querySelector(`[cart_modal_itemid="${item_number}"]`);
                console.log(delete_item);
                let test = document.getElementById(`${item_attribute}s_container`);
                console.log(test);
                
                document.getElementById(`${item_attribute}s_container`).removeChild(delete_item);
               
                if ((path_name.substring(0, 10) == '/shop/cart') || (path_name.substring(0, 11) == '/shop/order')) {
                    let cart_page_item_number = item_number;
                    console.log(item_number);
                    let item_quantity_id = document.querySelector(`[quantity-itemid="${cart_page_item_number}"]`);
                    let item_quantity = parseInt(item_quantity_id.innerText);
                    const item_price = parseFloat(document.querySelector(`[price-itemid="${cart_page_item_number}"]`).textContent); 
                    // let item_number = (e.target.className).slice(-1);
                    // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
                    // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
                    const delete_item_subtotal = parseFloat(item_quantity * item_price);
                    const delete_item = document.querySelector(`[itemid="${cart_page_item_number}"]`);
                    console.log(delete_item);
                    document.getElementById('online_place_order_item_container').removeChild(delete_item);
                }

                const data = {
                    // u_id : user_id,
                    prodnum : item_number,
                    // selected_num : selected_number
                };
    
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                };
                console.log(data);
    
                fetch(`/get_item_info`, options)
                
                .then((res) => res.json())
                .then(result => { 
                    console.log(result);
                    
        
                    if (user_id == 'GUEST') {            
                        /////////////item delete in guest cart 
                        // console.log(`tmp_order_cart : ${tmp_order_cart}`);            
            
                        let filtered = this.cart_modal_items.filter((element) => element.c_item_no != item_number);
                        // item_weight = result[0].weight * item_quantity;
                        console.log(filtered);
                        console.log(this.cart_modal_items)
                        this.cart_modal_items = filtered;
            
                        // sessionStorage.setItem("checkoutcart", JSON.stringify(check_out_cart));

                        let tmp_cart_filtered = tmp_cart.filter(element => {
                            console.log("delete element")
                            console.log(element)
                            return element.c_item_no != item_number;
                        });

                        console.log(tmp_cart_filtered)

                        sessionStorage.setItem("cart", JSON.stringify(tmp_cart_filtered));


                        this.setCheckoutItemscount(tmp_cart_filtered.length);   
                        this.setCartModalItems(tmp_cart_filtered);                               

                        if (this.pages != 0){
                            console.log("this.pages != 0")
                          
                            this.positionValue += IMAGE_WIDTH;
                            images.style.transform = `translateX(${this.positionValue}px)`;
                            this.pages -= 1;
                        } else if (this.pages == 0 && this.checkout_items -1 == 0) {    
                            console.log("this.pages == 0 && this.checkout_items -1 == 0")
                                                                       
                            nextBtn.setAttribute('disabled', 'true');                            
                        }
                        ItemCounter.item_counter(user_id);

                    } else {
                        ///// item delete in user cart 
                        
                        let selected_number_list = check_out_cart.map(element => {
                            return element.prodnum;
                        })
                        console.log("selected_number_list");
                        console.log(selected_number_list);

                        let data = {
                            u_id : user_id,
                            item_num : item_number,
                            selected_num : selected_number_list

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

                            this.setCheckoutItemscount(result.length);
                           
                            if (this.pages != 0){
                                console.log("this.pages != 0")
                                
                                this.positionValue += IMAGE_WIDTH;
                                images.style.transform = `translateX(${this.positionValue}px)`;
                                this.pages -= 1;
                            } else if (this.pages == 0 && this.checkout_items -1 == 0) {    
                                console.log("this.pages == 0 && this.checkout_items -1 == 0")
                                                                     
                                nextBtn.setAttribute('disabled', 'true');                            
                            }
                            ItemCounter.item_counter(user_id);

                        })
                    }
                });
            }
        });
    }


    
    ////////////////////////end of constructor
    ///////////////////////////////////////////////////////////////////////////////////////////////


    
    setUserShippingInfo(param) {
        this.user_shipping_info = param;
        console.log(this.user_shipping_info)
    }

    setCheckoutItemscount(items) {
        this.checkout_items = items;
    }

    setItemContainer(prodnum, price, name, quantity, image, parent_element_id, item_attribute) {
        const item_container = document.createElement('div');
        item_container.setAttribute('id', `${item_attribute}_container`);
        item_container.setAttribute('class', `${item_attribute}_container`);
        item_container.setAttribute('cart_modal_itemid', `${prodnum}`);

        document.getElementById(parent_element_id).appendChild(item_container);
        this.setItemBox(prodnum, price, name, quantity, image, item_attribute);   
        // this.setItemCheckBtn(prodnum);
        // this.setItemImageContainer(prodnum, image, item_attribute);
        // this.setItemContentContainer(prodnum, price, name, quantity, item_attribute);
        
    }

    setItemBox(prodnum, price, name, quantity, image, item_attribute) {
        const item_box = document.createElement('div');
        item_box.setAttribute('id', `${item_attribute}_box`);
        item_box.setAttribute('class', `${item_attribute}_box`);
        item_box.setAttribute('cart_modal_box_itemid', `${prodnum}`);
        document.querySelector(`[cart_modal_itemid="${prodnum}"]`).appendChild(item_box);
        this.setItemImageContainer(prodnum, image, item_attribute);
        this.setItemContentContainer(prodnum, price, name, quantity, item_attribute);
    }


    // setItemCheckBtn(prodnum) {
    //     const orderItemCheckBtn = document.createElement('input');
    //     orderItemCheckBtn.setAttribute('type', `checkbox`);
    //     orderItemCheckBtn.setAttribute('id', `online_place_order_item_check_btn`);     
    //     orderItemCheckBtn.setAttribute('class', `online_place_order_item_check_btn`);
    //     orderItemCheckBtn.setAttribute('name', `online_place_order_item_check_btn`);
    //     orderItemCheckBtn.setAttribute('checked_itemid', `${prodnum}`);     
    //     document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemCheckBtn);
    //     orderItemCheckBtn.checked = true;
    // }

    setItemContentContainer(prodnum, price, name, quantity, item_attribute) {
        const item_Content_Container = document.createElement('div');
        item_Content_Container.setAttribute('class', `${item_attribute}_content`);
        item_Content_Container.setAttribute('cart_modal_contents_data_itemid',`${prodnum}`);
        document.querySelector(`[cart_modal_box_itemid="${prodnum}"]`).appendChild(item_Content_Container);
        this.setItemNameBox(prodnum, name, item_attribute);
        // this.setItemName(prodnum, name, item_attribute);
        // this.setItemDelete(prodnum, item_attribute);
        this.setItemPriceBox(prodnum, price, quantity, item_attribute);

        // this.setItemPrice(prodnum, price, item_attribute);

        // this.setItemQuantityControlBox(prodnum, quantity, item_attribute)
        // this.setMinusQuantity(prodnum, item_attribute);
        // this.setItemQuantity(prodnum, quantity, item_attribute);
        // this.setPlusQuantity(prodnum, item_attribute);

        // this.getSubTotal(prodnum, item_attribute);

    }



    setItemImageContainer(prodnum, image_src, item_attribute) {
        const $item_image_container = document.createElement('div');
        $item_image_container.setAttribute('class', `${item_attribute}_pic_container`);
        $item_image_container.setAttribute('cart_modal_image_itemid',`${prodnum}`);                    
        document.querySelector(`[cart_modal_box_itemid="${prodnum}"]`).appendChild($item_image_container);
        
        this.setItemLink(prodnum, image_src, item_attribute);
        
        // setItemName(prodnum, item_name);
        // setItemPrice(prodnum, item_price);
        
    }



    setItemLink(prodnum, image_src, item_attribute) {
        const $item_link = document.createElement('a');
        $item_link.setAttribute('class', `${item_attribute}_link`);  
        $item_link.setAttribute('cart_modal_link_data_itemid', `${prodnum}`);  
        $item_link.setAttribute('href', '/shop/view/item/' + prodnum);
        document.querySelector(`[cart_modal_image_itemid="${prodnum}"]`).appendChild($item_link);
        
        this.setItemImage(prodnum, image_src, item_attribute);
        // setItemPrice(prodnum, item_price);
        // setItemName(prodnum, item_name);
        
        
    }

    setItemImage(prodnum, image_src, item_attribute) {
        const $item_image = document.createElement('img');
        $item_image.setAttribute('class', `${item_attribute}_pic`);
        $item_image.setAttribute('src', image_src);
        document.querySelector(`[cart_modal_link_data_itemid="${prodnum}"]`).appendChild($item_image);
    }

    // setOrderItemNumber(prodnum) {
    //     const orderItemNumber = document.createElement('div');
    //     orderItemNumber.setAttribute('class', `online_place_order_item_number`);
    //     document.querySelector(`.online_place_order_item_contatiner.o${prodnum}`).appendChild(orderItemNumber);
    //     document.querySelector(`.online_place_order_item_number.o${prodnum}`).innerText = prodnum;
    // }
    setItemNameBox(prodnum, item_name, item_attribute) {
        const $item_name_box = document.createElement('div');
        $item_name_box.setAttribute('id', `${item_attribute}_name_box`);
        $item_name_box.setAttribute('class', `${item_attribute}_name_box cart_modal_item_name_box`);
        $item_name_box.setAttribute('cart_modal_name_box_itemid',`${prodnum}`); 
        document.querySelector(`[cart_modal_contents_data_itemid="${prodnum}"]`).appendChild($item_name_box);
        // this.setItemName(prodnum, item_name, item_attribute);
        this.setItemNameLink(prodnum, item_name, item_attribute)
        this.setItemDelete(prodnum, item_attribute);
    }

    setItemNameLink(prodnum, item_name, item_attribute) {
        const $item_name_link = document.createElement('a');
        $item_name_link.setAttribute('class', `${item_attribute}_link`);  
        $item_name_link.setAttribute('cart_modal_link_name_itemid', `${prodnum}`);  
        $item_name_link.setAttribute('href', '/shop/view/item/' + prodnum);
        document.querySelector(`[cart_modal_name_box_itemid="${prodnum}"]`).appendChild($item_name_link);
        
        this.setItemName(prodnum, item_name, item_attribute);
        // setItemPrice(prodnum, item_price);
        // setItemName(prodnum, item_name);
        
        
    }

    setItemName(prodnum, item_name, item_attribute) {
        const $item_name = document.createElement('div');
        $item_name.setAttribute('id', `${item_attribute}_name`);
        $item_name.setAttribute('class', `${item_attribute}_name`);
        document.querySelector(`[cart_modal_link_name_itemid="${prodnum}"]`).appendChild($item_name);
        $item_name.innerText = item_name;
    }

    setItemPriceBox(prodnum, item_price, item_quantity, item_attribute) {
        const $item_price_box = document.createElement('div');
        $item_price_box.setAttribute('id', `${item_attribute}_item_price_box`);
        $item_price_box.setAttribute('class', `${item_attribute}_item_price_box cart_modal_item_price_box`);
        $item_price_box.setAttribute('cart_modal_price_box_itemid',`${prodnum}`); 
        document.querySelector(`[cart_modal_contents_data_itemid="${prodnum}"]`).appendChild($item_price_box);
        this.setItemPrice(prodnum, item_price, item_attribute);
        this.setItemQuantityControlBox(prodnum, item_quantity, item_attribute);
        this.getSubTotal(prodnum, item_attribute);


    }

    setItemPrice(prodnum, item_price, item_attribute) {
        const $item_price = document.createElement('div');
        $item_price.setAttribute('id', `${item_attribute}_price`);
        $item_price.setAttribute('class', `${item_attribute}_price`);
        $item_price.setAttribute('cart_modal_price_itemid',`${prodnum}`);    
        document.querySelector(`[cart_modal_price_box_itemid="${prodnum}"]`).appendChild($item_price);
        $item_price.innerText = '$'+parseFloat(item_price).toFixed(2);
    }

    setItemQuantityControlBox(prodnum, item_quantity, item_attribute) {
        const $item_quantity_control_box = document.createElement('div');
        $item_quantity_control_box.setAttribute('id', `${item_attribute}_quantity_box`);
        $item_quantity_control_box.setAttribute('class', `${item_attribute}_quantity_box cart_modal_quantity_control_box`);
        $item_quantity_control_box.setAttribute('cart_modal_quantity_box_itemid',`${prodnum}`);   
        document.querySelector(`[cart_modal_price_box_itemid="${prodnum}"]`).appendChild($item_quantity_control_box);
        this.setMinusQuantity(prodnum, item_attribute);
        this.setItemQuantityFlag(prodnum, item_attribute);
        this.setItemQuantity(prodnum, item_quantity, item_attribute);
        this.setPlusQuantity(prodnum, item_attribute);
        
    }

    setItemQuantityFlag(prodnum, item_attribute) {
        const $item_quantity_flag = document.createElement('div');
        $item_quantity_flag.setAttribute('id', `${item_attribute}_quantity_flag`);
        $item_quantity_flag.setAttribute('class', `${item_attribute}_quantity_flag`);
        // $item_quantity_flag.setAttribute('cart_modal_quantity_itemid',`${prodnum}`);   
        document.querySelector(`[cart_modal_quantity_box_itemid="${prodnum}"]`).appendChild($item_quantity_flag);    
        $item_quantity_flag.innerText = 'x\u00a0';
    
    }

    setItemQuantity(prodnum, item_quantity, item_attribute) {
        const $item_quantity = document.createElement('div');
        $item_quantity.setAttribute('id', `${item_attribute}_quantity`);
        $item_quantity.setAttribute('class', `${item_attribute}_quantity`);
        $item_quantity.setAttribute('cart_modal_quantity_itemid',`${prodnum}`);   
        document.querySelector(`[cart_modal_quantity_box_itemid="${prodnum}"]`).appendChild($item_quantity);    
        $item_quantity.innerText = item_quantity;
    
    }

    setPlusQuantity(prodnum, item_attribute) {
        const plus_quantity_btn = document.createElement('button');
        plus_quantity_btn.setAttribute('id', `${item_attribute}_plus_quantity_btn`);
        plus_quantity_btn.setAttribute('class', `${item_attribute}_plus_quantity_btn cart_modal_ctl_btn`);
        document.querySelector(`[cart_modal_quantity_box_itemid="${prodnum}"]`).appendChild(plus_quantity_btn);
        plus_quantity_btn.innerText = '➕'; 
    }

    setMinusQuantity(prodnum, item_attribute) {
        const minus_quantity_btn = document.createElement('button');
        minus_quantity_btn.setAttribute('id', `${item_attribute}_minus_quantity_btn`);
        minus_quantity_btn.setAttribute('class', `${item_attribute}_minus_quantity_btn cart_modal_ctl_btn`);
        document.querySelector(`[cart_modal_quantity_box_itemid="${prodnum}"]`).appendChild(minus_quantity_btn);
        minus_quantity_btn.innerText = '➖';
    }

    setItemDelete(prodnum, item_attribute) {
        const item_deleteb_tn = document.createElement('button');
        item_deleteb_tn.setAttribute('id', `${item_attribute}_delete_btn`);
        item_deleteb_tn.setAttribute('class', `${item_attribute}_delete_btn cart_modal_ctl_btn`);
        document.querySelector(`[cart_modal_name_box_itemid="${prodnum}"]`).appendChild(item_deleteb_tn);
        item_deleteb_tn.innerText = 'X';
        // item_deleteb_tn.innerText = '✖';
    }

    getSubTotal(prodnum, item_attribute) {
        const $item_subtotal = document.createElement('div');
        $item_subtotal.setAttribute('class', `${item_attribute}_subtotal`);
        $item_subtotal.setAttribute('cart_modal_subtotal_itemid', `${prodnum}`);
        const item_quantity = parseInt(document.querySelector(`[cart_modal_quantity_itemid="${prodnum}"]`).innerText);
        const item_price = parseFloat(document.querySelector(`[cart_modal_price_itemid="${prodnum}"]`).innerText.slice(1)); 

        const item_subtotal = parseFloat(item_quantity * item_price); 
        // console.log(item_quantity);
        // console.log(item_price);
        // console.log(item_subtotal);

        document.querySelector(`[cart_modal_price_box_itemid="${prodnum}"]`).appendChild($item_subtotal);
        $item_subtotal.innerText = '$' +item_subtotal.toFixed(2);

    }

    /*
    getGrandTotal(amount, item_attribute) {
        const $item_grandtotal = document.createElement('div');
        $item_grandtotal.setAttribute('class', `${item_attribute}_grand_total`);

        // const item_orderGrandTotal = 1000;
        // const item_orderGrandTotal = parseFloat(document.querySelector(`.online_place_order_item_subtotal.o${}`).innerTextslice(1));
        document.getElementById(`check_out_item_grand_total`).appendChild($item_grandtotal);
        document.querySelector(`.check_out_item_grand_total`).innerText = 'Total $' + amount.toFixed(2);
        
    }
    */

    setTotal(param, total) {

        // g_total = total;
        if (param == 'GUEST') {this.guest_items_subtotal = total}
        else {this.user_items_subtotal = total}

    } 

    getTotal(param) {
        console.log('getTotal')
        console.log(param)
        if (!param || param == 'GUEST') { return this.guest_items_subtotal }
        else { return this.user_items_subtotal}
    }

    checkShippingRate() {
        var radios = document.getElementsByName('rate_select');
        for (var radio of radios)
        {
            if (radio.type === 'radio' && radio.checked)
            {              
                console.log(radio);
                if (radio.id == 'shipping_flat_rate') return ["flat", this.flat_rate];
                else if (radio.id == 'shipping_ground_rate') return ["ground", this.ground_rate];
                else if (radio.id == 'shipping_3days_rate') return ["3days", this.three_days_rate];
                else if (radio.id == 'shipping_nextday_rate') return ["nextday", this.next_day_rate];
            }
        }
    }

    getShippingRate(param) {
        return new Promise((resolve, reject) => {
            let data = {};    

        if (param == 'GUEST') {
            data = {
            recipient : document.getElementById('input_recipient_first_name').value + ' ' +document.getElementById('input_recipient_last_name').value,
            address : document.getElementById('input_shipping_address_line1').value + ' ' + document.getElementById('input_shipping_address_line2').value,
            city : document.getElementById('input_shipping_address_city').value,
            state : document.getElementById('shipping_address_state').value,
            zip : document.getElementById('input_shipping_address_zip').value,
            phone : document.getElementById('input_shipping_contact_phone').value,
            email : document.getElementById('input_shipping_contact_email').value,
            weight : this.guest_item_total_weight
            }
        
        } else {
            data = {
            recipient : param.recipient,
            address : param.address1 + ' ' + param.address2,
            city : param.city,
            state : param.state,        
            zip : param.zip,
            phone : param.phone,
            email : param.email,
            weight : this.user_item_total_weight
            }
            
        }
        
            console.log(data);
            const options = 
                {   
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                
                        },
                    body: JSON.stringify(data)
                }     

                fetch('/get_shipping_rate', options)
                .then((res) => res.json())
                .then(result => {
                    console.log(result);
                    let ground = result.RateResponse.RatedShipment.filter(element => {                
                        return element.Service.Code == '03'})[0].TotalCharges.MonetaryValue;
                    console.log(ground);
                    let threedays = result.RateResponse.RatedShipment.filter(element => {                
                        return element.Service.Code == '12'})[0].TotalCharges.MonetaryValue;
                        console.log(threedays);
                    let nextday = result.RateResponse.RatedShipment.filter(element => {                
                        return element.Service.Code == '13'})[0].TotalCharges.MonetaryValue;
                        console.log(nextday);
                    this.setShippingGroundRate(parseFloat(ground));
                    document.getElementById('shipping_ground_rate_price').innerText = ground;
                        
                    this.setShippingThreeDaysRate(parseFloat(threedays));              
                    document.getElementById('shipping_3days_rate_price').innerText = threedays;
        
                    this.setShippingNextDayRate(parseFloat(nextday));
                    document.getElementById('shipping_nextday_rate_price').innerText = nextday;
                    resolve();
                    
                    // this.setShippingGroundRate(parseFloat(result.RateResponse.RatedShipment[3].TotalCharges.MonetaryValue));
                    // document.getElementById('shipping_ground_rate_price').innerText = result.RateResponse.RatedShipment[3].TotalCharges.MonetaryValue;
                     
                    // this.setShippingThreeDaysRate(parseFloat(result.RateResponse.RatedShipment[5].TotalCharges.MonetaryValue));              
                    // document.getElementById('shipping_3days_rate_price').innerText = result.RateResponse.RatedShipment[5].TotalCharges.MonetaryValue;
    
                    // this.setShippingNextDayRate(parseFloat(result.RateResponse.RatedShipment[2].TotalCharges.MonetaryValue));
                    // document.getElementById('shipping_nextday_rate_price').innerText = result.RateResponse.RatedShipment[2].TotalCharges.MonetaryValue;
                    
                })
            // console.log('resolve');          
            
            
        }); 
        
    }



    rerenderShippingRate(shipping_rate) {
        
        document.getElementById(`checkout_submit_summary_shipping_value`).innerText = (shipping_rate).toFixed(2);
    }

    rerenderTotal(user_total_amount, shipping_rate) {

        console.log(user_total_amount)
        const shipping_fee = shipping_rate ? shipping_rate : 9.90;
        console.log(shipping_fee)
        const total_before_tax = user_total_amount + shipping_fee;
        console.log(total_before_tax)
        const estimated_tax = total_before_tax * 0.06;
        console.log(estimated_tax)
        const order_total = total_before_tax + estimated_tax;
        console.log(order_total)
        
        
        document.getElementById(`checkout_submit_summary_items_value`).innerText = user_total_amount.toFixed(2);
        document.getElementById(`checkout_submit_summary_shipping_value`).innerText = (parseFloat(shipping_fee)).toFixed(2);  
        document.getElementById(`checkout_submit_summary_before_tax_value`).innerText = (parseFloat(total_before_tax)).toFixed(2);                       
        document.getElementById(`checkout_submit_summary_Estimated_tax_value`).innerText = (parseFloat(estimated_tax)).toFixed(2);
        document.getElementById(`checkout_submit_summary_order_total_value`).innerText = (parseFloat(order_total)).toFixed(2);

    }
    
    setItemTotalWeight(param, weight) {
        if(param == 'GUEST') {
            this.guest_item_total_weight = weight; 
            console.log(this.guest_item_total_weight);
        } else {
            this.user_item_total_weight = weight; 
            console.log(this.user_item_total_weight);
        }
    }

    setReadyCart(cart) {
        user_checkout_ready_cart = cart;
    }

    getReadyCart() {
        // let ready_cart_test = this.ready_cart;
        return user_checkout_ready_cart;

    }
    
    initPage() {
        this.pages = 0;
        this.positionValue = 0;
    }

    setCartModalItems(param) {
        this.cart_modal_items = param;
    }

    setCartModalGoShopBtn() {
        const cart_modal = document.getElementById('cart_modal_container');
        cart_modal.innerHTML = `
        <div id="cart_modal_go_shop_box" class="cart_modal_go_shop_box">
            <div id="cart_modal_go_shop_title" class="cart_modal_go_shop_title"> 
            You don't have any items in cart.<br>
            Would you like to move to the online shop?
            </div>
            <a href="/shop" data-link-T><button id="cart_modal_go_shop_btn" class="cart_modal_go_shop_btn">Go Online Shop</button></a>
        </div>
        `
    }
}

let user_checkout_ready_cart = [];




