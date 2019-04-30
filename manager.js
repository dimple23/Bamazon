const mysql=require("mysql");
const inquirer=require("inquirer");
var table = require("console.table");
 
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

       function start(){
         
        connection.query("select * from products",function(err,res){
          if (err) throw err;

          inquirer.prompt([
            {
              name:"select",
              type:"list",
              choices:["view products for sale","view Low Inventory","Add to Inventory","Add New Product"],
              message:"What would you like to do?"
            }
          ]).then(function(answer){
            switch (answer.select) {
              case "view products for sale":
                  connection.query("select * from products", function(err, res) {
                      if (err) throw err;
                      console.table(res);
                      console.log("===============================================================");
                      start();
                  });
                  break;
                 case "view Low Inventory":
                 connection.query("select * from products where stock_quantity < 50 ", function(err, res){
                   if(err) throw err;
                   console.table(res);
                   console.log("===================================================================");
                   start();

                 });
                  break;

                 case "Add to Inventory":
                 inquirer
                 .prompt([
                   {
                    message:"which product do you want to add in stock::",
                   name:"itemId",
                   type:"list",
                   choices:function(){
                     let addArray=[];
                     for(i=0 ; i< res.length ;i++){
                       addArray.push(res[i].product_name);
                     }
                     return addArray;
                   },
                   
                  },{
                  name: "Quantity",
                  type: "input",
                  message: "How much would you like to add?"
              }
              ]).then(function(answer){
                  var selectedproduct;
                  for (var i = 0; i < res.length; i++) {
                      if (res[i].product_name === answer.product) {
                        selectedproduct = res[i];
                      }
                  }

                  stock_quantity = res[0].stock_quantity+parseInt( answer.Quantity);

			               console.log("Updated stock: " + stock_quantity);
                     connection.query("update products set ? where ?", [{
                      stock_quantity: stock_quantity
                    }, {
                      item_id: answer.item_id
                    }],function(error) {
                        if (error) throw err;
                        console.log("Stock added successfully!");

                        console.log("================================================================");
                        
                        start();
                    })

                  });
                 break;
                  
                 case "Add New Product":
                 inquirer.prompt([
                   {
                     name:'product',
                     type:'input',
                     message:'Which product do you want to add in store?:'

                 },{
                  name:'department',
                  type:'input',
                  message:'Which department do you want to add for your product?:'
                 },{
                  name:'price',
                  type:'input',
                  message:'Howmuch price  do you want to add for your product?',
                  validate:function(value){
                    if(value=Number){
                      return true;
                  } 
                  {
                      return 'Please enter a numerical value'
                    }
                 }
                },{
                  name:'stock',
                  type:'input',
                  message:'Howmuch stock  do you want to add for your product?',
                  validate:function(value){
                    if(value=Number){
                      return true;
                  } 
                  {
                      return 'Please enter a numerical value'
                    }
                 },
                }
                 
              ]).then(function(answer){
                   connection.query("insert into products set?",{
                     product_name:answer.product,
                     department_name:answer.department,
                     price:answer.price,
                     stock_quantity:answer.stock
                   },function(req,res){

                   });
                   console.log(" \n Congratulation Your product has been added..\n")
                   console.log("===============================================================");

                   connection.query("select * from products", function(err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log("===============================================================");
                    start();

                 });
                
               
                });
            
              

              
              }
          });
        })
      }