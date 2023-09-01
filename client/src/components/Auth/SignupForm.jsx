import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../slices/authApiSlice';
import { setToken } from '../../slices/authSlice';
import { Loader } from '../Shared';
import { signupFields } from "../../services/Fields";
import { PrimaryButton, Input } from '../UI';
import styles from "../../assets/Styles";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupState, setSignupState] = useState(
        signupFields.reduce((state, field) => {
            state[field.id] = '';
            return state;
        }, {})
    );

    const [errorState, setErrorState] = useState({});
    const [apiResponse, setApiResponse] = useState(null);

    const [signup, { isLoading, isSuccess }] = useSignupMutation();

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

        if (value === null || value === undefined || !value.trim()) {
            return 'This field is required.';
        }

        switch (name) {
            case "first_name":
            case "last_name":
                if (value.length > 50) {
                    error = 'Maximum 50 characters allowed.';
                }
                break;
            case "phone_no":
                if (value.length > 20) {
                    error = 'Maximum 20 characters allowed.';
                }
                break;
            case 'email':
                // eslint-disable-next-line no-control-regex
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
                    error = 'Please enter a valid email.';
                } else if (value.length > 100) {
                    error = 'Maximum 100 characters allowed.';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters.';
                } else if (!/[!@#$%^&*]/.test(value)) {
                    error = 'Password must contain at least one special character.';
                } else if (value.length > 100) {
                    error = 'Maximum 100 characters allowed.';
                }
                break;
            case 'confirm_password':
                if (value !== signupState.password) {
                    error = 'Passwords do not match.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    const validateForm = () => {
        let errors = {};

        signupFields.forEach((field) => {
            errors[field.id] = validateField(field.id, signupState[field.id]);
        });

        setErrorState(errors);

        // return false if there are any errors
        return !Object.values(errors).some((error) => error !== null);
    };

    const handleInputChange = (e, inputId) => {
        let name, value;
        if (inputId) {  // For the phone input
            name = inputId;
            value = e;  // e is the phone number
        } else if (e.id && e.value) { // For the select input
            name = e.id;
            value = e.value;
        } else {  // For all other inputs
            name = e.target.id;
            value = e.target.value;
        }
        const error = validateField(name, value);

        setSignupState((prevState) => ({
            ...prevState,
            [name]: value || '',
        }));
        setErrorState((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await signup(signupState).unwrap();
                dispatch(setToken(res.token));
                setApiResponse(res.status);
                setErrorState({});

                navigate('/');

            } catch (err) {
                if (err.data?.error === 'Already registered.') {
                    // If the user is already registered, show the error message for email field
                    setErrorState((prevState) => ({
                        ...prevState,
                        email: 'This email is already registered.',
                    }));
                } else {
                    console.error('An error occurred:', err.data?.error || err);
                    setApiResponse(null);
                }
            }
        } else {
            console.log('Form is invalid:', errorState);
            setApiResponse(null); // Reset the API response state on form validation error
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:gap-5 mt-3 sm:mt-5" >
                    {signupFields.map((field) => (
                        <Input
                            key={field.id}
                            handleChange={handleInputChange}
                            value={signupState[field.id]}
                            error={errorState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            options={field.options}
                            placeholder={field.placeholder}
                        />
                    ))}
                    <PrimaryButton name="Sign Up" type="submit" />
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

export default SignupForm;