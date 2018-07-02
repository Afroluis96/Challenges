CREATE SCHEMA IF NOT EXISTS snackStore;

use snackStore;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
productId int(11) unsigned not null auto_increment primary key,
productName varchar(50) default null,
price double default 0,
likes int(11) default 0,
stock int (11) default 0,
enable tinyint(1) default 0
);

select * from products;
select * from log;
select * from likes;
select * from users;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
userId int(11) unsigned not null auto_increment primary key,
userName varchar(50),
userPassword varchar (50),	
isAdmin tinyint(1) default 0
);

insert into users(userName,userPassword,isAdmin)
values('Luis', '123', 1),
      ('Alejandro', '123', 0);

DROP TABLE IF EXISTS userLike;

CREATE TABLE likes(
likeId int(11) unsigned not null auto_increment primary key,
userId int(11) unsigned,
productId int(11) unsigned,
FOREIGN KEY (userId) REFERENCES users(userId),
FOREIGN KEY (productId) REFERENCES products(productId)
);

DROP TABLE IF EXISTS log;

CREATE TABLE log (
logId int(11) unsigned not null auto_increment primary key,
quantity int default 1,
logDate datetime default now(),
total double,
userId int(11) unsigned,
productId int(11) unsigned,
FOREIGN KEY (userId) REFERENCES users(userId),
FOREIGN KEY (productId) REFERENCES products(productId)
);

