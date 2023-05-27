const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const JSEncrypt = require('nodejs-jsencrypt').default;
const CryptoJS = require("crypto-js");
const db = require('./public/service/db.js');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const uuid4 = require('uuid');
const AWS = require('aws-sdk');
require('dotenv').config({ override: true });

const app = express();





app.listen(process.env.PORT, function() {
    console.log('listening on 8080');
    console.log(getDate);
    schedule.scheduleJob('0 0 */3 * * *', function(){
        console.log(new Date() + ' scheduler running!');
        const formData = {
            grant_type: 'client_credentials'
          };
    
        const options = {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${process.env.UPS_MID}:${process.env.UPS_SECRET}`).toString('base64'),
            'x-merchant-id': `${process.env.UPS_MID}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams(formData).toString()
        
        }
        fetch(`https://wwwcie.ups.com/security/v1/oauth/token?client_id=${process.env.UPS_MID}&redirect_uri=https://www.thecafefore.com`, options)
        // fetch('https://wwwcie.ups.com/api/security/v1/oauth/token', options)
        .then(response => 
            response.json())
        .then(response => {
            console.log("response")
            console.log(response)            
            require("dotenv").config({ path: ".env2" });            
    
            process.env.UPS_AUTH_TOKEN = response.access_token;
            updateEnv(envItems);    
            // res.send(response)
        });
    
        const fs = require('fs');
        const envItems = ['UPS_AUTH_TOKEN'];
    
        function updateEnv(items = [], eol = '\n'){
            const envContents = items.map(item => `${item}=${process.env[item]}`).join(eol)
            fs.writeFileSync('.env2', envContents);
          } 
    });
});

app.set('view engine', 'ejs');

app.use(session({
    key: 'loginData',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    HttpOnly:true,
    // cookie: { maxAge: 360000 } // 5 minute
    cookie: { maxAge: 3600000, sameSite: 'strict' }

}))

app.use(cookieParser("secret"));
  

app.get('/',(req,res) => { 
    console.log("home home home");

    if (req.session.loginData && req.session.loginData.id == "cafeforeadmin") {
        res.render('admin.ejs', {post : "ADMIN"});
    }else if (req.session.loginData && req.session.loginData.id != "cafeforeadmin") {
        console.log("login data exist");        
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
        console.log("login data nothing");
		res.sendFile(__dirname + "/public/index.html");
	}
});




app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));


app.get('/login_check', (req,res) => {   
    const data = req.session.loginData ? req.session.loginData : {id : 'GUEST'};    
    res.send(data);
})

app.get('/account_modal_pop', (req,res) => { 
    const public_key = {key : process.env.RSA_PUBLIC_KEY};       
    res.send(public_key);
})

app.post('/get_api_key', (req,res) => { 
    if (req.body.u_id == 'getkey') {
        const key = {key : process.env.API_KEY};       
        res.send(key);
    }
})


app.post('/get_glogin_key', (req,res) => { 
    if (req.body.u_id == 'getkey') {
        const key = {key : process.env.G_LOGIN};       
        res.send(key);
    }
})

app.post('/get_contact_key', (req,res) => { 
    if (req.body.u_id == 'getkey') {
        const mail_key = process.env.SENDMAILKEY;       
        const map_key = process.env.GMAPKEY;
        const key = {sendmail_key : mail_key, gmap_key : map_key}        
        res.send(key);
    }
})





app.post("/sign_out", function (req, res) {
    req.session.destroy(() => {
        res.clearCookie('loginData');
        res.redirect('/');
    });
});



app.get('/home',(req,res) => {    
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});	
    } else {
		res.sendFile(__dirname + "/public/index.html");
	}    
});

app.get('/about',(req,res) => {  
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});

app.get('/menu',(req,res) => { 
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}    
});

app.get('/contact',(req,res) => {   
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}    
});


app.get('/shop',(req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });   
});

app.get('/shop/cart/:query',(req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });
});

app.get('/shop/order/:query',(req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });
});

app.get('/shop/view/item/:item_number',(req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/shop/checkout/:id', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/shop/checkout/:id/item_num=:item_no', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/purchase-history', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/account/user-info', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/account/billing-infomation', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/account/shipping-infomation', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/track-orders', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/shop/category/:id', (req,res) => {
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});

app.get('/shop/search/:id', (req,res) => {    
    const member_name = req.session.loginData ? req.session.loginData.name : 'GUEST';      
    res.render('index.ejs', { post : member_name });  
});






app.post('/sign_in', function (req,res) {
      
    const aid = req.body.aid;
    const bpw = req.body.bpw;
    const remember_id = req.body.checked_remember;

    const decrypt = new JSEncrypt();
    
    decrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const sign_in_id = decrypt.decrypt(aid);
    const sign_in_pw = decrypt.decrypt(bpw);

    const redirect_path = req.body.c_path;      
    
    const date = getDate();  
    const crypto = require('crypto');    
    
    db.getConnection((con)=>{
        con.query('SELECT salt from users where id = ?', [sign_in_id], (err, result) => { 
            if(err) next(err);

            if (result.length == 1) {
                makeKey(sign_in_pw, result[0].salt).then(key => {
                  
                    con.query('SELECT *  from users where id = ? and pw = ?', [sign_in_id, key], (err, result) => {
                        if(err){
                            res.send(err);
                            
                        }
                        // else if(result[0] === 'false') {
                        else if(result[0] == undefined) {
                            console.log("Id & PW are not match")
                            res.send({check : 'not match'});
                           
                        } else {                                         
                            console.log(`${result}`);                              
                            updateLastLog(con, result[0].id, result[0].first_name, req, res, date, redirect_path, result[0].clv_id, remember_id);
                            
                        }                                
                    });    
                });
            } else res.send({check : "not exist"});
        }); con.release();
    })

    function makeKey(sign_in_pw, salt) {
        return new Promise((resolve, reject) => {
                crypto.pbkdf2(sign_in_pw, salt, 1000, 32, 'SHA512', (err, key) => {
                if (err){
                    console.log(err)
                } else {
                    // console.log(key.toString("base64"));                    
                    resolve(key.toString("base64"));
                }
            })
        });
    } 
});


app.post('/sign_up', (req,res) => {

    console.log(req.body);

    const aid = req.body.uemail;
    const bpw = req.body.bpw;

    const decrypt = new JSEncrypt();

    const crypto = require('crypto');
    const buf = crypto.randomBytes(64);
    
    decrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const decryptedaid = decrypt.decrypt(aid);
    const decryptedbpw = decrypt.decrypt(bpw);
   

    //////////////////////// password encrypt for DB///////////////////////


    const salt = buf.toString('base64');
    
    function makeKey() {
        return new Promise((resolve, reject) => {
                crypto.pbkdf2(decryptedbpw, salt, 1000, 32, 'SHA512', (err, key) => {
                if (err){
                    console.log(err)
                } else resolve(key.toString("base64"));
            })
        });
    }

    makeKey(decryptedbpw, salt).then(key => {
       
        const sign_up_first_name = req.body.ufirstname;
        const sign_up_last_name = req.body.ulastname;           
                
        const sign_up_id = decryptedaid;
        const sign_up_pw = key;
     
        const sign_up_email = decryptedaid;
        const sign_up_phone = req.body.uphone;
        const redirect_path = req.body.c_path; ///// need to update the welcome page 
        const date = getDate();    
        const main_message = 
            `
            Hello. ${sign_up_first_name}
            This is cafe FORE.

            Thank you for join us.
            Take a look around!

            cafe FORE
            
            `;      
                                
        const subject_message = `cafe FORE sign up email`;

        db.getConnection((con)=>{
            con.query('select COALESCE(MAX(id), "false") AS id from users where id = ?', [sign_up_id], (err, result) => {
                if(err) next(err); 
                console.log("check repetition id")
                if (result[0].id === 'false') {

                    console.log("check check repetition")

                    const options = {
                        method: 'POST',
                        headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({
                            emailAddresses: [{emailAddress: sign_up_email}],
                            phoneNumbers: [{phoneNumber: sign_up_phone}],
                            firstName: sign_up_first_name,
                            lastName: sign_up_last_name
                        })
                    };
                    
                    fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
                    .then(response => response.json())
                    .then(response => {                
                        
                        const clv_id = response.id;
                        con.query('INSERT INTO users (id, pw, first_name, last_name, clv_id, email, phone, resi_date, last_log, salt) values (?,?,?,?,?,?,?,?,?,?)', 
                        [sign_up_id, sign_up_pw, sign_up_first_name, sign_up_last_name, clv_id, sign_up_email, sign_up_phone, date, date, salt], (err, result) => {
                            if(err){
                                console.log(err);
                                res.send(err);
                                  
                            } else {
                                console.log("sign up complete!!");    
                                sendMailSESTemplate(sign_up_id, main_message, subject_message);
                                updateLastLog(con, sign_up_id, sign_up_first_name, req, res, date, redirect_path, clv_id, "signup");
                            }               
                        }); 
                    })
                    .catch(err => console.error(err));                
                } else {
                    console.log('use_other_id')
                    res.send({key : 'use_other_id'})
                }
            }); con.release();
        });
    });
});

function updateLastLog(connect, u_id, u_name, request, response, date, url, clv_id, remember_id ) {
        
    console.log(`update: ${u_id}, ${date}`);       
    connect.query('UPDATE users SET last_log = ? where id = ?', [date, u_id]);
    let data = {id : u_id, name : u_name, clv_id : clv_id};
    let re_path = {url : url}
    request.session.loginData = data;
      
    response.cookie(
        'cafefore',{
        name : request.session.loginData.name,
        id : request.session.loginData.id,
        clv : request.session.loginData.clv_id                    
        
    }, {maxAge: 3600000, credentials: true, authorized : true, signed: true});

    if (remember_id == 'remember') {
        response.cookie(
            'saveid',{            
            id : request.session.loginData.id
        }, {maxAge: 360000000, credentials: true, authorized : true, signed: true});
    } else if (remember_id == "signup") {
        re_path = {url : "https://gocafefore.com"};
        response.cookie(
            'saveid',{            
            id : ''
        }, {maxAge: 0, credentials: true, authorized : true, signed: true});
    } else {
        response.cookie(
            'saveid',{            
            id : ''
        }, {maxAge: 0, credentials: true, authorized : true, signed: true});
    }

    console.log("login complete")
    
    if (u_id == "cafeforeadmin") {
        console.log("admin login")
        response.send(re_path);        
    }
    else response.send(re_path);  
   
    
}

function createCustomerCLV(firstName, lastName, email, phone) {
    const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            emailAddresses: [{emailAddress: email}],
            phoneNumbers: [{phoneNumber: phone}],
            firstName: firstName,
            lastName: lastName
          })
      };
      
      fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}


app.post('/g_sign_in', function (req,res) {
    console.log("google sign in google sign in google sign in ")
   

    const aid = req.body.aid;
    const bpw = req.body.bpw;
    const name = req.body.name;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const redirect_path = req.body.c_path;
    const date = getDate();

    const decrypt = new JSEncrypt();

    const crypto = require('crypto');
    const buf = crypto.randomBytes(64);    
    
    decrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const g_loginid = decrypt.decrypt(aid);
    const decryptedbpw = decrypt.decrypt(bpw);
    
    const main_message = 
        `
        Hello. ${first_name}
        This is cafe FORE.

        Thank you for join us.
        Take a look around!
        
        cafe FORE
        `;      
                                
    const subject_message = `cafe FORE sign up email`;
 

    ///////////////////// DB sign up check //////////////////////////////////

    db.getConnection((con)=>{
        con.query('SELECT * FROM users WHERE id = ? and description = "google"', [g_loginid], (err, result) => {
            if(err) next(err);

            else if(result[0] === undefined) {
            ////// sign up/////////////////   
                const signup_salt = buf.toString('base64');            
                makeKey(decryptedbpw, signup_salt).then(key => {
                    const sign_up_pw = key;
                    const options = {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({
                        emailAddresses: [{emailAddress: g_loginid}],                     
                        firstName: first_name,
                        lastName: last_name
                        })
                    };
                
                    fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
                    .then(response => response.json())
                    .then(response => {
                        const clv_id = response.id;
                        con.query('INSERT INTO users (id, pw, first_name, last_name, clv_id, email, phone, resi_date, last_log, salt, description) values (?,?,?,?,?,?,?,?,?,?,?)', 
                        [g_loginid, sign_up_pw, first_name, last_name, clv_id, g_loginid, "", date, date, signup_salt, "google"]);
                        sendMailSESTemplate(g_loginid, main_message, subject_message);
                        updateLastLog(con, g_loginid, first_name, req, res, date, redirect_path, clv_id);
                    })
                })
                
            } else if (result.length == 1){
                //////////////////////////// log in////////////////////////
                const login_salt = result[0].salt;
              
                makeKey(decryptedbpw, login_salt).then(key => {

                    con.query('SELECT *  from users where id = ? and pw = ?',[g_loginid, key], (err, result) => {                                       
                        if(err){
                            res.send(err);                            
                        }             
                        else if(result[0] === undefined) {
                            console.log("Id & PW are not match")
                            res.send({check : 'not match'});
                            
                        } else {                                         
                                                
                            updateLastLog(con, result[0].id, result[0].first_name, req, res, date, redirect_path, result[0].clv_id);
                        }
                    })
                })
            } else console.log("call admin to check double google ID in user DB ")
        }); con.release();        

    });

    function makeKey(decryptedpw, salt) {
        return new Promise((resolve, reject) => {
                crypto.pbkdf2(decryptedpw, salt, 1000, 32, 'SHA512', (err, key) => {
                if (err){
                    console.log(err)
                } else resolve(key.toString("base64"));
            })
        });
    }

});


app.post('/change_password', (req,res) => {
    console.log("change_password change_password ");
    console.log(req.body);
    const u_id = req.body.id;
    const cur_pw = req.body.cur_pw;
    const new_pw = req.body.new_pw;

    
    const crypto = require('crypto');
    const buf = crypto.randomBytes(64);

    const decrypt = new JSEncrypt();

    decrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const decrypted_cur_pw = decrypt.decrypt(cur_pw);
    const decrypted_new_pw = decrypt.decrypt(new_pw);

    const new_salt = buf.toString('base64');
   
    db.getConnection((con)=>{
        con.query('SELECT salt from users where id = ?', [u_id], (err, result) => { 
            if(err) next(err);

            if (result.length == 1) {
                makeKey(decrypted_cur_pw, result[0].salt).then(key => {
                    console.log('key')
                    console.log(key)
                    con.query('SELECT *  from users where id = ? and pw = ?', [u_id, key], (err, result) => {
                        if(err){
                            res.send(err);
                            // con.end();
                        }
                        // else if(result[0] === 'false') {
                        else if(result[0] == undefined) {
                            console.log("current password not match")
                            res.send({result : 'current password not match'});
                            // con.end();
                        } else {                                         
                            console.log(`${result}`);
                            makeKey(decrypted_new_pw, new_salt).then(new_key => {
                                con.query('UPDATE users SET pw = ?, salt = ? where id = ?', [new_key, new_salt, u_id], (err, result) => {
                                    if(err){                        
                                        res.send(err);
                                        // con.end();
                                    } else {
                                        console.log(result);                                                           
                                        result.protocol41 == true ? res.send({result : "ok"}) : res.send({result : "We are very sorry...DB error occured. Can you try again?"})
                                        
                                    }                    
                                });
                            });
                        }                                
                    });    
                });
            } else res.send({result : "not exist"});
        }); con.release();
    })

    function makeKey(decrypted, salt) {
        return new Promise((resolve, reject) => {
                crypto.pbkdf2(decrypted, salt, 1000, 32, 'SHA512', (err, key) => {
                if (err){
                    console.log(err)
                } else resolve(key.toString("base64"));
            })
        });
    }
});

