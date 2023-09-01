import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFields } from '../../services/Fields';
import { PrimaryButton, Input } from '../UI';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/authApiSlice';
import { setToken } from '../../slices/authSlice';
import { Loader } from '../Shared';
import styles from '../../assets/Styles';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState(
    loginFields.reduce((state, field) => {
      state[field.id] = '';
      return state;
    }, {})
  );

  const [errorState, setErrorState] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  const [login, { isLoading, isSuccess }] = useLoginMutation();

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
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    let errors = {};

    loginFields.forEach((field) => {
      errors[field.id] = validateField(field.id, loginState[field.id]);
    });

    setErrorState(errors);

    // return false if there are any errors
    return !Object.values(errors).some((error) => error !== null);
  };

  const handleChange = (e) => {
    const { id: name, value } = e.target;
    const error = validateField(name, value);

    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
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
        const res = await login(loginState).unwrap();
        dispatch(setToken(res.token));
        setApiResponse(res.status);
        setErrorState({});

        navigate('/');
      } catch (err) {
        if (err.data?.error === "Incorrect Password.") {
          setErrorState((prevState) => ({
            ...prevState,
            password: 'Incorrect Email or Password.',
          }));
        } else if (err.data?.error === "User does'nt exist.") {
          setErrorState((prevState) => ({
            ...prevState,
            email: 'User not found. Sign Up first.',
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
        <div className="flex flex-col gap-3 sm:gap-5 mt-3 sm:mt-5">
          {loginFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              error={errorState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
          <PrimaryButton name="Log In" type="submit" />
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

export default LoginForm;