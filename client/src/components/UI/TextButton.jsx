import PropTypes from "prop-types";
import styles from '../../assets/Styles';

function TextButton({ name = "Button", onClick, type = "button", customClass = "" }) {
    return (
        <button
            aria-label={name}
            type={type}
            className={`w-full h-full ${styles.paragraph} font-medium text-center text-primary hover:text-secondary` + ' ' + customClass}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

TextButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    customClass: PropTypes.string
};

export default TextButton