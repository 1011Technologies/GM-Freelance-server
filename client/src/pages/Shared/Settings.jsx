import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { BiStar, BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
import styles from "../../assets/Styles";
import { useSelector } from 'react-redux';
import { PasswordReset } from "../../components/Shared";

const Settings = () => {
    // State to handle image error
    const [hasImageError, setHasImageError] = useState(false);

    // Fetch user information from redux store
    const { userInfo } = useSelector(state => state.auth);

    // Mock data for client
    const client = {
        client_id: "client1",
        rating: 3.5,
        verified: true,
    };

    // Function to render rating stars
    const renderStars = () => {
        // Calculate the number of full, half and empty stars based on rating
        const fullStars = Math.floor(client.rating);
        const halfStar = client.rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const stars = [];

        // Push full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<BiSolidStar key={i} className={`${styles.paragraph} text-orange mr-1`} />);
        }

        // Push half star if needed
        if (halfStar) {
            stars.push(<BiSolidStarHalf key="half" className={`${styles.paragraph} text-orange mr-1`} />);
        }

        // Push empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<BiStar key={`empty-${i}`} className={`${styles.paragraph} text-orange mr-1`} />);
        }

        return stars;
    };

    return (
        <>
            {/* Main container for settings */}
            <div className={`${styles.flexCenter} md:mx-60 sm:gap-10 gap-5 flex flex-col`}>
                {/* 1. User Into section */}
                <div className={`${styles.borderBox} ${styles.padding} w-full gap-3 sm:gap-5 flex sm:flex-row flex-col`}>
                    {/* User information */}
                    <div className="sm:order-1 order-2 flex flex-1 flex-col items-center sm:items-start justify-center gap-1">
                        {/* User name */}
                        <div className="flex flex-row items-center">
                            <h4 className={`${styles.heading4} !font-bold`}>
                                {userInfo.first_name} {userInfo.last_name}
                            </h4>
                            {client.verified ? (
                                <MdVerified className={`${styles.heading4} text-orange ml-1`} />
                            ) :
                                null
                            }
                        </div>
                        {/* User type */}
                        <p className={`${styles.paragraph}`}>{userInfo?.user_type}</p>
                        {/* User rating */}
                        <p className={`${styles.paragraph} flex items-center`}>{renderStars()} {client.rating + "/5"}</p>
                    </div>
                    {/* User profile picture */}
                    <div className="sm:order-2 order-1 flex flex-initial flex-col items-center sm:items-end">
                        {userInfo.profile_picture && !hasImageError ? (
                            <img
                                src={userInfo.profile_picture}
                                alt="profile_picture"
                                onError={() => setHasImageError(true)}
                                className={`h-20 sm:h-28 w-20 sm:w-28 rounded-full ${styles.shadow}`}
                            />
                        ) : (
                            <div className={`h-12 sm:h-24 w-12 sm:w-24 rounded-full ${styles.shadow}`}>
                                <BsPersonCircle className={`h-full w-full text-primary rounded-full ${styles.shadow}`} />
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Password reset */}
                <div className={`${styles.borderBox} ${styles.padding} w-full gap-3 sm:gap-5 flex sm:flex-row flex-col`}>
                    <PasswordReset />
                </div>
            </div >
        </>
    );
}

export default Settings;