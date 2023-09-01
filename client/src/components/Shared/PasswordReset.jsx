import { useState, useEffect } from 'react'
import { useUpdatePasswordMutation } from '../../slices/usersApiSlice'
import { PrimaryButton, Input } from '../UI'
import styles from '../../assets/Styles'
import { Loader } from '../Shared';

const PasswordReset = () => {
    // State for form fields
    const [passwordState, setPasswordState] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    // State for form errors
    const [errorState, setErrorState] = useState({});

    // State to store API response messages
    const [apiResponse, setApiResponse] = useState(null);

    // Mutation to update the password
    const [updatePassword, { isLoading, isSuccess }] = useUpdatePasswordMutation();

    // Timeout for API response messages
    useEffect(() => {
        if (apiResponse) {
            const timeoutId = setTimeout(() => {
                setApiResponse(null);
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [apiResponse]);

    // Validates a given field and value against the validation rules
    const validateField = (name, value) => {
        let error = null;

        if (value === null || value === undefined || !value.trim()) {
            return 'This field is required.';
        }

        switch (name) {
            case 'current_password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters.';
                } else if (!/[!@#$%^&*]/.test(value)) {
                    error = 'Password must contain at least one special character.';
                } else if (value.length > 100) {
                    error = 'Maximum 100 characters allowed.';
                }
                break;

            case 'new_password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters.';
                } else if (!/[!@#$%^&*]/.test(value)) {
                    error = 'Password must contain at least one special character.';
                } else if (value.length > 100) {
                    error = 'Maximum 100 characters allowed.';
                } else if (value === passwordState.current_password) {
                    error = 'New password cannot be same as current password.';
                }
                break;
            case 'confirm_password':
                if (value !== passwordState.new_password) {
                    error = 'Passwords do not match.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    // Validates the entire form
    const validateForm = () => {
        const errors = {};

        Object.keys(passwordState).forEach(name => {
            const error = validateField(name, passwordState[name]);
            if (error) {
                errors[name] = error;
            }
        });

        setErrorState(errors);

        // return false if there are any errors
        return !Object.values(errors).some((error) => error !== null);
    };

    // Handles input change
    const handleInputChange = e => {
        const { name, value } = e.target
        setPasswordState(prevState => ({
            ...prevState,
            [name]: value,
        }))
        setErrorState(prevState => ({
            ...prevState,
            [name]: null,
        }))
    }

    // Handles form submission
    const handleSubmit = async e => {
        e.preventDefault()

        if (validateForm()) {
            try {
                const res = await updatePassword({
                    current_password: passwordState.current_password,
                    new_password: passwordState.new_password
                });

                // Check if the API call was successful
                if (res.data?.success) {
                    setApiResponse(res.data?.message || 'Password updated successfully.');
                    setPasswordState({
                        current_password: '',
                        new_password: '',
                        confirm_password: '',
                    });
                } else {
                    // In case the API returns a non-successful response
                    setApiResponse(res?.error?.data?.message || 'Password can be updated now.');
                }
            } catch (err) {
                // Handle potential API errors
                setApiResponse(err?.error?.data?.message || 'Something went wrong.');
            }
        } else {
            console.log('Form is invalid:', errorState);
            setApiResponse(null); // Reset the API response state on form validation error
        }
    };

    return (
        <div className={`sm:p-5 p-3 w-full sm:gap-5 gap-3 flex flex-auto flex-col rounded-md items-start justify-start ${styles.borderBox}`}>
            <h6 className={`${styles.heading6} !font-bold`}>Password Reset</h6>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className="flex flex-col gap-3 sm:gap-5 max-w-lg">
                    {/* Current Password */}
                    <Input
                        labelText="Current Password"
                        labelFor="current_password"
                        id="current_password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Current Password"
                        handleChange={handleInputChange}
                        value={passwordState.current_password}
                        error={errorState.current_password}
                    />
                    {/* New Password */}
                    <Input
                        labelText="New Password"
                        labelFor="new_password"
                        id="new_password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="New Password"
                        handleChange={handleInputChange}
                        value={passwordState.new_password}
                        error={errorState.new_password}
                    />
                    {/* Confirm Password */}
                    <Input
                        labelText="Confirm Password"
                        labelFor="confirm_password"
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        handleChange={handleInputChange}
                        value={passwordState.confirm_password}
                        error={errorState.confirm_password}
                    />
                    <PrimaryButton name="Reset" type="submit" />
                </div>
            </form>

            {/* Loader and API response messages */}
            {isLoading && <Loader />}
            {apiResponse && (
                <div className={`${styles.paragraph} font-medium text-${isSuccess ? 'green' : 'red'} text-center`}>
                    {apiResponse}
                </div>
            )}
        </div>
    )
}

export default PasswordReset