app.post('/find_password', (req,res) => { 
    const u_id = req.body.email;
    const u_first_name = req.body.first_name;
    const u_last_name = req.body.last_name;
    const date = getDate();
    const crypto = require('crypto');
    const buf = crypto.randomBytes(64);

    db.getConnection((con)=>{
        con.query('SELECT * FROM users WHERE id = ? and first_name = ? and last_name = ?', [u_id, u_first_name, u_last_name], (err, result) => {
            if(err){
                console.log(err)
                res.send(err);
                   
            } else {            
                if (result.length > 0) {
                    const tmp_pass = Math.random().toString(36).slice(2);
                    const salt = buf.toString('base64');
                    makeKey(tmp_pass, salt).then(key => {
                        con.query('UPDATE users SET pw = ?, salt = ? where id = ? and first_name = ?', [key, salt, u_id, u_first_name], (err, result) => {
                            if(err){                        
                                res.send(err);
                                // con.end();
                            } else {                               
                                sendTMPMailSES(u_id, tmp_pass, date); 
                                res.send({"result" : "ok"});
                            }                    
                        });
                    })                  
                    
                } else {
                    res.send({"result" : "not matched... check email & name again"});

                }
            }  
        });
        con.release();
    });


    function makeKey(decryptedbpw, salt) {
        return new Promise((resolve, reject) => {
                crypto.pbkdf2(decryptedbpw, salt, 1000, 32, 'SHA512', (err, key) => {
                if (err){
                    console.log(err)
                } else resolve(key.toString("base64"));
            })
        });
    }


});

                
function sendTMPMailSES(toAddress, tmp_pass, date) {
    AWS.config.update({
        credentials: {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        },
        "region": process.env.AWS_REGION
    });

    // Create sendEmail params 
    var params = {
    Destination: { /* required */
        CcAddresses: [
            toAddress,
        /* more items */
        ],
        ToAddresses: [
            toAddress,
        /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
        //   Html: {
        //    Charset: "UTF-8",
        //    Data: "HTML_FORMAT_BODY"
        //   },
        Text: {
        Charset: "UTF-8",
        Data: `

            Hello.
            This is cafe FORE.
            
            cafe FORE Temporary password ${tmp_pass}

            After sign in using this Temporary password, please change password.

            Thank you for choosing. 

            cafe FORE
            ${date}
            `
        }
        },
        Subject: {
        Charset: 'UTF-8',
        Data: 'cafe FORE Temporary password'
        }
        },
    Source: 'cafefore@gocafefore.com', /* required */
    ReplyToAddresses: [
        'cafefore@gocafefore.com',
        /* more items */
    ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    sendPromise.then(
    function(data) {
        console.log(data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}



app.post('/item_counter', (req,res) => {  
    const u_id = req.body.id;  

    if (req.session.loginData && req.session.loginData.id == u_id) {     
        db.getConnection((con)=>{
            con.query('SELECT * FROM cart WHERE u_id = ? and result="n"', [u_id], (err, result) => {
                if(err){
                    console.log(err)
                    res.send(err);
                      
                } else {           
                    res.send(result);
                }               
            }); 
            con.release();
        });  
    }
});


app.post('/get_user_info', (req,res) => {

    const u_id = req.body.id; 

    if (req.session.loginData && req.session.loginData.id == u_id) {     
        db.getConnection((con)=>{
            con.query('SELECT id, first_name, last_name, phone, email, address1, address2, city, state, zip FROM users WHERE id = ?', [u_id], (err, result) => {
                if(err){
                    console.log(err)
                    res.send(err);
                      
                } else {        
                    res.send(result[0]);
                }               
            }); 
            con.release();
        });  
    }
});
    



app.post("/add_cart", function (req, res) {
   
    const u_id = req.session.loginData.id;
 
    const prodnum = req.body.c_item_no;
    const quantity = req.body.c_item_quantity;

    let date = getDate();
    let cartnum = date.replace(/\s|:|\-/g,"") + "CT" + u_id.substr(0, 3);
    // check the same item in cart   

    db.getConnection((con)=>{
        con.query('SELECT cartnum, quantity from cart where u_id = ? and prodnum = ? and result = "n"', [u_id, prodnum], (err, result) => { 
            if(err) res.send(err);
            else {
                if (result[0] != undefined) { // overwrite item quantity
              
                    con.query('UPDATE cart SET `quantity` = ?, `modate` = ? where (`cartnum` = ? and u_id = ? and prodnum = ? and result = "n")', [quantity, date, result[0].cartnum, u_id, prodnum], (err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();
                        } else {
                   
                            viewAddedItem();
                        }                    
                    })
                } else {              
                    con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, indate, modate) values (?,?,?,?,?,?)', 
                    [cartnum, u_id, prodnum, quantity, date, date], (err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();
                        } else {               
                            viewAddedItem();
                        }                    
                    })
                }
            }
        }); con.release();
    });

    function viewAddedItem() {
        db.getConnection((con)=>{
            con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n" and cart.prodnum = ?', [u_id, prodnum]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                     
                } else {
         
                    res.send(result);
                }
            });
            con.release();
        });
    }
});



app.post("/shop/order", function (req, res) {   
  
    const u_id = req.body[0].u_cart.length ? req.body[0].u_cart[0].u_id : 'GUEST';
       
    db.getConnection((con)=>{
        if (req.session.loginData && req.session.loginData.id == u_id) {
            console.log(req.session.loginData.id);
            const user_id = req.session.loginData.id;    
                // user cart check out        
            con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [user_id]
            ,(err, result) => {       
                if(err){                        
                    res.send(err);
                    // con.end();                
                } else {                  
                    res.send(result);
                }
            });
        } else {          
            //guest cart check out
            const product_number = req.body.map(item => {
                return item.c_item_no;
            })
                
            con.query('SELECT * from product where prodnum in (?)', [product_number]
                ,(err, result) => {
                    if(err){                        
                        res.send(err);
                        // con.end();
                    
                    } else {                        
                        res.send(result);
                    }
            });
        } 
        con.release();
    });
});



app.post('/update_general_profile',(req,res) => {
 
    const recipient = req.body.first_name + ' ' + req.body.last_name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const email = req.body.email;    
    const default_check = req.body.default_check;
    const indate = getDate();

    if (req.session && req.session.loginData.id == req.body.id) {
        const u_id = req.session.loginData.id;

        updateGeneralInfo();

        checkDefault().then(() => {         
            addShippingInfo();
        });
    
        function checkDefault() {
            return new Promise((resolve, reject) => {
                if (default_check == 'default') { 
                    db.getConnection((con)=>{
                        con.query('SELECT id from shipping_info WHERE id=?', [u_id],(err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else if (result !== undefined) {                   
                                con.query('UPDATE shipping_info SET default_address = "n" where id =?', [u_id])
                                resolve();
                            }                     
                        });
                        con.release();
                    });
                } else {
                    addShippingInfo();  
                }
            });
        }        
    
        function addShippingInfo() {
         
            db.getConnection((con)=>{
                con.query('INSERT INTO shipping_info (id, recipient, address1, address2, city, state, zip, phone, email, default_address, indate) values (?,?,?,?,?,?,?,?,?,?,?)', 
                    [u_id, recipient, address1, address2, city, state, zip, phone, email, default_check, indate], (err, result) => {
                    if (err) {
                        res.send(err);
                        // con.end();
                    } else {                      
                        if (result.protocol41 == true) {
                            res.send({result : "ok"});                         
                        } else res.send("sorry... something wrong in DB SERVER.");                        
                    }
                });
                con.release();
            });
        } 

        
        function updateGeneralInfo() {
            console.log("update general info")
            db.getConnection((con)=>{               
                con.query('UPDATE users SET phone = ?, email = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ? where id = ?', 
                [phone, email, address1, address2, city, state, zip, u_id], (err, result) => {
                    if(err){                        
                        res.send(err);
                        // con.end();        
                    } else {
                        console.log('update set general info');                                                                                 
                    }
                });
                con.release();
            })
        }


		
	}
    
});

app.get('/get_user_billing_info', (req,res) => {

    console.log('/get_user_billing_info /get_user_billing_info /get_user_billing_info')
    const u_id = req.session.loginData.id;
    console.log(u_id);    
   
    db.getConnection((con)=>{       
        con.query('SELECT clv_id FROM users WHERE id = ?', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result);
                const options = {
                    method: 'GET',
                    headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    }
                };
            
                fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
                .then(response => response.json())
                .then(response => {
                    console.log("card response")
                     
                    console.log(response);
                    let res_data = response.cards.elements.map(element => {
                        return element.id;
                    })
                    console.log(res_data);   
                    if (res_data.length) {     
                        console.log("if (res_data.length) {  ")                               
                        // con.query('SELECT * FROM billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
                        con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log(result);
                                res.send(result);
                                
                            }
                        })    
                    } else res.send(res_data);              
                })
                .catch(err => console.error(err));            
            }
        }); 
        con.release();
    });
});

app.get('/get_user_shipping_info', (req,res) => {
   
    const u_id = req.session.loginData.id;
   

    db.getConnection((con)=>{
        con.query('SELECT * FROM shipping_info WHERE id = ? and inuse="y"', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {     
                console.log(result);           
                res.send(result);
            }
        }); 
        con.release();
    });
})



