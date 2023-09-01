import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import logoImage from "../../Assets/Images/logo.png";
import styles from "../../assets/Styles";
import pages from "../../services/Utils/pages";
import { PrimaryButton, SecondaryButton } from "../UI";

// filter pages if the page has property of isHeader -> true
const navLinks = Array.from(pages.values()).filter(page => page.isHeader);

const Header = () => {
    const { pathname } = useLocation();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    useEffect(() => {
        setIsNavExpanded(false);
    }, [pathname]);

    return (
        <header id="header" className={`sticky top z-40 w-full border-b-2 border-light sm:py-5 py-3 ${styles.paddingX}`}>
            <nav className={`relative w-full flex justify-between items-center`}>
                <div className="flex items-center">
                    <Link to={pages.get('home').path}>
                        <img src={logoImage} alt="GM logo" className="sm:h-[40px] h-[20px]" />
                    </Link>
                </div>
                <div className={`w-full sm:flex justify-between mt-[330px] sm:mt-0 py-5 sm:py-0 
                    ${isNavExpanded ? 'absolute' : 'hidden'} sm:block sm:static bg-white`}>
                    <ul className="flex flex-col sm:flex-row justify-center items-center">
                        {navLinks.map((navLink, index) =>
                            <li key={index}
                                className={`flex mb-5 sm:mb-0 ml-0 sm:ml-10                            
                                ${pathname === navLink.path ? "text-primary" : "text-black"}
                            hover:text-primary hover:cursor-pointer`}>
                                <Link to={navLink.path}>
                                    <p className={`${styles.paragraph} font-semibold`}>
                                        {navLink.name}
                                    </p>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="flex flex-col sm:gap-3 gap-5 sm:flex-row items-center">
                        <Link to={pages.get('signup').path}>
                            <PrimaryButton name="Sign Up" />
                        </Link>
                        <Link to={pages.get('login').path}>
                            <SecondaryButton name="Log In" />
                        </Link>
                    </div>
                </div>
                <button
                    aria-label={isNavExpanded ? "Close Menu" : "Open Menu"}
                    type="button"
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                    className="block sm:hidden text-black hover:text-primary hover:cursor-pointer"
                >
                    {isNavExpanded ? <FaXmark className="text-xl sm:text-3xl" /> : <FaBars className="text-xl sm:text-3xl" />}
                </button>
            </nav>
        </header >
    );
};

export default Header;