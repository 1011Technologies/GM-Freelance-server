import PropTypes from 'prop-types';
import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import styles from '../../assets/Styles';

const fixedInputClass = "rounded-lg appearnace-none relative w-full px-3 py-2 border border-gray placholder-gray-500 text-black";
const inputFocusStyle = {
    '--PhoneInputCountryFlag-borderColor': 'none',
    '--PhoneInputCountryFlag-borderColor--focus': '#FF954F',
    '--PhoneInputCountryFlag-borderRadius': 'none',
    '--PhoneInputCountrySelectArrow-color': '#8F8F8F',
    '--PhoneInputCountrySelectArrow-opacity': '1',
    '--PhoneInputCountrySelectArrow-width': '6px',
    '--PhoneInputCountrySelectArrow-marginLeft': '6px',
};

const TelInput = ({ handleChange, value = '', labelText, labelFor, id, name, placeholder, customClass, error }) => {
    const [phoneError, setPhoneError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const handlePhoneChange = (phoneValue) => {
        handleChange(phoneValue, id);
        const newError = phoneValue ? (isValidPhoneNumber(phoneValue) ? undefined : 'Invalid phone number') : 'Phone number required';
        setPhoneError(newError);
    };

    return (
        <div>
            <label htmlFor={labelFor} className='sr-only'>
                {labelText}
            </label>
            <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry='AU'
                placeholder={placeholder}
                initialValueFormat="national"
                value={value}
                onChange={handlePhoneChange}
                id={id}
                name={name}
                focusInputOnCountrySelection={true}
                style={inputFocusStyle}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={fixedInputClass + ' ' + `${styles.paragraph}` + ' ' + customClass + ' ' + (isFocused ? 'outline-none ring-primary border-primary' : '')}
            />
            {(error || phoneError) && <div><p className={`text-red ${styles.paragraph}`}>{error || phoneError}</p></div>}
        </div>
    );
};


TelInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    customClass: PropTypes.string,
    error: PropTypes.string,
};

export default TelInput;