app.post('/add_payment_method', (req,res) => {
    console.log('/add_payment_method /add_payment_method /add_payment_method')
    // const body = req.body;
    console.log(req.body);
    const clv_id = req.session.loginData.clv_id; 
    const c_num = req.body.cardnumber;
    const card_holder = req.body.card_name;
    const card_email = req.body.billing_address_email;
    const default_check = req.body.default_payment;

    const address1 = req.body.billing_address_street_line1;
    const address2 = req.body.billing_address_street_line2;
    const city = req.body.billing_address_city;
    const state = req.body.billing_address_state;
    const address_zip = req.body.billing_address_zip;
    const phone = req.body.billing_address_phone;

    console.log(clv_id);
    console.log(c_num);

    ///////////// save card into customer table in clover
    const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        //   'idempotency-key' : uuid,
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`},
        body: JSON.stringify({
            ecomind: 'ecom',
            "source": req.body.cloverToken, 
            "email" : card_email // user email to recieve a notice  
        })
      };
      
      fetch(`https://scl.clover.com/v1/customers/${clv_id}`, options)        
        .then(response => response.json())
        .then(response => {
            console.log(response)

            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
              };
        
            fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${clv_id}?expand=cards`, options)
              .then(response => response.json())
              .then(response => { 
                console.log(response);
                // console.log(response.cards.elements);
                console.log(response.cards.elements[0]);

                const u_id = req.session.loginData.id;
                const $clv_id = clv_id;
                const cd_id = response.cards.elements[0].id;
                const clv_tk = response.cards.elements[0].token;
                const cardholder = card_holder;
                const first6 = response.cards.elements[0].first6;
                const last4 = response.cards.elements[0].last4;
                const exp = response.cards.elements[0].expirationDate;
                const zip = response.cards.elements[0].additionalInfo.zip;
                const type = response.cards.elements[0].cardType;
                const email = card_email;                
                const indate = getDate(); 
                
                checkDefault().then((data) => { 
                    console.log("checkDefault().then((data) =>");
                    
                    addBillingInfo();            
                });

                function checkDefault() {
                    return new Promise((resolve, reject) => {
                        if (default_check === 'default') {
                            db.getConnection((con)=>{
                                con.query('SELECT id from billing_info WHERE id=?', [u_id],(err, result) => {
                                    if (err) {
                                        res.send(err);
                                        // con.end();
                                    } else if (result !== undefined) {
                                        console.log(result)                
                                        con.query('UPDATE billing_info SET default_payment = "n" where id =?', [u_id]);
                                        resolve();
                                    }                     
                                }); 
                                con.release();
                            }); 
                        } else {
                            addBillingInfo();  
                        }
                    });
                } 

                
                function addBillingInfo() {
                    db.getConnection((con)=>{
                        con.query('INSERT INTO billing_info (id, clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, default_payment, indate, address1, address2, city, state, address_zip, phone, email) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                        [u_id, $clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, default_check, indate, address1, address2, city, state, address_zip, phone, email], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log("addBillingInfo()");
                                console.log(result)
                                result.protocol41 == true ? res.send({result : "ok"}) : res.send({result:"sorry... something wrong in DB SERVER."}); 
                                // res.send(result);
                            }
                        });
                        con.release();
                    }); 
                }
                
            })
            .catch(err => console.error(err));})
            
        .catch(err => console.error(err));
})



app.post('/make_default_billing_info', (req,res) => {
    let u_id = req.body.id;
    let bi_number = req.body.billing_index;

    db.getConnection((con)=>{
        con.query('UPDATE cafefore.billing_info SET default_payment="n" WHERE id = ?', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result);  
                con.query('UPDATE cafefore.billing_info SET default_payment="default" WHERE id = ? and bi_number = ?', [u_id, bi_number], (err, result) => {
                    if (err) {
                        res.send(err);
                        // con.end();
                    } else {
                        console.log(result);
                        con.query('SELECT clv_id FROM cafefore.billing_info WHERE id = ?', [u_id], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log(result);

                                const options = {
                                method: 'GET',
                                    headers: {
                                    accept: 'application/json',
                                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                                    }
                                };
                    
                                fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
                                .then(response => response.json())
                                .then(response => { 
                                    console.log(response);
                                    let res_data = response.cards.elements.map(element => {
                                        return element.id;
                                    })
                                    console.log(res_data);
                                    
                                    con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM cafefore.billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
                                        if (err) {
                                            res.send(err);
                                            // con.end();
                                        } else {
                                            console.log(result);
                                            res.send(result);
                                        }
                                    });                                    
                                })
                                .catch(err => console.error(err));
                            }
                        });
                    }                    
                });
            }
        });
        con.release();
    });
});



app.post('/delete_payment_method', (req,res) => {
    console.log('/delete_payment_method /delete_payment_method /delete_payment_method/delete_payment_method')
    let u_id = req.body.id;
    let bi_number = req.body.card_index;
    let default_payment = req.body.default_payment;

    const outdate = getDate();
    console.log(req.session.loginData.id)
    console.log(default_payment);
    console.log(bi_number)

    if (u_id === req.session.loginData.id) {

        checkDefaultPayment().then(() => { 
            console.log("check Default payment promise");
            // console.log(data);
            makeUpdateBillingInfo();
        });


        function checkDefaultPayment() {
            return new Promise((resolve, reject) => { 
                if (default_payment == 'default') {
                    db.getConnection((con)=>{
                        con.query('select * from billing_info where id= ? and inuse="y" order by indate desc', [u_id],(err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log(result);                    
                                // res.send(result);
                                if (result.length > 1 && result[0].default_payment !== 'default') {
                                    const new_default_payment_bi_number = result[0].bi_number;
                                    console.log('new_default_payment')
                                    console.log(new_default_payment_bi_number)
                                    con.query('UPDATE billing_info SET default_payment="default" WHERE bi_number = ?', [new_default_payment_bi_number],
                                    (err, result) => {
                                        if (err) {
                                            res.send(err);
                                            // con.end();
                                        } else {
                                            console.log(result); 
                                            resolve();  
                                        }
                                    });
                                }
                                else if (result.length > 1 && result[0].default_payment == 'default') {
                                    const new_default_payment_bi_number = result[1].bi_number;
                                    console.log('new_default_payment')
                                    console.log(new_default_payment_bi_number)
                                    con.query('UPDATE billing_info SET default_payment="default" WHERE bi_number = ?', [new_default_payment_bi_number],
                                    (err, result) => {
                                        if (err) {
                                            res.send(err);
                                            // con.end();
                                        } else {
                                            console.log(result); 
                                            resolve();     
                                        }
                                    });
                                } else if (result.length == 1) { // last default
                                    console.log('last default payment')
                                    resolve();
                                } else res.send({ some: 'no more billing info' });

                            }
                        });
                        con.release();
                    });
                } else makeUpdateBillingInfo();
            }); 
        }


        
        
    } else {
        res.send("check your ID");
    }


    function makeUpdateBillingInfo() {
        console.log("makeUpdateBillingInfo")
        db.getConnection((con)=>{
            con.query('UPDATE billing_info SET inuse = "n", default_payment = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, bi_number],
            (err, result) => {
                if (err) {
                    res.send(err);
                    // con.end();
                } else {
                    console.log(result);  
                    con.query('SELECT clv_id FROM billing_info WHERE id = ?', [u_id], (err, result) => {
                        if (err) {
                            res.send(err);
                            // con.end();
                        } else {
                            console.log(result);

                            const options = {
                            method: 'GET',
                                headers: {
                                accept: 'application/json',
                                authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                                }
                            };
                
                            fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
                            .then(response => response.json())
                            .then(response => { 
                                console.log(response);
                                let res_data = response.cards.elements.map(element => {
                                    return element.id;
                                })
                                console.log(res_data);
                                
                                con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
                                    if (err) {
                                        res.send(err);
                                        // con.end();
                                    } else {
                                        console.log(result);
                                        res.send(result);
                                    }
                                });                                    
                            })
                            .catch(err => console.error(err));
                        }
                    });
                }
            });
            con.release();
        });
    }

});



app.post('/make_default_shipping_info', (req,res) => {
    let u_id = req.body.id;
    let sh_number = req.body.shipping_index;

    db.getConnection((con)=>{
        con.query('UPDATE shipping_info SET default_address="n" WHERE id = ?', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result);  
                con.query('UPDATE shipping_info SET default_address="default" WHERE id = ? and sh_number = ?', [u_id, sh_number], (err, result) => {
                    if (err) {
                        res.send(err);
                        // con.end();
                    } else {
                        console.log(result);
                        con.query('SELECT * FROM shipping_info WHERE id = ? and inuse = "y"', [u_id], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else res.send(result);  
                        });
                    }
                });
            }
        }); con.release();
    });
});


app.post('/delete_shipping_info', (req,res) => {
    console.log('delete_shipping_info delete_shipping_info delete_shipping_info')
    let u_id = req.body.id;
    let sh_number = req.body.shipping_index;
    let default_address = req.body.default_address;
    console.log('default_address');
    console.log(default_address);
    const outdate = getDate();
    console.log(req.session.loginData.id)

    if (u_id === req.session.loginData.id) {       

        checkDefaultAddress().then((data) => { 
            console.log("checkDefaultAddress promise");
            console.log(data);
            makeUpdateShippingInfo();        
    
        });

        function checkDefaultAddress() {
            return new Promise((resolve, reject) => { 
                if (default_address === 'default') {
                    db.getConnection((con)=>{
                        con.query('select * from shipping_info where id= ? and inuse="y" order by indate desc', [u_id],
                        (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log(result);                    
                                // res.send(result);
                                if (result.length > 1 && result[0].default_address !== 'default') {
                                    let new_default_address_sh_num = result[0].sh_number;
                                    console.log('new_default_address')
                                    console.log(new_default_address_sh_num)
                                    con.query('UPDATE shipping_info SET default_address="default" WHERE sh_number = ?', [new_default_address_sh_num],
                                    (err, result) => {
                                        if (err) {
                                            res.send(err);
                                            // con.end();
                                        } else {
                                            console.log(result); 
                                            resolve();  
                                        }
                                    });
                                }
                                else if (result.length > 1 && result[0].default_address == 'default') {
                                    let new_default_address_sh_num = result[1].sh_number;
                                    console.log('new_default_address')
                                    console.log(new_default_address_sh_num)
                                    con.query('UPDATE shipping_info SET default_address="default" WHERE sh_number = ?', [new_default_address_sh_num],
                                    (err, result) => {
                                        if (err) {
                                            res.send(err);
                                            // con.end();
                                        } else {
                                            console.log(result); 
                                            resolve();                   

                                        }
                                    });
                                } else if (result.length == 1) { // last default
                                    console.log('last default')
                                    resolve();
                                } else res.send({ some: 'no more shipping info' });

                            }
                        });
                        con.release();
                    });
                } else makeUpdateShippingInfo();
            }); 
        }

        function makeUpdateShippingInfo() {
            db.getConnection((con)=>{
                con.query('UPDATE shipping_info SET inuse = "n", default_address = "n", outdate = ? WHERE id = ? and sh_number = ?', [outdate, u_id, sh_number],
                (err, result) => {
                    if (err) {
                        res.send(err);
                        // con.end();
                    } else {
                        console.log(result);  
                        con.query('SELECT * FROM shipping_info WHERE id=? and inuse = "y"', [u_id],
                        (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log("res.send(result)")
                                console.log(result)
                                res.send(result);   
                            }              
                            
                        })                  

                    }
                });
                con.release();
            });
        }
    }
});

app.post('/edit_profile_shipping', (req,res) => {
    console.log("/edit_profile_shipping /edit_profile_shipping /edit_profile_shipping")
        
    console.log(req.body)

    const u_id = req.session.loginData.id;
    const sh_number = req.body.shipping_address_index;
    const recipient = req.body.shipping_recipient;
    const address1 = req.body.shipping_address_street_line1;
    const address2 = req.body.shipping_address_street_line2;
    const city = req.body.shipping_address_city;
    const state = req.body.shipping_address_state;
    const zip = req.body.shipping_address_zip;
    const phone = req.body.shipping_address_phone;
    const email = req.body.shipping_address_email;
    const option = req.body.shipping_address_option;
    const default_check = req.body.default_address;
    const indate = getDate();

    console.log(u_id);
    console.log(sh_number);
    console.log(default_check);

    checkDefault().then(() => { 
        editShippingInfo();
    });

    function checkDefault() {
        return new Promise((resolve, reject) => {            
            if (default_check === 'default') {                
                console.log("default check");
                db.getConnection((con)=>{
                    con.query(`UPDATE shipping_info SET default_address = "n" WHERE default_address = "default" and id = ?`, [u_id], (err, result) => {
                        if (err) {
                            res.send(err);
                            // con.end();
                        } else console.log(result);
                    });
                    con.release();
                });                
            } resolve();
        });
    }

    function editShippingInfo() {
        console.log("UPDATE shipping_info SET recipient = ?, addre ");
        db.getConnection((con)=>{
            con.query(`UPDATE shipping_info SET recipient = ?, address1 =?, address2 =?, city=?, state=?, zip = ?, phone = ?, email = ?, shipping_option = ?, default_address = ?, indate = ? WHERE id = ? and sh_number = ?`,
            [recipient, address1, address2, city, state, zip, phone, email, option, default_check, indate, u_id, sh_number], (err, result) => {
                if (err) {
                    res.send(err);
                    // con.end();
                } else {
                    console.log(result)
                    result.protocol41 == true ? res.send({result : "ok"}) : res.send("sorry... something wrong in DB SERVER.");                    
                }
            });
            con.release();
        });
    }

});

// app.post('/add_profile_shipping_test', (req,res) => {
//     console.log(`req contact: ${req}`);
//     console.log(req.body);
//     const test = {test : req.body}

//     res.send(test)

// });


app.post('/add_profile_shipping', (req,res) => {
    // console.log(`req contact: ${req}`);
    // console.log(req.body);

    const u_id = req.session.loginData.id;
    const recipient = req.body.shipping_recipient;
    const address1 = req.body.shipping_address_street_line1;
    const address2 = req.body.shipping_address_street_line2;
    const city = req.body.shipping_address_city;
    const state = req.body.shipping_address_state;
    const zip = req.body.shipping_address_zip;
    const phone = req.body.shipping_address_phone;
    const email = req.body.shipping_address_email;
    const option = req.body.shipping_address_option;
    const default_check = req.body.default_address;
    const indate = getDate();

    console.log(u_id);

    checkDefault().then(() => {         
        addShippingInfo();
    });

    function checkDefault() {
        return new Promise((resolve, reject) => {
            if (default_check == 'default') { 
                db.getConnection((con)=>{
                    con.query('SELECT id from shipping_info WHERE id=?', [u_id],(err, result) => {
                        if (err) {
                            res.send(err);
                            // con.end();
                        } else if (result !== undefined) {
                            console.log("UPDATE shipping_info SET default_address = n where id =?");                             
                            console.log(result)                
                            con.query('UPDATE shipping_info SET default_address = "n" where id =?', [u_id])
                            resolve();
                        }                     
                    });
                    con.release();
                });
            } else {
                addShippingInfo();  
            }
        });
    } 

    function addShippingInfo() {
        console.log("add ship info")
        db.getConnection((con)=>{
            con.query('INSERT INTO shipping_info (id, recipient, address1, address2, city, state, zip, phone, email, shipping_option, default_address, indate) values (?,?,?,?,?,?,?,?,?,?,?,?)', 
                [u_id, recipient, address1, address2, city, state, zip, phone, email, option, default_check, indate], (err, result) => {
                if (err) {
                    res.send(err);
                    // con.end();
                } else {
                    console.log(result);
                    if (result.protocol41 == true) {
                        res.send({result : "ok"});                        
                    } else res.send("sorry... something wrong in DB SERVER.");                        
                }
            });
            con.release();
        });
    }    
});



//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.post('/get_item_info',(req,res) => {

    console.log('/get_item_info get_item_info get_item_info get_item_infoget_item_info')
    console.log(req.body);
    const prodnum = req.body.prodnum;

    db.getConnection((con)=>{
        con.query('SELECT * FROM product WHERE prodnum = ?',[prodnum], (err, result) => {
            if(err){
                res.send(err);               
            } else {
                res.send(result);            
            }                        
        });
        con.release();
    });  
})


app.post('/shop',(req,res) => {
    console.log(`req test: ${req}`);  
    console.log(req.body);
    console.log("shop post/ shop post/ shop post/ shop post/ shop post/ shop post/ ");
    console.log("db");
        console.log(db);
        console.log(db.getConnection);
        
    
    db.getConnection((con)=>{      

        con.query('SELECT * from product where useyn = "y"', (err, result) => {
            if(err){
                res.send(err);
                console.log(err);
                // con.end();        
            } else {              

                res.send(result);                
            }                        
        });    
        con.release();
    });
});



app.post('/shop/view/item/:item_number',(req,res) => {   
    const product_number = req.params.item_number
            
    db.getConnection((con)=>{
        con.query('SELECT * from product where prodnum = ?', [product_number], (err, result) => {
            if(err){
                res.send(err);
                // con.end();            
            } else {
                console.log(result[0]);
                res.send(result[0]);                
            }
        });
        con.release();
    });    
});


app.post('/shop_category',(req,res) => { 
    
    let kind = "";
  switch (req.body.shop_category){
    case 'wellness': 
        kind = 'wellness';
      break; 
    case 'dessert':
        kind = 'dessert';
      break;
    case 'kids':
        kind = 'kids'; 
      break;
    case 'gift':
        kind = 'gift'; 
      break; 
  }
    
    db.getConnection((con)=>{   
        con.query('SELECT * from product WHERE useyn="y" and kind = ?', [kind],(err, result) => {
            if(err){
                res.send(err);
                console.log(err);
                // con.end();        
            } else {
               
                res.send(result);                
            }                        
        });    
        con.release();
    });
});

app.post('/shop_search', (req,res) => {
  
    const name = req.body.shop_search_item;

    db.getConnection((con)=>{   
        con.query('SELECT * from product WHERE useyn="y" and name LIKE ?', ['%' + name + '%'],(err, result) => {
            if(err){
                res.send(err);
                console.log(err);
                // con.end();        
            } else {
                if (result.length > 0) {               
                console.log(`${result[0].prodnum}`);
                }

                res.send(result);                
            }                        
        });    
        con.release();
    });
});



app.post('/overwrite_cart', (req,res) => {
 
    const u_id = req.body[0].u_cart[0].u_id == req.session.loginData.id ? req.session.loginData.id : false;
    const overwrite_cart = req.body[0].overwrite_cart;
    const date = getDate();
    let cart_num = date.replace(/\s|:|\-/g,"") + "CT" + u_id.substr(0, 3);
    let overwrite_cart_tmp = [...overwrite_cart];
    let insert_items = [];
    let update_items = [];
    let update_items_prodnum = [];
    console.log(overwrite_cart)
    console.log(overwrite_cart_tmp)

    if (u_id) {
        db.getConnection((con)=>{
            con.query('SELECT prodnum, cartnum FROM cart WHERE u_id = ? and result = "n"', [u_id], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();            
                } else {
                    console.log("result");
                    console.log(result);

                    if (result == undefined) {
                        const insert_cart_query = "INSERT INTO `cart` (`cartnum`,`u_id`,`prodnum`,`quantity`,`result`,`indate`,`modate`) values ?;"
                        let insert_cart_value = [];
                        let insert_cart_value_element = [];                    
                        for(let i in overwrite_cart) {
                            insert_cart_value_element.push(cart_num);
                            insert_cart_value_element.push(u_id);
                            insert_cart_value_element.push(overwrite_cart[i].c_item_no);
                            insert_cart_value_element.push(overwrite_cart[i].c_item_quantity);
                            insert_cart_value_element.push('n');
                            insert_cart_value_element.push(date);
                            insert_cart_value_element.push(date);
                            insert_cart_value.push(insert_cart_value_element);
                            insert_cart_value_element = [];
                        }
                        console.log(insert_cart_value)  
                        con.query(insert_cart_query, [insert_cart_value], (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {        
                                console.log("con.query(insert_cart_query, [insert_cart_value], (err, result)");                      
                                console.log(result);
                            }
                        });
                    } else {
                        console.log('overwrite_cart before for')
                        console.log(overwrite_cart)
                        console.log('overwrite_cart_tmp before for')
                        console.log(overwrite_cart_tmp)
                        console.log(overwrite_cart_tmp[0])
                    
                        for (let i in overwrite_cart) {
                            for (let j in result) {                       
                                if (result[j].prodnum == overwrite_cart[i].c_item_no) {
                                    // update db
                                    update_items.push(overwrite_cart[i]);
                                    update_items_prodnum.push(overwrite_cart[i].c_item_no);
                                    delete overwrite_cart_tmp[i];
                                }
                            }
                        }

                        insert_items = overwrite_cart_tmp.filter(element => element != null);
                        
                        console.log('overwrite_cart after for')
                        console.log(overwrite_cart)
                        console.log('overwrite_cart_tmp')
                        console.log(overwrite_cart_tmp)
                        console.log('insert_items')
                        console.log(insert_items)
                        const update_query_1 = "UPDATE cart SET quantity = (case ";
                        let update_query_2 = '';
                        for (let i in update_items) {
                            update_query_2 = update_query_2 + `when cafefore.cart.prodnum = '${update_items[i].c_item_no}' then '${update_items[i].c_item_quantity}' `
                        }
                        const update_query_3 = `end), modate = '${date}' WHERE cafefore.cart.prodnum IN (${update_items_prodnum}) AND u_id = '${u_id}' and result="n";`
                        const update_query = update_query_1 + update_query_2 + update_query_3;
                        console.log(update_query)

                        const insert_cart_query = "INSERT INTO `cart` (`cartnum`,`u_id`,`prodnum`,`quantity`,`result`,`indate`,`modate`) values ?;"
                        let insert_cart_value = [];
                        let insert_cart_value_element = [];                    
                        for(let i in insert_items) {
                            insert_cart_value_element.push(cart_num);
                            insert_cart_value_element.push(u_id);
                            insert_cart_value_element.push(insert_items[i].c_item_no);
                            insert_cart_value_element.push(insert_items[i].c_item_quantity);
                            insert_cart_value_element.push('n');
                            insert_cart_value_element.push(date);
                            insert_cart_value_element.push(date);
                            insert_cart_value.push(insert_cart_value_element);
                            insert_cart_value_element = [];
                        }
                        console.log("insert_cart_value") 
                        console.log(insert_cart_value)  


                        if (update_items.length > 0) {
                            con.query(update_query ,(err, result) => {
                                if(err) {
                                    res.send(err);
                                    console.log(err);
                                } else {        
                                    console.log("con.query(update_query ,(err, result) =>");                      
                                    console.log(result);
                                }
                            });
                        }

                        if (insert_cart_value.length > 0) {
                            con.query(insert_cart_query, [insert_cart_value], (err, result) => {
                                if(err) {
                                    res.send(err);
                                    console.log(err);
                                } else {        
                                    console.log("con.query(insert_cart_query, [insert_cart_value], (err, result)");                      
                                    console.log(result);
                                }
                            });
                        }

                        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id], (err, result) => {
                            if(err){                        
                                res.send(err);
                                // con.end();            
                            } else {
                             
                                res.send(result)
                            }
                        })
                    }
                }
            });
            con.release();
        });
    } else res.send("ID check or login check please")





})



app.post('/shop/checkout/:id', (req,res) => {
    console.log('/shop/checkout/:id /shop/checkout/:id /shop/checkout/:id /shop/checkout/:id')
    console.log(req.body.u_id);

    const u_id = req.body.u_id;

   
    db.getConnection((con)=>{
        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id] ,(err, result) => {
            if(err){                        
                res.send(err);
                // con.end();            
            } else {
                console.log("result");
                console.log(result);                
                res.send(result);
            }
        });
        con.release();
    });
});



app.post(`/get_user_default_billing_info`, (req,res) => {
    console.log('/get_user_default_billing_info /get_user_default_billing_info /get_user_default_billing_info ');
    
    const u_id = req.body.u_id;

    db.getConnection((con)=>{
        con.query('SELECT cardholder, type, last4, exp FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log(result);            
                res.send(result);
            }
        }); 
        con.release();
    });
});

app.post(`/get_user_default_shipping_info`, (req,res) => {
    console.log('get_user_default_shipping_info get_user_default_shipping_info get_user_default_shipping_info ');
    
    const u_id = req.body.u_id;

    db.getConnection((con)=>{
        con.query('SELECT recipient, address1, address2, city, state, zip, phone, email, shipping_option FROM shipping_info WHERE id= ? and default_address="default" and inuse="y"',[u_id], (err, result) => {
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log(result);            
                res.send(result);
            }
        }); 
        con.release();
    });
});


app.post('/check_user_cart', (req,res) => {
    console.log('/check_user_cart /check_user_cart /check_user_cart /check_user_cart')
    console.log(req.body.u_id);

    const u_id = req.body.u_id;
   
    db.getConnection((con)=>{
        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id] ,(err, result) => {
            if(err){                        
                res.send(err);
                con.end();
            
            } else {
                res.send(result);
            }
        });
        con.release();
    });
});



app.post('/item_addup_v2', (req,res) => {
    let user_id = req.body.u_id;
    let item_num = req.body.item_num;
    let selected_number = req.body.selected_num;
    let u_id = req.session.loginData.id;
    
    let date = getDate();

    if (user_id == u_id) {        
        db.getConnection((con)=>{
            con.query('UPDATE cart SET quantity=cart.quantity + 1, modate = ? where u_id = ? and prodnum = ? and result = "n"', [date, u_id, item_num]
                ,(err, result) => {
                    if(err){                        
                        res.send(err);
                        // con.end();                    
                    } else {
                        console.log("result");
                        console.log(result);
                        con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
                        ,(err, result) => {
                            if(err){                        
                                res.send(err);
                                // con.end();                            
                            } else {
                                console.log("result");
                                console.log(result);                                
                                res.send(result);
                            }
                        });               
                    }
            });
            con.release();
        });
    } else res.send("check user ID");
});

app.post('/item_subtract_v2', (req,res) => {
    const user_id = req.body.u_id;
    const item_num = req.body.item_num;
    const selected_number = req.body.selected_num;
    const u_id = req.session.loginData.id;
    const date = getDate();

    if (user_id == u_id) {        
        db.getConnection((con)=>{
            con.query('UPDATE cart SET quantity=cart.quantity - 1, modate =? where u_id=? and prodnum=? and result = "n"', [date, u_id, item_num] ,(err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();                    
                } else {
                    console.log("result");
                    console.log(result);
                    con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
                    ,(err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();                            
                        } else {
                            console.log("result");
                            console.log(result);                        
                            res.send(result);
                        }
                    });  
                }
            });
            con.release();
        });
    } else res.send("check user ID");
})

app.post('/item_delete_v2', (req,res) => {
    const user_id = req.body.u_id;
    const item_num = req.body.item_num;
    const selected_number = req.body.selected_num;
    const u_id = req.session.loginData.id;
    
    if (user_id == u_id) {      
        db.getConnection((con)=>{
            con.query('DELETE FROM cart WHERE u_id=? and prodnum=? and result = "n"', [u_id, item_num] ,(err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();
                
                } else {
                    console.log("result");
                    console.log(result);
                    con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
                    ,(err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();                        
                        } else {
                            console.log("result");
                            console.log(result);                        
                            res.send(result);
                        }
                    }); 
                }
            });
            con.release();
        });
    }
});

app.post('/cancel_order', (req,res) => {
    console.log('/cancal_order cancal_order cancal_order ')
    console.log(req.body);
    const order_num = req.body.order_number; 
    const u_id = req.body.user_id;
    const page_num = req.body.page_num;
    
    const date = getDate();
    db.getConnection((con)=>{        
        con.query('SELECT * FROM cart JOIN orders on cart.order_number = orders.order_number left join ups_ship_info on orders.order_number = ups_ship_info.order_number WHERE refund = "n" and cart.order_number = ? and cart.u_id = ?', [order_num, u_id] ,(err, result_param) => {
            if(err){                        
                res.send(err);
                       
            } else {
                console.log("result_param");
                console.log(result_param);
                const left_over = result_param.map(element => {
                    return element;
                })
                const cart_nums = result_param.map(element => {
                    return element.cartnum;
                })
                const item_prodnums = result_param.map(element => {
                    return element.prodnum;
                })
                const cancel_request_email = result_param[0].email;
                const recipient = result_param[0].recipient;
                const order_items_count = result_param[0].order_items_count;
           

                if (result_param.length == order_items_count) {
                    console.log("result_param.length == order_items_count");
                    const refund_amount_cancel_order_for_email = result_param[0].total_order_amount;
                    console.log(refund_amount_cancel_order_for_email);
                    con.query('SELECT clv_charge_id, product.name from orders JOIN cart on cart.order_number = orders.order_number left join product on product.prodnum = cart.prodnum WHERE shipment = "n" and orders.order_number = ?  and orders.u_id = ?', [order_num, u_id] ,(err, result) => {
                    // con.query('SELECT clv_charge_id from orders WHERE shipment = "n" and order_number = ? and u_id = ?', [order_num, u_id] ,(err, result) => {        
                        if(err){                        
                            res.send(err);
                            // con.end();        
                        } else {
                            console.log(result);
                            
                            const options = {
                                method: 'POST',
                                headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                                },
                                body: JSON.stringify({charge: result[0].clv_charge_id})
                            };
                            
                            fetch('https://scl.clover.com/v1/refunds', options)
                            .then(response => response.json())
                            .then(response => {

                                if (response.status == 'succeeded') { 
                                    console.log(response)
                                    const cancel_item_mes_1 = 
                                    `Hello, ${recipient}.
                                    This is cafe FORE.
                                    
                                    Your cancel request has been accepted.
                                    
                                    Cancel order amount total : $${parseFloat(refund_amount_cancel_order_for_email).toFixed(2)}

                                    `;
                                    let cancel_item_mes_2 = '';
                                    for (let i in result) {
                                        cancel_item_mes_2 = cancel_item_mes_2 + `item : '${result[i].name}'`+ `\n`;
                                    }                           

                                    const cancel_item_mes_3 = 
                                    `
                                    Refund may take 2-5 business days to appear in your account.

                                    ${date}
                                    Thank you for chooing cafe FORE.
                                    `;
                                    const main_message = cancel_item_mes_1 + cancel_item_mes_2 + cancel_item_mes_3;                      
                                    const subject_message = `cafe FORE item order cancel has been accepted`; 
                                    //////////////////// cancel order send email ///////////////////
                                    sendMailSESTemplate(cancel_request_email, main_message, subject_message);

                                    con.query('UPDATE orders SET full_refunded = "y" where order_number = ?', [order_num] ,(err, result) => { 
                                        if(err){                        
                                            res.send(err);                                               
                                        } else {
                                            console.log(result);
                                            makeAllItemsRefundFlag(order_num, con);
                                            (u_id == 'GUEST') ? checkGuestPurchaseHistory(order_num, con, res) : checkPurchaseHistory(u_id, con, res, page_num);                                                   
                                        }
                                    });
                                    
                                }
                            })
                            .catch(err => console.error(err));
                        } 
                    });   
                } else {
                    console.log("cancel order left over items")
                    const cancel_order_flag = true;
                    cancelOrderItems(left_over, u_id, order_num, cart_nums, item_prodnums, con, res, cancel_order_flag, page_num); 
                }
            }
        });
        con.release();         
    })
});


app.post('/cancel_order_item', (req,res) => {
    console.log('/cancal_order item cancal_order item cancal_order item')
    console.log(req.body);
    const cartnum = req.body.cart_number;
    const ordernum = req.body.order_number;
    const prodnum = req.body.prodnum;
    const u_id = req.body.user_id;
    const page_num = req.body.page_num;

    db.getConnection((con)=>{
        con.query('SELECT cartnum, orders.clv_order_id, shipping_fee, email, recipient FROM orders join cart on cart.order_number = orders.order_number left join ups_ship_info on orders.order_number = ups_ship_info.order_number WHERE refund = "n" and orders.order_number = ? and orders.u_id = ?', [ordernum, u_id] ,(err, result_param) => {
        // con.query('SELECT cartnum, orders.clv_order_id, shipping_fee FROM orders join cart on cart.order_number = orders.order_number WHERE refund = "n" and orders.order_number = ? and orders.u_id = ?', [ordernum, u_id] ,(err, result_param) => {
            if(err){                        
                res.send(err);            
            } else {
                console.log(result_param);
                cancelOrderItems(result_param, u_id, ordernum, cartnum, prodnum, con, res, '', page_num);           
            }
        });
        con.release();             
    });
});

function getUPSLineItemID(order_num) {
    // let ups_line_id = '';
    return new Promise((resolve, reject) => { 
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        };
        
        fetch(`https://api.clover.com/v3/merchants/${process.env.MERCHANT_ID}/orders/${order_num}/line_items`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const ups_info = response.elements.filter(element => {
                return element.name.substr(0, 3) == "UPS" ? true : false;
            });
            console.log("ups_info");
            console.log(ups_info);
            const shipping_fee = {
                parent : ups_info[0].id,
                amount : ups_info[0].price * 1.06,
                description : "UPS Shipping",
                quantity : 1,
                type:"sku"       
            }
            resolve(shipping_fee);
            
        })
        .catch(err => console.error(err));
    })

}



