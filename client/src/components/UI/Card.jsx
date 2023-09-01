import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsPersonSquare } from "react-icons/bs";
import { MdVerified, MdEventAvailable } from "react-icons/md";
import { BiStar, BiSolidStar, BiSolidStarHalf, BiSolidMessageDetail, BiSolidTimeFive } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import styles from "../../assets/Styles";
import LightButton from "./LightButton";

const Card = ({ properties }) => {
    const iconClass = "md:text-[24px] sm:text-[20px] text-[16px]";

    const renderStars = () => {
        const fullStars = Math.floor(properties.rating);
        const halfStar = properties.rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<BiSolidStar key={i} className={`${iconClass} text-orange mr-1`} />);
        }

        if (halfStar) {
            stars.push(<BiSolidStarHalf key="half" className={`${iconClass} text-orange mr-1`} />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<BiStar key={`empty-${i}`} className={`${iconClass} text-orange mr-1`} />);
        }

        return stars;
    };

    const formatTime = (timeInMinutes) => {
        if (timeInMinutes > 120) {
            return `${Math.floor(timeInMinutes / 60)} hours`;
        } else if (timeInMinutes >= 60 && timeInMinutes <= 120) {
            return "1 hour";
        } else {
            return `${timeInMinutes} minutes`;
        }
    };

    const formatDistance = (distance) => {
        return `${distance} ${distance === 1 ? "KM" : "KMs"} Away`;
    };

    const availabilityText = () => {
        switch (properties.availability) {
            case 1:
                return "1 day a week";
            default:
                return `${properties.availability} days a week`;
        }
    };

    return (
        <div className={`p-5 w-full sm:gap-5 gap-3 flex flex-auto flex-col lg:flex-row rounded-md items-start justify-start ${styles.borderBox}`}>
            <div className="w-full lg:w-[30%] h-auto flex flex-col justify-between">
                <div className="mb-3">
                    {properties.profile_picture ? (
                        <img
                            src={properties.profile_picture}
                            alt="user-pic"
                            className="w-full h-[150px] object-cover"
                        />
                    ) : (
                        <BsPersonSquare className="w-full h-[150px]" />
                    )}
                </div>
                <div className="w-full">
                    <Link to={`/freelancer/${properties.freelancer_id}`} className="w-full">
                        <LightButton name="Profile" className="w-full" />
                    </Link>
                </div>
            </div>
            <div className="w-full lg:w-[70%] gap-3 flex flex-col justify-between items-start">
                <div className="w-full gap-1 flex flex-col xs:flex-row items-start justify-between">
                    <div className="flex flex-row items-center">
                        <h5 className={`${styles.heading5}`}>
                            {properties.name}
                        </h5>
                        {properties.verified ? (
                            <MdVerified className={`${iconClass} text-orange ml-1`} />
                        ) :
                            null
                        }
                    </div>
                    <div className="flex flex-row items-end justify-end">
                        <h5 className={`${styles.heading5}`}>${properties.price}</h5>
                        <p className={`${styles.paragraph} opacity-50`}>/hr</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 justify-start items-start">
                    <div className="w-full gap-1 flex flex-col xs:flex-row items-start justify-between">
                        <div className="flex">{renderStars()}</div>
                        <p className={`${styles.paragraph} opacity-80`}>
                            ({properties.reviews} {properties.reviews === 1 ? "review" : "reviews"})
                        </p>
                    </div>
                    <div className="gap-1 flex flex-col xs:flex-row">
                        <p className={`${styles.paragraph} flex items-center`}>
                            <FaLocationDot className={`${iconClass} text-orange opacity-70 mr-3`} />
                            Distance:
                        </p>
                        <span className={`${styles.paragraph} font-semibold text-left`}>{formatDistance(properties.distance)}</span>
                    </div>
                    <div className="gap-1 flex flex-col xs:flex-row">
                        <p className={`${styles.paragraph} flex items-center`}>
                            <BiSolidMessageDetail className={`${iconClass} text-orange opacity-70 mr-3`} />
                            Response Rate:
                        </p>
                        <span className={`${styles.paragraph} font-semibold text-left`}>{properties.responseRate}%</span>
                    </div>
                    <div className="gap-1 flex flex-col xs:flex-row">
                        <p className={`${styles.paragraph} flex items-center`}>
                            <BiSolidTimeFive className={`${iconClass} text-orange opacity-70 mr-3`} />
                            Response Time:
                        </p>
                        <span className={`${styles.paragraph} font-semibold text-left`}>{formatTime(properties.responseTime)}</span>
                    </div>
                    <div className="gap-1 flex flex-col xs:flex-row">
                        <p className={`${styles.paragraph} flex items-center`}>
                            <MdEventAvailable className={`${iconClass} text-orange opacity-70 mr-3`} />
                            Availability:
                        </p>
                        <span className={`${styles.paragraph} font-semibold text-left`}>{availabilityText()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    properties: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        reviews: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
        responseTime: PropTypes.number.isRequired,
        responseRate: PropTypes.number.isRequired,
        availability: PropTypes.number.isRequired,
        profile_picture: PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired,
        freelancer_id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;