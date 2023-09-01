import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import styles from '../../assets/Styles';

const fixedInputClass = "select-none cursor-pointer bg-white rounded-lg appearance-none relative block w-full px-3 py-2 border border-gray focus:outline-none focus:ring-primary focus:border-primary";
const menuClass = "absolute select-none z-10 mt-1 w-full border border-gray bg-white rounded-lg shadow max-h-60 overflow-y-auto overflow-x-hidden";
const optionClass = "first:rounded-t-lg last:rounded-b-lg px-4 py-2 cursor-pointer text-gray hover:bg-primary hover:text-white border-b border-gray last:border-b-0";

const SelectInput = ({ handleChange, value, labelText, labelFor, id, name, placeholder, customClass, options, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Use useRef to create a reference to the CustomSelect component
    const customSelectRef = useRef(null);

    // Handle click on an option
    const handleOptionClick = (optionValue) => {
        handleChange({ value: optionValue, id: id, name: name });
        setIsOpen(false);
    };

    const isValueSelected = value !== "";

    // Add an event listener when the component mounts
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click was outside of the CustomSelect component
            if (customSelectRef.current && !customSelectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]); // runs only if menu is open

    // Handle keyboard events on the CustomSelect component and its children (options)
    useEffect(() => {
        if (searchTerm) {
            const matchedOptions = options.filter(opt => opt.toLowerCase().startsWith(searchTerm.toLowerCase()));
            const otherOptions = options.filter(opt => !opt.toLowerCase().startsWith(searchTerm.toLowerCase()));
            setFilteredOptions([...matchedOptions, ...otherOptions]);

            const index = matchedOptions.findIndex(opt => opt.toLowerCase().startsWith(searchTerm.toLowerCase()));
            if (index !== -1) {
                setHighlightedIndex(index);
            }
        } else {
            setFilteredOptions(options);
            setHighlightedIndex(-1);
        }
    }, [searchTerm, options]);

    // Handle keyboard events on the CustomSelect component and its children (options)
    const handleInputClick = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    // Handle keyboard events on the CustomSelect component and its children (options)
    const handleKeyDown = (event) => {
        if (/[a-zA-Z]/.test(event.key) && event.key.length === 1) {
            setSearchTerm(prev => prev + event.key);
        } else if (event.key === 'Backspace') {
            setSearchTerm(prev => prev.slice(0, -1));
        } else if (event.key === 'Escape') {
            setSearchTerm('');
        } else if (event.key === 'Enter' && highlightedIndex !== -1) {
            handleOptionClick(filteredOptions[highlightedIndex]);
            setSearchTerm('');
        }
    };

    return (
        <div ref={customSelectRef}>
            {/* Label Hidden because of the sr-only*/}
            <label htmlFor={labelFor} className='sr-only'>
                {labelText}
            </label>
            <div className='relative'>
                {/* Select Input */}
                <div
                    tabIndex={0}
                    onClick={handleInputClick}
                    onKeyDown={handleKeyDown}
                    className={`${fixedInputClass} ${styles.paragraph} ${customClass} ${isValueSelected ? 'text-black' : 'text-gray'}`}
                >
                    {/* If value is empty, show placeholder text instead of value */}
                    {value || placeholder}
                    {/* Dropdown Icon */}
                    <div className='absolute focus:z-10 inset-y-0 right-0 flex items-center pr-2'>
                        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M5.293 7.293l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 1 0-1.414-1.414L10 10.586 6.707 5.879a.999.999 0 1 0-1.414 1.414z' /></svg>
                    </div>
                </div>
                {/* Dropdown Menu */}
                {isOpen && (
                    <div className={`${menuClass}`}>

                        {filteredOptions.map((option, index) => (
                            <div
                                key={option}
                                className={`${optionClass} ${styles.paragraph} ${highlightedIndex === index ? 'bg-primary text-white' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Error Message */}
            {error && <div><p className={`text-red ${styles.paragraph}`}>{error}</p></div>}
        </div>
    );
};

SelectInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    customClass: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string,
};

export default SelectInput;