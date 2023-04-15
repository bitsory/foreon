const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const Clover = require("clover-ecomm-sdk");
const session = require('express-session');
const JSEncrypt = require('nodejs-jsencrypt').default;
const CryptoJS = require("crypto-js");
const db = require('./public/service/db.js');
require('dotenv').config();
// import fetch from 'node-fetch';






app.listen(process.env.PORT, function() {
    console.log('listening on 8080');
    // console.log(session);
});

app.set('view engine', 'ejs');

app.use(session({
    key: 'loginData',
    secret: 'blackcatdoubleattack',
    resave: false,
    saveUninitialized: true,
    HttpOnly:true,
    // cookie: { maxAge: 360000 } // 5 minute
    cookie: { maxAge: 3600000, sameSite: 'strict' }

}))

app.use(cookieParser("secret"));

const uuid4 = require('uuid');



app.get('/',(req,res) => {
    // fetch(`https://wwwcie.ups.com/security/v1/oauth/validate-client?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com`)
    // .then(response => response.json())
    // .then(response => {

    //     console.log("response")
    //     console.log(response)
    //     res.redirect(`https://www.ups.com/lasso/signin?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com&response_type=code&scope=read&type=ups_com_api`);
     
    // })
   

    console.log("home home home");
  
    if (req.session.loginData) {
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
    console.log("/login_check  /login_check /login_check /login_check/login_check   ");
    // const data = '';
    console.log(req.session.loginData)
    console.log(req.session)
    console.log(req.sessionID)
    const data = req.session.loginData ? req.session.loginData : {id : 'GUEST'};    
    res.send(data);
})

app.get('/account_modal_pop', (req,res) => { 
    const public_key = {key : process.env.RSA_PUBLIC_KEY};       
    res.send(public_key);
})

app.post("/sign_out", function (req, res) {
    req.session.destroy(() => {
        res.clearCookie('loginData');
        res.redirect('/');
    });
});



app.get('/home',(req,res) => {
    console.log(`req home: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});	
    } else {
		res.sendFile(__dirname + "/public/index.html");
	}    
});

app.get('/about',(req,res) => {    
    console.log(`req about: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});

app.get('/menu',(req,res) => {
    console.log(`req menu: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}    
});

app.get('/contact',(req,res) => {
    console.log(`req contact: ${req}`);
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





app.post('/sign_in', function (req,res) {
    // res.sendFile(__dirname + "/public/login.html");
    console.log(`req.body: ${req.body}`);
    console.log(`req.originalUrl: ${req}`);
    console.log(req.url);
    // const sess = req.session;
    
    // const con = makeConnect();
    const aid = req.body.aid;
    const bpw = req.body.bpw;

    const decrypt = new JSEncrypt();
    
    decrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const decryptedText_a = decrypt.decrypt(aid);
    const decryptedText_b = decrypt.decrypt(bpw);
    console.log(decryptedText_a)
    console.log(decryptedText_b)

    const sign_in_id = decrypt.decrypt(aid);
    const sign_in_pw = decrypt.decrypt(bpw);
    const redirect_path = req.body.c_path;
    // const redirect_path = req.url.substring(req.url.lastIndexOf('=') + 1);
    console.log(redirect_path);
    
    const date = getDate();  
    const crypto = require('crypto');
    // const buf = crypto.randomBytes(64);

    // const salt = buf.toString('base64');
    // console.log('salt');
    // console.log(salt);

    
    db.getConnection((con)=>{
        con.query('SELECT salt from users where id = ?', [sign_in_id], (err, result) => { 
            if(err) next(err);

            console.log('salt')
            console.log(result)
            if (result.length == 1) {
                makeKey(sign_in_pw, result[0].salt).then(key => {
                    console.log('key')
                    console.log(key)
                    con.query('SELECT *  from users where id = ? and pw = ?',
                    // con.query('SELECT COALESCE(MAX(id), "false") AS id from users where id = ? and pw = ?',
                        [sign_in_id, key], (err, result) => {
                        if(err){
                            res.send(err);
                            // con.end();
                        }
                        // else if(result[0] === 'false') {
                        else if(result[0] == undefined) {
                            console.log("Id & PW are not match")
                            res.send({check : 'not match'});
                            // con.end();
                        } else {                                         
                            console.log(`${result}`);  
                            updateLastLog(con, result[0].id, result[0].name, req, res, date, redirect_path, result[0].clv_id );
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
    console.log('salt');
    console.log(salt);

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
        console.log('key')
        console.log(key)
        
        let sign_up_first_name = '';
        let sign_up_last_name = '';

        if (req.body.uname.length > 1) {
            sign_up_first_name = req.body.uname[0];
            sign_up_last_name = req.body.uname[1];
        } else sign_up_first_name = req.body.uname[0];           
                
        const sign_up_id = decryptedaid;
        const sign_up_pw = key;
     
        const sign_up_email = decryptedaid;
        const sign_up_phone = req.body.uphone;
        const redirect_path = req.body.c_path; ///// need to update the welcome page 
        const date = getDate();    

        db.getConnection((con)=>{
            con.query('select COALESCE(MAX(id), "false") AS id from users where id = ?', [sign_up_id], (err, result) => {
                if(err) next(err); 

        
                console.log(result);
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
                    
                    fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
                        .then(response => response.json())
                        .then(response => {                
                            console.log(response)
                            const clv_id = response.id;
                            con.query('INSERT INTO users (id, pw, name, clv_id, email, phone, resi_date, last_log, salt) values (?,?,?,?,?,?,?,?,?)', 
                            [sign_up_id, sign_up_pw, sign_up_first_name, clv_id, sign_up_email, sign_up_phone, date, date, salt]);
                        

                            updateLastLog(con, sign_up_id, sign_up_first_name, req, res, date, redirect_path, clv_id);

                        })
                        .catch(err => console.error(err));
                    
                    console.log("sign up complete!!");                 
                
                } else {
                    console.log('use_other_id')
                    res.send({key : 'use_other_id'})
                }
            }); con.release();
        });
    });
});

function updateLastLog(connect, u_id, u_name, request, response, date, url, clv_id ) {
        
    console.log(`update: ${u_id}, ${date}`);       
    connect.query('UPDATE users SET last_log = ? where id = ?', [date, u_id]);
    let data = {id : u_id, name : u_name, clv_id : clv_id};
    request.session.loginData = data;
    console.log('req.session.loginData');
    console.log(request.session.loginData);

    response.cookie("cafe_fore_t", "test-test-test", {maxAge: 360000});
    response.cookie("cafe_fore_tt", "test-test-test", {maxAge: 3600000});
    response.cookie(
        'cafefore',{
        name : request.session.loginData.name,
        id : request.session.loginData.id,
        clv : request.session.loginData.clv_id                    
        
    }, {maxAge: 3600000, credentials: true, authorized : true, signed: true});
    console.log("login complete")
    const re_path = {url : url}
    response.send(re_path);  
    // connect.release();     
    // connect.end();
    
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
      
      fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}


app.post('/g_sign_in', function (req,res) {
    console.log("google sign in google sign in google sign in ")
    console.log(req.body);

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
 

    ///////////////////// DB sign up check //////////////////////////////////

    db.getConnection((con)=>{
        con.query('SELECT * FROM users WHERE id = ? and description = "google"', [g_loginid], (err, result) => {
            if(err) next(err);

            else if(result[0] === undefined) {
            ////// sign up/////////////////   
                const signup_salt = buf.toString('base64');            
                makeKey(decryptedbpw, signup_salt).then(key => {
                    console.log('key')
                    console.log(key)
                    const sign_up_pw = key;

                    const options = {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({
                        emailAddresses: [{emailAddress: g_loginid}],
                        // phoneNumbers: [{phoneNumber: sign_up_phone}],
                        firstName: first_name,
                        lastName: last_name
                        })
                    };
                
                    fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
                    .then(response => response.json())
                    .then(response => {                
                        console.log(response)
                        const clv_id = response.id;
                        con.query('INSERT INTO users (id, pw, name, clv_id, email, phone, resi_date, last_log, salt, description) values (?,?,?,?,?,?,?,?,?,?)', 
                        [g_loginid, sign_up_pw, name, clv_id, g_loginid, "", date, date, signup_salt, "google"]);

                        updateLastLog(con, g_loginid, name, req, res, date, redirect_path, clv_id);
                    })
                })
                
            } else if (result.length == 1){
                //////////////////////////// log in////////////////////////
                const login_salt = result[0].salt;
                console.log("login_salt for google id")
                console.log(login_salt)
                makeKey(decryptedbpw, login_salt).then(key => {

                    con.query('SELECT *  from users where id = ? and pw = ?',[g_loginid, key], (err, result) => {                                       
                        if(err){
                            res.send(err);                            
                        }             
                        else if(result[0] === undefined) {
                            console.log("Id & PW are not match")
                            res.send({check : 'not match'});
                            
                        } else {                                         
                            console.log(`${result}`);                        
                            updateLastLog(con, result[0].id, result[0].name, req, res, date, redirect_path, result[0].clv_id);
                        }
                    })
                })
            } else console.log("call admin to check double google ID in user DB ")
        }); con.release();        

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


app.post('/item_counter', (req,res) => {
    console.log(`req test: ${req.body}`);
    console.log("item_counter item_counter item_counter item_counter");
    
    const u_id = req.body.id;
    console.log(u_id);
    console.log(req.session.loginData.id);

    if (req.session.loginData && req.session.loginData.id == u_id) {     
        db.getConnection((con)=>{
            con.query('SELECT * FROM cart WHERE u_id = ? and result="n"', [u_id], (err, result) => {
                if(err){
                    res.send(err);
                    con.end();      
                } else {
                    console.log(result); 
                    res.send(result);
                }               
            }); 
            con.release();
        });  
    }
});
    
    


/////////////////////////////////////////////// clover API test//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
app.post('/dtest', (req,res) => { 
    console.log('/decrypt_test /decrypt_test /decrypt_test /decrypt_test')
   
    // const encryptedText = req.body.key;    
    const aid = req.body.a;
    const bpw = req.body.b;

    var ddecrypt = new JSEncrypt();
    
    ddecrypt.setPrivateKey(process.env.RSA_PRIVATE_KEY)

    const decryptedText_a = ddecrypt.decrypt(aid);
    const decryptedText_b = ddecrypt.decrypt(bpw);
    console.log(decryptedText_a)
    console.log(decryptedText_b)
})
*/


app.get('/list_of_orders', (req,res) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      };
      
      fetch('https://sandbox.dev.clover.com/v3/merchants/Q67P8MHV60X01/orders?expand=customers', options)
        .then(response => response.json())
        .then(response => console.log(response))

})


app.get('/save_card', (req,res) => {
    const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        //   'idempotency-key' : uuid,
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`},
            body: JSON.stringify({
            ecomind: 'ecom',
            "source": 'clv_1TSTSCqf2JsJjwDEu93JjDBR', 
            "email" : 'rangdad@gmail.com'
        })
      };
      
      fetch('https://scl-sandbox.dev.clover.com/v1/customers/DYSFDV5WVK3S4', options)
        // fetch('https://sandbox.dev.clover.com/v3/merchants/Q67P8MHV60X01/customers/DYSFDV5WVK3S4', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
});


// app.get('/create_customer', (req,res) => {

//     let ACCESS_TOKEN = process.env.ACCESS_TOKEN;
//     let ENVIRONMENT = process.env.ENVIRONMENT;

//     const cloverInst = new Clover(ACCESS_TOKEN, {
//     environment: ENVIRONMENT
//     });

//     let customer = cloverInst.customers.create({
//         email:'sample.email@example.com',
//         source:'clv_1TSTSAi4ESnkvfoBcpCA51UV'
//     });
// });

// app.post('/delete_payment_method', (req,res) => {
//     console.log('/delete_payment_method /delete_payment_method /delete_payment_method/delete_payment_method')
//     let u_id = req.body.id;
//     let c_number = req.body.card_index;
//     let default_payment_check = req.body.default_payment;
//     const outdate = getDate();
//     console.log(req.session.loginData.id)

//     if (u_id === req.session.loginData.id) {

//         const mysql = require('mysql');

//         const con = mysql.createConnection({
//             host: '127.0.0.1',
//             port: '3306',
//             user: 'root',
//             password: '111111',
//             database: 'test1',            
//         });        

//         con.connect((err) => {
//             if(err){
//             console.log('Error connecting to Db');
//             return;
//             }
//             console.log('Connection established');
//         });

//         if (default_payment_check === 'default') {



//         }


//         con.query('SELECT clv_id, cd_id FROM billing_info WHERE id = ? and bi_number = ?', [u_id, c_number], (err, result) => {
//             if (err) {
//                 res.send(err);
//                 con.end();
//             } else {
//                 console.log(result);

//                 console.log("delete card from DB")
//                         con.query('UPDATE billing_info SET inuse = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, c_number],
//                         (err, result) => {
//                             if (err) {
//                                 res.send(err);
//                                 con.end();
//                             } else console.log(result);                    
//                         });

//                         res.send(result);
//             } 
        
                

//                 ///////////// clover API fetch //////////////////
//                 /*
//                 const options = {
//                     method: 'DELETE',
//                     headers: {
//                       accept: 'application/json',
//                       authorization: `Bearer ${process.env.ACCESS_TOKEN}`
//                     }
//                 };
//                 fetch(`https://scl-sandbox.dev.clover.com/v1/customers/${result[0].clv_id}/sources/${result[0].cd_id}`, options)
//                 .then(response => response.json())
//                 .then(response => {
//                     console.log(response)
//                     if (response.deleted === 'true') {
//                         console.log("delete card from DB")
//                         con.query('UPDATE billing_info SET inuse = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, c_number],
//                         (err, result) => {
//                             if (err) {
//                                 res.send(err);
//                                 con.end();
//                             } else console.log(result);                    
//                         });

//                         res.send(result);
//                     } 
//                 })
//                 .catch(err => console.error(err));
                
//             }
//             */
//     })

//     } else {
//         res.send("check your ID");
//     }

// })


app.get('/delete_card', (req,res) => {

const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  };
//   fetch(`https://scl-sandbox.dev.clover.com/v1/customers/${customer_id}/sources/${customer_card_id}`, options)
  fetch('https://scl-sandbox.dev.clover.com/v1/customers/W29TP8XFK9BH6/sources/9BKRRQKANF8Z0', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

});



        


        
      
      






app.get('/get_an_order_test', (req,res) => {
    console.log('/get_an_order_test /get_an_order_test /get_an_order_test /get_an_order_test ')

    const orderId = 'D0C0FKJWDDB20';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      };
      
      fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${orderId}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
})


