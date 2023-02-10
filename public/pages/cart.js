export default class {
    
    
    constructor() {
        document.title = "Cafe FORE";
        console.log("shop cart");
        
     
    }

    c_name = '';
    c_total = 0;
    c_amount = 0;
    C_quantity = 10;

   

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
}