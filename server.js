const express = require('express');
// import express from 'express';
const app = express();
const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
// import cookieParser from 'cookie-parser';

// const axios = require('axios');
require('dotenv').config()
// import dotenv from "dotenv";

const Clover = require("clover-ecomm-sdk");
const session = require('express-session');
// import session from 'express-session';
// const session = require("express-session");







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
    cookie: { maxAge: 3600000 }

}))

app.use(cookieParser("secret"));

const uuid4 = require('uuid');



app.get('/',(req,res) => {
    console.log("home home home");
    // res.sendFile(__dirname + "/public/index.html");
    if (req.session.loginData) {
        console.log("login data exist");        
		res.render('index.ejs', {post : req.session.loginData.id});
	} else {
        console.log("login data nothing");
		res.sendFile(__dirname + "/public/index.html");
	}
});


app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));



app.get('/crypto', (req,res) => {
    const crypto = require('crypto');
    const CIPHER_ALGORITHM = 'aes-256-ctr';

    const createKey = () => {
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&/()=?^"!|[]{}*+-:.;,_@#<>';
        return str.split('').sort((a, b) => {return Math.random() - 0.5}).join('');
    };

    const key = createKey();

    class KeyGen {
        constructor(key, algorithm) {
            this.key = key;
            this.algorithm = algorithm;
        }

        cypher(str) {
            let sha256 = crypto.createHash('sha256');
            sha256.update(this.key);
            let iv = crypto.randomBytes(16);
            let cipher = crypto.createCipheriv(this.algorithm, sha256.digest(), iv);
            let ciphertext = cipher.update(Buffer.from(str));
            let  encrypted = Buffer.concat([iv, ciphertext, cipher.final()]).toString('base64');
            return encrypted;
        }

        decypher(enc) {
            let sha256 = crypto.createHash('sha256');
            sha256.update(this.key);
            let input = Buffer.from(enc, 'base64');
            let iv = input.slice(0, 16);
            let decipher = crypto.createDecipheriv(this.algorithm, sha256.digest(), iv);
            let ciphertext = input.slice(16);
            let plaintext = decipher.update(ciphertext) + decipher.final();
            return plaintext;
        }
    }

    let kg = new KeyGen(key, CIPHER_ALGORITHM);
    let enc = kg.cypher('4111111111111111');

    // let kg2 = new KeyGen(key, CIPHER_ALGORITHM);
    let enc2 = kg.cypher('4242424242424242');

    // let kg3 = new KeyGen(key, CIPHER_ALGORITHM);
    let enc3 = kg.cypher('Yeohae120817!');

    // let enc = kg.cypher('Yeohae120817!');

    console.log(enc); // 'F6NR6AeK475VsnH874uj2P9bxRCk8mO14gWqDXpAg5o='
    console.log(kg.decypher(enc)); // '4111111111111111'

    console.log(enc2); // 'F6NR6AeK475VsnH874uj2P9bxRCk8mO14gWqDXpAg5o='
    console.log(kg.decypher(enc2)); // '4111111111111111'

    console.log(enc3); // 'F6NR6AeK475VsnH874uj2P9bxRCk8mO14gWqDXpAg5o='
    console.log(kg.decypher('kOWKe1qUvBtdzSvCuUCBHZkknVz46fYygTROYwU=')); // '4111111111111111'


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



        


        
      
      


app.get('/login_check', (req,res) => {
    console.log("/login_check  /login_check /login_check /login_check/login_check   ");
    let data = '';
    console.log(req.session.loginData)
    console.log(req.session)
    console.log(req.sessionID)
    req.session.loginData ? data = req.session.loginData : data = {id : 'GUEST'};
    
    res.send(data);
})



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
        body: JSON.stringify({firstName: 'Tod', lastName: 'Kim'})
      };
      
      fetch('https://sandbox.dev.clover.com/v3/merchants/Q67P8MHV60X01/customers', options)
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
            name: 'Kim',
            phone: '4702636495'
          },
          currency: 'usd',
          email: 'rangdad@gmail.com',
          customer: 'W29TP8XFK9BH6'
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
                body: JSON.stringify({"source":"clv_1TSTSk1pBwk66yF3NoDwwH9f",
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




// app.get('/test', (req,res) => {
//     console.log("test test etst test test test etst  ");
//     res.send("app.get('/test', (req,res)")


// })





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



// app.use(express.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({extended : true}));

// app.use(express.static('public'));




app.post("/add_cart", function (req, res) {
    console.log("get_cart get_cart get_cart");
    console.log(req.session.loginData.id)
    console.log(req.body)
    
    console.log("get_cart end get_cart end get_cart end get_cart end get_cart end ");
    
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
        console.log('Connection established');
    });

    const u_id = req.session.loginData.id;
    // const u_name = req.body.c_name;
    const prodnum = req.body.c_item_no;
    const quantity = req.body.c_item_quantity;

    let date = getDate();

    var cartnum = date.replace(/\s|:|\-/g,"") + "CT" + u_id.substr(0, 3);

    console.log(date);
    console.log(cartnum);
    console.log(prodnum);
    // check the same item in cart   

    con.query('SELECT cartnum, quantity from cart where u_id = ? and prodnum = ? and result = "n"',
    //con.query('SELECT COALESCE(MAX(cartnum), "false") AS cartnum from cart where u_id = ? and prodnum = ?',
        [u_id, prodnum], (err, result) => {
            if(err){                        
                res.send(err);
                con.end();
            } else {        
                if (result[0] != undefined) { // add up item quantity
                    console.log(result[0]);
                    console.log(result[0].quantity);
                    console.log(result[0].cartnum);
                    con.query('UPDATE cart SET `quantity` = ?, `modate` = ? where (`cartnum` = ?)', [quantity, date, result[0].cartnum], (err, result) => {
                        if(err){                        
                            res.send(err);
                            con.end();
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
                            con.end();
                        } else {
                            console.log(result);        
                            viewAddedItem();
                        }                    
                    })
                }
            }
    });

    function viewAddedItem() {
        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n" and cart.prodnum = ?', [u_id, prodnum]
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
    
    
    console.log("req.params.item_number");
    console.log(req.params.item_number);

    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
    
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

    if (req.session.loginData) {
        console.log(req.session.loginData.id);
        const user_id = req.session.loginData.id;
    
    // user cart check out
        con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [user_id]
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
                    con.end();
                
                } else {
                    console.log("result");
                    console.log(result);
                    
                    res.send(result);
                }
        });
    }
    




});





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
    // res.sendFile(__dirname + "/public/index.html")
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