app.get('/get_order_test', (req,res) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      };
      
      fetch('https://scl-sandbox.dev.clover.com/v1/orders', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


})

app.get('/create_item', (req,res) => {
    console.log('/create_item /create_item /create_item /create_item')
    
    const options = {
        method: 'POST',
        headers: {'content-type': 'application/json', authorization: `Bearer ${process.env.ACCESS_TOKEN}`},
        body: JSON.stringify({
          hidden: 'false',
          available: 'true',
          autoManage: 'false',
          defaultTaxRates: 'true',
          isRevenue: 'false',
          name: 'Ginger Bottle 16 oz.',
          price: 19.08,
          priceType: 'PER_UNIT'
          
        })
      };
      
      fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/items`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
})

app.get('/get_single_customer', (req,res) => {

    console.log('/get_single_customer get_single_customer get_single_customer /get_customer/get_customer/get_customer')

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      };

    fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/W29TP8XFK9BH6?expand=cards`, options)
      .then(response => response.json())
      .then(response => { 
        console.log(response);
        // console.log(response.cards.elements);

        response.cards.elements.forEach(element => {console.log(element)
            
        });
        
      })
      .catch(err => console.error(err));
})


app.get('/get_customer', (req,res) => {

    console.log('/get_customer/get_customer/get_customer/get_customer')

   

    const options = {method: 'GET', headers: {accept: 'application/json', 
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`}};

    fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
})


app.get('/create_card_token', (req,res) => {

    console.log('/create_card_token')
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          apikey: process.env.API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          card: {
            number: '4242424242424242',
            exp_month: '01',
            exp_year: '27',
            cvv: '123',
            last4: '4242',
            first6: '424242',
            name: 'Jongho Kim'
          }
        })
      };
      
      fetch('https://token-sandbox.dev.clover.com/v1/tokens', options)
        .then(response => response.json())
        .then(response => {

            console.log(response)
            const options = {
                method: 'PUT',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                //   'idempotency-key' : uuid,
                  authorization: `Bearer ${process.env.ACCESS_TOKEN}`},
                body: JSON.stringify({
                    ecomind: 'ecom',
                    "source": response.id, 
                    "email" : 'rangdad@gmail.com'
                })
              };
              
              fetch('https://scl-sandbox.dev.clover.com/v1/customers/DYSFDV5WVK3S4', options)
                // fetch('https://sandbox.dev.clover.com/v3/merchants/Q67P8MHV60X01/customers/DYSFDV5WVK3S4', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        

            // const options = {
            //     method: 'POST',
            //     headers: {
            //       accept: 'application/json',
            //       'content-type': 'application/json',
            //       authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            //     },
            //     body: JSON.stringify({
            //       ecomind: 'ecom',
            //       shipping: {
            //         address: {
            //           line1: '2428 Morgan Creek Rd',
            //           city: 'Buford',
            //           country: 'US',
            //           postal_code: '30519',
            //           state: 'GA'
            //         }
            //       },
            //       email: 'rangdad@gmail.com',
            //       name: 'Jongho Kim',
            //       source: response.id,
            //       phone: '4702636495'
            //     })
            //   };
              
            //   fetch('https://scl-sandbox.dev.clover.com/v1/customers', options)
            //     .then(response => response.json())
            //     .then(response => console.log(response))
            //     .catch(err => console.error(err));



        })
            
            
            
            
        .catch(err => console.error(err));
})

app.get('/pay_order_test', (req,res) => {

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({"source":"DYSFDV5WVK3S4",
        "email":"rangdad@gmail.com",
        "stored_credentials":{
        "sequence": "SUBSEQUENT",
        "is_scheduled": false,
        "initiator": "CARDHOLDER"}})
      };
      
      fetch(`https://scl-sandbox.dev.clover.com/v1/orders/SNTNPYRTFNQY6/pay`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    // const uuid = uuid4.v4();
    // console.log('pay_order_test pay_order_test pay_order_test pay_order_test ')
    // const options = {
    //     method: 'POST',
    //     headers: {
    //       accept: 'application/json',
    //       'content-type': 'application/json',
    //       'idempotency-key' : uuid,
    //       authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    //     },
    //     body: JSON.stringify({"amount":2300,
    //     "currency":"usd",
    //     "source":"DYSFDV5WVK3S4"})
    //   };
      
    //   fetch('https://scl-sandbox.dev.clover.com/v1/charges', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));



})


app.get('/create_customer_test', (req,res) => {

    console.log('/create_customer_test /create_customer_test /create_customer_test /create_customer_test ')


    const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({firstName: 'Ted', lastName: 'Chang',})
      };
      
      fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


})


app.get('/create_order_test', (req,res) => {
    console.log("/create_order_test /create_order_test /create_order_test /create_order_test")

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: [
            {
        
              amount:1800,
                currency:"usd",
                description:"Ginger Bottle 16oz",
                quantity:1,
                type:"sku",
                tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
            //   inventory_id: '010001'
            }
          ],
          shipping: {
            address: {
              city: 'LAS VEGAS',
              line1: '6594 HULME END AVE',
              postal_code: '89139',
              state: 'Nevada',
              country:"US"
            },
            name: 'Jongho Kim',
            phone: '4702636495'
          },
          currency: 'usd',
          email: 'rangdad@gmail.com',
        //   customer: 'W29TP8XFK9BH6'
        })
      };
      
      fetch('https://scl-sandbox.dev.clover.com/v1/orders', options)
        .then(response => response.json())
        .then(response => {
            console.log("make order")
            console.log(response)

            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                },
                body: JSON.stringify({"source":"clv_1TSTSavUDzP5gBJFbMrPe2wK",
                // body: JSON.stringify({"source":"clv_1TSTSk1pBwk66yF3NoDwwH9f",
                "email":"rangdad@gmail.com",
                "stored_credentials":{
                    "sequence": "SUBSEQUENT",
                    "is_scheduled": false,
                    "initiator": "CARDHOLDER"}})
              };
              
              fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${response.id}/pay`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(`make payment for created order ${response.id}`)
                    console.log(response)
                })
                .catch(err => console.error(err));


            
            
            
        })
        .catch(err => console.error(err));
})







app.get('/refund_test', (req,res) => {
    console.log("/refund_test  /refund_test /refund_test /refund_test");

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({"charge":"AK9X4V4EDFNJA"})
      };
      
      fetch('https://scl-sandbox.dev.clover.com/v1/refunds', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    // const options = {
    //     method: 'POST',
    //     headers: {
    //       accept: 'application/json',
    //       'content-type': 'application/json',
    //       authorization: 'Bearer 0aaf8e95-31c5-5813-b2eb-d6adb8c1f05c'
    //     },
        
    //   };
      
    //   fetch('https://scl-sandbox.dev.clover.com/v1/orders/CK6DE4PEJ6MYT/returns', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

   
});

app.get('/get_charges', (req,res) => {
    console.log("/get_charge /get_charge /get_charge  ");

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      };
      
      fetch('https://scl-sandbox.dev.clover.com/v1/charges', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

});

app.get('/submit_payment_test', (req,res) => {
    console.log("/order_test /order_test /order_test /order_test");
    const uuid = uuid4.v4();

    // create card token
    const sdk = require('api')('@clover-platform/v3#g4lh1ylawketdl');

        sdk.createToken(
            { card: { number: "6011361000006668",exp_month: "12", exp_year: "2023",cvv: "123",brand: "DISCOVER"}}, 
            { apikey: `${process.env.API_KEY}`})
           

        .then(({ data }) => {
        console.log(data.id)

        ///////////////////////////////////////////////////////////
        // make charge
        const options = {
            method: 'POST',
            headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'idempotency-key' : uuid,
            authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                ecomind: 'ecom',
                currency: 'usd',
                amount: 1300,
                source: 
                data.id,
                
                tax_rate_uuid: process.env.TAX_UUID
            })
        };

        console.log(options);
        
        fetch('https://scl-sandbox.dev.clover.com/v1/charges', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


        }).catch(err => console.error(err));
    
    res.send("app.get('/test', (req,res)")


})






// app.get('/shop/view/item/:item_no',(req,res) => {
    
//     var product_number = parseInt(req.params.item_no);
//     var member_name = '';

//     console.log(`/shop/view/item:id: ${product_number}`);
//     if (req.session.loginData) {member_name = req.session.loginData.name;}
//     const mysql = require('mysql');

//     const con = mysql.createConnection({
//         host: '127.0.0.1',
//         port: '3306',
//         user: 'root',
//         password: '111111',
//         database: 'test1',
        
//     });

//     con.connect((err) => {
//         if(err){
//         console.log('Error connecting to Db');
//         return;
//         }
//         console.log('Connection established');
//     });


//     // const sign_in_id = req.body.sign_in_id;
//     // const sign_in_pw = req.body.sign_in_pw;
//     // const redirect_path = req.url.substring(req.url.lastIndexOf('=') + 1);
//     // console.log(redirect_path);

//     var date;
//     date = new Date();
//     date = date.getFullYear() + '-' +
//     ('00' + (date.getMonth()+1)).slice(-2) + '-' +
//     ('00' + date.getDate()).slice(-2) + ' ' + 
//     ('00' + date.getHours()).slice(-2) + ':' + 
//     ('00' + date.getMinutes()).slice(-2) + ':' + 
//     ('00' + date.getSeconds()).slice(-2);
    
        
//     con.query('SELECT * from product where prodnum = ?', [product_number]
//         , (err, result) => {
//                 if(err){
//                     res.send(err);
//                     con.end();
//                 // }
//                 //  else if(result[0].no === 'false') {
//                 //     res.send('check your ID and PW');
//                 //     con.end();
//                 } else {

//                     // console.log("SELECT * from product where prodnum = ");
//                     // console.log(`${result[0].prodnum}`);
                    
//                     // res.send(result[0].name);
//                     if(member_name) {
//                         res.render('shop_detail.ejs', { 
//                             post : member_name,
//                             product : result
                          
//                         })
//                     } else {

//                         res.render('shop_detail.ejs', { 
//                             post : "GUEST",
//                             product : result
                           
//                         })
//                     }
//                 }
//             });  

// });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




app.post("/add_cart", function (req, res) {
    console.log("/add_cart /add_cart /add_cart");
    console.log(req.session.loginData.id)
    console.log(req.body)
    
    const u_id = req.session.loginData.id;
    // const u_name = req.body.c_name;
    const prodnum = req.body.c_item_no;
    const quantity = req.body.c_item_quantity;

    let date = getDate();

    let cartnum = date.replace(/\s|:|\-/g,"") + "CT" + u_id.substr(0, 3);

    console.log(date);
    console.log(cartnum);
    console.log(prodnum);
    // check the same item in cart   

    db.getConnection((con)=>{
        con.query('SELECT cartnum, quantity from cart where u_id = ? and prodnum = ? and result = "n"', [u_id, prodnum], (err, result) => { 
            if(err) res.send(err);
            else {
                if (result[0] != undefined) { // overwrite item quantity
                    console.log(result[0]);
                    console.log(result[0].quantity);
                    console.log(result[0].cartnum);
                    con.query('UPDATE cart SET `quantity` = ?, `modate` = ? where (`cartnum` = ? and u_id = ? and prodnum = ? and result = "n")', [quantity, date, result[0].cartnum, u_id, prodnum], (err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();
                        } else {
                            console.log(result);        
                            viewAddedItem();
                        }                    
                    })
                } else {
                    console.log("put in new item in cart")
                    con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, indate, modate) values (?,?,?,?,?,?)', 
                    [cartnum, u_id, prodnum, quantity, date, date], (err, result) => {
                        if(err){                        
                            res.send(err);
                            // con.end();
                        } else {
                            console.log(result);        
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
                    // con.end();            
                } else {
                    console.log("result");
                    console.log(result);
                    
                    res.send(result);
                }
            });
            con.release();
        });
    }


    /*
    con.query('SELECT * from cart where u_id = ? and result = "n"', [u_id],
        (err, result) => {
            console.log("add cart")
            console.log(result);

            if(err){                        
                res.send(err);
                con.end();
            }
            
            else if (result[0] === undefined) { // nothing cart
                console.log(" make new cart ")
                con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, indate, modate) values (?,?,?,?,?,?)', 
                [cartnum, u_id, prodnum, quantity, date, date]);
            } else { //add up quantity, check cart number
                console.log("result");
                console.log(result);
                let cartnumber = result[0].cartnum;
                console.log(cartnumber)
                let filtered = result.filter((element) => {
                    console.log("element")
                    console.log(element.prodnum);
                    // parseInt(element.prodnum) == parseInt(prodnum)});
                    return element.prodnum == prodnum ? true : false});
                console.log(filtered);
                if (filtered.length) { // exist item
                    con.query('UPDATE cart SET `quantity` = ?, `modate` = ? where (`prodnum` = ?)', [filtered[0].quantity + quantity, date, prodnum]);
                } else {
                    console.log("make new item in exist cart")
                    con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, indate, modate) values (?,?,?,?,?,?)', 
                    [cartnumber, u_id, prodnum, quantity, date, date]);

                }
                
            }


        })
    */


/*
    con.query('SELECT cartnum, quantity from cart where u_id = ? and prodnum = ? and result = "n"',
    //con.query('SELECT COALESCE(MAX(cartnum), "false") AS cartnum from cart where u_id = ? and prodnum = ?',
        [u_id, prodnum], (err, result) => {
        if (result[0] != undefined) { // add up item quantity
            console.log(result[0]);
            console.log(result[0].quantity);
            console.log(result[0].cartnum);
            con.query('UPDATE cart SET `quantity` = ?, `modate` = ? where (`cartnum` = ?)', [result[0].quantity + quantity, date, result[0].cartnum]);
            console.log("added up same item in cart")

        } else {
            console.log("put in new item in cart")
            con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, indate, modate) values (?,?,?,?,?,?)', 
            [cartnum, u_id, prodnum, quantity, date, date]);
            
            // res.json(req.body)
        }
    }); */
});


app.post("/shop/cart/:user", function (req, res) {
    console.log("/shop/cart/:user");
    console.log(req.body);
    var user = req.params.user;
    console.log(user);
    // res.render('shop_order.ejs');



});

app.post("/shop/order", function (req, res) {
    
    
    console.log("/shop/order/shop/order/shop/order/shop/order");
    console.log(req.body);
    const u_id = req.body[0].u_cart.length ? req.body[0].u_cart[0].u_id : 'GUEST';
        
    /*
    const mysql = require('mysql');

    const con = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '111111',
        database: 'test1',
        
    });

    con.connect((err) => {
        if(err){
        console.log('Error connecting to Db');
        return;
        }
        console.log('Connection established /shop/order');
    });
    */

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
                    console.log("result");
                    console.log(result);                    
                    res.send(result);
                }
            });
        } else {
            console.log("guest cart check out")
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
                        console.log("result");
                        console.log(result);                        
                        res.send(result);
                    }
            });
        } 
        con.release();
    });
});



app.post('/change_profile_general',(req,res) => {
    console.log(`req contact: ${req}`);
    console.log(req.body);
    if (req.session.loginData) {
		res.send(req.session.loginData);
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
            
                fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
                .then(response => response.json())
                .then(response => {
                    console.log("card response")
                     
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
                    })                    
                })
                .catch(err => console.error(err));            
            }
        }); 
        con.release();
    });
});

app.get('/get_user_shipping_info', (req,res) => {
    console.log(req.body);
    const u_id = req.session.loginData.id;
    console.log(u_id);

    db.getConnection((con)=>{
        con.query('SELECT * FROM shipping_info WHERE id = ?', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {                
                res.send(result);
            }
        }); 
        con.release();
    });
})


app.post('/add_payment_method', (req,res) => {
    console.log('/change_profile_billing /change_profile_billing /change_profile_billing')
    const body = req.body;
    console.log(body);
    const clv_id = req.session.loginData.clv_id; 
    const c_num = req.body.cardnumber;
    const card_holder = req.body.card_name;
    const card_email = req.body.card_email;
    const default_check = req.body.default_payment;

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
            "email" : 'rangdad@gmail.com' // user email to recieve a notice  
        })
      };
      
      fetch(`https://scl-sandbox.dev.clover.com/v1/customers/${clv_id}`, options)        
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
        
            fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${clv_id}?expand=cards`, options)
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
                    console.log(data);
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
                        con.query('INSERT INTO billing_info (id, clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, email, default_payment, indate) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                        [u_id, $clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, email, default_check, indate], (err, result) => {
                            if (err) {
                                res.send(err);
                                // con.end();
                            } else {
                                res.send(result);
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
        con.query('UPDATE test1.billing_info SET default_payment="n" WHERE id = ?', [u_id], (err, result) => {
            if (err) {
                res.send(err);
                // con.end();
            } else {
                console.log(result);  
                con.query('UPDATE test1.billing_info SET default_payment="default" WHERE id = ? and bi_number = ?', [u_id, bi_number], (err, result) => {
                    if (err) {
                        res.send(err);
                        con.end();
                    } else {
                        console.log(result);
                        con.query('SELECT clv_id FROM test1.billing_info WHERE id = ?', [u_id], (err, result) => {
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
                    
                                fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
                                .then(response => response.json())
                                .then(response => { 
                                    console.log(response);
                                    let res_data = response.cards.elements.map(element => {
                                        return element.id;
                                    })
                                    console.log(res_data);
                                    
                                    con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM test1.billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
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
                if (default_payment === 'default') {
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
                
                            fetch(`https://sandbox.dev.clover.com/v3/merchants/${process.env.MERCHANT_ID}/customers/${result[0].clv_id}?expand=cards`, options)
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
        
    const u_id = req.session.loginData.id;
    const sh_number = req.body.shipping_index
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
                    res.send(result);
                }
            });
            con.release();
        });
    }

});




