import { Link } from 'react-router-dom';
import pages from '../../services/Utils/pages';
import LoginForm from "../../components/Auth/LoginForm";
import styles from "../../assets/Styles";
import TextButton from "../../components/UI/TextButton";

function Login() {
    return (
        <>
            <div className={`${styles.flexCenter}`} >
                <div className={`max-w-lg ${styles.marginX}`}>
                    <h4 className={`${styles.heading4} text-center mb-3 sm:mb-5`}>
                        Log into your account
                    </h4>
                    <div className={`${styles.flexCenter}`}>
                        <p className={`${styles.paragraph}`}>
                            Don&apos;t have an account yet?
                        </p>
                        <Link to={pages.get('signup').path}
                            className="ml-1 flex items-center"
                        >
                            <TextButton name="Sign Up" />
                        </Link>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Login Form Extras */}
                    <div className={`${styles.flexCenter} mt-5`}>
                        <Link to={pages.get('forgot-password').path}
                            className="flex items-center"
                        >
                            <TextButton name="Forgot Password?" />
                        </Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login