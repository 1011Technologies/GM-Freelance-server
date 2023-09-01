import { BiSolidHomeAlt2, BiSolidMessageDetail } from "react-icons/bi";
import { BsBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaHistory, FaTag, FaStar, FaPaperPlane, FaSearchLocation } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import styles from "../../assets/Styles";
import pages from "../../services/Utils/pages";
import { useSelector } from 'react-redux';

// Icons mapped to client paths
const clientIcons = new Map([
  ['/', BiSolidHomeAlt2],
  ['/local-talent', FaSearchLocation],
  ['/bookmarks', BsBookmarkFill],
  ['/recently-viewed', FaHistory],
  ['/your-hires', FaTag],
  ['/rising-stars', FaStar],
  ['/post-job', FaPaperPlane],
  ['/chat', BiSolidMessageDetail],
  ['/settings', IoMdSettings],
]);

// Placeholder for freelancer icons, currently empty
const freelancerIcons = new Map();

const Sidebar = () => {
  // State to fetch user information
  const { userInfo } = useSelector(state => state.auth);

  // Navigation states
  const [navLinks, setNavLinks] = useState([]);
  const [additionalLinks, setAdditionalLinks] = useState([]);
  const [iconMap, setIconMap] = useState(null);

  // Determine which links to show based on user type
  useEffect(() => {
    const clientPages = Array.from(pages.values()).filter(page => page.isClient === true);
    if (userInfo.user_type === 'Client') {
      setNavLinks(clientPages.filter(page => !page.subMenu));
      setAdditionalLinks(clientPages.filter(page => page.subMenu));
      setIconMap(clientIcons);
    } else if (userInfo.user_type === 'Freelancer') {
      const freelancerPages = Array.from(pages.values()).filter(page => page.isFreelancer);
      setNavLinks(freelancerPages.filter(page => !page.subMenu));
      setAdditionalLinks(freelancerPages.filter(page => page.subMenu));
      setIconMap(freelancerIcons);
    }
  }, [userInfo]);

  const { pathname } = useLocation();
  const menuPaths = ['/bookmarks', '/recently-viewed', '/your-hires', '/rising-stars'];

  // States for UI interaction
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(menuPaths.includes(pathname));

  // Watch for changes in the current route to display additional links
  useEffect(() => {
    setShowMenu(menuPaths.includes(pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    // transition-all ease-in-out duration-200 ${isNavExpanded ? "translate-x-0 " : "-translate-x-full"}
    <aside id="sidebar" className={`h-[100vh] sm:min-w-[110px] min-w-[60px] fixed z-50 top-0 left-0 bg-gradient-to-b from-[#FF602B] to-[#990202] py-5 ${styles.paddingX}`}>
      <nav className="flex flex-col">
        <button
          aria-label={isNavExpanded ? "Close Menu" : "Open Menu"}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsNavExpanded(!isNavExpanded);
          }}
          className="flex items-center mb-5 sm:mb-10 text-white hover:text-black hover:cursor-pointer"
        >
          {isNavExpanded ? <FaXmark className="text-xl sm:text-3xl" /> : <FaBars className="text-xl sm:text-3xl" />}
          <p className={`${!isNavExpanded ? "hidden" : `${styles.paragraph} font-semibold ml-5 sm:ml-10`}`}>Collapse</p>
        </button>
        <ul className="relative">
          {navLinks.map((navLink, index) => {
            const Icon = iconMap.get(navLink.path);
            return Icon ? (
              <li key={index}
                className={`flex ${index === navLinks.length - 1 ? "mb-0" : "mb-5 sm:mb-10"} ${(pathname === navLink.path || (navLink.path === '/bookmarks' && showMenu)) ? "text-black" : "text-white"} hover:text-black hover:cursor-pointer`}>
                <Link
                  to={navLink.path}
                  className="flex items-center"
                  onMouseDown={navLink.path === '/bookmarks' ? (e) => { e.preventDefault(); setShowMenu(!showMenu); } : null}
                >
                  <Icon className="text-xl sm:text-3xl text-center" />
                  <p className={`${!isNavExpanded ? "hidden" : `${styles.paragraph} font-semibold ml-5 sm:ml-10`}`}>{navLink.name}</p>
                </Link>
              </li>
            ) : null;
          })}
          {/* Conditionally render additional links when on the favourites page */}
          {showMenu && (
            <ul className="absolute top-[14%] left-full ml-10 sm:ml-20 flex flex-col p-4 bg-light rounded-lg shadow-md">
              {additionalLinks.map((navLink, index) => {
                const Icon = iconMap.get(navLink.path);
                return Icon ? (
                  <li key={index} className={`flex ${index === additionalLinks.length - 1 ? "mb-0" : "mb-5 sm:mb-10"} ${pathname === navLink.path ? "text-orange" : "text-black"} hover:text-orange hover:cursor-pointer`}>
                    <Link to={navLink.path} className="flex items-center">
                      <Icon className="text-xl sm:text-3xl text-center" />
                      <p className={`${styles.paragraph} font-medium ml-3 whitespace-nowrap`}>{navLink.name}</p>
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;