import { ProfileForm } from "../../components/Shared";
import styles from "../../assets/Styles";

const ProfilePage = () => {

    return (
        <>
            <div className={`${styles.flexCenter} `}>
                <div className={`max-w-lg`}>
                    <h4 className={`${styles.heading4} text-center mb-3 sm:mb-5`}>
                        Update your profile
                    </h4>
                    
                    {/* Profile Form */}
                    <ProfileForm />
                </div>
            </div >
        </>
    );
};

export default ProfilePage;