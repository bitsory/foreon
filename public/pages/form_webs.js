export function getPBKey() {
    return new Promise((resolve, reject) => {
        fetch('/account_modal_pop')
        .then((res) => res.json())
        .then(result => {
            // console.log(result)
            // this.encrkey = result.key;
            resolve(result.key);
        });
    }) 
}

export function removeFadeOut( element, speed ) {
    var seconds = speed/1000;
    element.style.transition = "opacity "+seconds+"s ease";

    element.style.opacity = 0;
    setTimeout(function() {
        // el.textContent = '';
        element.parentNode.removeChild(element);
    }, speed);
}

export function toggleFunc() {
    document.querySelector('.navbar_nav_list').classList.toggle('on');
    document.querySelector('.navbar_toggleBtn').classList.toggle('on');
    document.querySelector('.main').classList.toggle('on');
    document.querySelector('.lorem').classList.toggle('on');
    document.querySelector('.footer').classList.toggle('on');
    document.querySelector('.navbar_icons').classList.toggle('on');
}
