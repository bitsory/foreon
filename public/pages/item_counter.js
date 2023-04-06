export function item_counter(param) {

    if (param == 'GUEST') {

        let guest_items = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];
        let guest_item_counter = guest_items.length;
        document.getElementById('item_count').innerText = guest_item_counter != 0 ?  guest_item_counter : '0';
    } else {
        
        const u_id = {id : param};

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            body: JSON.stringify(u_id)
        };
        console.log(u_id)

        fetch('/item_counter', data)
        .then((res) => res.json())
        .then(result => {
            console.log('item counter')
            console.log(result)
            let user_items_counter = result.length;
            document.getElementById('item_count').innerText = user_items_counter != 0 ?  user_items_counter : '0';
        });
    }

}


