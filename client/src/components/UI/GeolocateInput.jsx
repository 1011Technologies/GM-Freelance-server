import PropTypes from 'prop-types';
import { BiCurrentLocation } from 'react-icons/bi';
import styles from '../../assets/Styles';

const GeolocateInput = ({ handleGeolocation, id, placeholder, error }) => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleGeolocation(id, position.coords);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className={`${styles.paragraph}`}>
          {placeholder}
        </label>
        <button
          type="button"
          aria-label="Geolocate"
          onClick={handleClick}
          className={`cursor-pointer flex items-center justify-center text-white bg-primary hover:bg-secondary p-2 rounded-full ${styles.shadow}`}
        >
          <BiCurrentLocation className="text-base sm:text-3xl" />
        </button>
      </div>
      {error && <div><p className={`text-red ${styles.paragraph}`}>{error}</p></div>}
    </div>
  );
};

GeolocateInput.propTypes = {
  handleGeolocation: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default GeolocateInput;