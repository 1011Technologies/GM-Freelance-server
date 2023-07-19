

-- SQL AFTER READING CHAT


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    profile_picture VARCHAR(50),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email VARCHAR(100),
    password VARCHAR(20),
    gender VARCHAR(20),
    phone_no VARCHAR(50),
    user_type VARCHAR(50),
    city VARCHAR(20),
    town VARCHAR(20),
    street VARCHAR(20),
    house_no VARCHAR(20),
    postal_code INT,
    geom Point
);



CREATE TABLE freelancer (
    freelancer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    rating INT,
   	distance INT,
    response_rate INT,
   	response_time INT,
   	days_available VARCHAR(100),
   	hourly_rate int 
);

CREATE TABLE client (
    client_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    rating INT,
    total_job_post int, 
    total_hires int ,
    company varchar 
);

CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(55)
);



CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(client_id),
    job_title VARCHAR(25),
    from_date_time TIMESTAMP,
    till_date_time TIMESTAMP,
    Duration INT,
    Description VARCHAR(1000),
    payment_type VARCHAR(20),
    FOREIGN KEY (client_id) REFERENCES client(client_id)
);




CREATE TABLE skill_required (
    skill_required_id SERIAL PRIMARY KEY,
    job_id INT,
    skill_id INT,
    FOREIGN KEY (job_id) REFERENCES job(job_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id)
);


CREATE TABLE proposal (
    proposal_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id),
    job_id INT REFERENCES job(job_id),
    date_time TIMESTAMP,
    duration INT,
    proposal_status INT
);

CREATE TABLE contract (
    contract_id SERIAL PRIMARY KEY,
    proposal_id INT,
    freelancer_id INT,
    client_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES proposal(proposal_id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer(freelancer_id),
    FOREIGN KEY (client_id) REFERENCES client(client_id)
);

CREATE TABLE message (
    message_id SERIAL PRIMARY KEY,
    freelancer_id INT,
    client_id INT,
    proposal_id INT,
    message_text VARCHAR(1000),
    message_time TIMESTAMP,
    FOREIGN KEY (freelancer_id) REFERENCES freelancer(freelancer_id),
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (proposal_id) REFERENCES proposal(proposal_id)
);

CREATE TABLE attachment (
    attachment_id SERIAL PRIMARY KEY,
    message_id INT,
    attachment_link VARCHAR(255),
    FOREIGN KEY (message_id) REFERENCES message(message_id)
);

CREATE TABLE certification (
    certification_id SERIAL PRIMARY KEY,
    freelancer_id INT,
    certified_in VARCHAR(25),
    certification_link VARCHAR(255),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer(freelancer_id)
);

CREATE TABLE freelancer_skill (
    freelancer_skill_id SERIAL PRIMARY KEY,
    freelancer_id INT,
    skill_id INT,
    FOREIGN KEY (freelancer_id) REFERENCES freelancer(freelancer_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id)
);

CREATE TABLE card_details (
    card_details_id SERIAL PRIMARY KEY,
    card_number VARCHAR(25),
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    expiry_month INT,
    expiry_year INT,
    security_code INT
);

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    user_id INT,
    card_details_id INT,
    payment_gateway VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (card_details_id) REFERENCES card_details(card_details_id)
);



CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    contract_id INT,
    account_id INT,
    amount INT,
    time TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contract(contract_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

create table reviews (
    review_id SERIAL primary key,
    review_to INT,
    review_from INT,
    job_id INT,
    ratings INT,
    posted_on TIMESTAMP,
    review_description VARCHAR(255),
    foreign key (review_to) references users(user_id),
    foreign key (review_from) references users(user_id),
    foreign key (job_id) references job(job_id)
);




