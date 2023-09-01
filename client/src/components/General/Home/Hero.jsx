import styles from "../../../assets/Styles";
import Lottie from "lottie-react";
import { hero } from "../../../assets/Animations";
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../../UI";
import pages from "../../../services/Utils/pages";

const Hero = () => {
    return (
        <section
            id="hero"
            className={`${styles.section}`}
        >
            <div className={`${styles.sectionInfo}`}>
                <h1 className={`${styles.heading1}`}>
                    The world&apos;s work marketplace
                </h1>

                <p className={`${styles.paragraph} my-5`}>
                    Engage the largest network of trusted independent professionals to unlock the full potential of your business.
                </p>

                <div className="flex flex-row items-center gap-3">
                        <Link to={pages.get('find-talent').path}>
                            <PrimaryButton name="Fint Talent" />
                        </Link>
                        <Link to={pages.get('find-work').path}>
                            <SecondaryButton name="Find Work" />
                        </Link> 
                    </div>
            </div>

            <div className={`${styles.sectionImg} md:justify-end`}>
                <Lottie animationData={hero} className=" object-cover" />
            </div>
        </section>
    );
};

export default Hero;