// app.get('/test',(req,res) => {
//     console.log(`req menu: ${req}`);
//     if (req.session.loginData) {
// 		res.render('index.ejs', {post : req.session.loginData.name});
// 	} else {
// 		res.sendFile(__dirname + "/public/index.html");
// 	}
    
// });



app.get('/contact',(req,res) => {
    console.log(`req contact: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData.name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
    
});



app.post('/sign_in', function (req,res) {
    // res.sendFile(__dirname + "/public/login.html");
    console.log(`req.body: ${req.body}`);
    console.log(`req.originalUrl: ${req}`);
    console.log(req.url);
    // const sess = req.session;
    
    // const con = makeConnect();

    
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
        console.log('Connection established');
    });


    const sign_in_id = req.body.sign_in_id;
    const sign_in_pw = req.body.sign_in_pw;
    const redirect_path = req.url.substring(req.url.lastIndexOf('=') + 1);
    console.log(redirect_path);

    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);

     
    
   
    
        
    con.query('SELECT *  from users where id = ? and pw = ?',
    // con.query('SELECT COALESCE(MAX(id), "false") AS id from users where id = ? and pw = ?',
        [sign_in_id, sign_in_pw], (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
                }
                // else if(result[0] === 'false') {
                else if(result[0] === undefined) {
                    
                    res.send('check your ID and PW');
                    con.end();
                } else {                                         
                    console.log(`${result}`);                        
                    updateLastLog(result[0].id, result[0].name, result[0].clv_id);  
                }
                    
    });    
    

    function updateLastLog(u_id, u_name, clv_id) {
        
        console.log(`update: ${u_id}, ${date}`);
        
        // if(u_id) {
            con.query('UPDATE users SET last_log = ? where id = ?', [date, u_id]);
            let data = {id : u_id, name : u_name, clv_id : clv_id};
            req.session.loginData = data;
            console.log('req.session.loginData');
            console.log(req.session.loginData);

            res.cookie("cafe_fore_t", "test-test-test", {maxAge: 360000});
            res.cookie("cafe_fore_tt", "test-test-test", {maxAge: 3600000});
            res.cookie(
                'cafefore',{
                name : req.session.loginData.name,
                id : req.session.loginData.id,
                clv : req.session.loginData.clv_id                    
                
            }, {maxAge: 3600000, credentials: true, authorized : true, signed: true});
            console.log("login complete")
            res.redirect(redirect_path);
           
        con.end();
     
        
    }

});


app.post('/sign_up', (req,res) => {
    // res.sendFile(__dirname + "/public/login.html");
    console.log(req.body);

    // const con = makeConnect();
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
        console.log('Connection established');
    });


    const sign_up_id = req.body.sign_up_id;
    const sign_up_pw = req.body.sign_up_pw;
    const sign_up_pw_check = req.body.sign_up_pw_check;
    const sign_up_name = req.body.sign_up_name;
    const sign_up_email = req.body.sign_up_email;
    const sign_up_phone = req.body.sign_up_phone;

    con.query('select COALESCE(MAX(id), "false") AS id from users where id = ?', [sign_up_id], (err, result) => {
        console.log(result);
        console.log("check repetition")
        if (result[0].id === 'false') {

            console.log("check check repetition")

            if (sign_up_pw === sign_up_pw_check) {
                var date;
                date = new Date();
                date = date.getFullYear() + '-' +
                ('00' + (date.getMonth()+1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' + 
                ('00' + date.getHours()).slice(-2) + ':' + 
                ('00' + date.getMinutes()).slice(-2) + ':' + 
                ('00' + date.getSeconds()).slice(-2);
                

                con.query('INSERT INTO users (id, pw, name, email, phone, resi_date, last_log) values (?,?,?,?,?,?,?)', 
                    [sign_up_id, sign_up_pw, sign_up_name, sign_up_email, sign_up_phone, date, date]);
                console.log("sign up complete!!");
                con.end();

                res.render('sign_up.ejs' , {sign_up_name : sign_up_name});
            } else {
                res.send('check password!!')
            }
        } else {
            res.send('please use other ID')
        }
    })
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

    const mysql = require('mysql');

    const con = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '111111',
        database: 'test1',
        
    });

    // console.log(con);

    con.connect((err) => {
        if(err){
        console.log('Error connecting to Db');
        return;
        }
        console.log('Connection established');
    });


    con.query('SELECT clv_id FROM billing_info WHERE id = ?', [u_id], (err, result) => {
        if (err) {
            res.send(err);
            con.end();
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
                // console.log(response.cards.elements);        
                // response.cards.elements.forEach(element => {console.log(element)}
                con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM billing_info WHERE cd_id IN (?) and id = ? and inuse = "y"', [res_data, u_id], (err, result) => {
                    if (err) {
                        res.send(err);
                        con.end();
                    } else {
                        console.log(result);
                        res.send(result);
                    }
                })
                
            })
            .catch(err => console.error(err));

           
        }
    })


});

app.get('/get_user_shipping_info', (req,res) => {
    console.log(req.body);
    const u_id = req.session.loginData.id;
    console.log(u_id);

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
        console.log('Connection established');
    });


    con.query('SELECT * FROM shipping_info WHERE id = ?', [u_id], (err, result) => {
        if (err) {
            res.send(err);
            con.end();
        } else {
            console.log(result);
            res.send(result);



        }
    })
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
                    console.log('Connection established');
                });

                checkDefault().then((data) => { 
                    console.log("checkDefault().then((data) =>");
                    console.log(data);
                    addBillingInfo();
            
                });


                function checkDefault() {
                    return new Promise((resolve, reject) => {
                        if (default_check === 'default') {
                            con.query('SELECT id from billing_info WHERE id=?', [u_id],(err, result) => {
                                if (err) {
                                    res.send(err);
                                    con.end();
                                } else if (result !== undefined) {
                                    console.log(result)                
                                    con.query('UPDATE billing_info SET default_payment = "n" where id =?', [u_id])
                                    resolve();
                                }                     
                            })
                        } else {
                            addBillingInfo();  
                        }
                    })
                } 

                
                function addBillingInfo() {
                    con.query('INSERT INTO billing_info (id, clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, email, default_payment, indate) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                    [u_id, $clv_id, cd_id, clv_tk, cardholder, first6, last4, exp, zip, type, email, default_check, indate], (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
                        } else {
                            res.send(result);
                        }
                    });
                }
                
                // response.cards.elements.forEach(element => {console.log(element)                    
                // });
                
              })
              .catch(err => console.error(err));})
            
        .catch(err => console.error(err));
})



app.post('/make_default_billing_info', (req,res) => {
    let u_id = req.body.id;
    let bi_number = req.body.billing_index;

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
        console.log('Connection established');
    });

    con.query('UPDATE test1.billing_info SET default_payment="n" WHERE id = ?', [u_id], (err, result) => {
        if (err) {
            res.send(err);
            con.end();
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
                            con.end();
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
                                        con.end();
                                    } else {
                                        console.log(result);
                                        res.send(result);
                                    }
                                })
                                
                            })
                            .catch(err => console.error(err));
                        }
                    });
                }
                
            });
        }
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
            console.log('Connection established');
        });


        checkDefaultPayment().then(() => { 
            console.log("check Default payment promise");
            // console.log(data);
            makeUpdateBillingInfo();
        });


        function checkDefaultPayment() {
            return new Promise((resolve, reject) => { 
                if (default_payment === 'default') {
                    con.query('select * from billing_info where id= ? and inuse="y" order by indate desc', [u_id],
                    (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
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
                                        con.end();
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
                                        con.end();
                                    } else {
                                        console.log(result); 
                                        resolve();     
                                    }
                                });
                            } else if (result.length == 1) { // last default
                                console.log('last default payment')
                                resolve()
                            } else res.send({ some: 'no more billing info' });

                        }
                    });
                } else makeUpdateBillingInfo();
            }); 
        }


        
        function makeUpdateBillingInfo() {
            console.log("makeUpdateBillingInfo")

            con.query('UPDATE billing_info SET inuse = "n", default_payment = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, bi_number],
            (err, result) => {
                if (err) {
                    res.send(err);
                    con.end();
                } else {
                    console.log(result);  
                    con.query('SELECT clv_id FROM billing_info WHERE id = ?', [u_id], (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
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
                                        con.end();
                                    } else {
                                        console.log(result);
                                        res.send(result);
                                    }
                                })
                                
                            })
                            .catch(err => console.error(err));
                        }
                    });


                    // con.query('SELECT bi_number, cardholder, last4, exp, type, default_payment, inuse, indate FROM billing_info WHERE id=? and inuse = "y"', [u_id],
                    // (err, result) => {
                    //     if (err) {
                    //         res.send(err);
                    //         con.end();
                    //     } else {
                    //         console.log("res.send(result)")
                    //         console.log(result)
                    //         res.send(result);  
                    //     }              
                        
                    // })                  

                }
            });
        }






       


        // con.query('SELECT clv_id, cd_id FROM billing_info WHERE id = ? and bi_number = ?', [u_id, c_number], (err, result) => {
        //     if (err) {
        //         res.send(err);
        //         con.end();
        //     } else {
        //         console.log(result);

        //         /// insert clover api

        //         console.log("delete card from DB")
        //                 con.query('UPDATE billing_info SET inuse = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, c_number],
        //                 (err, result) => {
        //                     if (err) {
        //                         res.send(err);
        //                         con.end();
        //                     } else console.log(result);                    
        //                 });

        //                 res.send(result);
        //     } 
        
                

                ///////////// clover API fetch //////////////////
                /*
                const options = {
                    method: 'DELETE',
                    headers: {
                      accept: 'application/json',
                      authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                    }
                };
                fetch(`https://scl-sandbox.dev.clover.com/v1/customers/${result[0].clv_id}/sources/${result[0].cd_id}`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.deleted === 'true') {
                        console.log("delete card from DB")
                        con.query('UPDATE billing_info SET inuse = "n", outdate = ? WHERE id = ? and bi_number = ?', [outdate, u_id, c_number],
                        (err, result) => {
                            if (err) {
                                res.send(err);
                                con.end();
                            } else console.log(result);                    
                        });

                        res.send(result);
                    } 
                })
                .catch(err => console.error(err));
                
            }
            */
    

    } else {
        res.send("check your ID");
    }

})


