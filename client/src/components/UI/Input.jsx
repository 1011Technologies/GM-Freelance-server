import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import FileInput from './FileInput';
import GeolocateInput from './GeolocateInput';
import TelInput from './TelInput';

function Input(props) {
    const defaultProps = {
        value: ''
    };

    const finalProps = { ...defaultProps, ...props };

    switch (finalProps.type) {
        case 'select':
            return <SelectInput {...props} />;
        case 'tel':
            return <TelInput {...props} />;
        case 'file':
            return <FileInput {...props} />;
        case 'geolocate':
            return <GeolocateInput {...props} />;
        default:
            return <TextInput {...props} />;
    }
}

Input.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    labelText: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    customClass: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string,
    handleGeolocation: PropTypes.func
};

export default Input;