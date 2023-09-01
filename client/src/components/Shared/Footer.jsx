import { useState } from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../../assets/Styles';
import pages from '../../services/Utils/pages';
import mockAPI from '../../services/Utils/mockAPI';

const footerLinks = Array.from(pages.values()).filter(page => page.isFooter);
const legalLinks = Array.from(pages.values()).filter(page => page.isLegal);

function Footer() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = async () => {
        setError('');
        setSuccessMessage('');
        setIsSubscribed(false);

        // Data validation
        if (!email || !email.includes('@')) {
            setError('Invalid email. Please enter a valid email address.');
            return;
        }

        try {
            // Check if the email is already subscribed
            const isAlreadySubscribed = await mockAPI.checkEmailSubscription(email);
            if (isAlreadySubscribed) {
                setIsSubscribed(true);
                setError('Email is already subscribed.');
                return;
            }

            // Simulate API call for subscribing email using mockAPI
            await mockAPI.subscribeEmail(email);
            setSuccessMessage('Successfully subscribed to email newsletter!');
            setEmail(''); // Reset the email input field
        } catch (error) {
            setError('An error occurred while subscribing. Please try again later.');
        }
    };

    return (
        <footer className={`w-full bg-gradient-to-r from-[#191716] to-[#361601] ${styles.padding}`}>
            <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center">
                <ul className="flex flex-col md:flex-row flex-wrap md:mr-10">
                    {footerLinks.map((footerLink, index) => {
                        return (
                            <li
                                key={index}
                                className={`flex mb-5 md:mb-0 ${index === footerLinks.length - 1 ? "mr-0" : "md:mr-10"} text-white hover:text-primary hover:cursor-pointer`}
                            >
                                <Link to={footerLink.path}><p className={`${styles.paragraph}`}>{footerLink.name}</p></Link>
                            </li>
                        );
                    })}
                </ul>
                {/* Separate div for displaying error and success message */}
                <div className="flex flex-col md:flex-row md:mr-10">
                    {error && <p className={`${styles.paragraph} text-red mb-5 md:mb-0`}>{error}</p>}
                    {successMessage && !isSubscribed && <p className={`${styles.paragraph} text-green mb-5 md:mb-0`}>{successMessage}</p>}
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg bg-white pl-2 pr-1 py-1 w-full md:w-96">
                    <input
                        aria-label="Email"
                        type="email"
                        placeholder="@ e-mail"
                        className="w-full focus:outline-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        aria-label="Subscribe"
                        className={`${styles.paragraph} font-medium bg-primary flex items-center justify-center rounded-lg px-5 py-2 hover:bg-secondary text-white ml-2`}
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
            <div className={`${styles.marginY} flex flex-col md:flex-row justify-left md:items-center`}>
                <p className={`${styles.paragraph} text-white font-montserrat font-normal mb-5 md:mb-0 md:mr-10`}>Follow Us</p>
                <p className={`${styles.paragraph} flex items-center`}>
                    <a href="https://www.instagram.com" aria-label="Instagram">
                        <AiFillInstagram className={`${styles.paragraph} text-white hover:text-primary mr-5 md:mr-10`} />
                    </a>
                    <a href="https://www.twitter.com" aria-label="Twitter">
                        <AiOutlineTwitter className={`${styles.paragraph} text-white hover:text-primary mr-5 md:mr-10`} />
                    </a>
                    <a href="https://www.facebook.com" aria-label="Facebook">
                        <FaFacebookF className={`${styles.paragraph} text-white hover:text-primary`} />
                    </a>
                </p>
            </div>
            <div className="border-b-2 border-white">{/*border*/}</div>
            <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-10">
                <ul className="flex flex-col md:flex-row">
                    {legalLinks.map((legalLink, index) => {
                        return (
                            <li
                                key={index}
                                className={`flex mb-5 md:mb-0 ${index === legalLinks.length - 1 ? "mr-0" : "mr-0 md:mr-10"} text-white hover:text-primary hover:cursor-pointer`}
                            >
                                <Link to={legalLink.path}><p className={`${styles.paragraph}`}>{legalLink.name}</p></Link>
                            </li>
                        );
                    })}
                </ul>
                <p className={`${styles.paragraph} text-white text-center`}>© 2020 - 2023 GigMate, Inc.</p>
            </div>
        </footer>
    );
}

export default Footer;