app.post('/make_default_shipping_info', (req,res) => {
    let u_id = req.body.id;
    let sh_number = req.body.shipping_index;

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
        console.log('Connection established');
    });

    con.query('UPDATE shipping_info SET default_address="n" WHERE id = ?', [u_id], (err, result) => {
        if (err) {
            res.send(err);
            con.end();
        } else {
            console.log(result);  
            con.query('UPDATE shipping_info SET default_address="default" WHERE id = ? and sh_number = ?', [u_id, sh_number], (err, result) => {
                if (err) {
                    res.send(err);
                    con.end();
                } else {
                    console.log(result);
                    con.query('SELECT * FROM shipping_info WHERE id = ? and inuse = "y"', [u_id], (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
                        } else res.send(result);  
                    });
                }
            });
        }
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
            console.log('Connection established');
        });

        checkDefaultAddress().then((data) => { 
            console.log("checkDefaultAddress promise");
            console.log(data);
            makeUpdateShippingInfo();
            
    
        });

        function checkDefaultAddress() {
            return new Promise((resolve, reject) => { 
                if (default_address === 'default') {
                    con.query('select * from shipping_info where id= ? and inuse="y" order by indate desc', [u_id],
                    (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
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
                                        con.end();
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
                                        con.end();
                                    } else {
                                        console.log(result); 
                                        resolve();                   

                                    }
                                });
                            } else if (result.length == 1) { // last default
                                console.log('last default')
                                resolve()
                            } else res.send({ some: 'no more shipping info' });

                        }
                    });
                } else makeUpdateShippingInfo();
            }); 
        }

        function makeUpdateShippingInfo() {

            con.query('UPDATE shipping_info SET inuse = "n", default_address = "n", outdate = ? WHERE id = ? and sh_number = ?', [outdate, u_id, sh_number],
            (err, result) => {
                if (err) {
                    res.send(err);
                    con.end();
                } else {
                    console.log(result);  
                    con.query('SELECT * FROM shipping_info WHERE id=? and inuse = "y"', [u_id],
                    (err, result) => {
                        if (err) {
                            res.send(err);
                            con.end();
                        } else {
                            console.log("res.send(result)")
                            console.log(result)
                            res.send(result);  
                        }              
                        
                    })                  

                }
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
        console.log('Connection established');
    });


    checkDefault().then(() => { 
        editShippingInfo();

    });


    function checkDefault() {
        return new Promise((resolve, reject) => {
            if (default_check === 'default') {
                console.log("default check")
                con.query(`UPDATE shipping_info SET default_address = "n" WHERE default_address = "default" and id = ?`, [u_id], (err, result) => {
                    if (err) {
                        res.send(err);
                        con.end();
                    } else console.log(result);
                });
            } resolve();

        });
    }

    function editShippingInfo() {
        console.log("UPDATE shipping_info SET recipient = ?, addre ")
        con.query(`UPDATE shipping_info SET recipient = ?, address1 =?, address2 =?, city=?, state=?, zip = ?, phone = ?, email = ?, shipping_option = ?, default_address = ?, indate = ? WHERE id = ? and sh_number = ?`,
        [recipient, address1, address2, city, state, zip, phone, email, option, default_check, indate, u_id, sh_number], (err, result) => {
            if (err) {
                res.send(err);
                con.end();
            } else {
                console.log(result)
                res.send(result);
            }
        })
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
        console.log('Connection established');
    });


    checkDefault().then(() => { 
        // console.log("checkDefault().then((data) =>");
        // console.log(data);
        addShippingInfo();

    });
    


    function checkDefault() {
        return new Promise((resolve, reject) => {
            if (default_check === 'default') { 
                con.query('SELECT id from shipping_info WHERE id=?', [u_id],(err, result) => {
                    if (err) {
                        res.send(err);
                        con.end();
                    } else if (result !== undefined) { 
                        console.log(result)                
                        con.query('UPDATE shipping_info SET default_address = "n" where id =?', [u_id])
                        resolve();
                    }                     
                })
            } else {
                addShippingInfo();  
            }
        })
    } 

    function addShippingInfo() {
        console.log("add ship info")
        con.query('INSERT INTO shipping_info (id, recipient, address1, address2, city, state, zip, phone, email, shipping_option, default_address, indate) values (?,?,?,?,?,?,?,?,?,?,?,?)', 
            [u_id, recipient, address1, address2, city, state, zip, phone, email, option, default_check, indate], (err, result) => {
                if (err) {
                    res.send(err);
                    con.end();
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
        }
        

    


    


    // if (req.session.loginData) {
	// 	res.send(req.session.loginData);
	// }
})


// app.get('/',(req,res)=>res.sendFile('C:/Users/Jk/Documents/web_workspace/Test/index.html'));

// app.post('/shop/member/:id/cart', (req,res) => {
//     res.send("cart");

// });

// app.post('/shop/cart/:id', (req,res) => {
//     console.log("go cart ");
//     console.log(req.rawHeaders);
//     console.log(req.rawHeaders[0]);
//     res.send("cart");
//     // res.send(JSON.stringify(req));

// });


function makeConnect() {
    console.log("make connect");
    const mysql = require('mysql');

    const con = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '111111',
        database: 'test1',
        
    });

    // con.connect((err) => {
    //     if(err){
    //     console.log('Error connecting to Db');
    //     return;
    //     }
    //     console.log('Connection established');
    // });

    // con.query('SELECT * from users', (error, rows, fields) => {
    //     if (error) throw error;
    // console.log('User info is: ', rows);
    // });
    
}

