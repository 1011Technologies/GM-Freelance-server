import PropTypes from "prop-types";
import styles from '../../assets/Styles';

function SecondaryButton({ name = "Button", onClick, type = "button", customClass = "" }) {
    return (
        <button
            aria-label={name}
            type={type}
            className={`w-full ${styles.paragraph} font-medium border-2 rounded-lg border-primary hover:border-secondary text-center px-5 py-2 text-primary hover:text-white hover:bg-secondary` + ' ' + customClass}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

SecondaryButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    customClass: PropTypes.string
};

export default SecondaryButton