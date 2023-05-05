import {Spinner} from './spin.js';


const opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-more', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#983131', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '44%', // Top position relative to parent
    left: '50%', // Left position relative to parent

    // top: `${winX}%`, // Top position relative to parent
    // left: `${winY}%`, // Left position relative to parent

    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};    

const spinner = new Spinner(opts);
const modal = document.getElementById('modal');


export function turnOffDisplay(param) {   

    const modal = document.getElementById('modal');
    modal.style.display = "block";
    // modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modal.style.pointerEvents = "none";   
    document.body.classList.add("no_action");
    
    const target = document.getElementById('lorem');
    spinner.spin(target);
    target.appendChild(spinner.el);
    
    if (param) {        
        // const tg = document.querySelector('.make_item_test');
        // document.getElementById("billing_info_add_btn");

        // const t_offset = target.offsetTop();
        // const targetTop = tg.getBoundingClientRect().top;   
        let abTop = 0; 

        if (param == "add_payment_method") {
            const tg = document.getElementById('add_payment_method_btn');
            abTop = window.pageYOffset + tg.getBoundingClientRect().top;

        } else abTop = param.pageY;     
        
        console.log(abTop);
        document.querySelector('.spinner').style.top = `${abTop}px`;
    }
    
    

    
}

export function turnOnDisplay() {
    modal.style.display = "none";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
    modal.style.pointerEvents = "auto";
    document.body.classList.remove("no_action");        
    spinner.stop();
}