// app.post('/testview',(req,res) => {
//     // var product_number = parseInt(req.params.item_no);
//     var member_name = '';

//     var test = req.body;
//     console.log("/testview/testview/testview/testview/testview")
//     console.log(req);
//     console.log(req.body);
//     console.log(test);

//     res.send(test)
//     // console.log(`/shop/view/item:id: ${product_number}`);

// });


app.get('/shop',(req,res) => {
    console.log(`req test: ${req}`);
    console.log("shop_get  ");
    var member = '';
    if (req.session.loginData) {member = req.session.loginData.id;}
    
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
        console.log('Connection established');
    });

    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);

     
    
   
    
        
    con.query('SELECT * from product' , (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
                // }
                //  else if(result[0].no === 'false') {
                //     res.send('check your ID and PW');
                //     con.end();
                } else {

                    console.log("SELECT * from product where prodnum = ");
                    console.log(`${result[0].prodnum}`);
                    console.log(`${result}`);
                    
                    // res.send(result[0].name);
                    if(member) {
                        console.log(`${result}`);
                        res.render('shop_get.ejs', { 
                            post : member,
                            product : result
                            // product_number : result[0].prodnum,
                            // product_name : result[0].name,
                            // product_price : result[0].price_sell,
                            // product_description : result[0].content
                        })
                    } else {
                        console.log(`${result}`);
                        res.render('shop_get.ejs', { 
                            post : "Login",
                            product : result
                            // product_number : result[0].prodnum,
                            // product_name : result[0].name,
                            // product_price : result[0].price_sell,
                            // product_description : result[0].content
                        })
                    }
                }
                    
    });    
    
});

