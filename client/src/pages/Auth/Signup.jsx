import { Link } from 'react-router-dom';
import pages from '../../services/Utils/pages';
import SignupForm from "../../components/Auth/SignupForm";
import styles from "../../assets/Styles";
import { TextButton } from '../../components/UI';

const Signup = () => {
  return (
    <>
      <div className={`${styles.flexCenter}`} >
        <div className={`max-w-lg ${styles.marginX}`}>
          <h4 className={`${styles.heading4} text-center mb-3 sm:mb-5`}>
            Register your account
          </h4>
          <div className={`${styles.flexCenter}`}>
            <p className={`${styles.paragraph}`}>
              Already have an account?
            </p>
            <Link to={pages.get('login').path}
              className="ml-1 flex items-center"
            >
              <TextButton name="Login" />
            </Link>
          </div>

          {/* Signup Form */}
          <SignupForm />
        </div>
      </div >
    </>

  );
};

export default Signup;