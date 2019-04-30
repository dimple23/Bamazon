const mysql=require("mysql");
const inquirer=require("inquirer");
var table = require("console.table");
const color= require("color");
 
const connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"dasnadas23",
    database: "bamazon_db"
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
       
      });
      start();
     
      console.log("\n\n\n\n*************************** Welcome to Bamazon ***********************************");
      function start(){
        
        connection.query("select * from products", function(err, res) {
            //for(var i = 0; i < res.length; i++) {
              //console.table("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Price: " + res[i].price+"| Department Name:"+res[i].department_name +"| Instock:"+res[i].stock_quantity);
              console.table(res);
              
              console.log("=================================================================================");
          // }
              });
          
          purchaseItem();
            };



 function purchaseItem(){
        inquirer
      .prompt([
        {
          message: " Please select item by item id which you wnat to buy: ",
          type: "input",
          name: "item_id",
        
          
        },
        {
          message: "Please enter the number of widgets you want: ",
          type: "input",
          name: "UserQuantity"
        }
         
      ])
      .then(function(input) {
        connection.query("select * from products where ?", {item_id: input.item_id}, function(err, res) {
          if (err) throw err;
          if (res.length === 0) {
            console.log.color.red("Item Id you select does not exist...\n\n");
            start();
          } else {

            //var item =res[0];
            console.log("\n you select item Id:"+res[0].item_id);

            console.log("\n you Choose item :"+res[0].product_name);

            var product = res[0];
              if (input.UserQuantity <= product.stock_quantity) {
                console.log("\n Congratulation Your order has been placed...\n");

                console.log(" Thank you for Shopping....... ")

                var Stock = "update products SET stock_quantity = " + (product.stock_quantity - input.UserQuantity) + ' where item_id = ' + input.item_id;

                connection.query(Stock, function(err, results) {
                  if (err) throw err;
                  console.log("\n Your Product price is: $ "+product.price);
                  console.log("\n Your total is :$" + product.price * input.UserQuantity);
                  
                  connection.end();
                })
              } else {
                console.log("\n You ordered more than we have. Please try reordering less...");
                start();
          }
        }
      })
    })
            }