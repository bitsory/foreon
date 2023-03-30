export default class {
    constructor() {
        document.title = "Cafe FORE";
        console.log("about page");
        this.title = "about";
    }

    
    async getHtml() {
        
        return `
            
            <h3 class="about_article">
            <div class="about_us">About us<br><br></div>
            We are a snack & juice bar right inside the LA Fitness East Cobb.<br>
            You can just feel free open the door come inside.<br><br>
            Enjoy our sort of Coffee, Powerful Supplement Smoothie, Acai bowl, Wellness shot 
            and Korean style snack & food K-Bop.<br><br>
            We also have useful products in online mall.<br><br>
            Take a look around!!<br>            
            </h3>
            <div class="about_video">
                <video src="/images/about_video.mp4" playsinline autoplay muted loop class="aboutVideo" >
                    
                </video>
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

document.addEventListener('click', function(e) {

    console.log("about document.addEventListener('click', function(e)");

});