function cancelOrderItems(result_param, u_id, ordernum, cartnum, prodnum, con, res, cancel_order_flag, page_num) {
    console.log("cancelOrderItems(result_param,");
    console.log(result_param);
    console.log(result_param.length);
    const cancel_request_email = result_param[0].email;
    const recipient = result_param[0].recipient;
    const date = getDate();
    getUPSLineItemID(result_param[0].clv_order_id).then(data => {
        const shipping_fee = data;        
        console.log(shipping_fee)      

        if (result_param.length > 1) {            
            con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where result = "y" and cartnum in (?) and u_id = ? and product.prodnum in (?)', [cartnum, u_id, prodnum] ,(err, result) => {
            // con.query('SELECT order_number, item_code, quantity from cart where result = "y" and cartnum = ? and u_id = ?', [cartnum, u_id] ,(err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log(result); 
                    let refund_amount_for_email = 0;                  
                    result.forEach(element => {
                        refund_amount_for_email = refund_amount_for_email + (element.price_sell * element.quantity) * 1.06; 
                    });
                    

                    const items = result.map(element => {
                        return { 
                            parent : element.item_code,
                            amount : element.price_sell * 100 * element.quantity * 1.06,
                            description : element.name,
                            quantity : element.quantity,
                            type:"sku"                            
                        }                
                    });

                    if (cancel_order_flag && cancel_order_flag == true) {
                        items.push(shipping_fee);
                        refund_amount_for_email = refund_amount_for_email + (shipping_fee.amount/100);
                    }                  
                    
                    console.log(items);

                    const options = {
                        method: 'POST',
                        headers: {accept: 'application/json', 
                        'content-type': 'application/json',
                        authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({
                        "items":items
                        })
                    };
                
                    fetch(`https://scl.clover.com/v1/orders/${result[0].clv_order_id}/returns`, options)
                    .then(response => response.json())
                    .then(response => {                      
                                            
                        console.log(response);                       
                        
                        if (response.status == 'returned') { 
                            const cancel_item_mes_1 = 
                            `Hello, ${recipient}.
                            This is cafe FORE.
                            
                            Your cancel item request has been accepted.
                            
                            Cancel order amount total : $${parseFloat(refund_amount_for_email).toFixed(2)}

                            `;
                            let cancel_item_mes_2 = '';
                            for (let i in result) {
                                cancel_item_mes_2 = cancel_item_mes_2 + `item : '${result[i].name}'`+ `\n`;
                            }                           

                            const cancel_item_mes_3 = 
                            `
                            Refund may take 2-5 business days to appear in your account.

                            ${date}
                            Thank you for chooing cafe FORE.
                            `;
                            const main_message = cancel_item_mes_1 + cancel_item_mes_2 + cancel_item_mes_3;                      
                            const subject_message = `cafe FORE item order cancel has been accepted`; 
                            ////////////////////////////  item order cancel email send //////
                            sendMailSESTemplate(cancel_request_email, main_message, subject_message);

                            const returned_amount = response.items.map(element => {
                                return element.amount / 100;                        
                            });

                            const update_query_1 = "UPDATE cart SET refund = 'y', refund_amount = (CASE ";
                            let update_query_2 = '';
                            for (let i in returned_amount) {
                                update_query_2 = update_query_2 + `WHEN cafefore.cart.prodnum = '${prodnum[i]}' THEN '${returned_amount[i]}' `
                            }                           
                            const update_query = update_query_1 + update_query_2;
                            console.log(update_query)
                            con.query(update_query + 'end) WHERE cafefore.cart.cartnum IN (?)',[cartnum] ,(err, result) => {
                            
                                if(err){                        
                                    res.send(err);
                                    // con.end();        
                                } else {
                                    console.log("returned items DB updated"); 
                                    makeFullRefundFlag(ordernum, con).then(e => {
                                        (u_id == 'GUEST') ? checkGuestPurchaseHistory(ordernum, con, res) : checkPurchaseHistory(u_id, con, res, page_num);                                    
                                    });
                                } 
                            });   
                        } else res.send("error : refund occur error");            
                    })
                    .catch(err => console.error(err));                   
                } 
            });
        
        } else if (result_param.length == 1) {
            console.log("else if (result_param.length == 1)");
            con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where result = "y" and cartnum in (?) and u_id = ? and product.prodnum in (?)', [cartnum, u_id, prodnum] ,(err, result) => {           
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log(result);
                    
                    let refund_amount_for_email = 0;                  
                    result.forEach(element => {
                        refund_amount_for_email = refund_amount_for_email + (element.price_sell * element.quantity) * 1.06; 
                    });
                    const refund_amount_for_email_with_shipping_fee = refund_amount_for_email + (shipping_fee.amount/100);

                    const items = result.map(element => {
                        return { 
                            parent : element.item_code,
                            amount : element.price_sell * 100 * element.quantity * 1.06,
                            description : element.name,
                            quantity : element.quantity,
                            type:"sku"                            
                        }                
                    });

                    items.push(shipping_fee);
                    console.log("items");
                    console.log(items);
                    
                    const refunded = result.filter(element => {
                        return element.refund == 'y';
                    });
                    console.log("refunded")
                    console.log(refunded)

                    let refunded_amount = 0;
                    refunded.forEach(element => {
                        refunded_amount = refunded_amount + element.refund_amount;                    
                    })
                    const options = {
                        method: 'POST',
                        headers: {accept: 'application/json', 
                        'content-type': 'application/json',
                        authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({"items":items})
                    };
                
                    fetch(`https://scl.clover.com/v1/orders/${result[0].clv_order_id}/returns`, options)
                    .then(response => response.json())
                    .then(response => {                      
                                            
                        console.log(response);
                        
                        if (response.status == 'returned') {

                            const cancel_item_mes_1 = 
                            `Hello, ${recipient}.
                            This is cafe FORE.
                            
                            Your cancel item request has been accepted.
                            
                            Cancel order amount total : $${parseFloat(refund_amount_for_email_with_shipping_fee).toFixed(2)}

                            `;
                            let cancel_item_mes_2 = '';
                            for (let i in result) {
                                cancel_item_mes_2 = cancel_item_mes_2 + `item : '${result[i].name}'`+ `\n`;
                            }                           

                            const cancel_item_mes_3 = 
                            `
                            Refund may take 2-5 business days to appear in your account.

                            ${date}
                            Thank you for chooing cafe FORE.
                            `;
                            const main_message = cancel_item_mes_1 + cancel_item_mes_2 + cancel_item_mes_3;                      
                            const subject_message = `cafe FORE item order cancel has been accepted`; 
                            ////////////////////////////  item order cancel email send //////
                            sendMailSESTemplate(cancel_request_email, main_message, subject_message);

                            const returned_amount = response.items.map(element => {
                                return element.amount / 100;                        
                            });

                            const update_query_1 = "UPDATE cart SET refund = 'y', refund_amount = (CASE ";
                            let update_query_2 = '';
                            for (let i in returned_amount) {
                                update_query_2 = update_query_2 + `WHEN cafefore.cart.prodnum = '${prodnum[i]}' THEN '${returned_amount[i]}' `
                            }                           
                            const update_query = update_query_1 + update_query_2;
                            console.log(update_query)
                            con.query(update_query + 'end) WHERE cafefore.cart.cartnum IN (?)',[cartnum] ,(err, result) => {
                            // con.query('UPDATE cart SET refund = "y", refund_amount = ? where cartnum = ? and prodnum = ?', [amount_returned, cartnum, last_refund[0].prodnum] ,(err, result) => { 
                                if(err){                        
                                    res.send(err);
                                    // con.end();        
                                } else {
                                    console.log(result);
                                    makeFullRefundFlag(ordernum, con).then(e => {
                                        (u_id == 'GUEST') ? checkGuestPurchaseHistory(ordernum, con, res) : checkPurchaseHistory(u_id, con, res, page_num);                                    
                                    });                                    
                                } 
                            });   
                        } else res.send("error : refund occur error");              
                    })
                    .catch(err => console.error(err));                                
                } 
            });
        } 
    });
}

