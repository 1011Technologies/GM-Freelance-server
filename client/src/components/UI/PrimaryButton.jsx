import PropTypes from "prop-types";
import styles from '../../assets/Styles';

function PrimaryButton({ name = "Button", onClick, type = "button", customClass = "" }) {
    return (
        <button
            aria-label={name}
            type={type}
            className={`w-full ${styles.paragraph} font-medium bg-primary flex items-center justify-center border-2 rounded-lg border-primary hover:border-secondary px-5 py-2 hover:bg-secondary text-white` + ' ' + customClass}
            onClick={onClick}
        >
            {name}
        </button>
    );
}
PrimaryButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    customClass: PropTypes.string
};

export default PrimaryButton