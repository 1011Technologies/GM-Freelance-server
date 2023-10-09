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

CREATE TABLE bookmark (
    bookmark_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(client_id) ON DELETE SET NULL,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    post_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recently_viewed (
    recently_viewed_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(client_id) ON DELETE SET NULL,
<<<<<<< HEAD
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL
=======
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    time_added TIMESTAMP DEFAULT NOW()
<<<<<<< HEAD
>>>>>>> 07f15233adc08e2a79345ad23182297e6120ebb9
);
=======
);

CREATE TABLE skill(
    skill_id SERIAL PRIMARY KEY,
    freelancer_id INT REFERENCES freelancer(freelancer_id) ON DELETE SET NULL,
    skill_1 VARCHAR(25),
    skill_2 VARCHAR(25),
    skill_3 VARCHAR(25),
    skill_4 VARCHAR(25),
    skill_5 VARCHAR(25)
);



SELECT users.first_name,users.last_name,users.profile_picture,users.geom ,users.is_verified ,freelancer.freelancer_id ,freelancer.rating,freelancer.reviews_count,freelancer.response_rate,freelancer.response_time ,freelancer.days_available,freelancer.hourly_rate  
FROM recently_viewed 
inner join freelancer on freelancer.freelancer_id=recently_viewed.freelancer_id
inner join users  on freelancer.user_id =users.user_id 
WHERE recently_viewed.client_id=7;
>>>>>>> ff391415a98f6a2b8c16eb8513cbfa86e0c47ab8