function makeAllItemsRefundFlag(ordernum, con) { 
    con.query('UPDATE cart SET refund = "y" where order_number = ?', [ordernum] ,(err, result) => { 
        if(err){                        
            res.send(err);
            // con.end();        
        } else {
            console.log(result);
        }
    });
}

function makeFullRefundFlag(ordernum, con) { 
    return new Promise((resolve, reject) => {
        console.log("makeFullRefundFlag(ordernum, con) ")   
        console.log(ordernum);
        con.query('SELECT * FROM cart WHERE order_number = ?', [ordernum], (err, result) => {
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log(result);
                const cart_count = result.length;
                const refunded = (result.filter(element => {
                    return element.refund == 'y';
                })).length;
                console.log("cart_count")
                console.log(cart_count)
                console.log("refunded")
                console.log(refunded)

                if (cart_count == refunded) {
                    con.query('UPDATE orders SET full_refunded = "y" where order_number = ?', [ordernum] ,(err, result) => { 
                        if(err){                        
                            res.send(err);
                            // con.end();        
                        } else {
                            console.log(result);
                            resolve();
                        }
                    });
                } resolve();
            }
        });    
    });
}

app.post('/get_req_return_item_info', (req,res) => {
    console.log('/get_req_return_item_info track_my_order')
    console.log(req.body)


    const order_number = req.body.order_number;
    const cart_number = req.body.cart_number;

    db.getConnection((con)=>{
        con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where cart.order_number = ? and cart.cartnum = ?',[order_number, cart_number], (err, result) => {
        
            if(err){                        
                res.send(err);                       
            } else {
                console.log(result);  
                if (result.length == 0) {
                    res.send({"result" : "nothing"});
                } else {
                    res.send(result);
                }                      
            }            
        });
        con.release();
    });
});


app.post('/item_return', (req,res) => {
    console.log('item_return item_return item_return')
    console.log(req.body)
    const order_number = req.body.order_number;
    const cart_number = req.body.cart_number;
    const return_reason = req.body.return_reason;
    const return_reason_etc = req.body.return_reason_etc;
    const set_reason = return_reason == 'etc' ? 'etc: ' + return_reason_etc : return_reason
  

    db.getConnection((con)=>{
        con.query('UPDATE cafefore.cart SET item_return_req = "y", item_return_result = "submitted", item_return_reason = ? WHERE order_number = ? and cartnum = ?',[set_reason, order_number, cart_number], (err, result) => {
        
            if(err){                        
                res.send(err);                       
            } else {
                console.log(result);
                result.protocol41 == true ? res.send({result : "ok"}) : res.send({result : "We are very sorry...DB error occured. Can you try again?"})                  
            }            
        });
        con.release();
    });


});



app.post('/check_purchase_history', (req,res) => {

    console.log('/check_purchase_history /check_purchase_history')
    console.log(req.body)
    const u_id = req.session.loginData ? req.session.loginData.id : false;
    const id= req.body.id;    
    const order_number = req.body.order_number;
    const page_num = req.body.page_num;

    db.getConnection((con)=>{
       
        
        if (id == u_id) {         
            checkPurchaseHistory(u_id, con, res, page_num); 
        } else if (!u_id && id == 'GUEST') {
            console.log(" guest purchase history")
            checkGuestPurchaseHistory(order_number, con, res);
        } else console.log("id Check");
        
        con.release();
    });
    
    
});

function checkPurchaseHistory(u_id, con, res, page_num) {
    // console.log("checkPurchaseHistory(u_id, con, res, page_num)")
    checkPurchaseHistoryTotal(u_id, con, res).then(data => {
        console.log(data)
        const page_limit = page_num == 0 ? 0 : (page_num *10) - 10;
        // const total_purchase = data;

        con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number IN (SELECT order_number FROM orders WHERE u_id = ?) ORDER BY oddate DESC LIMIT ?, 10',[u_id, page_limit],(err, result) => {
            if(err){                        
                res.send(err);                 
            } else {           
                
                res.send({total_purchase : data, result : result});      
            }
        });
    });


    function checkPurchaseHistoryTotal(u_id, con, res) {
        return new Promise((resolve, reject) => { 
            con.query('select count(*) from cart WHERE result="y" and u_id = ?',[u_id],(err, result) => {
            // con.query('select count(*) from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number IN (SELECT order_number FROM orders WHERE u_id = ?) ORDER BY oddate DESC',[u_id],(err, result) => {
                if(err){                        
                    res.send(err);                 
                } else {   
                    console.log(result);        
                    resolve(result[0]['count(*)']);
                    // res.send(result);      
                }
            });
        });        
    }    
}


function checkGuestPurchaseHistory(order_number, con, res) {
    con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number IN (?) ORDER BY oddate DESC',[order_number],(err, result) => {
        if(err){                        
            res.send(err);                
        } else {            
            res.send({result : result});      
        }
    });
    
}

app.post('/track_my_order', (req,res) => {
    console.log('/track_my_order track_my_order')
    console.log(req.body)

    const order_number = req.body.order_number;
    const order_email = req.body.email;
    const order_zip = req.body.zip;
    db.getConnection((con)=>{
        con.query('SELECT * FROM orders WHERE order_number = ? and order_email = ? and billing_zip = ?',[order_number, order_email, order_zip], (err, result) => {
            if(err){                        
                res.send(err);                       
            } else {
                // console.log(result);  
                if (result.length == 0) {
                    res.send({"result" : "nothing"});
                } else {
                    checkGuestPurchaseHistory(order_number, con, res);
                }                      
            }            
        });
        con.release();
    });
});


app.post('/get_track_number', (req,res) => {   
    console.log(req.body);

    const user_id = req.body.user_id;
    const cart_num = req.body.cart_number;
    db.getConnection((con)=>{
        con.query('SELECT track_number FROM cart WHERE cartnum = ? and u_id = ? ',[cart_num, user_id], (err, result) => {
            if(err){                        
                res.send(err);                       
            } else {
                console.log(result);
                res.send(result[0]);
            }
        })
        con.release();
    });
});



