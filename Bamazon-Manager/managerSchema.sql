UPDATE products SET stock_quantity=3 WHERE item_id=9;

SELECT*FROM products;

UPDATE products SET stock_quantity=500 WHERE item_id=1;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kendrick Lamar-DAMN. double vinyl", "CDs & Vinyl", 28.94, 600)