app.post('/get_item_info',(req,res) => {

    console.log('/get_item_info get_item_info get_item_info get_item_infoget_item_info')
    console.log(req.body);
    const prodnum = req.body.buy_now_cart_prodnum;
    // const item_quantity = req.body.buy_now_cart_quantity;
    // const item_name = req.body.buy_now_cart_name;

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
        console.log('Connection established');
    });
        
    con.query('SELECT * FROM product WHERE prodnum = ?',[prodnum], (err, result) => {
        if(err){
            res.send(err);
            con.end();

        } else {
            res.send(result);            
        }
                    
    });
    con.end();    

})


app.post('/shop',(req,res) => {
    console.log(`req test: ${req}`);
    // console.log(req);
    if (req.session.loginData) {member = req.session.loginData.name;
    console.log(member);
    }
    console.log(req.body);
    console.log("shop shop shop shop shop shop shop shop shop shop ");
    
    // res.send(req.body);

    // var member = '';
    // if (req.session.loginData) {member = req.session.loginData.name;}
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
        console.log('Connection established');
    });


    // const sign_in_id = req.body.sign_in_id;
    // const sign_in_pw = req.body.sign_in_pw;
    // const redirect_path = req.url.substring(req.url.lastIndexOf('=') + 1);
    // console.log(redirect_path);

    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);

     
    
   
    
        
    con.query('SELECT * from product'
        , (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
          
                } else {

                    console.log("SELECT * from product where prodnum = ");
                    console.log(result);
                    console.log(`${result[0].prodnum}`);

                    res.send(result);
                    
                }
                    
    });
    con.end();    
    
    
});

