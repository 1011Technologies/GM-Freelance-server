import styles from "../../../assets/Styles";
import Lottie from "lottie-react";
import { featuresAnimation } from "../../../assets/Animations";
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from "../../UI";
import pages from "../../../services/Utils/pages";
import { features } from "../../../services/Constants/Home";


const Features = () => {
    return (
        <section
            id="features"
            className={`${styles.section}`}
        >
            <div className={`${styles.sectionImg} md:justify-start`}>
                <Lottie animationData={featuresAnimation} />
            </div>
            <div className={`${styles.sectionInfo}`}>
                <h2 className={`${styles.heading2}`}>
                    Why GigMate is best in town?
                </h2>

                <div className={`flex flex-col my-5`}>
                    {features.map((step) => (
                        <div key={step.id} className={`w-full flex justify-start items-start sm:items-center flex-col sm:flex-row`} >
                            <img src={step.icon} alt={`${step.id}`} className="h-[50px] sm:h-[100px]" />
                            <div className="flex flex-col gap-3 items-start justify-center">
                                <h5 className={`${styles.heading5}`}>
                                    {step.title}
                                </h5>
                                <p className={`${styles.paragraph}`} >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row items-center gap-3">
                    <Link to={pages.get('why-gigmate').path}>
                        <PrimaryButton name="Why GigMate" />
                    </Link>
                    <Link to={pages.get('signup').path}>
                        <SecondaryButton name="Sign Up" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Features;