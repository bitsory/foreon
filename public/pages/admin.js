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
                <button id="check_orders" class="check_orders">check_orders</button>
            </div>
        </div>
        
        `;
    }

}

window.onload = function () {

    var el = document.getElementById("check_orders");

    el.onclick = hello;

}

 

function hello()  {
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

    document.getElementById("admin_container").appendChild(order_container);
    // this.setItemBox(prodnum, price, name, quantity, image, item_attribute);   
    // this.setItemCheckBtn(prodnum);
    // this.setItemImageContainer(prodnum, image, item_attribute);
    // this.setItemContentContainer(prodnum, price, name, quantity, item_attribute);
    
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
        newText3.setAttribute('value', `${element.order_number}`);
        newCell3.appendChild(newText3);
        newText3.innerText = 'shipping check';
       
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

        var image = new Image();
        image.src = `data:image/gif;base64,${response.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage}`;
        
        const admin_label_container = document.getElementById('admin_label_container');
        admin_label_container.appendChild(image);
        
        // window.open(image)
        
        
    });


}