app.get('/shop/view/item/:item_number',(req,res) => {
    console.log(`req test: ${req}`);
    var member_name = '';

//     console.log(`/shop/view/item:id: ${product_number}`);
//     if (req.session.loginData) {member_name = req.session.loginData.name;}
    // console.log(req);
    if (req.session.loginData) {member_name = req.session.loginData.name;
    console.log(member_name);
    }
    console.log(req.body);
    console.log("app.get('/shop/view/item/:item_number  ");
    console.log(req.params.item_number);
    
    // res.send(req.body);

    // var member = '';
    // if (req.session.loginData) {member = req.session.loginData.name;}
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
        console.log('Connection established');
    });


    const product_number = req.params.item_number
    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
        
    con.query('SELECT * from product where prodnum = ?', [product_number]
        , (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
                
                } else {
                    console.log(result[0]);
                    res.render('shop_detail.ejs', { 
                        post : member_name,
                        product : result
                        
                    })
                    
                }
    });

    con.end();
});

app.post('/shop/view/item/:item_number',(req,res) => {
// app.post('/shopview',(req,res) => {
    console.log(`req test: ${req}`);
    // console.log(req);
    if (req.session.loginData) {member = req.session.loginData.name;
    console.log(member);
    }
    console.log(req.body);
    console.log('/shop/view/item/:item_number');
    console.log(req.params.item_number);
    
    // res.send(req.body);

    // var member = '';
    // if (req.session.loginData) {member = req.session.loginData.name;}
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
        console.log('Connection established');
    });


    // const sign_in_id = req.body.sign_in_id;
    // const sign_in_pw = req.body.sign_in_pw;
    // const redirect_path = req.url.substring(req.url.lastIndexOf('=') + 1);
    // console.log(redirect_path);
    // const product_number = req.body.prodnum;
    const product_number = req.params.item_number
    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
        
    con.query('SELECT * from product where prodnum = ?', [product_number]
        , (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
                
                } else {
                    console.log(result[0]);
                    res.send(result[0]);
                    
                }
    });

    con.end();   
    
});


