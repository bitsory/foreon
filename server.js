const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


app.listen(8080, function() {
    console.log('listening on 8080');
});

app.set('view engine', 'ejs');
app.use(session({
    key: 'loginData',
    secret: 'blackcatdoubleattack',
    resave: false,
    saveUninitialized: true,
    HttpOnly:true
   

}))


app.get('/',(req,res) => {
    console.log("home home home");
    
    if (req.session.loginData) {
        console.log("login data exist");
        // res.sendFile(__dirname + "/index.html");
		res.render('index.ejs', {post : req.session.loginData[0].name});
	} else {
        console.log("login data nothing");
		res.sendFile(__dirname + "/public/index.html");
	}
});


app.get('/shop',(req,res) => {
    console.log(`req test: ${req}`);
    console.log("test test etst test test test etst  ");
    var member = '';
    if (req.session.loginData) {member = req.session.loginData[0].name;}
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
                // }
                //  else if(result[0].no === 'false') {
                //     res.send('check your ID and PW');
                //     con.end();
                } else {

                    console.log("SELECT * from product where prodnum = ");
                    console.log(`${result[0].prodnum}`);
                    
                    // res.send(result[0].name);
                    if(member) {
                        res.render('shop_test.ejs', { 
                            post : member,
                            product : result
                            // product_number : result[0].prodnum,
                            // product_name : result[0].name,
                            // product_price : result[0].price_sell,
                            // product_description : result[0].content
                        })
                    } else {

                        res.render('shop_test.ejs', { 
                            post : "GUEST",
                            product : result
                            // product_number : result[0].prodnum,
                            // product_name : result[0].name,
                            // product_price : result[0].price_sell,
                            // product_description : result[0].content
                        })
                    }
                }
                    
    });    
    
    // if (req.session.loginData) {
        
	// 	res.render('test.ejs', {post : req.session.loginData[0].name, 
    //                             item : "Ginger Bottle 16 oz....",
    //                             price : 18.00,
    //                             description : "100% Handmade Squeezed Ginger Juice"
    //                         });
	// } else {
	// 	res.render('shop_test.ejs', { post : "GUEST",
    //         product_number : 1001,
    //         product_name : "Ginger Bottle 16 oz....",
    //         product_price : 18.00,
    //         description : "100% Handmade Squeezed Ginger Juice"
    //     });

	// }
    
});

app.get('/shop/view/item/:id',(req,res) => {
    
    var p_number = parseInt(req.params.id);
    var member = '';

    console.log(`/shop/view/item:id: ${p_number}`);
    if (req.session.loginData) {member = req.session.loginData[0].name;}
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

     
    
   
    
        
    con.query('SELECT * from product where prodnum = ?', [p_number]
        , (err, result) => {
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
                    
                    // res.send(result[0].name);
                    if(member) {
                        res.render('shop_detail.ejs', { 
                            post : member,
                            product : result
                          
                        })
                    } else {

                        res.render('shop_detail.ejs', { 
                            post : "GUEST",
                            product : result
                           
                        })
                    }
                }
            });  


});



app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));




app.post("/add_cart", function (req, res) {
    console.log("get_cart get_cart get_cart");
    
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

    const u_id = req.body.c_name;
    const prodnum = req.body.c_items[0].c_item_no;
    const quantity = req.body.c_items[0].c_item_quantity;

    var date;
    date = new Date();
    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);

        
    con.query('INSERT INTO cart (u_id, prodnum, quantity, indate) values (?,?,?,?)', 
    [u_id, prodnum, quantity, date]);
        
    res.json(req.body)
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
		res.render('index.ejs', {post : req.session.loginData[0].name});	
    } else {
		res.sendFile(__dirname + "/public/index.html");
	}
    
});

app.get('/about',(req,res) => {
    // res.sendFile(__dirname + "/public/index.html")
    console.log(`req about: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData[0].name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});

app.get('/menu',(req,res) => {
    console.log(`req menu: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData[0].name});
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
    
});



app.get('/contact',(req,res) => {
    console.log(`req contact: ${req}`);
    if (req.session.loginData) {
		res.render('index.ejs', {post : req.session.loginData[0].name});
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

     
    
   
    
        
    con.query('SELECT COALESCE(MAX(no), "false") AS no from users where id = ? and pw = ?',
        [sign_in_id, sign_in_pw], (err, result) => {
                if(err){
                    res.send(err);
                    con.end();
                }
                 else if(result[0].no === 'false') {
                    res.send('check your ID and PW');
                    con.end();
                } else {
                    result.forEach( (result) => {
                        
                        console.log(`${result.no}`);
                        
                        updateLastLog(result.no);                         
                    }) 
                }
                    
    });    
    

    function updateLastLog(param) {
        
        console.log(`update: ${param}, ${date}`);
        
        if(param) {
            con.query('UPDATE users SET last_log = ? where no = ?', [date, param]);
            con.query('SELECT name from users where no = ?', [param], (err, result) => {
                req.session.loginData = result;
                console.log(`req.session.user_id : ${req.session.loginData[0].name}`);
                console.log(req.session.loginData);
                // res.json(req.session.loginData);
                res.cookie(
                    'cafefore',{
                    name : req.session.loginData[0].name,
                    id : "test",
                    authorized : true
                });
                res.redirect(redirect_path);
                // res.json(req.session.loginData);
                
                // res.send({name : "StackOverFlow", reason : "Need help!", redirect_path: redirect_path})
                // res.render(redirect_path, {post : req.session.loginData[0].name});
            });
            // console.log(`update: ${r_name}`);            
        }
        con.end();
        // return r_name;
        
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
// app.get('/',(req,res)=>res.sendFile('C:/Users/Jk/Documents/web_workspace/Test/index.html'));

// app.post('/shop/member/:id/cart', (req,res) => {
//     res.send("cart");

// });

app.post('/shop/cart/:id', (req,res) => {
    console.log("go cart ");
    console.log(req.rawHeaders);
    console.log(req.rawHeaders[0]);
    res.send("cart");
    // res.send(JSON.stringify(req));

});


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

    con.connect((err) => {
        if(err){
        console.log('Error connecting to Db');
        return;
        }
        console.log('Connection established');
    });

    // con.query('SELECT * from users', (error, rows, fields) => {
    //     if (error) throw error;
    // console.log('User info is: ', rows);
    // });
    
}
  
