export default class {
    constructor() {
        document.title = "Cafe FORE";        
    }

    gmap() {
        const gmap_script = document.getElementById('gmap_script');
        while (gmap_script.hasChildNodes()) {
            gmap_script.removeChild(gmap_script.firstChild);
        }

        var script = document.createElement('script');
        script.setAttribute('class', 'gmp'); 
        script.type = 'text/javascript';
        script.src = "pages/gmap.js";
        gmap_script.appendChild(script);
        
    }

    gmLoad(gmapkey) {
        const gmld_script = document.getElementById('gmld_script');

        while (gmld_script.hasChildNodes()) {
            gmld_script.removeChild(gmld_script.firstChild);
        }
    
        var script = document.createElement('script');
        script.setAttribute('class', 'gmp'); 
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapkey}&callback=myMap&'`;
        gmld_script.appendChild(script);
       
        
    }

    sendmail() {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'pages/sendmail.js';
        document.body.appendChild(script);
      
    }

    getContactKey() {
       
        const send_data = {u_id : 'getkey'};

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'            
                },
            body: JSON.stringify(send_data)
        };
        console.log(data);

        fetch(`/get_contact_key`, data)
        .then((res) => res.json())
        .then(result => {
            const key = result;
            console.log(key);
            // resolve(key);
            this.gmap();
            this.gmap();
            this.gmLoad(key.gmap_key);
            this.sendmail();
            document.getElementById('emailForm').action=`https://script.google.com/macros/s/${key.sendmail_key}/exec`
        });
     
    }

    async getHtml() {      
           
        return `
            <div id="online_title" class="online_title">
                <a href="/shop" id="online_title_label" class="online_title_label" data-link-T>Cafe FORE Online Shop</a>
                <div id="item_search_form">
                    <input type="text" id="item_search_input" class="item_search_input" placeholder="Search..">
                    <button type="button" id="item_search_btn" class="item_search_btn"><i class="fa fa-search"></i></button>
                </div>
                <div id="shop_category_container" class="shop_category_container">
                    <div id="shop_cat_wellness" class="shop_cat_wellness shop_category">
                        <button id="shop_wellness_btn" class="category_btn" value='wellness'>Wellness</button>
                    </div>
                    <div id="shop_cat_dessert" class="shop_cat_dessert shop_category">
                        <button id="shop_dessert_btn" class="category_btn" value='dessert'>Dessert</button>
                    </div>
                    <div id="shop_cat_kids" class="shop_cat_kids shop_category">
                        <button id="shop_kids_btn" class="category_btn" value='kids'>Kids</button>
                    </div>
                    <div id="shop_cat_gift" class="shop_cat_gift shop_category">
                        <button id="shop_gift_btn" class="category_btn" value='gift'>Gift</button>
                    </div>
                </div>
            </div>

            <div id="page_main_part" class="page_main_part">
                <section id="contact">
                    <div class="contact_us">Contact us<br><br>
                        <div class="contact_adr">cafefore@gocafefore.com<br>
                            (470)263-6495
                        </div>
                    </div>
                    

                    <div class='contact_email_form'>
                        <form id="emailForm" class="gform" method="POST" data-email="cafefore4400@gmail.com" 
                        
                        onsubmit="return handleFormSubmit(event)">
                            <div class="form-row">
                                <div class="contact_name_email">
                                    <div class="form-row-nm">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="contact_lb">
                                                <label class="contact_box_lb">Name *<br></label></div>
                                                <input type="text" class="form-control" id="senderName" name="senderName" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row-em">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="contact_lb">
                                                <label class="contact_box_lb">Email *<br></label>
                                                </div>
                                                <input type="text" class="form-control" id="senderEmail" name="senderEmail" required>
                                            </div>
                                        </div>
                                    </div>
                                </div><br><br>
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="contact_lb">
                                                <label class="contact_box_lb">Message *<br></label>
                                                </div>
                                                <textarea class="form-control" id="message" name="message" rows="5" ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div class="form-group m-0">
                                        <button id="btnSubmit" class="btn_submit">Send</button>
                                    </div>                            
                            </div>                                       
                        </form>
                        
                    </div>
                    <div style="display: none;" class="thankyou_message">
                            <h2>Thank you!</h2>
                    </div>
                </section>
                <section id="visit">
                    <div class="visit_us">Visit us</div>
                    
                    <div id="googleMap"></div>
                </section>

                <div class="q_btn_container">
                    <button type="button" class="q_menu q_btn">
                    <a href="#" data-link-T style="color: white";>MENU</a></button>
                    <button type="button" class="q_order q_btn">
                    <a href="https://www.clover.com/online-ordering/cafe-fore-marietta"  target="_blank" style="color: white";>ORDER</a></button>
                    <button type="button" class="q_call q_btn">
                    <a href='tel:470-854-6449' style="color: white";>CALL</a></button>
                </div>  
            </div>
        `    
    }
    
}