app.post('/shop/checkout/:id', (req,res) => {
    console.log('/shop/checkout/:id /shop/checkout/:id /shop/checkout/:id /shop/checkout/:id')
    console.log(req.body.u_id);

    const u_id = req.body.u_id;
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
        console.log('Connection established');
    });

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

})


app.post(`/get_user_default_billing_info`, (req,res) => {
    console.log('/get_user_default_billing_info /get_user_default_billing_info /get_user_default_billing_info ');
    
    const u_id = req.body.u_id;
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
        console.log('Connection established');
    });

    con.query('SELECT cardholder, type, last4 FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
        if(err){                        
            res.send(err);
            con.end();        
        } else {
            console.log(result);            
            res.send(result);
        }
    }); 
})

app.post(`/get_user_default_shipping_info`, (req,res) => {
    console.log('get_user_default_shipping_info get_user_default_shipping_info get_user_default_shipping_info ');
    
    const u_id = req.body.u_id;
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
        console.log('Connection established');
    });

    con.query('SELECT recipient, address1, address2, city, state, zip, phone, email, shipping_option FROM shipping_info WHERE id= ? and default_address="default" and inuse="y"',[u_id], (err, result) => {
        if(err){                        
            res.send(err);
            con.end();        
        } else {
            console.log(result);            
            res.send(result);
        }
    }); 


})


app.post('/check_user_cart', (req,res) => {
    console.log('/check_user_cart /check_user_cart /check_user_cart /check_user_cart')
    console.log(req.body.u_id);

    const u_id = req.body.u_id;
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
        console.log('Connection established');
    });

    con.query('SELECT * from cart join product on cart.prodnum = product.prodnum where u_id = ? and result = "n"', [u_id]
            ,(err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();
                
                } else {
                    // console.log("result");
                    // console.log(result);
                    
                    res.send(result);
                }
            });

})



