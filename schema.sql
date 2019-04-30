drop database bamazon_db;
create database bamazon_db;

use  bamazon_db;

create table products(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
    price INTEGER, 
    stock_quantity INTEGER, 
    PRIMARY KEY (item_id)
);

use  bamazon_db;

insert into products(product_name,department_name,price,stock_quantity)
                     values("Mobile case","mobile Acceseries",10,50);
insert into products(product_name,department_name,price,stock_quantity)                
                     values ("laptop case","laptop Acceseries",15,30);
 insert into products(product_name,department_name,price,stock_quantity)                    
                     values ("Fan","Electronics",40,28);
 insert into products(product_name,department_name,price,stock_quantity)                     
                      values("light stand","Electrical",30,50);
 insert into products(product_name,department_name,price,stock_quantity)                     
                     values ("Air condistioner","Electronics",80,30);
 insert into products(product_name,department_name,price,stock_quantity)                     
                     values ("Table","Furnituer",50,35);
 insert into products(product_name,department_name,price,stock_quantity)                     
                     values ("chair","Furnituer",60,25);
  insert into products(product_name,department_name,price,stock_quantity)                    
                      values("Wordrob","Furnituer",40,15);
   insert into products(product_name,department_name,price,stock_quantity)                   
                      values("Wall Decor","Decor",20,30);
   insert into products(product_name,department_name,price,stock_quantity)                   
                     values ("T-Shirt","cloths",10,50);

  select * from products;