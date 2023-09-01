import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPerson, IoMdLogOut } from 'react-icons/io';
import { BsPersonCircle } from 'react-icons/bs';
import styles from "../../assets/Styles";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { Loader } from '../Shared';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State management
  const [hasImageError, setHasImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch user information
  const { userInfo } = useSelector(state => state.auth);

  const menuRef = useRef(null); // Ref for the dropdown menu

  useEffect(() => {
    // Function to check if clicked outside of the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: remove the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(logout());
      navigate('/login');
      // Refresh the page to render the <App /> component again
      window.location.reload();
    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
      setIsLoggingOut(false);
      setShowMenu(false);
    }
  };

  return (
    <>
      <div className={`h-[5vh] sm:h-[10vh] sticky top-0 right-0 z-40 bg-white border-b-2 border-light py-5 ${styles.paddingX} flex justify-end items-center`}>
        {userInfo && (
          <div className="relative">
            {/* User profile picture or default icon */}
            <div className="flex items-center cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                // Introduce a delay before toggling the menu
                setTimeout(() => {
                  setShowMenu(!showMenu);
                }, 50);
              }}>
              {userInfo.profile_picture && !hasImageError ? (
                <img
                  src={userInfo.profile_picture}
                  alt="profile_picture"
                  onError={() => setHasImageError(true)}
                  className={`h-5 sm:h-10 w-5 sm:w-10 rounded-full ${styles.shadow}`}
                />
              ) : (
                <div className={`h-5 sm:h-10 w-5 sm:w-10 rounded-full ${styles.shadow}`}>
                  <BsPersonCircle className={`h-full w-full text-black hover:text-primary rounded-full ${styles.shadow}`} />
                </div>
              )}
            </div>

            {/* Dropdown menu */}
            {showMenu && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-40 sm:w-48 px-2 py-4 bg-light rounded-lg shadow-md">
                <div className="flex flex-col items-center text-center mb-2">
                  {userInfo.profile_picture && !hasImageError ? (
                    <img
                      src={userInfo.profile_picture}
                      alt="Profile Picture"
                      onError={() => setHasImageError(true)}
                      className={`h-16 sm:h-20 rounded-full ${styles.shadow}`}
                    />
                  ) : (
                    <div className={`h-16 sm:h-20 w-16 sm:w-20 rounded-full ${styles.shadow}`}>
                      <BsPersonCircle className="h-full w-full text-primary" />
                    </div>
                  )}
                  <div className={`${styles.paragraph} mt-2 font-semibold w-full`}>{`${userInfo.first_name} ${userInfo.last_name}`}</div>
                  <div className={`${styles.paragraph}`}>{userInfo.user_type}</div>
                </div>

                {/* Edit Profile & Log Out options */}
                <Link to='/profile' onClick={() => setShowMenu(!showMenu)} className={`block px-4 py-2 ${styles.paragraph} text-left text-black hover:text-primary`}>
                  <IoMdPerson className="inline-block mr-2" />
                  Edit Profile
                </Link>
                <Link to='/login' onClick={handleLogout} className={`block px-4 py-2 ${styles.paragraph} text-left text-black hover:text-primary`}>
                  <IoMdLogOut className="inline-block mr-2" />
                  Log Out
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loading spinner during logout */}
      {isLoggingOut && <Loader />}
    </>
  );
};

export default Navbar;