app.post('/user_checkout_submit', (req,res) => {

    console.log(req.body);
    const u_id = req.session.loginData.id;
    // const amount = req.body.amount;
    const cart = req.body.cart;
    console.log(cart);
    const shipping_rate = req.body.shipping_rate;
    console.log(shipping_rate);
    let default_payment_method = '';
    let clv_id = '';
    let default_shipping_info = {};
    let cardholder = '';
    let billing_email = '';
    let billing_address = {};
    // const cart_num = '';
    const date = getDate();
    const order_number = date.replace(/\s|:|\-/g,"") + "OD" + u_id.substr(0, 3);
    const cart_numbers = cart.map(element => {
        return element.cartnum;
    });
    console.log(cart_numbers);

    const shipping_fee = {
        amount : shipping_rate[1] * 100,
        currency : "usd",
        description : "UPS shipping " + shipping_rate[0],
        quantity : 1,
        type:"sku",
        // inventory_id: "6NRHHEKXEQV9Y",
        tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
    }   
        
    const items = cart.map(element => {
        return { 
            amount : element.price_sell * 100,
            currency : "usd",
            description : element.content.substring(0,120),
            quantity : element.quantity,
            type:"sku",
            inventory_id: element.item_code,
            tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
        }

    });
    items.push(shipping_fee);

    const tmp_amount_items = items.map(element => {return element.amount/100 * element.quantity ;})
    const total_order_amount = tmp_amount_items.reduce((a,b) => (a+b));
    console.log(total_order_amount);    
    console.log(items);

    ////////////////// get default payment method /////////////////////

    getDefaultShippingInfo();

    getDefaultBillingInfo()
    .then(() => { 
        console.log("make payment");      
        makePayment();
    });


    function getDefaultBillingInfo() {
        return new Promise((resolve, reject) => { 
            db.getConnection((con)=>{
                con.query('SELECT * FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
                    if(err){                        
                        res.send(err);
                        // con.end();        
                    } else {
                        console.log(result);            
                        default_payment_method = result[0].clv_tk;
                        clv_id = result[0].clv_id;
                        cardholder = result[0].cardholder;
                        billing_email = result[0].email;
                        billing_phone = result[0].phone;
                        billing_address = {
                            address1 : result[0].address1,
                            address2 : (result[0].address2) ? result[0].address2 : '' ,
                            city : result[0].city,
                            state : result[0].state,
                            zip : result[0].address_zip                           
                        }
                        resolve();
                    }
                }); 
                con.release();
            });
        });
    }


    function getDefaultShippingInfo() {
        db.getConnection((con)=>{
            con.query('SELECT recipient, address1, address2, city, state, zip, phone, email, shipping_option FROM shipping_info WHERE id= ? and default_address="default" and inuse="y"',[u_id], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {                           
                    default_shipping_info = result[0];
                    console.log("default_shipping_info");
                    console.log(default_shipping_info); 
                }
            }); 
            con.release();
        });
    }

    function setOrders(response, confirm_info, default_shipping_info, billing_email, billing_phone, billing_zip, order_items_count) {
        console.log('order_number');
        console.log(order_number);   
        db.getConnection((con)=>{    
            con.query('INSERT INTO cafefore.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate, shipping_fee, shipping_rate, order_email, order_phone, billing_zip, order_items_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, total_order_amount, date, shipping_rate[1], shipping_rate[0], billing_email, billing_phone, billing_zip, order_items_count], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log('set orders') 
                    console.log(result);      
                    // setShippingFee(cart_numbers[0], u_id, order_number, con);          
                    setUPSShippingInfo(order_number, default_shipping_info, con);
                    updateOrderedCart(order_number, date, response.id, cart_numbers, u_id, con, confirm_info);
                }
            }); 
            con.release();
        });
    }

    function updateOrderedCart(order_num, oddate, clv_order_id, cart_num, user_id, con, confirm_info) {
        // db.getConnection((con)=>{
            con.query('UPDATE cafefore.cart SET result = "y", order_number = ?, oddate = ?, clv_order_id = ? WHERE cartnum in (?) and u_id = ?'
            ,[order_num, oddate, clv_order_id, cart_num, user_id], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log('update complete Order Cart') 
                    console.log(result);
                    res.send(confirm_info);
                    // res.send({status : "complete"})                    
                }
            }); 
            // con.release();
        // });
    }

    function setUPSShippingInfo(order_number, default_shipping_info, con) {       
        con.query('INSERT INTO cafefore.ups_ship_info (order_number, user_id, recipient, address1, address2, city, state, zip, phone, email, indate) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [order_number, u_id, default_shipping_info.recipient, default_shipping_info.address1, default_shipping_info.address2, default_shipping_info.city, default_shipping_info.state, default_shipping_info.zip, default_shipping_info.phone, default_shipping_info.email, date], (err, result) => {
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log('setUser UPS Shipping Info') 
                console.log(result);                        
            }
        });
           
    }
    ////////////////////////////////////// make payment ////////////////////////
    function makePayment() {
        console.log("user_checkout_submit user_checkout_submituser_checkout_submituser_checkout_submit")

        const options = {
            method: 'POST',
            headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
            items: items,
            // shipping: {
            //     address: {
            //     city: default_shipping_info.city,
            //     line1: default_shipping_info.address1,
            //     line2: default_shipping_info.address2,
            //     postal_code: default_shipping_info.zip,
            //     state: default_shipping_info.state,
            //     country:"US"
            //     },
            //     name: default_shipping_info.recipient,
            //     phone: default_shipping_info.phone,
            //     email: default_shipping_info.email
            // },
            currency: 'usd',
            email: default_shipping_info.email,
            // customer: clv_id
            })
        };
        console.log("options");
        console.log(options);
        console.log("items");
        console.log(items);
        
        fetch('https://scl.clover.com/v1/orders', options)
            .then(response => response.json())
            .then(response => {
                console.log("make order")               
                console.log(response)
                if (response.status == 'created') {
                
                    const options = {
                        method: 'POST',
                        headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({"source":default_payment_method,
                        "email":billing_email,
                        "stored_credentials":{
                            "sequence": "SUBSEQUENT",
                            "is_scheduled": false,
                            "initiator": "CARDHOLDER"}})
                    };
                    
                    fetch(`https://scl.clover.com/v1/orders/${response.id}/pay`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(`make payment for created order ${response.id}`)
                        console.log(response)
                        if (response.status == 'paid') {
                                                    
                            const order_items = response.items.filter(element => {
                                return element.inventory_id ? true : false                        
                            }); // cut off shipping fee
        
                            const order_items_count = order_items.length;

                            let paid_item = [];
                            cart.forEach(element => {
                                for(let i = 0 ; i < response.items.length ; i++) {
                                    element.item_code == response.items[i].inventory_id ? paid_item.push(element) : false;
                                }
                            });

                            console.log("paid_item");
                            console.log(paid_item);

                            const confirm_info = {
                            status : "complete",
                            name : req.session.loginData.name,
                            order_number : order_number,
                            paid_item : paid_item,
                            email : default_shipping_info.email,
                            billing_email : billing_email,
                            shipping_address : default_shipping_info.address1 + ' ' + default_shipping_info.address2 + ', ' + default_shipping_info.city + ', ' + default_shipping_info.state + ' ' + default_shipping_info.zip,
                            recipient : default_shipping_info.recipient,
                            phone : default_shipping_info.phone,
                            type : response.source.brand,
                            ending4 : response.source.last4,
                            billing_address : billing_address.address1 + ' ' + billing_address.address2 + ', ' + billing_address.city + ', ' + billing_address.state + ' ' + billing_address.zip,
                            cardholder : cardholder,
                            subtotal : (response.amount - response.tax_amount) / 100 - shipping_fee.amount / 100, 
                            shipping_fee : shipping_fee.amount / 100, 
                            tax : response.tax_amount / 100,
                            grandtotal : response.amount / 100
                            };
                            console.log(confirm_info);
                            sendMailSES(billing_email, default_shipping_info.recipient, order_number, date);
                            // sendOrderConfirmMail(billing_email, default_shipping_info.recipient, order_number, date);  
                            setOrders(response, confirm_info, default_shipping_info, billing_email, billing_phone, billing_address.zip, order_items_count);    
                                                                
                        } else res.send(response);                       
                    })
                    .catch(err => console.error(err));        
                } else {
                    res.send(response);
                }      
                
            })
        .catch(err => console.error(err));
    }



});

app.post('/guest_order_checkout', (req,res) => {
    console.log("/charge /charge /charge /charge /charge   ");

    const uuid = uuid4.v4(); 
    
    console.log(req.body); 
    const order_items = JSON.parse(req.body.order_items);
    const shipping_rate = JSON.parse(req.body.shipping_rate);
    console.log("order_items");
    console.log(order_items);
    console.log(shipping_rate);
    const cardholder = req.body.card_name;
    const recipient = req.body.recipient_first_name +' '+req.body.recipient_last_name;
    const shipping_address = req.body.shipping_address_street_line1 + ' ' + req.body.shipping_address_street_line2 + ', ' + req.body.shipping_address_city + ', ' + req.body.shipping_address_state + ' ' + req.body.shipping_address_zip;
    const token_id = req.body.cloverToken;
    const billing_address = {
        address1 : req.body.billing_address_street_line1,
        address2 : req.body.billing_address_street_line2,
        city : req.body.billing_address_city,
        state : req.body.billing_address_state,
        zip : req.body.billing_address_zip,
    };
    const billing_email = req.body.billing_address_contact_email;
    const billing_phone = req.body.billing_address_contact_phone;
    const shipping_fee = {
        amount : shipping_rate[1] * 100,
        currency : "usd",
        description : "UPS shipping " + shipping_rate[0],
        quantity : 1,
        type:"sku",
        // inventory_id: "6NRHHEKXEQV9Y",
        tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
    }
    const items = order_items.map(element => {
        return { 
            amount : element.c_item_price * 100,
            currency : "usd",
            description : element.c_item_no + "," + element.c_item_name,
            quantity : element.c_item_quantity,
            type:"sku",
            inventory_id: element.c_item_code,
            tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
        }

    });

    const ups_ship_info = {
        Name: recipient,
        AttentionName: '',
        Phone: {Number: req.body.order_contact_phone},
        Address: {
        AddressLine: req.body.shipping_address_street_line1 + ' '+ req.body.shipping_address_street_line2,
        City: req.body.shipping_address_city,
        StateProvinceCode: req.body.shipping_address_state,
        PostalCode: req.body.shipping_address_zip,
        CountryCode: 'US'
        },
        Residential: ' '
    }


    items.push(shipping_fee);
    console.log(items);
    console.log(shipping_address);


    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            items: items,           
            currency: 'usd',
            email: billing_email
          })
                
      };
      console.log(options);
      
      fetch('https://scl.clover.com/v1/orders', options)
    .then(response => response.json())
    .then(result => {
        console.log("make order")            
        console.log(result)
        
        if (result.status == 'created') {
            const options = {
                method: 'POST',
                headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                },
                body: JSON.stringify({ecomind: 'ecom', source: token_id})
                
            };
            
            fetch(`https://scl.clover.com/v1/orders/${result.id}/pay`, options)
            .then(response => response.json())
            .then(response => {
                if (response.status == 'paid') {
                    
                    


                    console.log("order paid")
                    console.log(response)

                    //////////////////// store order info into DB
                    const u_id = 'GUEST';                    

                    const billing_zip = response.source.address_zip;
                    const date = getDate();
                    const cart_num = date.replace(/\s|:|\-/g,"") + "CTGUEST";
                    const order_num = date.replace(/\s|:|\-/g,"") + "ODGUEST";

                    const order_items = response.items.filter(element => {
                        return element.inventory_id ? true : false                        
                    }); // cut off shipping fee

                    const order_items_count = order_items.length;
                    
                    const item_codes = order_items.map(element => {
                        return element.inventory_id})
                    const clv_order_id = response.id;

                    const cartnum = item_codes.map(element => {
                        return date.replace(/\s|:|\-/g,"") + "CT" + element + "G";                        
                    })
                    console.log(order_items)
                    console.log(item_codes)        
                    
                    setOrders(order_num, u_id, response, date, billing_email, billing_phone, billing_zip, order_items_count);
                    setGuestShippingInfo(order_num, date);

                    db.getConnection((con)=>{
                        con.query('SELECT * FROM product WHERE item_code in (?)', [item_codes], (err, result_items) => {
                            if(err){                        
                                res.send(err);                         
                            } else {
                                console.log('getProductNumber') 
                                console.log(result_items);
                                const insert_cart_query = "INSERT INTO `cart` (`cartnum`,`u_id`,`prodnum`,`quantity`,`result`,`indate`,`modate`,`order_number`,`oddate`, `clv_order_id`) values ?;"
                                let insert_cart_value = [];

                                let insert_cart_value_element = [];
                                
                                for(let i in order_items) {
                                    insert_cart_value_element.push(cartnum[i]);
                                    insert_cart_value_element.push(u_id);
                                    insert_cart_value_element.push(result_items[i].prodnum);
                                    // insert_cart_value_element.push(order_items[i].description.substring(0, order_items[i].description.indexOf(',')));
                                    insert_cart_value_element.push(order_items[i].quantity);
                                    insert_cart_value_element.push('y');
                                    insert_cart_value_element.push(date);
                                    insert_cart_value_element.push(date);
                                    insert_cart_value_element.push(order_num);
                                    insert_cart_value_element.push(date);
                                    insert_cart_value_element.push(clv_order_id);                                    

                                    insert_cart_value.push(insert_cart_value_element);
                                    insert_cart_value_element = [];
                                }
                                console.log(insert_cart_value);
                                
                                con.query(insert_cart_query, [insert_cart_value], (err, result) => {
                                    if(err) {
                                        console.log(err);
                                    } else {        
                                        console.log("con.query(insert_cart_query, [insert_cart_value], (err, result)");                      
                                        console.log(result);                                        
                                    }
                                });

                                let paid_items_numbers = result_items.map(element => {                                                             
                                    return element.prodnum;
                                });    
                                
                                const paid_items = result_items.map(element => {                                                             
                                    return {
                                        item_num : element.prodnum,
                                        item_image : element.image};
                                });

                                const confirm_info = {
                                    status : "complete",
                                    paid_items_number : paid_items_numbers,
                                    paid_item : result_items,
                                    name : recipient,
                                    order_number : order_num,
                                    email : req.body.order_contact_email,
                                    billing_email : billing_email,
                                    recipient : recipient,
                                    shipping_address : shipping_address,
                                    phone : req.body.order_contact_phone,
                                    type : response.source.brand,
                                    ending4 : response.source.last4,
                                    billing_address : billing_address.address1 + ' ' + billing_address.address2 + ', ' + billing_address.city + ', ' + billing_address.state + ' ' + billing_address.zip,
                                    cardholder : cardholder,
                                    subtotal : (response.amount - response.tax_amount) / 100 - shipping_fee.amount / 100, 
                                    shipping_fee : shipping_fee.amount / 100, 
                                    tax : response.tax_amount / 100,
                                    grandtotal : response.amount / 100
                                };

                                console.log(confirm_info);
                                sendMailSES(billing_email, recipient, order_num, date);
                                // sendOrderConfirmMail(billing_email, recipient, order_num, date);                  
                                res.send(confirm_info);
                            }
                        });
                        con.release();
                    });
                }
            }).catch(err => console.error(err));
        }        
    })
    .catch(err => console.error(err));



    function setOrders(order_number, u_id, response, date, billing_email, billing_phone, billing_zip, order_items_count) {
        console.log('order_number');
        console.log(order_number);       
        db.getConnection((con)=>{
            con.query('INSERT INTO cafefore.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate, shipping_fee, shipping_rate, order_email, order_phone, billing_zip, order_items_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, response.amount / 100, date, shipping_rate[1], shipping_rate[0], billing_email, billing_phone, billing_zip, order_items_count], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log('set orders') 
                    console.log(result);                        
                }
            }); 
            con.release();
        });
    }

    function setGuestShippingInfo(order_number, date) {
        console.log('setGuestShippingInfo');
        db.getConnection((con)=>{
            con.query('INSERT INTO cafefore.ups_ship_info (order_number, user_id, recipient, address1, address2, city, state, zip, phone, email, indate) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [order_number, "GUEST", recipient, req.body.shipping_address_street_line1, req.body.shipping_address_street_line2, req.body.shipping_address_city, req.body.shipping_address_state, req.body.shipping_address_zip, req.body.order_contact_phone, req.body.order_contact_email, date], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log('setGuestShippingInfo') 
                    console.log(result);                        
                }
            });
            con.release();
        });
    }

    function getProductNumber(item_code) {
        db.getConnection((con)=>{
            con.query('SELECT * FROM product WHERE item_code = ?', [item_code], (err, result) => {
                if(err){                        
                    res.send(err);                         
                } else {
                    console.log('getProductNumber') 
                    console.log(result);                        
                }
            });
            con.release();
        });

    }
});

       
function sendMailSESTemplate(toAddress, main_message, subject_message) {
    AWS.config.update({
        credentials: {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        },
        "region": process.env.AWS_REGION
    });

    // Create sendEmail params 
    var params = {
    Destination: { /* required */
        CcAddresses: [
            toAddress,
        /* more items */
        ],
        ToAddresses: [
            toAddress,
        /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
        //   Html: {
        //    Charset: "UTF-8",
        //    Data: "HTML_FORMAT_BODY"
        //   },
        Text: {
        Charset: "UTF-8",
        Data: main_message
        }
        },
        Subject: {
        Charset: 'UTF-8',
        Data: subject_message
        }
        },
    Source: 'cafefore@gocafefore.com', /* required */
    ReplyToAddresses: [
        'cafefore@gocafefore.com',
        /* more items */
    ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
    function(data) {
        console.log(data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}



function sendMailSES(toAddress, recipient, order_num, date) {
    AWS.config.update({
        credentials: {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        },
        "region": process.env.AWS_REGION
    });

    // Create sendEmail params 
    var params = {
    Destination: { /* required */
        CcAddresses: [
            toAddress,
        /* more items */
        ],
        ToAddresses: [
            toAddress,
        /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
        //   Html: {
        //    Charset: "UTF-8",
        //    Data: "HTML_FORMAT_BODY"
        //   },
        Text: {
        Charset: "UTF-8",
        Data: `
            Thank you for your order, ${recipient}
        
            When your order ships, we'll send you a confirmation email with your tracking information.                                
            
            Your order number : ${order_num}
            order date : ${date}
            cafe FORE
            `
        }
        },
        Subject: {
        Charset: 'UTF-8',
        Data: 'cafe FORE online Receipt'
        }
        },
    Source: 'cafefore@gocafefore.com', /* required */
    ReplyToAddresses: [
        'cafefore@gocafefore.com',
        /* more items */
    ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
    function(data) {
        console.log(data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}

const sendOrderConfirmMail = async (recipient_email, recipient, order_num, date) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PSWD
        },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"cafe FORE" <${process.env.NODEMAILER_USER}>`,                       
      to: recipient_email,
      subject: 'cafe FORE online Receipt',
      text: `
      Thank you for your order, ${recipient}
      
      When your order ships, we'll send you a confirmation email with your tracking information.
                         
      
      Your order number : ${order_num}
      order date : ${date}
      cafe FORE
      
      ` ,
    //   html: `<b>${generatedAuthNumber}</b>`,
    });
}

app.post('/get_shipping_rate', (req, res) => {
    
    console.log("//get_shipping_rate/get_shipping_rate/get_shipping_rate/get_shipping_rate");
    const shipto = req.body;
    const weight = String(req.body.weight);
    
    console.log(shipto);
    console.log(weight);
    

    const data = {
        RateRequest: {
            Request: {
                TransactionReference: {
                    CustomerContext: 'CustomerContext',
                    TransactionIdentifier: 'TransactionIdentifier'
                }
                },
            Shipment: {
                Shipper: {
                    Name: 'cafe FORE',
                    ShipperNumber: 'B98W48',
                    Address: {
                    AddressLine: [
                        '4400 Roswell Rd'
                    ],
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                    }
                },
                ShipTo: {
                    Name: req.body.recipient,
                    Address: {
                    AddressLine: [
                        req.body.address                      
                    ],
                    City: req.body.city,
                    StateProvinceCode: req.body.state,
                    PostalCode: req.body.zip,
                    CountryCode: 'US'
                    }
                },
                ShipFrom: {
                    Name: 'cafe FORE',
                    ShipperNumber: 'B98W48',
                    Address: {
                    AddressLine: [
                        '4400 Roswell Rd'
                    ],
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                    }
                },
                PaymentDetails: {
                    ShipmentCharge: {
                    Type: '01',
                    BillShipper: {
                        AccountNumber: 'B98W48'
                    }
                    }
                },
                Service: {
                    Code: '03',
                    Description: 'Ground '
                },
                NumOfPieces: '1',
                Package: {                    
                    PackagingType: {
                    Code: '02',
                    Description: 'Packaging'
                    },
                    Dimensions: {
                    UnitOfMeasurement: {
                        Code: 'IN',
                        Description: 'Inches'
                    },
                    Length: '10',
                    Width: '10',
                    Height: '10'
                    },
                    PackageWeight: {
                    UnitOfMeasurement: {
                        Code: 'LBS',
                        Description: 'Pounds'
                    },
                    Weight: weight
                    }
                },
                DeliveryTimeInformation: {
                    PackageBillType: '03',
                    Pickup: {
                    Date: '20230418',
                    Time: '1000'
                    }
                }
            }
        }
    }

    require("dotenv").config({ path: ".env2" });

    const query = new URLSearchParams({
        additionalinfo: 'timeintransit'
    }).toString();
    
    const version = 'v1';
    const requestoption = 'Shop';

    const options = 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            transId: 'cafeforeEcommTR',
            transactionSrc: 'cafeforeEcomm',
            Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`            
        },
        body: JSON.stringify(data)
        }
        fetch(`https://onlinetools.ups.com/api/rating/${version}/${requestoption}?${query}`, options)
        
    // fetch(`https://wwwcie.ups.com/api/rating/${version}/${requestoption}?${query}`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response)
    });    

});



app.post('/get_admin_return_req',(req, res) => {
    db.getConnection((con)=>{
        con.query('select * from cart left join orders on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where item_return_req = "y" ORDER BY cart.indate DESC', (err, result) => { 
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result); 
                res.send(result);
            }
        }); 
        con.release();
    });
});

