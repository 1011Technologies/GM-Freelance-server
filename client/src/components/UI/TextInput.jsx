import PropTypes from 'prop-types';
import styles from '../../assets/Styles';

const fixedInputClass = "rounded-lg appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray-500 text-black focus:outline-none focus:ring-primary focus:border-primary"

const TextInput = ({ handleChange, value, labelText, labelFor, id, name, type, placeholder, customClass, error }) => {
    return (
        <div>
            <label htmlFor={labelFor} className='sr-only'>
                {labelText}
            </label>
            <input
                onChange={handleChange}
                onCopy={type === 'password' ? e => e.preventDefault() : null} // preventing copying
                onCut={type === 'password' ? e => e.preventDefault() : null} // preventing cutting
                onPaste={type === 'password' ? e => e.preventDefault() : null} // preventing pasting
                value={value}
                id={id}
                name={name}
                type={type}
                aria-label={labelText}
                className={fixedInputClass + ' ' + customClass + ' ' + `${styles.paragraph}`}
                placeholder={placeholder}
            />
            {error && <div><p className={`text-red ${styles.paragraph}`}>{error}</p></div>}
        </div>
    );
};

TextInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    customClass: PropTypes.string,
    error: PropTypes.string,
};

export default TextInput;