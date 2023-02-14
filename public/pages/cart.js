export default class Cart{
    
    
    constructor(param) {
        document.title = "Cafe FORE";
        console.log("shop cart");
        
        this.c_name = this.getCookie(param);
    }

    c_name = '';
    c_items = [
        {c_item_name : '',
         c_item_no : 0,
         c_item_price : 0,
         c_item_quantity : 0}
    ];
    
    
   

    getCookie(name) {
        console.log(`get cookie : ${name}`);
        let cook = decodeURIComponent(name).split(';');// get array
       
        var result='GUEST';
        cook.forEach((item) => { 
            const obj = new Object();
            const elem = item.trim();
            const tmp = elem.split('=');
            const key = tmp[0];
            const val = tmp[1];
            obj.key = val;
            
            if (key === 'cafefore') {
                var start = val.indexOf('":"');
                var end = val.indexOf('",');                
                result = val.substring(start+3, end);                                
            } 

        })

        return result;
        
    }

    viewCart() {
        console.log("view cart");
        console.log(this.c_name);
    }

    getUserProfile() {
        return `
            <div class='user_profile_greet'>Hello</div>
            <div class='user_profile_name'>${this.getCookie(document.cookie)}</div>
            <div class='user_profile_cart'>
                
            <form action='/shop/cart/${this.getCookie(document.cookie)}' method="post" class="form_user_profile_cart">
                    
                <input type="submit" class="user_profile_cart_btn" name="view_cart" value="GO Cart" onclick=${this.viewCart()}>
            </form>
                
            </div>
            <div class='user_profile_log_out'>
            <form action="/sign_out" method="post" class="user_logout">
                    
                <input type="submit" class="user_logout_btn" name="sign_out" value="Sign Out">
            </form>
                
            </div>
        `
    }

}