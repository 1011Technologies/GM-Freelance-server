import styles from "../../../assets/Styles";
import { steps } from "../../../services/Constants/Home";

const Steps = () => {
    return (
        <section id="steps" className={`${styles.section} md:flex-col`}>
            <h2 className={`${styles.heading2} text-center mb-5 sm:mb-10`}>
                How it works?
            </h2>
            <div className={`${styles.flexCenter} md:flex-row flex-col flex-wrap md:gap-10 gap-5 mt-5`}>
                {steps.map((step) => (
                    <div key={step.id} className={`w-full ${styles.sectionInfo} ${styles.padding} flex-grow items-center text-center border-2 rounded-lg border-primary`} >
                        <img src={step.icon} alt={`${step.id}`} className="h-[50px] sm:h-[100px]" />
                        <h3 className={`${styles.heading3} mt-5`}>
                            {step.title}
                        </h3>
                        <p className={`${styles.paragraph} mt-5`} >
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Steps