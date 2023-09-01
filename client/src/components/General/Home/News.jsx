import { newsCards } from "../../../services/Constants/Home";
import styles from "../../../assets/Styles";

const News = () => (
    <section id="news" className={`${styles.section} md:flex-col`}>
        <h2 className={`${styles.heading2} text-center mb-5 sm:mb-10`}>
            Trusted by leading brands and startups
        </h2>
        <div className={`${styles.flexCenter} md:flex-row flex-col flex-wrap md:gap-10 gap-5 mt-5`}>
            {newsCards.map((news) => (
                <div key={news.id} className={`w-full flex-1 flex flex-col justify-center items-center text-center border-2 rounded-lg border-primary ${styles.padding} `} >
                    <span />
                    <h6 className={`${styles.heading6}`}>{news.title}</h6>
                    <p className={`${styles.paragraph} mt-5`}>{news.description}</p>
                    <hr className="line w-full my-5 text-primary" />
                    <img src={news.icon} alt={`${news.id}`} className="h-[25px] sm:h-[50px]" />
                </div>
            ))}
        </div>
    </section>

);

export default News;