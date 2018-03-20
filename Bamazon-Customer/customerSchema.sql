CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id  INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DEC(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony Playstation 4", "Video Games & Consoles", 299.99, 700),
("12-piece non-stick cookware", "Home & Kitchen", 89.99, 800),
("TCL 49-inch 4K LED TV", "TV & Video", 329.99, 1200),
("LG 55-inch 4K OLED TV", "TV & Video", 1696.99, 900),
("6-feet HDMI cable", "Audio & Video Accessories", 6.99, 2000),
("NIKE men's RN running shoe", "Clothing, Shoes & Jewelery", 57.99, 1000),
("mens's casual plaid button-down shirt", "Clothing, Shoes & Jewelery", 69.50, 1500),
("LEGO tower bridge", "Toys & Games", 239.95, 500),
("EVGA GeForce GTX 1080 Ti 11GB", "Computer Parts & Components", 1148.98, 80),
("Corsair Vengeance 16GB DDR4 DRAM", "Computer Parts & Components", 204.99, 50);




