-- USERS TABLE 
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    profile_picture VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    gender VARCHAR(20),
    phone_no VARCHAR(20),
    user_type VARCHAR(20),
    house_no VARCHAR(20),
    street VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR (20),
    country VARCHAR(50),
    geom Point
);

-- FREELANCER TABLE
CREATE TABLE freelancer (
    freelancer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    rating INT,
    distance INT,
    response_rate INT,
    response_time INT,
    days_available VARCHAR(100),
    hourly_rate int 
);

-- CLIENT TABLE
CREATE TABLE client (
    client_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    rating INT,
    total_job_post int, 
    total_hires int ,
    company varchar 
);

-- JOB TABLE
CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(client_id) ON DELETE SET NULL,
    job_title VARCHAR(50),
    job_catagory VARCHAR(50),
    duration INT,
    description VARCHAR(1000),
    budget INT,
    post_time TIMESTAMP DEFAULT NOW()
);

-- PROPOSAL TABLE
CREATE TABLE proposal (
    proposal_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    job_id INT REFERENCES job(job_id) ON DELETE SET NULL,
    date_time TIMESTAMP DEFAULT NOW(),
    duration INT,
    proposal_status INT
);
-- CONTRACT TABLE
CREATE TABLE contract (
    contract_id SERIAL PRIMARY KEY,
    proposal_id INT REFERENCES proposal(proposal_id) ON DELETE SET NULL,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    client_id INT REFERENCES client(client_id) ON DELETE SET NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

-- MESSAGE TABLE
CREATE TABLE message (
    message_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    client_id INT REFERENCES client(client_id) ON DELETE SET NULL,
    proposal_id INT REFERENCES proposal(proposal_id) ON DELETE SET NULL,
    message_text VARCHAR(1000),
    message_time TIMESTAMP DEFAULT NOW()
);

-- ATTACHMENT TABLE
CREATE TABLE attachment (
    attachment_id SERIAL PRIMARY KEY,
    message_id INT REFERENCES message(message_id) ON DELETE SET NULL,
    attachment_link VARCHAR(255)
);

-- CERTIFICATION TABLE
CREATE TABLE certification (
    certification_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    certified_in VARCHAR(25),
    certification_link VARCHAR(255)
);

-- FREELANCER SKILL TABLE (assuming skill table is created elsewhere)
CREATE TABLE freelancer_skill (
    freelancer_skill_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    skill_id INT, -- Assuming skill table is created elsewhere
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE SET NULL
);

-- CARD DETAILS TABLE
CREATE TABLE card_details (
    card_details_id SERIAL PRIMARY KEY,
    card_number VARCHAR(25),
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    expiry_month INT,
    expiry_year INT,
    security_code INT
);

-- ACCOUNT TABLE
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    card_details_id INT REFERENCES card_details(card_details_id) ON DELETE SET NULL,
    payment_gateway VARCHAR(255)
);

-- TRANSACTION TABLE
CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    contract_id INT REFERENCES contract(contract_id) ON DELETE SET NULL,
    account_id INT REFERENCES account(account_id) ON DELETE SET NULL,
    amount INT,
    time TIMESTAMP
);

-- REVIEWS TABLE
CREATE TABLE reviews (
    review_id SERIAL primary key,
    review_to INT REFERENCES users(user_id) ON DELETE SET NULL,
    review_from INT REFERENCES users(user_id) ON DELETE SET NULL,
    job_id INT REFERENCES job(job_id) ON DELETE SET NULL,
    ratings INT,
    posted_on TIMESTAMP,
    review_description VARCHAR(255)
);


