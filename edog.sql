SET NAMES UTF8;
DROP DATABASE IF EXISTS edog;
CREATE DATABASE edog CHARSET=UTF8;
USE edog;
CREATE TABLE edog_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),
  price1 DECIMAL(10,2),
  price2 DECIMAL(10,2),
  pic VARCHAR(64)
);
INSERT INTO edog_index_product VALUES
(Null,'大内比乐 低敏无谷配方子母犬原味奶糕粮1.5kg',149.00,169.00,"http://127.0.0.1:3000/src/assets/product1-1.jpg"),
(Null,'台湾原装进口斑尼菲 蓝带无谷海陆+胶原蔬果配方幼母犬粮 4磅(1.8kg)',220.00,229.00,"http://127.0.0.1:3000/src/assets/product2-2.jpg"),
(Null,'汤恩贝TEB！蔬果纤维祛泪痕通用型全期全价犬粮 3.3磅',108.00,118.00,"http://127.0.0.1:3000/src/assets/product3-1.jpg"),
(Null,'爱慕思IAMS 全犬种幼犬专用犬粮 2kg',109.00,119.00,"http://127.0.0.1:3000/src/assets/product4-1.jpg"),
(Null,'优基 益生菌小型成犬粮 2kg',75.00,95.00,"http://127.0.0.1:3000/src/assets/product5-1.jpg"),
(Null,'麦富迪 牛肉双拼系列 贵宾专用牛肉双拼成犬粮 2kg',55.00,65.00,"http://127.0.0.1:3000/src/assets/product6-1.jpg");
CREATE TABLE edog_pic(
  pic_pid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,            
  pic VARCHAR(1000)         
);
INSERT INTO edog_pic VALUES
(Null,1,'["http://127.0.0.1:3000/src/assets/product1-1.jpg","http://127.0.0.1:3000/src/assets/product1-2.jpg","http://127.0.0.1:3000/src/assets/product1-3.jpg","http://127.0.0.1:3000/src/assets/product1-4.jpg","http://127.0.0.1:3000/src/assets/product1-5.jpg"]'),
(Null,2,'["http://127.0.0.1:3000/src/assets/product2-1.jpg","http://127.0.0.1:3000/src/assets/product2-2.jpg","http://127.0.0.1:3000/src/assets/product2-3.jpg","http://127.0.0.1:3000/src/assets/product2-4.jpg","http://127.0.0.1:3000/src/assets/product2-5.jpg"]'),
(Null,3,'["http://127.0.0.1:3000/src/assets/product3-1.jpg"]'),
(Null,4,'["http://127.0.0.1:3000/src/assets/product4-1.jpg","http://127.0.0.1:3000/src/assets/product4-2.jpg"]'),
(Null,5,'["http://127.0.0.1:3000/src/assets/product5-1.jpg"]'),
(Null,6,'["http://127.0.0.1:3000/src/assets/product6-1.jpg","http://127.0.0.1:3000/src/assets/product6-2.jpg","http://127.0.0.1:3000/src/assets/product6-3.jpg"]');
/**购物车条目**/
CREATE TABLE edog_cart(
	uid INT,
	pid INT PRIMARY KEY AUTO_INCREMENT,
	product_image VARCHAR(128),
	title VARCHAR(64),
	price1 DECIMAL(10,2),
	counts INT
);