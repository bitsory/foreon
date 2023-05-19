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
                <form class="example" action="#">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <div id="shop_category_container" class="shop_category_container">
                    <div id="shop_cat_wellness" class="shop_cat_wellness shop_category">
                        <button id="shop_wellness_btn" class="shop_wellness_btn cate_btn">Wellness</button>
                    </div>
                    <div id="shop_cat_dessert" class="shop_cat_dessert shop_category">
                        <button id="shop_dessert_btn" class="shop_dessert_btn cate_btn">Dessert</button>
                    </div>
                    <div id="shop_cat_kids" class="shop_cat_kids shop_category">
                        <button id="shop_kids_btn" class="shop_kids_btn cate_btn">Kids</button>
                    </div>
                    <div id="shop_cat_gift" class="shop_cat_gift shop_category">
                        <button id="shop_gift_btn" class="shop_gift_btn cate_btn">Gift</button>
                    </div>                   
                </div>
            </div>
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
                                <div class="form-row-nm-em">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="contact_lb">
                                            <label class="contact_box_lb">Name *<br></label></div>
                                            <input type="text" class="form-control" id="senderName" name="senderName" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row-nm-em">
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
        `    
    }
    
}