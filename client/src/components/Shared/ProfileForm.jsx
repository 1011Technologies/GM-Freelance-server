import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation, useUpdateProfilePictureMutation } from '../../slices/usersApiSlice';
import { profileFields } from '../../services/Fields';
import { Loader } from '../Shared';
import { PrimaryButton, Input } from '../UI';
import { BsPersonCircle } from 'react-icons/bs';
import styles from "../../assets/Styles";

const ProfileForm = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [profileState, setProfileState] = useState(
    profileFields.reduce((state, field) => {
      state[field.id] = userInfo && userInfo[field.id] ? userInfo[field.id] : '';
      return state;
    }, {})
  );
  const [hasImageError, setHasImageError] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  const [updateProfilePicture, { isLoading: imageLoading }] = useUpdateProfilePictureMutation();

  useEffect(() => {
    setProfileState(prevState => ({
      ...prevState,
      ...userInfo,
    }));
  }, [userInfo]);

  useEffect(() => {
    if (apiResponse) {
      const timeoutId = setTimeout(() => {
        setApiResponse(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [apiResponse]);

  const validateField = (name, value) => {
    let error = null;

    if (name === 'profile_picture' || name === 'geolocate') {
      return error;
    }

    if (value === null || value === undefined || !value.trim()) {
      return 'This field is required.';
    }

    switch (name) {
      case "first_name":
      case "last_name":
      case "city":
      case "state":
        if (value.length > 50) {
          error = 'Maximum 50 characters allowed.';
        }
        break;

      case "phone_no":
      case "house_no":
        if (value.length > 20) {
          error = 'Maximum 20 characters allowed.';
        }
        break;

      case "street":
        if (value.length > 100) {
          error = 'Maximum 100 characters allowed.';
        }
        break;

      case "postal_code":
        if (value.length > 20) {
          error = 'Maximum 20 characters allowed.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    let errors = {};

    profileFields.forEach((field) => {
      errors[field.id] = validateField(field.id, profileState[field.id]);
    });

    setErrorState(errors);
    return !Object.values(errors).some((error) => error !== null);
  };

  const handleInputChange = (e, inputId) => {
    let name, value;
    if (inputId) {  // For the phone input
      name = inputId;
      value = e; // e is the phone number
    } else if (e.id && e.value) { // For the select input
      name = e.id;
      value = e.value;
    } else {  // For all other inputs
      name = e.target.id;
      value = e.target.value;
    }
    const error = validateField(name, value);

    setProfileState((prevState) => ({
      ...prevState,
      [name]: value || '',
    }));
    setErrorState((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleGeolocation = async (name, coords) => {
    if (!coords || (!coords.latitude && !coords.longitude)) {
      setErrorState(prevState => ({
        ...prevState,
        [name]: 'Geolocation is required.',
      }));
    } else {
      const { latitude, longitude } = coords;
      setProfileState((prevState) => ({
        ...prevState,
        latitude: latitude,
        longitude: longitude,
      }));
      setErrorState(prevState => ({
        ...prevState,
        [name]: null,
      }));
      console.log(latitude, longitude);
    }

    return;
  };

  // function to handle profile picture update

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.size > 1 * 1024 * 1024) {
      setErrorState((prevState) => ({
        ...prevState,
        profile_picture: 'File size exceeds 1MB.',
      }));
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file); // Use 'profileImage' as the key

      try {
        const response = await updateProfilePicture(formData);

        if (response?.data) {
          const imageUrl = response.data.imageUrl;

          setProfileState((prevState) => ({
            ...prevState,
            profile_picture: imageUrl,
          }));

          setHasImageError(false);

          setErrorState((prevState) => ({
            ...prevState,
            profile_picture: null,
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorState((prevState) => ({
          ...prevState,
          profile_picture: 'Error uploading image.',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const orderedprofileState = {
          first_name: profileState.first_name,
          last_name: profileState.last_name,
          gender: profileState.gender,
          phone_no: profileState.phone_no,
          house_no: profileState.house_no,
          street: profileState.street,
          city: profileState.city,
          postal_code: profileState.postal_code,
          state: profileState.state,
          country: profileState.country,
          longitude: profileState.longitude,
          latitude: profileState.latitude,
        };
        console.log(orderedprofileState);
        const res = await updateProfile(orderedprofileState).unwrap();
        setErrorState({});
        if (res.success === 'updated') {
          setApiResponse({ status: 'Profile updated successfully.' });
        }
      } catch (err) {
        console.error('An error occurred:', err.data?.error || err);
        setApiResponse({ status: err.data?.error || "Error updating profile." });
      }
    } else {
      console.log('Form is invalid:', errorState);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:gap-5 mt-3 sm:mt-5">
          <div className="flex flex-col justify-center items-center">
            {profileState.profile_picture && !hasImageError ? (
              <img
                src={profileState.profile_picture}
                alt="Profile Picture"
                onError={() => setHasImageError(true)}
                className={`h-20 sm:h-40 w-20 sm:w-40 rounded-full ${styles.shadow}`}
              />
            ) : (
              <div className={`h-20 sm:h-40 w-20 sm:w-40 rounded-full ${styles.shadow}`}>
                <BsPersonCircle className="h-full w-full text-primary" />
              </div>
            )}
            {/* Image Uploading Progress */}
            {imageLoading && <Loader />}
          </div>
          {profileFields.map((field) => (
            <Input
              key={field.id}
              handleChange={field.type !== 'file' ? handleInputChange : handleFileChange}
              handleGeolocation={field.type === 'geolocate' ? handleGeolocation : null}
              value={profileState[field.id] || ''}
              error={errorState[field.id]}
              {...(field.type === 'file' ? { acceptedFiles: ".png, .jpg, .jpeg" } : {})}
              {...field}
            />

          ))}
          <PrimaryButton name="Update Profile" type="submit" />
        </div>
      </form>
      {isLoading && <Loader />}
      {apiResponse && (
        <div className={`${styles.paragraph} font-medium text-${isSuccess ? 'green' : 'red'} text-center mt-5`}>
          {apiResponse.status}
        </div>
      )}
    </>
  );
};

export default ProfileForm;