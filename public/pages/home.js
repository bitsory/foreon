export default class {
    constructor() {
        document.title = "Cafe FORE";
    }

    testHome() {
        console.log("test Home");
    }

    quickButton () {
        console.log("quick button querySelector");
        this.q_menu = document.querySelector('.q_menu');
    
    }
    quickBtnEventListener () {
        this.q_menu.addEventListener('click', (e)=> {
            console.log("quick button addEventListener");
            console.log(e.target);
        });
    }


    async getHtml() {
        return `
            <div class="home_description">
                <h1>
                We are the world.
                <br>
                PEACE
                <br>
                LOVE
                <br>
                ...&<br> 
                Cafe FORE</h1>
            </div>

            <div class="home_pic">
                <div class="home_pic pic1">
                    <div class="home_pic_div sm_cho">
                        
                    </div>
                </div>
                <div class="home_pic pic2">
                    <div class="sm_neon"></div>
                </div>
                <div class="home_pic pic3">
                    <div class="home_video">
                    <video src="/images/home_v.mp4" playsinline autoplay muted loop class="myVideo">
                        
                    </video>
                    </div>
                </div>

            </div>

            <div class="q_btn_container">
                <button type="button" class="q_menu q_btn">
                <a href="/menu" data-link-T style="color: white";>MENU</a></button>
                <button type="button" class="q_order q_btn">
                <a href="#" data-link-T style="color: white";>ORDER</a></button>
                <button type="button" class="q_call q_btn">
                <a href='tel:470-263-6495' style="color: white";>CALL</a></button>
            </div>

        `;
    }
}
