show databases;

create database cars_db;

use cars_db;

create table users (
userId int primary key auto_increment,
name varchar(100) not null,
email varchar (20),
driverLicenseNo varchar(50) unique,
address TEXT,
role int default 0,
createdAt timestamp default current_timestamp,
extraInt_1 int,
extraInt_2 int,
extraVar_1 varchar(100),
extraVar_2 varchar(100)
);

create table cars (
carId int primary key auto_increment,
regNumber varchar(20) unique not null,
model varchar(100) not null,
brand varchar(100) not null,
year year not null,
status enum('available','maintenance','unavailable') default 'available',
rate decimal(10,2) not null,
createdAt timestamp default current_timestamp,
userId int,

foreign key (userId) references users(userId) on update cascade on delete set null
); 

alter table cars add column (
extraInt_1 int,
extraInt_2 int,
extraVar_1 varchar(100),
extraVar_2 varchar(100)
);

create table bookings (
bookingId int primary key auto_increment,
userId int not null,
carId int not null,
bookDate date not null,
returnDate date not null,
status enum('booked','cancelled','completed') default 'booked',
totalAmount decimal(10,2) not null,
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp on update current_timestamp,
extraInt_1 int,
extraInt_2 int,
extraVar_1 varchar(100),
extraVar_2 varchar(1000),
foreign key (userId) references users(userId) on delete cascade on update cascade,
foreign key (carId) references cars(carId) on update cascade on delete cascade
);

create table payments (
paymentId int primary key auto_increment,
bookingId int not null,
userId int not null,
amount decimal(10,2) not null,
paymentDate timestamp default current_timestamp,
paymentStatus enum('pending','completed','failed') default 'completed',
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp on update current_timestamp,
extraInt_1 int,
extraInt_2 int,
extraVar_1 varchar(100),
extraVar_2 varchar(100),

foreign key (bookingId) references bookings(bookingId) on delete cascade on update cascade,
foreign key (userId) references users(userId) on delete cascade on update cascade
);

create table reviews (
reviewId int primary key auto_increment,
userId int not null,
carId int not null,
rating int not null check (rating between 1 and 5),
reviewText text,
createdAt timestamp default current_timestamp,
updatedAt timestamp default current_timestamp on update current_timestamp,
extraInt_1 int,
extraInt_2 int,
extraVar_1 varchar(100),
extraVar_2 varchar(100),

foreign key (userId) references users(userId) on update cascade on delete cascade,
foreign key (carId) references cars(carId) on update cascade on delete cascade
);

select * from users;

select * from cars;

select * from bookings;

select * from payments;

select * from reviews;
