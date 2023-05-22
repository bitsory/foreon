export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("admin page");
        this.title = "admin";
    }


    getHtml() {
        return`
        <div id="admin_main" class="admin_main">
            <div id="admin_container" class="admin_container"></div>
        
            <div id="admin_button_box" class="admin_button_box">
                <button id="admin_check_orders" class="admin_check_orders">check_orders</button>
            </div>
        </div>
        
        `;
    }

}

const main_section = document.getElementById('main');

// window.onload = function () {

//     var el = document.getElementById("admin_check_orders");

//     el.onclick = hello;

// }

main_section.addEventListener('click',function(e){ 

    console.log("admin js click ")    
        
    if(e.target && e.target.id == 'admin_check_orders') {
        e.preventDefault();
        adminCheckOrders();
    }

    if(e.target && e.target.id == 'admin_check_return_req') {
        e.preventDefault();
        adminCheckReturnRequest();
    }
});


function adminCheckReturnRequest() {
    const test_admin = {admin : "admin"}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(test_admin)
    };

    fetch('/get_admin_return_req', options)
    .then((res) => res.json())
    .then(response => {
        console.log('response');
        console.log(response);
        setAdminReturnRequestTable();
        setAdminReturnRequestTableDetail(response);
    });

}

function setAdminReturnRequestTable() {
    const return_req_container = document.createElement('table');
    return_req_container.setAttribute('id', `return_req_container`);
    return_req_container.setAttribute('class', `return_req_container`);
    // order_container.setAttribute('itemid', `${prodnum}`);
    const admin_container = document.querySelector('.admin_container');
    while (admin_container.hasChildNodes()) {	
        admin_container.removeChild(admin_container.firstChild);
    }

    document.getElementById("admin_container").appendChild(return_req_container);

}

function setAdminReturnRequestTableDetail(response) {
    const return_req_table = document.getElementById("return_req_container");

    response.forEach(element => {
        const return_req_table_row = document.createElement('tr');
        return_req_table.appendChild(return_req_table_row);
        const return_req_table_td = document.createElement('td');
        const newCell0 = return_req_table_row.insertCell();
        const newCell1 = return_req_table_row.insertCell();
        const newCell2 = return_req_table_row.insertCell();
        const newCell3 = return_req_table_row.insertCell();
        const newCell4 = return_req_table_row.insertCell();
        const newCell5 = return_req_table_row.insertCell();
        const newCell6 = return_req_table_row.insertCell();
        const newCell7 = return_req_table_row.insertCell();
        const newCell8 = return_req_table_row.insertCell();
        const newCell9 = return_req_table_row.insertCell();
        const newCell10 = return_req_table_row.insertCell();

        

        const newText0 = document.createTextNode(element.cartnum);
        newCell0.appendChild(newText0);
        const newText1 = document.createTextNode(element.u_id);
        newCell1.appendChild(newText1);
        const newText2 = document.createTextNode(element.oddate);
        newCell2.appendChild(newText2);
        const newText3 = document.createTextNode(element.track_number);
        newCell3.appendChild(newText3);
        const newText4 = document.createTextNode(element.name);
        newCell4.appendChild(newText4);
        const newText5 = document.createTextNode( parseFloat(element.price_sell * element.quantity * 1.06).toFixed(2));
        newCell5.appendChild(newText5);
        const newText6 = document.createTextNode(element.item_return_result);
        newCell6.appendChild(newText6);
        const newText7 = document.createTextNode(element.item_return_reason);
        newCell7.appendChild(newText7);
        const newText8 = document.createTextNode(element.refund_amount);
        newCell8.appendChild(newText8);
        const newText9 = document.createTextNode(element.refund_date);
        newCell9.appendChild(newText9);

        const newText10 = document.createElement('button');
        newText10.setAttribute('id', `accept_return_button`);
        newText10.setAttribute('class', `admin_accept_return_button_`);
        newText10.setAttribute('value', `${element.cartnum}`);
        newCell10.appendChild(newText10);
        newText10.innerText = 'accept return, let refund';
        if (element.refund == 'y') {
            newText10.setAttribute('disabled', 'true'); 
            newText10.innerText = 'refunded';
        }
       
        newText10.onclick = acceptReturn;
    })
}

