function getFormData(form) {        
            
    var elements = form.elements;
    var honeypot;

    console.log(elements);
    console.log(form);
    console.log(Object.keys);
    var fields = Object.keys(elements).filter(function(k) {
        console.log(k);
        console.log(elements[k].name);
        //console.log(fields);

        if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
        }
        console.log(fields);
        
        return true;
        }).map(function(k) {
            console.log("true");

            if(elements[k].name !== undefined) {
                console.log(`elements[k].name: ${elements[k].name}`);
            return elements[k].name;
            // special case for Edge's html collection
            }else if(elements[k].length > 0){
            return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            console.log(`item : ${item} pos: ${pos} self:${self}`);
            console.log(`self.indexOf(item): ${self.indexOf(item)}`);
            return self.indexOf(item) == pos && item;
        });

    console.log(`fields: ${fields}`);

    var formData = {};
    
    fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;

        // when our element has multiple items, get their values
        if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
                data.push(item.value);
            }
        }
        formData[name] = data.join(', ');
        }
        console.log(`formData: ${formData[name]}`);
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
}

function handleFormSubmit(event) {  // handles form submit without any jquery
    console.log(event);
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    console.log(`formData: ${JSON.stringify(formData)}`);
    var data = formData.data;
    console.log(`data: ${JSON.stringify(data)}`);

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
        return false;
    }

    disableAllButtons(form);
    
    var url = form.action;
    var xhr = new XMLHttpRequest();
    console.log(`xhr : ${xhr}`);
    console.log(`xhr : ${JSON.stringify(xhr)}`);
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("form reset before");
            form.reset();
            console.log("form reset after");
            var formElements = form.querySelector(".form-elements")
            console.log(`formElements : ${formElements}`);

            if (formElements) {
                formElements.style.display = "none"; // hide form
            }
            var thankYouMessage = document.querySelector(".thankyou_message");
            if (thankYouMessage) {
                thankYouMessage.style.display = "block";
                
            }
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    console.log(`xhr : ${xhr}`);
    console.log(`xhr : ${JSON.stringify(xhr)}`);
    console.log(`encoded: ${encoded}`);
    xhr.send(encoded);
}
        
function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    console.log(`forms : ${JSON.stringify(forms)}`);
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
        console.log(`forms : ${JSON.stringify(forms)}`);
    }
};

function load2() {
    console.log("DOMContentLoaded");
}

document.addEventListener("DOMContentLoaded", () => {
    loaded();
    load2();
},  false);

function disableAllButtons(form) {
    var contact_email_form = document.querySelector(".contact_email_form");

    contact_email_form.style.display = "none";                
}