app.post('/admin_refund_item',(req, res) => {
    console.log(req.body);
    const cartnum = req.body.cart_id;
    const date = getDate();

    db.getConnection((con)=>{
        con.query('select * from cafefore.cart left join cafefore.orders on cafefore.cart.order_number = cafefore.orders.order_number left join cafefore.product on cafefore.cart.prodnum = cafefore.product.prodnum left join cafefore.ups_ship_info on cafefore.orders.order_number = cafefore.ups_ship_info.order_number where item_return_req = "y" and cart.refund = "n" and cafefore.cart.cartnum = ?', [cartnum], (err, result) => {        
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log(result); 
                const email_addressto = result[0].order_email;
                const recipient = result[0].recipient;
                const items = result.map(element => {
                    return { 
                        parent : element.item_code,
                        amount : element.price_sell * 100 * element.quantity * 1.06,
                        description : element.name,
                        quantity : element.quantity,
                        type:"sku"                            
                    }                
                });

                const options = {
                    method: 'POST',
                    headers: {accept: 'application/json', 
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({
                    "items":items
                    })
                };
            
                fetch(`https://scl.clover.com/v1/orders/${result[0].clv_order_id}/returns`, options)
                .then(response => response.json())
                .then(response => {                      
                                        
                    console.log(response);                       
                    
                    if (response.status == 'returned') { 

                        const returned_amount = response.items.map(element => {
                            return element.amount / 100;                        
                        });
                        const prodnum = result.map(element => {return element.prodnum});
                        
                        const update_query_1 = "UPDATE cart SET refund = 'y', item_return_result = 'refunded', refund_date = ?, refund_amount = (CASE ";
                        let update_query_2 = '';
                        for (let i in returned_amount) {
                            update_query_2 = update_query_2 + `WHEN cafefore.cart.prodnum = '${prodnum[i]}' THEN '${returned_amount[i]}' `
                        }                           
                        const update_query = update_query_1 + update_query_2;
                        console.log(update_query)
                        con.query(update_query + 'end) WHERE cafefore.cart.cartnum IN (?)',[date, cartnum] ,(err, update_result) => {
                        // con.query('UPDATE cart SET refund = "y", refund_amount = ? where cartnum = ? and prodnum = ?', [amount_returned, cartnum, last_refund[0].prodnum] ,(err, result) => { 
                            if(err){                        
                                res.send(err);
                                // con.end();        
                            } else {
                                console.log("item return refund result");
                                // console.log(update_result);
                                if (update_result.protocol41 == true) {
                                    const cancel_item_mes_1 = 
                                    `Hello, ${recipient}.
                                    This is cafe FORE.
                                    
                                    Your return request has been accepted.
                                    
                                    Return order item amount total : $${parseFloat(returned_amount).toFixed(2)}
        
                                    `;
                                    let cancel_item_mes_2 = '';
                                    for (let i in result) {
                                        cancel_item_mes_2 = cancel_item_mes_2 + `item : '${result[i].name}'`+ `\n`;
                                    }                           
            
                                    const cancel_item_mes_3 = 
                                    `
                                    Refund may take 2-5 business days to appear in your account.
        
                                    ${date}
                                    Thank you for chooing cafe FORE.
                                    `;
                                    const main_message = cancel_item_mes_1 + cancel_item_mes_2 + cancel_item_mes_3;                      
                                    const subject_message = `cafe FORE item item return request has been accepted`;   
                                                                
                                    sendMailSESTemplate(email_addressto, main_message, subject_message);

                                    res.send({result : "ok"}) 
                                } else  res.send({result : "We are very sorry...DB error occured. Can you try again?"})
                            }
                        })
                    }
                })
            }
        })
        con.release();
    });          
});

app.post('/get_admin_check_orders',(req, res) => {
    
    console.log("/get_admin_check_orders /get_admin_check_orders /get_admin_check_orders");

    db.getConnection((con)=>{
        con.query('select * from orders ORDER BY indate DESC', (err, result) => { 
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result); 
                res.send(result);
            }
        }); 
        con.release();
    });

});


app.post('/get_admin_check_orders_shipment',(req, res) => {
    
    console.log("/get_admin_check_orders_shipment /get_admin_check_orders_shipment /get_admin_check_orders_shipment");
    console.log(req.body);
    const order_id = req.body.order_id;
    let order_items = [];
    let ups_ship_info = {};
    let total_weight = 0;
    let service_code = {};
    let cart_num = [];
    let item_names = [];


    setOrderShipment().then(data => {
        console.log("data");
        console.log(data)
        setUPSShipment(ups_ship_info, service_code, order_items, res, order_id, cart_num, item_names);
        // setUPSShipment(shipto, service_code, items, res, order_id, cart_num, item_names)
    });

    function setOrderShipment() {
        return new Promise((resolve, reject) => {
            db.getConnection((con)=>{
                con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number = ? and shipment = "n"', [order_id], (err, result) => {
                    if (err) {
                        res.send(err);
                        // con.end();
                    } else {
                        console.log("order_items"); 
                        console.log(result); 
                        result.forEach (element => {
                            console.log(element);
                            total_weight = total_weight + (element.quantity * element.weight);
                            cart_num.push(element.cartnum);
                            item_names.push(element.name);

                        })
                        console.log(cart_num);
                        console.log(total_weight);
                        const item_name = result[0].name;

                        if (result[0].shipping_rate == "flat") {
                            service_code = { Code: '03', Description: 'Ground' }
                            order_items = {

                                SimpleRate: {
                                        Description: 'SimpleRateDescription',
                                        Code: 'XS'
                                    },
                                Description: item_name,
                                Packaging: {
                                    Code: '02',
                                    Description: item_name
                                },
                                Dimensions: {
                                    UnitOfMeasurement: {
                                        Code: 'IN',
                                        Description: 'Inches'
                                },
                                Length: '10',
                                Width: '10',
                                Height: '10'
                                },
                                PackageWeight: {
                                UnitOfMeasurement: {
                                    Code: 'LBS',
                                    Description: 'Pounds'
                                },
                                Weight: String(total_weight)
                                }
                            }
                        } else {
                            if (result[0].shipping_rate == "ground") service_code = { Code: '03', Description: 'Ground' };
                            else if (result[0].shipping_rate == "3days") service_code = { Code: '12', Description: '3 Day Select' };
                            else if (result[0].shipping_rate == "nextday") service_code = { Code: '13', Description: 'Next Day Air Saver' };
                            
                            order_items = 
                            {                            
                                Description: item_name,
                                Packaging: {
                                Code: '02',
                                Description: item_name
                                },
                                Dimensions: {
                                UnitOfMeasurement: {
                                    Code: 'IN',
                                    Description: 'Inches'
                                },
                                Length: '10',
                                Width: '10',
                                Height: '10'
                                },
                                PackageWeight: {
                                UnitOfMeasurement: {
                                    Code: 'LBS',
                                    Description: 'Pounds'
                                },
                                Weight: String(total_weight)
                                }
                            }
                        }

                        con.query('select * from ups_ship_info WHERE order_number= ?', [order_id], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                console.log("shipping_info");
                                console.log(result);
                                ups_ship_info = {
                                    Name: result[0].recipient,
                                    AttentionName: '',
                                    Phone: {Number: result[0].phone},
                                    Address: {
                                    AddressLine: result[0].address1,

                                    City: result[0].city,
                                    StateProvinceCode: result[0].state,
                                    PostalCode: result[0].zip,
                                    CountryCode: 'US'
                                    },
                                    Residential: ' ',
                                    email : result[0].email
                                }
                                console.log(ups_ship_info);
                                resolve(ups_ship_info);
                            } 
                        });
                    } 
                });
                
                con.release();                
            }); 
        });
    }
    
});



function setUPSShipment(shipto, service_code, items, res, order_id, cart_num, item_names) {

  
    console.log("ups shipment")
    console.log(shipto)
    console.log(service_code)
    console.log(item_names)
    const addressto = shipto.email;
   
    const ship = {
        ShipmentRequest: {
            Request: {
            SubVersion: '1801',
            RequestOption: 'nonvalidate',
            TransactionReference: {CustomerContext: 'cafefore'}
            },
            Shipment: {
            Description: 'cafefore shipping',
            Shipper: {
                Name: 'cafe FORE LLC',
                AttentionName: '',
                TaxIdentificationNumber: '883952894',
                Phone: {
                Number: '4702636495',
                Extension: ' '
                },
                ShipperNumber: 'B98W48',
                FaxNumber: '',
                Address: {
                    AddressLine: '4400 Roswell RD Ste 126',
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                }
            },
            ShipTo: shipto,
            ShipFrom: {
                Name: 'cafe FORE LLC',
                AttentionName: '',
                Phone: {Number: '4702636495'},
                FaxNumber: '',
                Address: {
                    AddressLine: '4400 Roswell RD Ste 126',
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                }
            },
            PaymentInformation: {
                ShipmentCharge: {
                Type: '01',
                BillShipper: {AccountNumber: 'B98W48'}
                }
            },
            Service: service_code,
            Package: items
           
            },
            LabelSpecification: {
            LabelImageFormat: {
                Code: 'GIF',
                Description: 'GIF'
            },
            HTTPUserAgent: 'Mozilla/4.5'
            }
        }
    }

    require("dotenv").config({ path: ".env2" }); 

    const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: 'cafeforetrid',
        transactionSrc: 'cafeforetrsrc',
        Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`
      },
      body: JSON.stringify(ship)
    }

    console.log(ship);

    const query = new URLSearchParams({
        additionaladdressvalidation: 'Alpharetta'
      }).toString();
    
      const version = 'v1';
    //   fetch(`https://onlinetools.ups.com/api/shipments/${version}/ship?${query}`, options)
      
    fetch(`https://wwwcie.ups.com/api/shipments/${version}/ship?${query}`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)  
               
        const track_number = response.ShipmentResponse.ShipmentResults.ShipmentIdentificationNumber;
        console.log(track_number)

        const update_query_1 = `
        Hello, ${shipto.Name}.

        Your order ${order_id} has been shipped!
        
        `;
        
        let update_query_2 = '';
        for (let i in item_names) {
            update_query_2 = update_query_2 + `item : '${item_names[i]}'` + `\n`;
        }
        const update_query_3 = 
        `Tracking Number is ${track_number}.

        You can track your package on UPS tracking site.
        https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=${track_number}

        Thank you for choosing cafe FORE.
    
        `;
        const main_message = update_query_1 + update_query_2 + update_query_3;
        console.log(main_message)


        const subject_message = `Your order has been shipped!`;

        updateShipingTrackNumber().then((data) => {
            console.log("updateShipingTrackNumber().then((data)")
            console.log(data)
            ////////////////////////// send email for produced track number
            sendMailSESTemplate(addressto, main_message, subject_message)
            res.send(response);
        });

        function updateShipingTrackNumber() {
            return new Promise((resolve, reject) => {        
            db.getConnection((con)=>{
                    con.query('UPDATE orders SET shipment = "y", track_number = ? where order_number = ?', [track_number, order_id], (err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();        
                        } else {
                            console.log('update set shipment & track number'); 
                            console.log(result);   
                            con.query('UPDATE cart SET result = "y", track_number = ? where order_number = ? and cartnum in (?)', [track_number, order_id, cart_num], (err, result) => {
                                if(err){                        
                                    res.send(err);
                                    // con.end();        
                                } else {
                                    console.log('update set shipment & track number'); 
                                    console.log(result);                              
                                    resolve(result);                     
                                }
                            });
                        }
                    });
                    con.release();
                });
            });
        }  
    });
}