app.post('/add_profile_shipping', (req,res) => {
    console.log(`req contact: ${req}`);
    console.log(req.body);

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
            if (default_check === 'default') { 
                db.getConnection((con)=>{
                    con.query('SELECT id from shipping_info WHERE id=?', [u_id],(err, result) => {
                        if (err) {
                            res.send(err);
                            // con.end();
                        } else if (result !== undefined) { 
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
                        res.redirect('http://localhost:8080/account');
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
    
    
    db.getConnection((con)=>{
        con.query('SELECT * from product where useyn = "y"', (err, result) => {
            if(err){
                res.send(err);
                // con.end();        
            } else {
                console.log("SELECT * from product where prodnum = ");
                console.log(result);
                console.log(`${result[0].prodnum}`);

                res.send(result);                
            }                        
        });    
        con.release();
    });
});



app.post('/shop/view/item/:item_number',(req,res) => {
    console.log(`/shop/view/item/:item_number : ${req.params.item_number}`);
        
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


app.post('/overwrite_cart', (req,res) => {
    console.log('/overwrite_cart/overwrite_cart /overwrite_cart/overwrite_cart')
    console.log(req.body);

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
                            update_query_2 = update_query_2 + `when test1.cart.prodnum = '${update_items[i].c_item_no}' then '${update_items[i].c_item_quantity}' `
                        }
                        const update_query_3 = `end), modate = '${date}' WHERE test1.cart.prodnum IN (${update_items_prodnum}) AND u_id = '${u_id}' and result="n";`
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
                                console.log("result");
                                console.log(result);
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
        con.query('SELECT cardholder, type, last4 FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
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
                // console.log("result");
                // console.log(result);
                
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
            con.query('UPDATE cart SET quantity=cart.quantity + 1, modate = ? where u_id = ? and prodnum = ?', [date, u_id, item_num]
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
            con.query('UPDATE cart SET quantity=cart.quantity - 1, modate =? where u_id=? and prodnum=?', [date, u_id, item_num] ,(err, result) => {
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
    
    console.log('/item_delete /item_delete /item_delete /item_delete/item_delete')

    // const connect = makeConnect();

    if (user_id == u_id) {      
        db.getConnection((con)=>{
            con.query('DELETE FROM cart WHERE u_id=? and prodnum=?', [u_id, item_num] ,(err, result) => {
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

app.post('/check_purchase_history', (req,res) => {

    console.log('/check_purchase_history /check_purchase_history')
    const id= req.body.id;
    const u_id = req.session.loginData.id;

    if (id == u_id) {     
        db.getConnection((con)=>{
            con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number IN (SELECT order_number FROM orders WHERE u_id = ?) ORDER BY oddate DESC',[u_id],(err, result) => {
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
    } else console.log("id Check")
});


app.post('/user_checkout_submit', (req,res) => {

    console.log(req.body);
    const u_id = req.session.loginData.id;
    // const amount = req.body.amount;
    const cart = req.body.cart;
    const shipping_rate = req.body.shipping_rate;
    console.log(shipping_rate);
    let default_payment_method = '';
    let clv_id = '';
    let default_shipping_info = {};
    let cardholder = '';
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
        tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
    }   
        
    const items = cart.map(element => {
        return { 
            amount : element.price_sell * 100,
            currency : "usd",
            description : element.content.substring(0,120),
            quantity : element.quantity,
            type:"sku",
            tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
        }

    });
    items.push(shipping_fee);

    const tmp_amount_items = items.map(element => {return element.amount/100 * element.quantity ;})
    const total_order_amount = tmp_amount_items.reduce((a,b) => (a+b));
    console.log(total_order_amount);    
    

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
                con.query('SELECT clv_id, clv_tk, cardholder FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
                    if(err){                        
                        res.send(err);
                        // con.end();        
                    } else {
                        console.log(result);            
                        default_payment_method = result[0].clv_tk;
                        clv_id = result[0].clv_id;
                        cardholder = result[0].cardholder;
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

    function setOrders(response, confirm_info) {
        console.log('order_number');
        console.log(order_number);   
        db.getConnection((con)=>{    
            con.query('INSERT INTO test1.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate, shipping_fee, shipping_rate) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, total_order_amount, date, shipping_rate[1], shipping_rate[0]], (err, result) => {
                if(err){                        
                    res.send(err);
                    // con.end();        
                } else {
                    console.log('set orders') 
                    console.log(result);      
                    // setShippingFee(cart_numbers[0], u_id, order_number, con);          
                    updateOrderedCart(order_number, date, cart_numbers, u_id, con, confirm_info);
                }
            }); 
            con.release();
        });
    }

    function updateOrderedCart(order_num, oddate, cart_num, user_id, con, confirm_info) {
        // db.getConnection((con)=>{
            con.query('UPDATE test1.cart SET result = "y", order_number = ?, oddate = ? WHERE cartnum in (?) and u_id = ?'
            ,[order_num, oddate, cart_num, user_id], (err, result) => {
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

    function setShippingFee(cart_num, user_id, order_num, con) {
        con.query('INSERT INTO cart (cartnum, u_id, prodnum, quantity, result, indate, modate, order_number, oddate) VALUES (?,?,?,?,?,?,?,?,?)'
        ,[cart_num, user_id, 0, 1, 'y', date, date, order_num, date], (err, result) => {
            if(err){                        
                res.send(err);
                // con.end();        
            } else {
                console.log('update complete Order Cart') 
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
            shipping: {
                address: {
                city: default_shipping_info.city,
                line1: default_shipping_info.address1,
                line2: default_shipping_info.address2,
                postal_code: default_shipping_info.zip,
                state: default_shipping_info.state,
                country:"US"
                },
                name: default_shipping_info.recipient,
                phone: default_shipping_info.phone,
                email: default_shipping_info.email
            },
            currency: 'usd',
            email: default_shipping_info.email,
            customer: clv_id
            })
        };
        console.log("options");
        console.log(options);
        
        fetch('https://scl-sandbox.dev.clover.com/v1/orders', options)
            .then(response => response.json())
            .then(response => {
                console.log("make order")
                console.log(response)

                const options = {
                    method: 'POST',
                    headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({"source":default_payment_method,
                    "email":"rangdad@gmail.com",
                    "stored_credentials":{
                        "sequence": "SUBSEQUENT",
                        "is_scheduled": false,
                        "initiator": "CARDHOLDER"}})
                };
                
                fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${response.id}/pay`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(`make payment for created order ${response.id}`)
                        console.log(response)
                        if (response.status == 'paid') {
                                                        
                            const confirm_info = {
                            status : "complete",
                            name : req.session.loginData.name,
                            order_number : order_number,
                            email : default_shipping_info.email,
                            shipping_address : default_shipping_info.address1 + ' ' + default_shipping_info.address2 + ', ' + default_shipping_info.city + ', ' + default_shipping_info.state + ' ' + default_shipping_info.zip,
                            recipient : default_shipping_info.recipient,
                            phone : default_shipping_info.phone,
                            type : response.source.brand,
                            ending4 : response.source.last4,
                            billing_address : default_shipping_info.address1,
                            cardholder : cardholder,
                            subtotal : response.amount - response.tax_amount, 
                            tax : response.tax_amount,
                            grandtotal : response.amount
                            };
                            console.log(confirm_info);
                            setOrders(response, confirm_info);    
                            // updateOrderedCart(order_number, date, cart_numbers, u_id)
                            
                            // res.send(confirm_info);     
                                      
                        }                        
                    })
                    .catch(err => console.error(err));               
                
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
    console.log(order_items);
    console.log(shipping_rate);
    const cardholder = req.body.card_name;
    const recipient = req.body.recipient_first_name +' '+req.body.recipient_last_name;
    const shipping_address = req.body.shipping_address_street_line1 + ' ' + req.body.shipping_address_street_line2 + ', ' + req.body.shipping_address_city + ', ' + req.body.shipping_address_state + ' ' + req.body.shipping_address_zip;
    const token_id = req.body.cloverToken;
    const shipping_fee = {
        amount : shipping_rate[1] * 100,
        currency : "usd",
        description : "UPS shipping " + shipping_rate[0],
        quantity : 1,
        type:"sku",
        tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
    }
    const items = order_items.map(element => {
        return { 
            amount : element.c_item_price * 100,
            currency : "usd",
            description : element.c_item_no + "," + element.c_item_name,
            quantity : element.c_item_quantity,
            type:"sku",
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
            email: req.body.order_contact_email
          })
                
      };
      console.log(options);
      
      fetch('https://scl-sandbox.dev.clover.com/v1/orders', options)
        .then(response => response.json())
        .then(result => {
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
                
                fetch(`https://scl-sandbox.dev.clover.com/v1/orders/${result.id}/pay`, options)
                .then(response => response.json())
                .then(response => {

                    console.log("order paid")
                    console.log(response)

                    

                    //////////////////// store order info into DB
                    const u_id = 'GUEST';
                    
                    let default_payment_method = '';
                    let clv_id = '';
                    let default_shipping_info = {};
                    
                    const date = getDate();
                    const cart_num = date.replace(/\s|:|\-/g,"") + "CTGUEST";
                    const order_num = date.replace(/\s|:|\-/g,"") + "ODGUEST";
                    const order_items = response.items.slice(0,-1);
                    console.log(order_items)
        

                    setOrders(order_num, u_id, response, date);

                    const insert_cart_query = "INSERT INTO `cart` (`cartnum`,`u_id`,`prodnum`,`quantity`,`result`,`indate`,`modate`,`order_number`,`oddate`) values ?;"
                    let insert_cart_value = [];

                    let insert_cart_value_element = [];
                    
                    for(let i in order_items) {
                        insert_cart_value_element.push(cart_num);
                        insert_cart_value_element.push(u_id);
                        insert_cart_value_element.push(order_items[i].description.substring(0, order_items[i].description.indexOf(',')));
                        insert_cart_value_element.push(order_items[i].quantity);
                        insert_cart_value_element.push('y');
                        insert_cart_value_element.push(date);
                        insert_cart_value_element.push(date);
                        insert_cart_value_element.push(order_num);
                        insert_cart_value_element.push(date);

                        insert_cart_value.push(insert_cart_value_element);
                        insert_cart_value_element = [];
                    }
                    console.log(insert_cart_value);
                    db.getConnection((con)=>{
                        con.query(insert_cart_query, [insert_cart_value], (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {        
                                console.log("con.query(insert_cart_query, [insert_cart_value], (err, result)");                      
                                console.log(result);
                            }
                        });
                        con.release();
                    });

                    ////////////////////////////////////
                    
                    let paid_items_number = order_items.map(element => {
                        console.log(element.description)                            
                        return element.description.substring(0, element.description.indexOf(','));
                    })

                    const confirm_info = {
                        status : "complete",
                        paid_items_number : paid_items_number,
                        name : recipient,
                        order_number : order_num,
                        email : req.body.order_contact_email,
                        recipient : recipient,
                        shipping_address : shipping_address,
                        phone : req.body.order_contact_phone,
                        type : response.source.brand,
                        ending4 : response.source.last4,
                        billing_address : "default_shipping_info.address1",
                        cardholder : cardholder,
                        subtotal : response.amount - response.tax_amount, 
                        tax : response.tax_amount,
                        grandtotal : response.amount
                    };

                    console.log(confirm_info)
                    
                    res.send(confirm_info);
                }).catch(err => console.error(err));
            }        
        }).catch(err => console.error(err));

        function setOrders(order_number, u_id, response, date) {
            console.log('order_number');
            console.log(order_number);       
            db.getConnection((con)=>{
                con.query('INSERT INTO test1.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate, shipping_fee, shipping_rate) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, response.amount / 100, date, shipping_rate[1], shipping_rate[0]], (err, result) => {
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
});

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
                    Code: '12',
                    Description: '3 Day Select '
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
    const requestoption = 'Shop';

    const options = 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            transId: 'test01trs',
            transactionSrc: 'testing',
            Authorization: `Bearer ${process.env.UPS_API_KEY}`
            // Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImF1ZCI6ImNhZmUgRm9yZSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibmJmIjoxNjgxMjQwNDE2LCJEaXNwbGF5TmFtZSI6ImNhZmUgRm9yZSIsImlzcyI6Imh0dHBzOlwvXC9hcGlzLnVwcy5jb20iLCJleHAiOjE2ODEyNTQ4MTYsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJpYXQiOjE2ODEyNDA0MTYsImp0aSI6ImRmNjYxNThmLTBmYTEtNDU0OC04OTczLTczNTUyOGQxMzBhZSIsInNpZCI6IjRjNjAwMjU3LTNlY2UtNGE5My1hY2RlLWI3NTk5YTQ0NzY5ZCJ9.asOY41WovUTGTv_3VEjY_IWteO88lAvQBUBmvI5jGPiV4psfg5LfQa6J-1Ok3ahf_35homGR6yvgPt-89TXJPAVKiW-IjrneFJajmVsr2WUjpbzrgYZowmPce4EQyHCwfau9rriILPkOF2phLdvtcEMt277HxhTBbHY3t3ADMY6vOnkgjPOw0alMaxqGFQ-UxneesVk24QsL2nqnt8r0mPV3BF163ZeFINbzeWknL_j1RhIryheJ4v0H7_4amkeVS1f4DvvpUeAId4mJ4sP2FYIhpX4l3yVpHkhThwB54ZQ3If9DAAy25JXteFmn8GI3V-HxODlMGjAOUEVNs6Ujhmzj3c_mCI0nFgNZ1dleiKywM5cppHo3g_Cf9lURkdQkrr5s8Piqnqn3lCuhuqj13gx_TH9uWDFsbkUi6vtKfCeS8KEoA2wCRCZI0NwLwET96ZCeCNS6QXKixx7XoP7JRB8O_te3CW-jHocXAb7g_UqaSQsLbpPwwezp92DI1s8pd5CUdMndxj1No_1ZMPApPKBbME-mJkp1RUqqHvERs2tEddhFPR692oHYXLLnsDZY5eekVoNYrrCcywi-hemPEpR0wVJLNlgXIRoP4weqOYDCZy1h3XDfx2NzWqgSzOulQPArFteC7VSVK5x_GUUNXvz3M9PF4tCmbsccL4_If3E'
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



/*
app.post('/get_rate', (req, res) => {

    console.log("//get_shipping_rate/get_shipping_rate/get_shipping_rate/get_shipping_rate");
    const shipto = req.body;
    const weight = String(req.body.weight);
    
    console.log(shipto);
    

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
                    Name: 'req.body.recipient',
                    Address: {
                    AddressLine: [
                        '2742 Pearl Ridge Trce'                    
                    ],
                    City: 'Buford',
                    StateProvinceCode: 'GA',
                    PostalCode: '30519',
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
                    Code: '13',
                    Description: 'Next Day Air Saver'
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
    const requestoption = 'Shop';

    const options = 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            transId: 'test01trs',
            transactionSrc: 'testing',
            Authorization: `Bearer ${process.env.UPS_API_KEY}`
            // Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImF1ZCI6ImNhZmUgRm9yZSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibmJmIjoxNjgxMjQwNDE2LCJEaXNwbGF5TmFtZSI6ImNhZmUgRm9yZSIsImlzcyI6Imh0dHBzOlwvXC9hcGlzLnVwcy5jb20iLCJleHAiOjE2ODEyNTQ4MTYsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJpYXQiOjE2ODEyNDA0MTYsImp0aSI6ImRmNjYxNThmLTBmYTEtNDU0OC04OTczLTczNTUyOGQxMzBhZSIsInNpZCI6IjRjNjAwMjU3LTNlY2UtNGE5My1hY2RlLWI3NTk5YTQ0NzY5ZCJ9.asOY41WovUTGTv_3VEjY_IWteO88lAvQBUBmvI5jGPiV4psfg5LfQa6J-1Ok3ahf_35homGR6yvgPt-89TXJPAVKiW-IjrneFJajmVsr2WUjpbzrgYZowmPce4EQyHCwfau9rriILPkOF2phLdvtcEMt277HxhTBbHY3t3ADMY6vOnkgjPOw0alMaxqGFQ-UxneesVk24QsL2nqnt8r0mPV3BF163ZeFINbzeWknL_j1RhIryheJ4v0H7_4amkeVS1f4DvvpUeAId4mJ4sP2FYIhpX4l3yVpHkhThwB54ZQ3If9DAAy25JXteFmn8GI3V-HxODlMGjAOUEVNs6Ujhmzj3c_mCI0nFgNZ1dleiKywM5cppHo3g_Cf9lURkdQkrr5s8Piqnqn3lCuhuqj13gx_TH9uWDFsbkUi6vtKfCeS8KEoA2wCRCZI0NwLwET96ZCeCNS6QXKixx7XoP7JRB8O_te3CW-jHocXAb7g_UqaSQsLbpPwwezp92DI1s8pd5CUdMndxj1No_1ZMPApPKBbME-mJkp1RUqqHvERs2tEddhFPR692oHYXLLnsDZY5eekVoNYrrCcywi-hemPEpR0wVJLNlgXIRoP4weqOYDCZy1h3XDfx2NzWqgSzOulQPArFteC7VSVK5x_GUUNXvz3M9PF4tCmbsccL4_If3E'
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
})
*/

function setUPSShipment(shipto, rate) {

    let service_code = {};
    console.log(shipto);
    if (rate == "flat") service_code = { Code: '03', Description: 'ground' }
    else if (rate == "ground") service_code = { Code: '03', Description: 'ground' };
    else if (rate == "3days") service_code = 13;
    else if (rate == "nextday") service_code = 12;


    const ship = {
        ShipmentRequest: {
            Request: {
            SubVersion: '1801',
            RequestOption: 'nonvalidate',
            TransactionReference: {CustomerContext: 'test'}
            },
            Shipment: {
            Description: 'Ship WS test',
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
            Service: {
                Code: '03',
                Description: 'ground'
            },
            Package: {
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
                Width: '30',
                Height: '45'
                },
                PackageWeight: {
                UnitOfMeasurement: {
                    Code: 'LBS',
                    Description: 'Pounds'
                },
                Weight: '15'
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

    const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: 'string',
        transactionSrc: 'testing',
        Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibWVyX2lkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwiaXNzIjoiaHR0cHM6XC9cL2FwaXMudXBzLmNvbSIsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJzaWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJhdWQiOiJjYWZlIEZvcmUiLCJuYmYiOjE2ODEzMTcyMDAsIkRpc3BsYXlOYW1lIjoiY2FmZSBGb3JlIiwiZXhwIjoxNjgxMzMxNjAwLCJpYXQiOjE2ODEzMTcyMDAsImp0aSI6IjY2MDZhZGVjLTFhNTUtNDA5Ni04MjU0LTUzNjk5MWZlYjVkMSJ9.Y7F6dObaXBN3qnFyA7uQRpOKZbVBpMU4eYH1Rxdt_jhMkCvImU_zgRNJpo1ToqF7kDbkWsOUIgJUPgXs0qPuhKL09hSXJhCblI2n6K-gOFRN0h8aH8YgywBp5M_llzv1WUaa0VTXH-6Bj9DMhRhz7jVdHMnOhz4yLwZ8KEfzs7TXFlKZrOjeKcBnQ9y9ydfp73xR8n4kvn1WpSQoQCWbjMKtq2NkCDfKJnckN3JjJo2LBQeFMucSHlk9wpusjmsnG5jBFCH3Q0-Z51pdp2ji1wiwNTL8gSN-Z5L9Veab7qgg5c-VCnxs6a2eDj7if7ySUJIPVFe2YzCDZWnw06Hv1dz37Loa-1xo50na88OodqKlNsv6jWgkeb1pWnT4fkegA0m7zjJDt74jgSa9Kp2ytb-zmkgAXQlGrEfONB7IDdntwBS98TN1ohSJP-X3GjAJupWcUcTLx2v-0rfyrmTiWMkRiCxj6WfQCXoZhqd3R9UInAPLJSpWM62quKNF6jzik-_X3iKWpAnvOAv3-ezznpxEsL7T1gpynpNRZX9YKjPQlGVLxDD5xSGW2QSP4fd8M9sXiBR4YXAdbfUUM2hDibRruiIPyRIQH-IKd445qqhZZEIidaE7WaipMjY2rfqa6D--9TsbF_QEZxXe03bE0XdYXgbwOqbxLhOREamd2ps'
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


}


function setOrders(order_number, u_id, response, date) {
    console.log('order_number');
    console.log(order_number);       
    con.query('INSERT INTO test1.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate) VALUES (?,?,?,?,?,?,?,?)',
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
    con.query('UPDATE test1.cart SET result = "y", order_number = ?, oddate = ? WHERE cartnum in (?) and u_id = ?'
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

app.post('/order-confirm-test', (req, res) => { 

    const confirm_info = {
        status : "complete",
        paid_items_number : "paid_items_number",
        name : "recipient",
        order_number : "order_num",
        email : "req.body.order_contact_email",
        recipient : "recipient",
        address : "req.body.address",
        phone : "req.body.order_contact_phone",
        type : "response.source.brand",
        ending4 : "response.source.last4",
        billing_address : "default_shipping_info.address1",
        cardholder : "cardholder",
        subtotal : "response.amount - response.tax_amount", 
        tax : "response.tax_amount",
        grandtotal : "response.amount"
    };

    res.send(confirm_info)


});


app.get('/test_ups_toke', (req, res) => {
    const formData = {
        grant_type: 'client_credentials'
      };

    const options = {
    method: 'POST',
    headers: {
        Authorization: 'Basic ' + Buffer.from('Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11:Stn6Dox0uRs2GovzBhyyNgkL3pt5NaqSfRsAgFR72VsKoE3Q0tEdS1EDJBwUroFB').toString('base64'),
        'x-merchant-id': 'Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body : new URLSearchParams(formData).toString()
    // body: 'grant_type=authorization_code&code=SGUySE1tU0MtVTJGc2RHVmtYMS9PWmxKYW13SG1jMWdiQTlBTlI0NVRhWWRKUC9KYktaM0FNdzA0QmlIdVVydllrOVVLNkZ4aCt4N0NFMVBVcnBQYzNYdDF0eGJVanc9PQ=='
    }

    fetch('https://wwwcie.ups.com/security/v1/oauth/token', options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response)
    });




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
                    Code: '03',
                    Description: 'GROUND'
                },
                // Package: [                    
                //     {                        
                //       PackageWeight: {
                //         Weight: '10',
                //         UnitOfMeasurement: {
                //           Description: 'desc',
                //           Code: 'LBS'
                //         }
                //       },
                //       Dimensions: {
                //         Height: '2',
                //         Width: '2',
                //         Length: '02',
                //         UnitOfMeasurement: {
                //           Description: 'desc',
                //           Code: 'IN'
                //         }
                //       },
                //       Packaging: {
                //         Description: 'desc',
                //         Code: '02'
                //       },
                //       Description: 'moon lamp'
                //     },        
                //     {
                //       PackageWeight: {
                //         Weight: '10',
                //         UnitOfMeasurement: {
                //           Description: 'desc',
                //           Code: 'LBS'
                //         }
                //       },
                //       Dimensions: {
                //         Height: '2',
                //         Width: '2',
                //         Length: '02',
                //         UnitOfMeasurement: {
                //           Description: 'desc',
                //           Code: 'IN'
                //         }
                //       },
                //       Packaging: {
                //         Description: 'desc',
                //         Code: '02'
                //       },
                //       Description: 'ginger'
                //     },        
                //     {
                //       Description: 'play mat',
                //       Packaging: {
                //         Code: '02',
                //         Description: 'desc'
                //       },
                //       Dimensions: {
                //         UnitOfMeasurement: {
                //           Code: 'IN',
                //           Description: 'desc'
                //         },
                //         Length: '02',
                //         Width: '2',
                //         Height: '2'
                //       },
                //       PackageWeight: {
                //         UnitOfMeasurement: {
                //           Code: 'LBS',
                //           Description: 'desc'
                //         },
                //         Weight: '5'
                //       }
                //     }
                //   ],
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
                Length: '50',
                Width: '50',
                Height: '50'
                },
                PackageWeight: {
                UnitOfMeasurement: {
                    Code: 'LBS',
                    Description: 'Pounds'
                },
                Weight: '15'
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
            Code: '12',
            Description: '3 Day Select'
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
    
  

    const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: 'cafeforetrs',
        transactionSrc: 'testing',
        Authorization: `Bearer ${process.env.UPS_API_KEY}`
      },
      body: JSON.stringify(ship)
    }

    const query = new URLSearchParams({
        additionaladdressvalidation: 'Alpharetta'
      }).toString();
    
      const version = 'v1';
    //   fetch(`https://onlinetools.ups.com/api/shipments/${version}/ship?${query}`, options)
    // `https://onlinetools.ups.com/api/shipments/${version}/ship?${query}`
      
    fetch(`https://wwwcie.ups.com/api/shipments/${version}/ship?${query}`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        // console.log(response.ShipmentResults.)
        res.send(response)
    });




});

app.get('/test_ups_cancel', (req, res) => {
    const query = new URLSearchParams({
        trackingnumber: '1ZB98W480330445025'
      }).toString();
      
      const version = 'v1';
      const shipmentidentificationnumber = '1ZB98W480330445025';

      const options = 
      {
        method: 'DELETE',
        headers: {
          transId: 'string',
          transactionSrc: 'testing',
          Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibWVyX2lkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwiaXNzIjoiaHR0cHM6XC9cL2FwaXMudXBzLmNvbSIsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJzaWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJhdWQiOiJjYWZlIEZvcmUiLCJuYmYiOjE2ODEzMTcyMDAsIkRpc3BsYXlOYW1lIjoiY2FmZSBGb3JlIiwiZXhwIjoxNjgxMzMxNjAwLCJpYXQiOjE2ODEzMTcyMDAsImp0aSI6IjY2MDZhZGVjLTFhNTUtNDA5Ni04MjU0LTUzNjk5MWZlYjVkMSJ9.Y7F6dObaXBN3qnFyA7uQRpOKZbVBpMU4eYH1Rxdt_jhMkCvImU_zgRNJpo1ToqF7kDbkWsOUIgJUPgXs0qPuhKL09hSXJhCblI2n6K-gOFRN0h8aH8YgywBp5M_llzv1WUaa0VTXH-6Bj9DMhRhz7jVdHMnOhz4yLwZ8KEfzs7TXFlKZrOjeKcBnQ9y9ydfp73xR8n4kvn1WpSQoQCWbjMKtq2NkCDfKJnckN3JjJo2LBQeFMucSHlk9wpusjmsnG5jBFCH3Q0-Z51pdp2ji1wiwNTL8gSN-Z5L9Veab7qgg5c-VCnxs6a2eDj7if7ySUJIPVFe2YzCDZWnw06Hv1dz37Loa-1xo50na88OodqKlNsv6jWgkeb1pWnT4fkegA0m7zjJDt74jgSa9Kp2ytb-zmkgAXQlGrEfONB7IDdntwBS98TN1ohSJP-X3GjAJupWcUcTLx2v-0rfyrmTiWMkRiCxj6WfQCXoZhqd3R9UInAPLJSpWM62quKNF6jzik-_X3iKWpAnvOAv3-ezznpxEsL7T1gpynpNRZX9YKjPQlGVLxDD5xSGW2QSP4fd8M9sXiBR4YXAdbfUUM2hDibRruiIPyRIQH-IKd445qqhZZEIidaE7WaipMjY2rfqa6D--9TsbF_QEZxXe03bE0XdYXgbwOqbxLhOREamd2ps'
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


app.get('/test_ups_track', (req, res) => {

    const query = new URLSearchParams({
        locale: 'en_US',
        returnSignature: 'false'
      }).toString();

    const inquiryNumber = '1ZB98W480330445025';

    const options = 
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          transId: 'string',
          transactionSrc: 'testing',
          Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibWVyX2lkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwiaXNzIjoiaHR0cHM6XC9cL2FwaXMudXBzLmNvbSIsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJzaWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJhdWQiOiJjYWZlIEZvcmUiLCJuYmYiOjE2ODEzMTcyMDAsIkRpc3BsYXlOYW1lIjoiY2FmZSBGb3JlIiwiZXhwIjoxNjgxMzMxNjAwLCJpYXQiOjE2ODEzMTcyMDAsImp0aSI6IjY2MDZhZGVjLTFhNTUtNDA5Ni04MjU0LTUzNjk5MWZlYjVkMSJ9.Y7F6dObaXBN3qnFyA7uQRpOKZbVBpMU4eYH1Rxdt_jhMkCvImU_zgRNJpo1ToqF7kDbkWsOUIgJUPgXs0qPuhKL09hSXJhCblI2n6K-gOFRN0h8aH8YgywBp5M_llzv1WUaa0VTXH-6Bj9DMhRhz7jVdHMnOhz4yLwZ8KEfzs7TXFlKZrOjeKcBnQ9y9ydfp73xR8n4kvn1WpSQoQCWbjMKtq2NkCDfKJnckN3JjJo2LBQeFMucSHlk9wpusjmsnG5jBFCH3Q0-Z51pdp2ji1wiwNTL8gSN-Z5L9Veab7qgg5c-VCnxs6a2eDj7if7ySUJIPVFe2YzCDZWnw06Hv1dz37Loa-1xo50na88OodqKlNsv6jWgkeb1pWnT4fkegA0m7zjJDt74jgSa9Kp2ytb-zmkgAXQlGrEfONB7IDdntwBS98TN1ohSJP-X3GjAJupWcUcTLx2v-0rfyrmTiWMkRiCxj6WfQCXoZhqd3R9UInAPLJSpWM62quKNF6jzik-_X3iKWpAnvOAv3-ezznpxEsL7T1gpynpNRZX9YKjPQlGVLxDD5xSGW2QSP4fd8M9sXiBR4YXAdbfUUM2hDibRruiIPyRIQH-IKd445qqhZZEIidaE7WaipMjY2rfqa6D--9TsbF_QEZxXe03bE0XdYXgbwOqbxLhOREamd2ps'
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





app.get('/test_ups_rating', (req, res) => {
//  fetch(`https://wwwcie.ups.com/security/v1/oauth/validate-client?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com`)
//     .then(response => response.json())
//     .then(response => {

//         console.log("response")
//         console.log(response)
//         res.redirect(`https://www.ups.com/lasso/signin?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com&response_type=code&scope=read&type=ups_com_api`);
//     });

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
        Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibWVyX2lkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwiaXNzIjoiaHR0cHM6XC9cL2FwaXMudXBzLmNvbSIsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJzaWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJhdWQiOiJjYWZlIEZvcmUiLCJuYmYiOjE2ODEzMTcyMDAsIkRpc3BsYXlOYW1lIjoiY2FmZSBGb3JlIiwiZXhwIjoxNjgxMzMxNjAwLCJpYXQiOjE2ODEzMTcyMDAsImp0aSI6IjY2MDZhZGVjLTFhNTUtNDA5Ni04MjU0LTUzNjk5MWZlYjVkMSJ9.Y7F6dObaXBN3qnFyA7uQRpOKZbVBpMU4eYH1Rxdt_jhMkCvImU_zgRNJpo1ToqF7kDbkWsOUIgJUPgXs0qPuhKL09hSXJhCblI2n6K-gOFRN0h8aH8YgywBp5M_llzv1WUaa0VTXH-6Bj9DMhRhz7jVdHMnOhz4yLwZ8KEfzs7TXFlKZrOjeKcBnQ9y9ydfp73xR8n4kvn1WpSQoQCWbjMKtq2NkCDfKJnckN3JjJo2LBQeFMucSHlk9wpusjmsnG5jBFCH3Q0-Z51pdp2ji1wiwNTL8gSN-Z5L9Veab7qgg5c-VCnxs6a2eDj7if7ySUJIPVFe2YzCDZWnw06Hv1dz37Loa-1xo50na88OodqKlNsv6jWgkeb1pWnT4fkegA0m7zjJDt74jgSa9Kp2ytb-zmkgAXQlGrEfONB7IDdntwBS98TN1ohSJP-X3GjAJupWcUcTLx2v-0rfyrmTiWMkRiCxj6WfQCXoZhqd3R9UInAPLJSpWM62quKNF6jzik-_X3iKWpAnvOAv3-ezznpxEsL7T1gpynpNRZX9YKjPQlGVLxDD5xSGW2QSP4fd8M9sXiBR4YXAdbfUUM2hDibRruiIPyRIQH-IKd445qqhZZEIidaE7WaipMjY2rfqa6D--9TsbF_QEZxXe03bE0XdYXgbwOqbxLhOREamd2ps'
        // Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImF1ZCI6ImNhZmUgRm9yZSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibmJmIjoxNjgxMjQwNDE2LCJEaXNwbGF5TmFtZSI6ImNhZmUgRm9yZSIsImlzcyI6Imh0dHBzOlwvXC9hcGlzLnVwcy5jb20iLCJleHAiOjE2ODEyNTQ4MTYsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJpYXQiOjE2ODEyNDA0MTYsImp0aSI6ImRmNjYxNThmLTBmYTEtNDU0OC04OTczLTczNTUyOGQxMzBhZSIsInNpZCI6IjRjNjAwMjU3LTNlY2UtNGE5My1hY2RlLWI3NTk5YTQ0NzY5ZCJ9.asOY41WovUTGTv_3VEjY_IWteO88lAvQBUBmvI5jGPiV4psfg5LfQa6J-1Ok3ahf_35homGR6yvgPt-89TXJPAVKiW-IjrneFJajmVsr2WUjpbzrgYZowmPce4EQyHCwfau9rriILPkOF2phLdvtcEMt277HxhTBbHY3t3ADMY6vOnkgjPOw0alMaxqGFQ-UxneesVk24QsL2nqnt8r0mPV3BF163ZeFINbzeWknL_j1RhIryheJ4v0H7_4amkeVS1f4DvvpUeAId4mJ4sP2FYIhpX4l3yVpHkhThwB54ZQ3If9DAAy25JXteFmn8GI3V-HxODlMGjAOUEVNs6Ujhmzj3c_mCI0nFgNZ1dleiKywM5cppHo3g_Cf9lURkdQkrr5s8Piqnqn3lCuhuqj13gx_TH9uWDFsbkUi6vtKfCeS8KEoA2wCRCZI0NwLwET96ZCeCNS6QXKixx7XoP7JRB8O_te3CW-jHocXAb7g_UqaSQsLbpPwwezp92DI1s8pd5CUdMndxj1No_1ZMPApPKBbME-mJkp1RUqqHvERs2tEddhFPR692oHYXLLnsDZY5eekVoNYrrCcywi-hemPEpR0wVJLNlgXIRoP4weqOYDCZy1h3XDfx2NzWqgSzOulQPArFteC7VSVK5x_GUUNXvz3M9PF4tCmbsccL4_If3E'
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

    

app.get('/test_shipment',(req,res) => {
    console.log("/test_log/test_log/test_log/test_log");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_/test_lost_log/test_log/log/test_lg");
    
    const ship = {
        ShipmentRequest: {
            Request: {
            SubVersion: '1801',
            RequestOption: 'nonvalidate',
            TransactionReference: {CustomerContext: ''}
            },
            Shipment: {
            Description: 'Ship WS test',
            Shipper: {
                Name: 'ShipperName',
                AttentionName: 'ShipperZs Attn Name',
                TaxIdentificationNumber: '123456',
                Phone: {
                Number: '1115554758',
                Extension: ' '
                },
                ShipperNumber: ' ',
                FaxNumber: '8002222222',
                Address: {
                AddressLine: '2311 York Rd',
                City: 'Timonium',
                StateProvinceCode: 'MD',
                PostalCode: '21093',
                CountryCode: 'US'
                }
            },
            ShipTo: {
                Name: 'Happy Dog Pet Supply',
                AttentionName: '1160b_74',
                Phone: {Number: '9225377171'},
                Address: {
                AddressLine: '123 Main St',
                City: 'timonium',
                StateProvinceCode: 'MD',
                PostalCode: '21030',
                CountryCode: 'US'
                },
                Residential: ' '
            },
            ShipFrom: {
                Name: 'T and T Designs',
                AttentionName: '1160b_74',
                Phone: {Number: '1234567890'},
                FaxNumber: '1234567890',
                Address: {
                AddressLine: '2311 York Rd',
                City: 'Alpharetta',
                StateProvinceCode: 'GA',
                PostalCode: '30005',
                CountryCode: 'US'
                }
            },
            PaymentInformation: {
                ShipmentCharge: {
                Type: '01',
                BillShipper: {AccountNumber: ' '}
                }
            },
            Service: {
                Code: '03',
                Description: 'Express'
            },
            Package: {
                Description: ' ',
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
                Width: '30',
                Height: '45'
                },
                PackageWeight: {
                UnitOfMeasurement: {
                    Code: 'LBS',
                    Description: 'Pounds'
                },
                Weight: '5'
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


    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic Rm1mblFEdVYtVTJGc2RHVmtYMTltZnRUMFFjRENWQU1lZEd2Z2hwb2ZKQ3B3YVN5d3FpNkoxOU9tWE1ZYkZORWhHUExDREV6d2hqMCtVOEFMNzZIbjJHUjJuTElCN3c9PQ',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=authorization_code&code=[Auth-Code]'
    }

    fetch('https://wwwcie.ups.com/security/v1/oauth/token', options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response);
    });
});

app.get('/test_rate',(req,res) => {
    console.log("/test_ship /test_ship /test_ship /test_ship");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
   
    const data = {
        "accountNumber": {
          "value": "740561073"
        },
        "requestedShipment": {
          "shipper": {
            "address": {
              "postalCode": 30062,
              "countryCode": "US"
            }
          },
          "recipient": {
            "address": {
              "postalCode": 89139,
              "countryCode": "US"
            }
          },
          "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
          "rateRequestType": [
            "ACCOUNT",
            "LIST"
          ],
          "requestedPackageLineItems": [
            {
              "weight": {
                "units": "LB",
                "value": 15
              }
            }
          ]
        }
      }
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-locale' : 'en_US',          
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzg0MDA5ODBkZWNiYTQ1ODdiMDMxZDY0ZDA0ZWViYmY2In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjA4LUFwci0yMDIzIDEwOjQ4OjU3IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2ODA5NzI1MzcsImp0aSI6IjFiZTllNDJjLWEwN2MtNDU1Yi04YmZlLTJjZTJiMWUzNzU2MCJ9.AL1opn8_KXV-1xN8XyOj3_Rf1oRDdpPp0szRdUWBDD5ZCHLrwLYhytUl1v2zYMaYCr_d1dIaVGNLBV8rfILSuxKttXZrLX4uQosWY29hg6uBdckCkdQnkzMz_U0VMD0Y0aalJFobFjPOtNdqh7lEPvHG64lHdLKrjAE95p0oKAhvP2wB92kzfqVxSz_megbzF63THkaiUi0gcKNOvNEHEH8LEVvrTMougBuQoS04Qe4waktnvLHKq_WyJRcb0te3kwAQjB89PfeLsR6EoRbZQ3UaBuIPD_hjSmNcFlDe6iSejLFR0aVKTjaSyTqKsrrK4opcsUyCQ6QOu7pts1GrJPmXx36cT3DIAvPUMoPa3W8J5mvjwm84Febgkm84PiE_7VznRcL8TRE7KiyRL7Oz9kXQ8M7ueXE4gtR76pHZxr5THZiikXT4FDfREtKgadyrECi46gn1UT7sVSZ9ixKLEhuq9RbWp0f2y37KMDleqeEzIhuJHNaOLY5L00vbepCQEDNRVKVFfgq_cPnJDS_rNuZIk5ZiHdvqZTH-TqyWD2Mre-WfHTOsEK0Eg2KKWTtTCDDixkef0Bn2ALHdvU8ED_WrzvtJTyrihfRKQ7Ax5UNZGsqESBaUT54hhrhX9vivVLxnzK7j0R9mrouVJU9tKza5vDCwY1UGXUkADuShdnY'
        },
        body: JSON.stringify({data})
    }
          

      fetch(`https://apis-sandbox.fedex.com/rate/v1/rates/quotes`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response);
    });

});
   
app.get('/test_fedex_ship',(req,res) => {
    console.log("/test_fedex_ship /test_fedex_ship /test_fedex_ship");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
    

    const data = 
{
    "requestedShipment": {
      "shipper": {
        "contact": {
          "personName": "cafe FORE",
          "phoneNumber": 4702636495
        },
        "address": {
          "streetLines": [
            "4400 Roswell Rd"
          ],
          "city": "Marietta",
          "stateOrProvinceCode": "GA",
          "postalCode": 30062,
          "countryCode": "US"
        }
      },
      "recipients": [
        {
          "contact": {
            "personName": "Joe Kim",
            "phoneNumber": 4702636499
          },
          "address": {
            "streetLines": [
              "6594 Hulme end ave"
            ],
            "city": "Las Vegas",
            "stateOrProvinceCode": "NV",
            "postalCode": 89139,
            "countryCode": "US"
          }
        }
      ],
      "shipDatestamp": "2023-04-06",
      "pickupType": "CONTACT_FEDEX_TO_SCHEDULE",
      "serviceType": "FEDEX_GROUND",
      "packagingType": "YOUR_PACKAGING",
      "shippingChargesPayment": {
        "paymentType": "SENDER",
        "payor": {
          "responsibleParty": {
            "accountNumber": {
              "value": "740561073"
            }
          }
        }
      },
      "shipmentSpecialServices": {
        "specialServiceTypes": [
          "RETURN_SHIPMENT"
        ],
        "returnShipmentDetail": {
          "returnType": "FEDEX_TAG"
        }
      },
      "blockInsightVisibility": false,
      "pickupDetail": {
        "readyPickupDateTime": "2023-04-06T09:00:00Z",
        "latestPickupDateTime": "2023-04-06T14:00:00Z"
      },
      "requestedPackageLineItems": [
        {
          "itemDescription": "Item description",
          "weight": {
            "units": "LB",
            "value": 10
          }
        }
      ]
    },
    "accountNumber": {
      "value": "740561073"
    }
  }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-locale' : 'en_US',          
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzg0MDA5ODBkZWNiYTQ1ODdiMDMxZDY0ZDA0ZWViYmY2In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjA4LUFwci0yMDIzIDEwOjQ4OjU3IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2ODA5NzI1MzcsImp0aSI6IjFiZTllNDJjLWEwN2MtNDU1Yi04YmZlLTJjZTJiMWUzNzU2MCJ9.AL1opn8_KXV-1xN8XyOj3_Rf1oRDdpPp0szRdUWBDD5ZCHLrwLYhytUl1v2zYMaYCr_d1dIaVGNLBV8rfILSuxKttXZrLX4uQosWY29hg6uBdckCkdQnkzMz_U0VMD0Y0aalJFobFjPOtNdqh7lEPvHG64lHdLKrjAE95p0oKAhvP2wB92kzfqVxSz_megbzF63THkaiUi0gcKNOvNEHEH8LEVvrTMougBuQoS04Qe4waktnvLHKq_WyJRcb0te3kwAQjB89PfeLsR6EoRbZQ3UaBuIPD_hjSmNcFlDe6iSejLFR0aVKTjaSyTqKsrrK4opcsUyCQ6QOu7pts1GrJPmXx36cT3DIAvPUMoPa3W8J5mvjwm84Febgkm84PiE_7VznRcL8TRE7KiyRL7Oz9kXQ8M7ueXE4gtR76pHZxr5THZiikXT4FDfREtKgadyrECi46gn1UT7sVSZ9ixKLEhuq9RbWp0f2y37KMDleqeEzIhuJHNaOLY5L00vbepCQEDNRVKVFfgq_cPnJDS_rNuZIk5ZiHdvqZTH-TqyWD2Mre-WfHTOsEK0Eg2KKWTtTCDDixkef0Bn2ALHdvU8ED_WrzvtJTyrihfRKQ7Ax5UNZGsqESBaUT54hhrhX9vivVLxnzK7j0R9mrouVJU9tKza5vDCwY1UGXUkADuShdnY'
        },
        body: JSON.stringify({data})
    }
        

    fetch(`https://apis-sandbox.fedex.com/ship/v1/shipments/packages/validate`, options)
    .then(response => response.json())
    .then(response => {
        console.log("response")
        console.log(response)
        res.send(response);
    });
})

app.get('/test_upst',(req,res) => {
    console.log("/test_log/test_log/test_log/test_log");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
    const formData = {
        grant_type: 'client_credentials'
      };

    //   const resp = fetch(
    //     `https://wwwcie.ups.com/api/security/v1/oauth/token`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'x-merchant-id': 'string',
    //         Authorization: 'Basic ' + btoa('<zohola>:<Yeohae120817!>')
    //       },
    //       body: new URLSearchParams(formData).toString()
    //     }
    //   );
      
    //   const data = resp.text();
    //   console.log(data);

      const input = 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-merchant-id': 'Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11',
        //   Authorization: 'Basic PHpvaG9sYT46PFllb2hhZTEyMDgxNyE+'
          Authorization: 'Basic ' + Buffer.from('<Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11>:<Stn6Dox0uRs2GovzBhyyNgkL3pt5NaqSfRsAgFR72VsKoE3Q0tEdS1EDJBwUroFB>').toString('base64')
        },
        body: JSON.stringify({grant_type: 'client_credentials'})
      }
      console.log(input);
      fetch(`https://wwwcie.ups.com/api/security/v1/oauth/token`, input)
      .then(response => response.json())
      .then(response => {
          console.log("response")
          console.log(response)
          res.send(response);
      });
      



});

app.get('/test_get_ups',(req,res) => {
    console.log("/test_log/test_log/test_log/test_log");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");

    fetch(`https://wwwcie.ups.com/security/v1/oauth/validate-client?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com`)
        .then(response => response.json())
        .then(response => {

            console.log("response")
            console.log(response)
            res.redirect(`https://www.ups.com/lasso/signin?client_id=Zb9MRQzxT1d7IUEryBsDpnpkigFES3pCqqd0XfcKbW4Vxy11&redirect_uri=https://www.thecafefore.com&response_type=code&scope=read&type=ups_com_api`);
        });



});
   
app.get('/test_ups_token',(req,res) => {
    console.log("/test_log/test_log/test_log/test_log");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
    
    const options = 
    {
    method: 'POST',
    headers: {
        Authorization: 'Basic ' + Buffer.from('<zohola>:<Yeohae120817!>').toString('base64'),
        'x-merchant-id': 'GcK5bzCltXeGLVAmNXg9GP8AV9s29ACg3VkSOnOvioYRln19',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=authorization_code&code=[SG82Q2kxZkEtVTJGc2RHVmtYMTljdk93aE5zZ2JIclpLMWh3cUFIenl4ZnZyS29ZVm9oWXlOdjB2aVFrbDVZcm15U2VVUGErdDZ4Y0orOWhZYUdqcENMUi85bmJONWc9PQ==]'
    }

    fetch('https://wwwcie.ups.com/security/v1/oauth/token', options)
    .then(response => response.json())
      .then(response => {
          console.log("response")
          console.log(response)
          res.send(response);
      });

});

app.get('/test_utttu',(req,res) => {
    console.log("/test_log/test_log/test_log/test_log");
    console.log("/test_log/test_log/test_log/test_lost_log/test_log/test_log/test_lg");
   
    

  const version = 'v1';
  const requestoption = 'Rate';
  
    const options = 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transId: '20230407trs',
        transactionSrc: 'testing',
        Authorization: 'Bearer eyJraWQiOiI0YzYwMDI1Ny0zZWNlLTRhOTMtYWNkZS1iNzU5OWE0NDc2OWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJyYW5nZGFkQGdtYWlsLmNvbSIsImF1ZCI6ImNhZmUgRm9yZSIsImNsaWVudGlkIjoiWmI5TVJRenhUMWQ3SVVFcnlCc0RwbnBraWdGRVMzcENxcWQwWGZjS2JXNFZ4eTExIiwibmJmIjoxNjgwOTI5MzY0LCJEaXNwbGF5TmFtZSI6ImNhZmUgRm9yZSIsImlzcyI6Imh0dHBzOlwvXC9hcGlzLnVwcy5jb20iLCJleHAiOjE2ODA5NDM3NjQsInV1aWQiOiIzQzUwNUE5My1GNDVDLTE1NDAtODBENS0wMDQ4M0ZGNjAwOTEiLCJpYXQiOjE2ODA5MjkzNjQsImp0aSI6IjBhY2Q4ZTEzLTUxMWYtNDQ5ZC05ZDc3LWU5ZTcwNDJlYzljOSIsInNpZCI6IjRjNjAwMjU3LTNlY2UtNGE5My1hY2RlLWI3NTk5YTQ0NzY5ZCJ9.12xip3sX3xlAewFcuT21t79UykiOiKmEe5Yjz_c9mrm4ru6Tu52StWmgXGFB8f3q6ny6ILKpAXwrYPHDSfjbFYbQ4ZfVF0kvEsnPGR5QnrTbfOjxNiX27FQWpreYWhnevW4_JjH016szrQzOJZVcsiXoKEjYFbSWkMfe53pduoCFua67JUqXqoUawC7M2hHv3DEelL7iY6d5nM_IHesvm_Up8_ONt3AZfcaLd2hxORHFv_i_cibNaTSk5nJBNW1wfKEKHlsRwUsiDN_on5AkjsqH2_CuSriDI8gWTzxxKVnXCMK4DkwL0WfKw3ulaQQBzAQsuAQf28_LPJODaqi_Pl3ZRnfJoR17YdpHspZfyp3Ba3oKvCE80C3WGi34Jrub0iqvH0aRCmT7n67bEVnmZIg4WUG7IxctqNcwyOSw0ORSrK8F-OgNXN5vD2m87WAjkV2Hag4VK-IswMP2B_2uTyKHKh0H8pX-FYBcV-pmsFLnWenLmbCFGLiy1DenqPIHj0qhxXDka-oD_L-dKpvcc2JPwYmPputdWssyABk8U8AoVTp_6k3majVSs5TlfoJkz_4ZrG0bS8dxeLxfXxu1vyfyeD4CmFjDmW1bbtyWJxXuJ3e4Zye4l8yQxiHXpSLai2jIcMRzkpr1dmTnvpMFI3-h5eHVs8mjFafBD6is7T4'
      },
      body: JSON.stringify({
        RateRequest: {
          Request: {
            TransactionReference: {
              CustomerContext: 'CustomerContext',
              TransactionIdentifier: 'TransactionIdentifier'
            }
          },
          Shipment: {
            Shipper: {
              Name: 'cafe fore',
              ShipperNumber: 'B98W48',
              Address: {
                AddressLine: '4400 Roswell Rd',
                City: 'Roswell',
                StateProvinceCode: 'GA',
                PostalCode: '30062',
                CountryCode: 'US'
              }
            },
            ShipTo: {
              Name: 'Jay Kim',
              Address: {
                AddressLine: '6594 hulme end ave',
                City: 'Las Vegas',
                StateProvinceCode: 'NV',
                PostalCode: '89139',
                CountryCode: 'US'
              }
            },
            ShipFrom: {
              Name: 'cafe fore',
              Address: {
                AddressLine: '4400 Roswell Rd',
                City: 'Roswell',
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
            NumOfPieces: '5',
            Package: [
              {
                SimpleRate: {
                  Description: 'SimpleRateDescription',
                  Code: 'XS'
                },
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
                  Weight: '15'
                }
              }
            ]
          }
        }
      })
    }

    fetch(`https://wwwcie.ups.com/api/rating/${version}/${requestoption}?Rate`, options)
    .then(response => response.json())
    .then(response => { 
        console.log(response);
        // console.log(response.RateResponse.response.ResponseStatus[0]);
        // console.log(response.RateResponse.response.Alert[0]);
        // console.log(response.RateResponse.response.TransactionReference[0]);
        // console.log("response.RateResponse.RatedShipment");
        // console.log(response.RateResponse.RatedShipment.Service[0]);
        // console.log(response.RateResponse.RatedShipment.RatedShipmentAlert[0]);
        // console.log(response.RateResponse.RatedShipment.TotalCharges[0]);
        res.send(response);
    });
  
  


})


// app.get('/order-confirmation',(req,res) => {
    
//         res.render('test.ejs', 
//         {post : "name",
//         name : "name",
//         order_number : "order_number",
//         email : "default_shipping_info.email",
//         recipient : "default_shipping_info.recipient",
//         phone : "default_shipping_info.phone",
//         type : "response.source.brand",
//         ending4 : "response.source.last4",
//         billing_address : "default_shipping_info.address1",
//         cardholder : "cardholder",
//         subtotal : "response.amount - response.tax_amount", 
//         tax : "response.tax_amount",
//         grandtotal : "response.amount"
        
//         })
// })
        

/*
app.post('/item_addup', (req,res) => {
    let user_id = req.body.u_id;
    let item_num = req.body.item_num;
    let u_id = req.session.loginData.id;
    let date = getDate();

    if (user_id == u_id) {
        const mysql = require('mysql');

        const con = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '111111',
            database: 'test1',
            
        });

        con.connect((err) => {
            if(err){
            console.log('Error connecting to Db');
            return;
            }
            console.log('Connection established /add up item');
        });

        con.query('UPDATE cart SET quantity=cart.quantity + 1, modate = ? where u_id = ? and prodnum = ?', [date, u_id, item_num]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();
                
                } else {
                    console.log("result");
                    console.log(result);
                    con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id]
                    ,(err, result) => {
                        if(err){                        
                            res.send(err);
                            con.end();
                        
                        } else {
                            console.log("result");
                            console.log(result);
                            
                            res.send(result);
                        }
                    });               
                }
        });
    } else res.send("check user ID");
})


app.post('/item_subtract', (req,res) => {
    let user_id = req.body.u_id;
    let item_num = req.body.item_num;
    let u_id = req.session.loginData.id;
    let date = getDate();

    if (user_id == u_id) {
        const mysql = require('mysql');

        const con = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '111111',
            database: 'test1',
            
        });

        con.connect((err) => {
            if(err){
            console.log('Error connecting to Db');
            return;
            }
            console.log('Connection established /subtract item');
        });

        con.query('UPDATE cart SET quantity=cart.quantity - 1, modate =? where u_id=? and prodnum=?', [date, u_id, item_num]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();
                
                } else {
                    console.log("result");
                    console.log(result);

                    con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id]
                    ,(err, result) => {
                        if(err){                        
                            res.send(err);
                            con.end();
                        
                        } else {
                            console.log("result");
                            console.log(result);                        
                            res.send(result);
                        }
                    });  
                }
        });
    } else res.send("check user ID");
})


app.post('/item_delete', (req,res) => {
    let user_id = req.body.u_id;
    let item_num = req.body.item_num;
    let u_id = req.session.loginData.id;

    console.log('/item_delete /item_delete /item_delete /item_delete/item_delete')

    // const connect = makeConnect();

    if (user_id == u_id) {
        const mysql = require('mysql');

        const con = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '111111',
            database: 'test1',
            
        });

        con.connect((err) => {
            if(err){
            console.log('Error connecting to Db');
            return;
            }
            console.log('Connection established /delete item');
        });

        con.query('DELETE FROM cart WHERE u_id=? and prodnum=?', [u_id, item_num]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();
                
                } else {
                    console.log("result");
                    console.log(result);
                    con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id]
                        ,(err, result) => {
                            if(err){                        
                                res.send(err);
                                con.end();                        
                            } else {
                                console.log("result");
                                console.log(result);                        
                                res.send(result);
                            }
                        }); 
                }
        });
    }
})

/*
app.post('/checked_item', (req,res) => {
    let user_id = req.body.u_id;
    let item_list = req.body.checked_items_number_list;
    let u_id = req.session.loginData.id;

    if (user_id == u_id) {
        const mysql = require('mysql');

        const con = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '111111',
            database: 'test1',
            
        });

        con.connect((err) => {
            if(err){
            console.log('Error connecting to Db');
            return;
            }
            console.log('Connection established /delete item');
        });

        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum WHERE prodnum IN (?) and u_id = ? and result = "n"', [u_id]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();                        
                } else {
                    console.log("result");
                    console.log(result);                        
                    res.send(result);
                }
            }); 


    }




})
*/
