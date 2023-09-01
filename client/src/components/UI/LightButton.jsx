import PropTypes from "prop-types";
import styles from '../../assets/Styles';

function LightButton({ name = "Button", onClick, type = "button", customClass = "" }) {
    return (
        <button
            aria-label={name}
            type={type}
            className={`w-full ${styles.paragraph} font-medium bg-lightgray border-2 rounded-lg border-lightgray hover:border-primary px-5 py-2 hover:bg-primary text-gray hover:text-white` + ' ' + customClass}
            onClick={onClick}
        >
            {name}
        </button>
    );
}
LightButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    customClass: PropTypes.string
};

export default LightButton