
console.log("google login initialize")

getKey();

function getKey () {    

    const send_data = {u_id : 'getkey'};

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
            },
        body: JSON.stringify(send_data)
    };
    console.log(data);

    fetch(`/get_glogin_key`, data)
    .then((res) => res.json())
    .then(result => {
        const key = result.key;           
        
        google.accounts.id.initialize( {client_id: key, callback: handleCredentialResponse} );

        google.accounts.id.renderButton(
            document.getElementById("google_login"),
            // {theme: "dark", size: "medium", locale: "en", border: "none", width: "long"}  // customization attributes
            {theme: "outfilled", size: "medium", shape: "square", width: "360", height: "50" ,locale: "en"}
        );
    });
    
}


function handleCredentialResponse(response) {
  
    const responsePayload = decodeJwtResponse(response.credential);    

    if (responsePayload.email_verified == true && responsePayload.sub) {
        document.getElementById('modal_body').remove();
        document.querySelector('.modal').style.display = 'none';
        document.body.style.overflow = 'auto';
        const current_path = document.location.href;

        getPBKey().then(key => {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(key);
        
            const encrypted_email = crypt.encrypt(responsePayload.email);
            const encrypted_bpw = crypt.encrypt(responsePayload.sub);
            const encrypted_name = responsePayload.name ? responsePayload.name : 'check name';
            const encrypted_first_name = responsePayload.given_name ? responsePayload.given_name : '';
            const encrypted_last_name = responsePayload.family_name ? responsePayload.family_name : '';
            
            const send_data = {aid : encrypted_email, bpw : encrypted_bpw, name : encrypted_name, c_path : current_path, first_name : encrypted_first_name, last_name : encrypted_last_name}
            console.log(send_data)
            
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                    
                    },
                body: JSON.stringify(send_data),
                redirect: "follow"
            };

            fetch('/g_sign_in', data)
            .then((res) => res.json())
            .then(result => { console.log(result)
                if (result.check == "not match") {
                    document.getElementById('sign_in_form_extra').innerText = 
                    "ID and Password not matched...<br>please check your ID and Password";
                } else window.location.href = result.url;
            })
        })
       
    } else console.log(" check your google id") ////////////////////////////
    

}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function getPBKey() {
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