function setOrders(order_number, u_id, response, date) {
    console.log('order_number');
    console.log(order_number);       
    con.query('INSERT INTO cafefore.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate) VALUES (?,?,?,?,?,?,?,?)',
    [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, response.amount, date], (err, result) => {
        if(err){                        
            res.send(err);
            con.end();        
        } else {
            console.log('set orders') 
            console.log(result);
            
            // updateOrderedCart(order_number, date, cart_numbers, u_id)
        }
    }); 
}

function updateOrderedCart(order_num, oddate, cart_num, user_id) {
    con.query('UPDATE cafefore.cart SET result = "y", order_number = ?, oddate = ? WHERE cartnum in (?) and u_id = ?'
    ,[order_num, oddate, cart_num, user_id], (err, result) => {
        if(err){                        
            res.send(err);
            con.end();        
        } else {
            console.log('update complete Order Cart') 
            console.log(result);
            res.send({status : "complete"})
             
        }
    }); 
}



function getDate() {
    let date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
    return date;
}




app.get('/get_ups_toke', (req, res) => {
    const formData = {
        grant_type: 'client_credentials'
      };

    const options = {
    method: 'POST',
    headers: {
        Authorization: 'Basic ' + Buffer.from(`${process.env.UPS_MID}:${process.env.UPS_SECRET}`).toString('base64'),
        'x-merchant-id': `${process.env.UPS_MID}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body : new URLSearchParams(formData).toString()    
    }
    fetch(`https://wwwcie.ups.com/security/v1/oauth/token?client_id=${process.env.UPS_MID}&redirect_uri=https://gocafefore.com`, options)
    
    .then(response => 
        response.json())
    .then(response => {
        console.log(response);
        if (response.status == 'approved') {
            require("dotenv").config({ path: ".env2" }); 
            process.env.UPS_AUTH_TOKEN = response.access_token;
            updateEnv(envItems); 
            res.send({result : "token updated"});         
        }
    });

    const fs = require('fs');
    const envItems = ['UPS_AUTH_TOKEN'];

    function updateEnv(items = [], eol = '\n'){
        const envContents = items.map(item => `${item}=${process.env[item]}`).join(eol)
        fs.writeFileSync('.env2', envContents);
      } 

});




app.post('/test_ups_ship', (req, res) => {

    const ship = {
        ShipmentRequest: {
            Request: {
            SubVersion: '1801',
            RequestOption: 'nonvalidate',
            TransactionReference: {CustomerContext: 'test'}
            },
            Shipment: {
                Description: 'cafe FORE shipping',
                Shipper: {
                    Name: 'cafe FORE LLC',
                    AttentionName: '',
                    TaxIdentificationNumber: '883952894',
                    Phone: {
                    Number: '4702636495',
                    Extension: ' '
                    },
                    ShipperNumber: 'B98W48',
                    FaxNumber: '',
                    Address: {
                        AddressLine: '4400 Roswell RD Ste 126',
                        City: 'Marietta',
                        StateProvinceCode: 'GA',
                        PostalCode: '30062',
                        CountryCode: 'US'
                    }
                },
                ShipTo: {
                    Name: 'Joe Kim',
                    AttentionName: '',
                    Phone: {Number: '4702636495'},
                    Address: {
                    AddressLine: '6594 Hulme End Ave',
                    City: 'Las Vegas',
                    StateProvinceCode: 'NV',
                    PostalCode: '89139',
                    CountryCode: 'US'
                    },
                    Residential: ' '
                },
                ShipFrom: {
                    Name: 'cafe FORE LLC',
                    AttentionName: '',
                    Phone: {Number: '4702636495'},
                    FaxNumber: '',
                    Address: {
                        AddressLine: '4400 Roswell RD Ste 126',
                        City: 'Marietta',
                        StateProvinceCode: 'GA',
                        PostalCode: '30062',
                        CountryCode: 'US'
                    }
                },
                PaymentInformation: {
                    ShipmentCharge: {
                    Type: '01',
                    BillShipper: {AccountNumber: 'B98W48'}
                    }
                },
                Service: {
                    Code: '13',
                    Description: '3 day'
                },

            Package: 
            {
                SimpleRate: {
                    Description: 'SimpleRateDescription',
                    Code: 'XS'
                },
                Description: 'Nails',
                Packaging: {
                Code: '02',
                Description: 'Nails'
                },
                Dimensions: {
                UnitOfMeasurement: {
                    Code: 'IN',
                    Description: 'Inches'
                },
                Length: '10',
                Width: '10',
                Height: '10'
                },
                PackageWeight: {
                UnitOfMeasurement: {
                    Code: 'LBS',
                    Description: 'Pounds'
                },
                Weight: '10'
                }
            }
            },
            LabelSpecification: {
            LabelImageFormat: {
                Code: 'GIF',
                Description: 'GIF'
            },
            HTTPUserAgent: 'Mozilla/4.5'
            }
        }
    }

    const ShipmentRequest = 
    {
        Request: {
          RequestOption: 'nonvalidate',
          SubVersion: '1701',
          TransactionReference: {
            CustomerContext: 'cafeforeco',
            TransactionIdentifier: 'cafeforeid'
          }
        },

        Shipment: {
          Package: [
            {
              PackageWeight: {
                Weight: '50',
                UnitOfMeasurement: {
                  Description: 'desc',
                  Code: 'LBS'
                }
              },
              Dimensions: {
                Height: '2',
                Width: '2',
                Length: '02',
                UnitOfMeasurement: {
                  Description: 'desc',
                  Code: 'IN'
                }
              },
              Packaging: {
                Description: 'desc',
                Code: '02'
              },
              Description: 'moon lamp'
            },

            {
              PackageWeight: {
                Weight: '10',
                UnitOfMeasurement: {
                  Description: 'desc',
                  Code: 'LBS'
                }
              },
              Dimensions: {
                Height: '2',
                Width: '2',
                Length: '02',
                UnitOfMeasurement: {
                  Description: 'desc',
                  Code: 'IN'
                }
              },
              Packaging: {
                Description: 'desc',
                Code: '02'
              },
              Description: 'ginger'
            },

            {
              Description: 'play mat',
              Packaging: {
                Code: '02',
                Description: 'desc'
              },
              Dimensions: {
                UnitOfMeasurement: {
                  Code: 'IN',
                  Description: 'desc'
                },
                Length: '02',
                Width: '2',
                Height: '2'
              },
              PackageWeight: {
                UnitOfMeasurement: {
                  Code: 'LBS',
                  Description: 'desc'
                },
                Weight: '5'
              }
            }
          ],
          Description: 'UPS Premier',
          Shipper: {
            Name: 'cafe FORE LLC',
            AttentionName: 'GA',
            CompanyDisplayableName: 'cafe FORE LLC',
            TaxIdentificationNumber: '883952894',
            Phone: {
              Number: '1234567890',
              Extension: '12'
            },
            ShipperNumber: '',
            FaxNumber: '2134',
            EMailAddress: 'cafefore@cafefore.com',
            Address: {
                AddressLine: '4400 Roswell Rd',
                City: 'Marietta',
                StateProvinceCode: 'GA',
                PostalCode: '30062',
                CountryCode: 'US'
            }
          },
          ShipTo: {
            Name: 'Joe Kim',
            AttentionName: 'GA',
            CompanyDisplayableName: 'GA',
            TaxIdentificationNumber: '',
            Phone: {
              Number: '1234567890',
              Extension: '12'
            },
            FaxNumber: '1234',
            EMailAddress: 'test@cafefore.com',
            Address: {
              AddressLine: '2742 Pearl Ridge Trce',
              City: 'Buford',
              StateProvinceCode: 'GA',
              PostalCode: '30519',
              CountryCode: 'US',
              ResidentialAddressIndicator: 'Y'
            }
          },
          ShipFrom: {
            Name: 'cafe FORE LLC',
            AttentionName: 'GA',
            CompanyDisplayableName: 'cafe FORE LLC',
            TaxIdentificationNumber: '883952894',
            Phone: {
              Number: '1234567890',
              Extension: '12'
            },
            FaxNumber: '5555555555',
            Address: {
              AddressLine: '4400 Roswell Rd',
              City: 'Marietta',
              StateProvinceCode: 'GA',
              PostalCode: '30062',
              CountryCode: 'US'
            },
            EMailAddress: 'cafefore@cafefore.com'
          },
          PaymentInformation: {
            ShipmentCharge: {
              Type: '01',
              BillShipper: {AccountNumber: 'B98W48'}
            }
          },
          Service: {
            Code: '03',
            Description: 'GROUND'
          }
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code: 'ZPL',
            Description: 'desc'
          },
          HTTPUserAgent: 'Mozilla/4.5',
          LabelStockSize: {Height: '6', Width: '4'}
        }
    }
    
    require("dotenv").config({ path: ".env2" });

    const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: 'cafeforetrs',
        transactionSrc: 'testing',
        Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`
      },
      body: JSON.stringify(ship)
    }

    const query = new URLSearchParams({
        additionaladdressvalidation: 'Alpharetta'
      }).toString();
    
      const version = 'v1';
    //   fetch(`https://onlinetools.ups.com/api/shipments/${version}/ship?${query}`, options)    
      
    fetch(`https://wwwcie.ups.com/api/shipments/${version}/ship?${query}`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        // console.log(response.ShipmentResults.)
        res.send(response)
    });




});

/*
app.get('/test_ups_cancel', (req, res) => {

    require("dotenv").config({ path: ".env2" });
    const query = new URLSearchParams({
        trackingnumber: '1ZB98W480329218998'
      }).toString();
      
      const version = 'v1';
      const shipmentidentificationnumber = '1ZB98W480329218998';

      const options = 
      {
        method: 'DELETE',
        headers: {
          transId: 'string',
          transactionSrc: 'testing',
          Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`
        }
      }

      fetch(`https://onlinetools.ups.com/api/shipments/${version}/void/cancel/${shipmentidentificationnumber}?${query}`, options)
      .then(response => response.json())
      .then(response => {
          console.log("response")
          console.log(response)
          // console.log(response.ShipmentResults.)
          res.send(response)
      });
})
*/


app.get('/test_ups_track', (req, res) => {

    const query = new URLSearchParams({
        locale: 'en_US',
        returnSignature: 'false'
      }).toString();

      require("dotenv").config({ path: ".env2" });    
      

        
    const inquiryNumber = '1ZB98W480323972157';

    const options = 
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          transId: 'string',
          transactionSrc: 'testing',
          Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`
        }

    }

    fetch(`https://onlinetools.ups.com/api/track/v1/details/${inquiryNumber}?${query}`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        // console.log(response.ShipmentResults.)
        res.send(response)
    });



});

app.get('/test_ups_valid', (req, res) => {

    fetch(`https://wwwcie.ups.com/api/security/v1/oauth/validate-client?client_id=pCzllAA1qfZV84RQGazP6na9nRViTSp31ERBfBR4gvX94zVJ&redirect_uri=https://www.thecafefore.com`)
    // fetch(`https://onlinetools.ups.com/api/security/v1/oauth/validate-client?client_id=pCzllAA1qfZV84RQGazP6na9nRViTSp31ERBfBR4gvX94zVJ&redirect_uri=https://www.thecafefore.com`)
    //  fetch(`https://wwwcie.ups.com/security/v1/oauth/validate-client?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com`)
        .then(response => response.json())
        .then(response => {
    
            console.log("response")
            console.log(response)
            res.redirect(`https://www.ups.com/lasso/signin?client_id=pCzllAA1qfZV84RQGazP6na9nRViTSp31ERBfBR4gvX94zVJ&redirect_uri=https://www.thecafefore.com&response_type=code&scope=read&type=ups_com_api`);
        });
});
    





app.get('/test_ups_rating', (req, res) => {

const data = {
        RateRequest: {
            Request: {
                TransactionReference: {
                    CustomerContext: 'CustomerContext',
                    TransactionIdentifier: 'TransactionIdentifier'
                }
                },
            Shipment: {
                Shipper: {
                    Name: 'cafe FORE',
                    ShipperNumber: 'B98W48',
                    Address: {
                    AddressLine: [
                        '4400 Roswell Rd'
                    ],
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                    }
                },
                ShipTo: {
                    Name: 'sbMuscle',
                    Address: {
                    AddressLine: [
                        '17420 Mt. Herrmann St.'
                       
                    ],
                    City: 'Fountain Valley',
                    StateProvinceCode: 'CA',
                    PostalCode: '92708',
                    CountryCode: 'US'
                    }
                },
                ShipFrom: {
                    Name: 'cafe FORE',
                    ShipperNumber: 'B98W48',
                    Address: {
                    AddressLine: [
                        '4400 Roswell Rd'
                    ],
                    City: 'Marietta',
                    StateProvinceCode: 'GA',
                    PostalCode: '30062',
                    CountryCode: 'US'
                    }
                },
                PaymentDetails: {
                    ShipmentCharge: {
                    Type: '01',
                    BillShipper: {
                        AccountNumber: 'B98W48'
                    }
                    }
                },
                Service: {
                    Code: '03',
                    Description: 'Ground'
                },
                NumOfPieces: '1',
                Package: {
                    // SimpleRate: {
                    // Description: 'SimpleRateDescription',
                    // Code: 'XS'
                    // },
                    PackagingType: {
                    Code: '02',
                    Description: 'Packaging'
                    },
                    Dimensions: {
                    UnitOfMeasurement: {
                        Code: 'IN',
                        Description: 'Inches'
                    },
                    Length: '5',
                    Width: '5',
                    Height: '5'
                    },
                    PackageWeight: {
                    UnitOfMeasurement: {
                        Code: 'LBS',
                        Description: 'Pounds'
                    },
                    Weight: '10'
                    }
                },
                DeliveryTimeInformation: {
                    PackageBillType: '03',
                    Pickup: {
                      Date: '20230412',
                      Time: '1000'
                    }
                }
            }
        }
}

const query = new URLSearchParams({
    additionalinfo: 'timeintransit'
  }).toString();
  
  const version = 'v1';
  const requestoption = 'Rate';

const options = 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: 'test01trs',
        transactionSrc: 'testing',
        Authorization: `Bearer ${process.env.UPS_AUTH_TOKEN}`
        
      },
      body: JSON.stringify(data)
    }
    // fetch(`https://onlinetools.ups.com/api/rating/${version}/${requestoption}?${query}`, options)
    
fetch(`https://wwwcie.ups.com/api/rating/${version}/${requestoption}?${query}`, options)
.then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response)
    });



});



    