app.post('/item_addup_v2', (req,res) => {
    let user_id = req.body.u_id;
    let item_num = req.body.item_num;
    let selected_number = req.body.selected_num;
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
                    con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
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

app.post('/item_subtract_v2', (req,res) => {
    const user_id = req.body.u_id;
    const item_num = req.body.item_num;
    const selected_number = req.body.selected_num;
    const u_id = req.session.loginData.id;
    const date = getDate();

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

                    con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
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

app.post('/item_delete_v2', (req,res) => {
    const user_id = req.body.u_id;
    const item_num = req.body.item_num;
    const selected_number = req.body.selected_num;
    const u_id = req.session.loginData.id;
    
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
                    con.query('select * from cart join product on cart.prodnum = product.prodnum where u_id= ? and result = "n" and cart.prodnum in (?);', [u_id, selected_number]
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
});

app.post('/check_purchase_history', (req,res) => {

    const id= req.body.id;
    const u_id = req.session.loginData.id;

    if (id === u_id) {
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
            console.log('Connection established');
        });

        con.query('select * from orders left join cart on cart.order_number = orders.order_number left join product on cart.prodnum = product.prodnum where result = "y" and cart.order_number IN (SELECT order_number FROM orders WHERE u_id = ?) ORDER BY oddate DESC',[u_id],(err, result) => {
            if(err){                        
                res.send(err);
                con.end();        
            } else {
                console.log(result);  
                res.send(result);      
            }
        })
    } else console.log("id Check")
});


app.post('/user_checkout_submit', (req,res) => {

    const u_id = req.session.loginData.id;
    const amount = req.body.amount;
    const cart = req.body.cart;
    let default_payment_method = '';
    let clv_id = '';
    let default_shipping_info = {};
    // const cart_num = '';
    const date = getDate();
    const order_number = date.replace(/\s|:|\-/g,"") + "OD" + u_id.substr(0, 3);
    const cart_numbers = cart.map(element => {
        return element.cartnum;
    });
        
    const items = cart.map(element => {
        return { 
            amount : element.price_sell * 100,
            currency : "usd",
            description : element.content.substring(0,120),
            quantity : element.quantity,
            type:"sku",
            tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
        }

    })

    const tmp_amount_items = items.map(element => {return element.amount/100 * element.quantity ;})
    const total_order_amount = tmp_amount_items.reduce((a,b) => (a+b));
    console.log(total_order_amount);    
    

    ////////////////// get default payment method /////////////////////

    
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
        console.log('Connection established');
    });

    getDefaultShippingInfo();

    getDefaultBillingInfo()
    .then(() => { 
        console.log("make payment");      
        makePayment();
    });


    function getDefaultBillingInfo() {
        return new Promise((resolve, reject) => { 
            con.query('SELECT clv_id, clv_tk FROM billing_info WHERE id= ? and default_payment="default" and inuse="y"',[u_id], (err, result) => {
                if(err){                        
                    res.send(err);
                    con.end();        
                } else {
                    console.log(result);            
                    default_payment_method = result[0].clv_tk;
                    clv_id = result[0].clv_id;
                    resolve();
                }
            }); 
        }) 
    }


    function getDefaultShippingInfo() {
        con.query('SELECT recipient, address1, address2, city, state, zip, phone, email, shipping_option FROM shipping_info WHERE id= ? and default_address="default" and inuse="y"',[u_id], (err, result) => {
            if(err){                        
                res.send(err);
                con.end();        
            } else {                           
                default_shipping_info = result[0];
                console.log("default_shipping_info");
                console.log(default_shipping_info); 
            }
        }); 



    }

    function setOrders(response) {
        console.log('order_number');
        console.log(order_number);       
        con.query('INSERT INTO test1.orders (order_number, u_id, clv_order_id, clv_charge_id, clv_ref_num, clv_transaction_num, total_order_amount, indate) VALUES (?,?,?,?,?,?,?,?)',
        [order_number, u_id, response.id, response.charge, response.ref_num, response.status_transitions.paid, total_order_amount, date], (err, result) => {
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
                res.send({transaction : "complete"})
                 
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
                            setOrders(response);    
                            updateOrderedCart(order_number, date, cart_numbers, u_id)
                            ////// make empty guest cart         
                                      
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
    const order_items = JSON.parse(req.body.order_items);
    console.log(req.body); 
    console.log(order_items);
    const token_id = req.body.cloverToken;
    const items = order_items.map(element => {
        return { 
            amount : element.c_item_price * 100,
            currency : "usd",
            description : element.c_item_no + "," + element.c_item_name,
            quantity : element.c_item_quantity,
            type:"sku",
            tax_rates: [{tax_rate_uuid: process.env.TAX_UUID, name: "6%"}]
        }

    })


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
              city: req.body.shipping_address_city,
              country: 'US',
              line1: req.body.shipping_address_street,
              postal_code: req.body.shipping_address_zip ,
              state: req.body.shipping_address_state
            },
            name: req.body.shipping_recipient,
            phone: req.body.order_contact_phone
          },
          email: req.body.order_contact_email,
          currency: 'usd'
        })
      };
      
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
                        console.log("response")
                        console.log(response)
                        const res_items = response.items;
                        console.log(res_items)
                        
                        let order_items_number = res_items.forEach(element => {
                            return element.description.substring(0, element.description.indexOf(','));
                        })
                        console.log(order_items_number);
                        const send_data = JSON.stringify(order_items_number);
                        res.send(send_data);
                    })
                    .catch(err => console.error(err));

            }
        
        })
        .catch(err => console.error(err));
});





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
