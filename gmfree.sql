create database gmfree

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    user_name VARCHAR(20),
    email VARCHAR(100),
    password VARCHAR(20),
    user_type VARCHAR(20),
    city VARCHAR(20),
    town VARCHAR(20),
    street VARCHAR(20),
    house_no VARCHAR(20) ,
    postal_code INT,
    coordinates POINT
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id_from INT REFERENCES users(user_id),
    user_id_to INT REFERENCES users(user_id),
    message VARCHAR(20),
    picture VARCHAR(255),
    video VARCHAR(255)
);

CREATE TABLE account_detail (
    account_detail_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    payment_gateway VARCHAR(20),
    payment_method VARCHAR
);



CREATE TABLE hiring_detail (
    hire_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES users(user_id),
    customer_id INT REFERENCES users(user_id),
    hire_date DATE,
    hire_date_till DATE,
    hours INT,
    hourly_rate INT,
    work_details VARCHAR(200),
    milestone_status VARCHAR(15)
);

CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    hire_id INT REFERENCES hiring_detail(hire_id),
    user_id INT REFERENCES users(user_id),
    account_detail_id INT REFERENCES account_detail(account_detail_id),
    amount INT,
    time TIMESTAMP
);


CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    service_name VARCHAR(20)
);

CREATE TABLE gigs (
    gig_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES users(user_id),
    date DATE,
    time TIME,
    duration INT
);