function acceptReturn(e) {
    console.log("acceptReturn() acceptReturn()")
    let cart_id = e.target.getAttribute('value');
    console.log(cart_id)

    const admin_cart_id = {cart_id : cart_id}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(admin_cart_id)
    };

    
    console.log(options);

    fetch('/admin_refund_item', options)
    .then((res) => res.json())
    .then(result => {
        console.log(result);
        if (result.result == 'ok') {
        adminCheckReturnRequest();
        }
    });

}

 

function adminCheckOrders()  {
    console.log("admin click");
    
    const test_admin = {admin : "admin"}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(test_admin)
    };

    fetch('/get_admin_check_orders', options)
    .then((res) => res.json())
    .then(response => {
        console.log('response');
        console.log(response);
        setAdminCheckOrdersTable();
        setAdminCheckOrdersTableDetail(response)
    });



}

function setAdminCheckOrdersTable() {
    const order_container = document.createElement('table');
    order_container.setAttribute('id', `order_container`);
    order_container.setAttribute('class', `order_container`);
    // order_container.setAttribute('itemid', `${prodnum}`);

    const admin_container = document.querySelector('.admin_container');
    while (admin_container.hasChildNodes()) {	
        admin_container.removeChild(admin_container.firstChild);
    }

    document.getElementById("admin_container").appendChild(order_container);
  
    
}

function setAdminCheckOrdersTableDetail(response) {
    const order_table = document.getElementById("order_container");

    response.forEach(element => {
        const order_table_row = document.createElement('tr');
        order_table.appendChild(order_table_row);
        const order_table_td = document.createElement('td');
        const newCell0 = order_table_row.insertCell();
        const newCell1 = order_table_row.insertCell();
        const newCell2 = order_table_row.insertCell();
        const newCell3 = order_table_row.insertCell();
        

        const newText0 = document.createTextNode(element.order_number);
        newCell0.appendChild(newText0);
        const newText1 = document.createTextNode(element.indate);
        newCell1.appendChild(newText1);
        const newText2 = document.createTextNode(element.total_order_amount);
        newCell2.appendChild(newText2);
        const newText3 = document.createElement('button');
        newText3.setAttribute('id', `shipping_check_button`);
        newText3.setAttribute('class', `admin_shipping_check_button`);
        newText3.setAttribute('value', `${element.order_number}`);
        newCell3.appendChild(newText3);
        newText3.innerText = 'shipping check';
        if (element.shipment == 'y') {
            newText3.setAttribute('disabled', 'true'); 
            newText3.innerText = 'order shipped';
        }
        if (element.full_refunded == 'y') {
            newText3.setAttribute('disabled', 'true'); 
            newText3.innerText = 'order cancel, full refunded';        
        }
        newText3.onclick = shippingCheck;
    })
}


function shippingCheck(e) {
    console.log("shipping check")
    console.log(e.target)
    let order_id = e.target.getAttribute('value');
    console.log(order_id)

    const admin_order_id = {order_id : order_id}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(admin_order_id)
    };

    fetch('/get_admin_check_orders_shipment', options)
    .then((res) => res.json())
    .then(response => {
        console.log('response');
        console.log(response);

        if (response.ShipmentResponse.Response.ResponseStatus.Code == 1) {
            var image = new Image();
            image.src = `data:image/gif;base64,${response.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage}`;
            
            const admin_label_container = document.getElementById('admin_label_container');
            admin_label_container.appendChild(image);
            
            let newWindow = window.open("","","");
            let img = newWindow.document.createElement("img"); 
            img.setAttribute("src", image.src);  //이미지가 저장되어있는 경로를 src 안에 넣기
            img.setAttribute("width", "50%");
            img.setAttribute("height", "50%");
            
            newWindow.document.body.appendChild(img);
            adminCheckOrders();
        }
    });
}


